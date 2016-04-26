// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var app = express();
var port = 5050;
var db; // Database Variable

//Sawyer's base
//var base = 'http://localhost:13558';
//Tom's base
var base = 'http://localhost:50363';

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true}));

// Location of file: C:\Users\kaido_000\Documents\GitHub\psh_sp16_cmpsc488_flaggers\botbattle\server code

// Opens the connection to the database
function openConnection() {
	db = mysql.createConnection(
	{
	    host: credentials.host,
	    user: credentials.user,
	    password: credentials.password,
	    database: credentials.database
	});
	db.connect(function(err){
	    if(err){
	        logMessage(err);
	    } else {
	        logMessage('Connection established.');
	    }
	});
}

// ****************************************************


//          QUERY FUNCTIONS


// ****************************************************

/********************************************************************


   START PLAYBACK FUNCTIONS


********************************************************************/
function putMatch(init, turn) {
	
	var turnToInsert = {
                match_id: 1234, ready_for_playback: 1, winner: "Tombob",
				game_initialization_message: init, turns: turn
                };
    db.query('UPDATE matches SET ?', turnToInsert, function (err, rows) {
                    if (err) {          // Error with the database
                        logMessage(err);
                    } else {
                        logMessage('Row inserted into matches.');
                    }
                });
}

/*
    This function queries the database for a match to playback to the user.

    Arguments:
        1) matchID - The id of the match we are looking for.
        2) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'null' if the match does not exist.
                        3) 'pending' if the match is not ready for playback
                        4) If successfull, a json object that contains all of the
                            information needed to playback a match.
*/
function getMatch(matchID, callback) {
    var retval;

    // Column names: match_id, ready_for_playback, winner, game_initialization_message, turns
    db.query('SELECT * FROM matches WHERE match_id = ?', matchID, function (err, rows) {
        if (err) {                          // Error with the database
            retval = 'error';
            logMessage(err);
        } else if (rows[0] == undefined) {  // Match does not exists
			retval = 'null';
			logMessage('ERROR: Match with id:' + matchID + ' not found.');
        } else {
            var match = rows[0];           
            var ready = match.ready_for_playback.toString('hex');  
			
            if (ready == false) {           // Match is not ready for playback
                retval = 'pending';
                logMessage('ERROR: Match with id:' + matchID + ' is not ready for playback.');
            } else {
                var winnerSTR = match.winner;
				var winnerOBJ = '{"winner": "' + winnerSTR + '"}';  // Convert the string to a JSON object
                var init_message = match.game_initialization_message;
                var turns = match.turns;

                retval = JSON.parse('[' + winnerOBJ + ',' + init_message + ',' + turns + ']');
                logMessage('Data for match with id:' + matchID + ' sent to the client.');
            }
        }
        callback(retval);   // Send the result
    });
}

/********************************************************************


   END PLAYBACK FUNCTIONS


********************************************************************/

/********************************************************************


   START TESTING ARENA FUNCTIONS


********************************************************************/

/*
    This function queries the database for all the data needed to display
    a testing arena match to the user. This function will only send back
    the data needed to display a testing arena match if the status of the
    testing arena match is 'READY' in the database.

    Arguments:
        1) userID - The id of the user that is testing their bot.
        2) challengeID - The id of the challenge the user is testing.
        3) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'false' if the database encountered an error.
                        2) 'null' if the testing arena match does not exist.
                        3) 'pending' if the testing arena turn is not ready for playback.
                        4) 'displayed' if the testing arena turn has already been displayed
                        5) If successfull and the testing arena match is ready for playback,
                            a json object that contains all of the information needed to
                            playback a testing arena match.
*/
function getTestMatchTurn(userID, challengeID, callback){
    var retval;

	// Column names: uid, challenge_id, last_turn_status, game_initialization_message, turns
	db.query('SELECT game_initialization_message, turns, last_turn_status FROM test_arena_matches ' + 
	'WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {			                // Error with the database
            retval = 'error';
            logMessage(err);
        } else if (rows[0] == undefined) {  // Match does not exists           
            retval = 'null';	
            logMessage('ERROR: Test instance with user_id:' + userID + ' and challenge_id:' + challengeID + ' not found.');
        } else {       	
            var match = rows[0];		      
            var status = match.last_turn_status.toUpperCase();
            
            if (status == 'PENDING') {          // Turn is not ready to be displayed
                retval = 'pending';
                logMessage('ERROR: Test instance with user_id: ' + userID + ' and challenge_id:' + challengeID +
                    ' is not ready to be displayed.');               
            } else if (status == 'DISPLAYED') { // Turn has already been displayed
                retval = 'displayed';
                logMessage('ERROR: Test instance with user_id: ' + userID + ' and challenge_id:' + challengeID +
                    ' has already been displayed.');
            } else {
                var turns = match.turns;
                var init_message = match.game_initialization_message;

                retval = JSON.parse('[' + init_message + ',' + turns + ']');
                logMessage('Data for match with user_id:' + userID + ' and challenge_id:' + challengeID + ' sent to the client.');

                // Change the last_turn_status to DISPLAYED
                // Column names: uid, challenge_id, last_turn_status, game_initialization_message, turns
                db.query('UPDATE test_arena_matches SET last_turn_status = "DISPLAYED" WHERE uid = ' + userID
                    + ' AND challenge_id = ' + challengeID, function (err, rows) {
                        if (err) {
                            logMessage(err);
                        } else {
                            logMessage('Set match with user_id:' + userID + ' and challenge_id:' + challengeID + ' to DISPLAYED in test_arena_matches.');
                        }
                    });
            }
        }         
        callback(retval);   // Send the result        
    }); 
}

/*
    This function inserts a new row into the database for the given testing arena turn
    to be evaluated.

    Arguments:
        1) userID - The id of the user that is testing their bot.
        2) challengeID - The id of the challenge the user is testing.
        3) botType - String version of the type of bot (e.g. TEST_ARENA, USER, etc.).
        4) languageID - The id of the language that the bot is written in.
        5) botID - The id of the bot that is being tested.
        6) botVersion - The version of the bot that is being tested.
        7) player - The player number whose next turn needs evaluated
        8) lastTurnIndex - The last turn that was evaluated.
        9) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'true' if the insertion was successfull.
*/
function uploadTurnRequest(userID, challengeID, botType, languageID, botID, botVersion, playerNum, lastTurnIndex, callback) {
    var retval;

    // Column names: pending_turn_id, uid, challenge_id, bot_type, language_id, bot_id, bot_version, player, last_turn_index
    db.query('SELECT uid FROM pending_test_arena_turns WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {                      // Error with the database
            retval = 'error';
            logMessage(err);
        } else {
            if (rows[0] == undefined) { // There is not a row for this challengeID and userID in the table, insert one
                var turnToInsert = {
                    uid: userID, challenge_id: challengeID, bot_type: botType, language_id: languageID,
                    bot_id: botID, bot_version: botVersion, player: playerNum, last_turn_index: lastTurnIndex
                };

                // Column names: pending_turn_id, uid, challenge_id, bot_type, language_id, bot_id, bot_version, player, last_turn_index
                db.query('INSERT INTO pending_test_arena_turns SET ?', turnToInsert, function (err, rows) {
                    if (err) {          // Error with the database
                        retval = 'error';
                        logMessage(err);
                    } else {
                        retval = 'true';
                        logMessage('Row inserted into the pending_test_arena_turns table.');
                    }
                });
            } else {                    // There is an entry for this challengeID and userID, update it
                var turnToUpdate = {
                    bot_type: botType, language_id: languageID,
                    bot_id: botID, bot_version: botVersion, player: playerNum, last_turn_index: lastTurnIndex
                };

                // Column names: pending_turn_id, uid, challenge_id, bot_type, language_id, bot_id, bot_version, player, last_turn_index
                db.query('UPDATE pending_test_arena_turns SET ?', turnToUpdate, function (err, rows) {
                    if (err) {          // Error with the database
                        retval = 'error';
                        logMessage(err);
                    } else {
                        retval = 'true';
                        logMessage('Row updated in pending_test_arena_turns table.');
                    }
                });
            }
        }
        callback(retval);   // Send the result
    });
}

/*
    This function queries the database for all of the languages that a bot can
    be written in.

    Arguments:
        1) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'null' if no languages were found.
                        3) A json object that contains the name and id for each language.
*/
function getLanguages(callback) {
    var retVal;

    // Column names: language_id, name
    db.query('SELECT * FROM languages', function (err, rows) {
        if (err) {                          // Error with the database
            retVal = 'error';
            logMessage(err);
        } else if (rows[0] == undefined) {  // No languages in table
			retVal = 'null';
			logMessage('ERROR: No languages found');
        } else {
			var rowsLeft = true;
			var i = 0;
			retVal = '[';
			while(rowsLeft) {               // Construct json object with all the languages
				retVal += '\"' + rows[i].name + '\",' + rows[i].language_id;
				i++;
				
				if(rows[i] == undefined) {
					rowsLeft = false;
				}
				else {
					retVal += ',';
				}
			}
			retVal += ']';
			retVal = JSON.parse(retVal);
			logMessage('Returned language list.');
        }
        callback(retVal);   // Send the result
    });
}

/*
    This function queries the database for a testing arena bots compiler errors
    and warnings.

    Arguments:
        1) userID - The id of the user that is testing their bot.
        2) challengeID - The id of the challenge that the user is currently testing.
        3) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'true' if the insertion was successfull.
*/
function getCompilerErrorsAndWarnings(userID, challengeID, callback) {
    var retval;

    // Column names: uid, challenge_id, language_id, needs_compiled, errors, warnings, error_messages, warning_messages, source_code 
    db.query('SELECT errors, warnings, error_messages, warning_messages FROM test_arena_bots WHERE uid='
        + userID + ' AND challenge_id=' + challengeID, function (err, rows) {
            if (err) {  // Error with the database
                retval = 'error';
                logMessage(err);
            } else {
                var errors = rows[0].errors;
                var warnings = rows[0].warnings;
                var error_msgs = rows[0].error_messages;
                var warning_msgs = rows[0].warning_messages;

                // Construct a json object with the compiler errors and warnings
                var json = '{' +
                                '"errors": ' + errors + ',' +
                                '"warnings": ' + warnings + ',' +
                                '"error_messages": "' + error_msgs + '",' +
                                '"warning_messages": "' + warning_msgs + '"' +
                            '}';

                retval = json;
                logMessage('Sent compiler error messages for challenge_id:' + challengeID + ' and user_id:' + userID);
            }
            callback(retval);   // Send the result
        });
}

/*
    This function queries the database for all of the code templates for a
    specific challenge.

    Arguments:
        1) challengeID - The id of the challenge the user is testing.
        2) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'null' if no templates exist.
                        3) A json object that contains the source code and id for each
                            template.
*/
function getTemplates(challengeID, callback) {
    var retVal;

    // Column names: challenge_id, language_id, source_code
    db.query('SELECT language_id, source_code FROM test_arena_template_bots WHERE challenge_id = ' + challengeID, function (err, rows) {
        if (err) {                          // Error with the database
            retVal = 'error';
            logMessage(err);
        } else if (rows[0] == undefined) {  // No templates found
			retVal = 'null';
			logMessage('ERROR: No templates found for challenge_id:' + cid + '.');
        } else {
			var rowsLeft = true;
			var i = 0;
			retVal = '[';
			while (rowsLeft) {              // Construct json object with all the templates
				retVal += '\"' + rows[i].source_code + '\",' + rows[i].language_id;
				i++;
				
				if(rows[i] == undefined) {
					rowsLeft = false;
				}
				else {
					retVal += ',';
				}
			}
			retVal += ']';
			retVal = JSON.parse(retVal);
			logMessage('Returned test arena templates list.');
        }
        callback(retVal);   // Send the result
    });
}

/*
    This function queries the database for the default version for a
    specific user bot and returns it to the client.

    Arguments:
        1) botID - The id of the user bot.
        2) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'null' if the user bot does not exist.
                        3) If successful, sends the default version to the client.
*/
function getUserBot(botID, callback) {
    var retval;

    // Column names: bot_id, uid, challenge_id, default_version, name, creation_date, descripion, public
    db.query('SELECT default_version FROM user_bots WHERE bot_id = ?', botID, function (err, rows) {
        logMessage(rows);
        if (err) {                          // Error with the database
            retval = 'error';
            logMessage(err);
        } else if (rows[0] == undefined) {  // User bot does not exist
            retval = 'null';
            logMessage('ERROR: The bot with bot_id:' + botID + ' does not exist.');
        } else {
            retval = rows[0].default_version.toString();
            logMessage('Sent default_version:' + retval + ' to the client for bot_id:' + botID + '.');
        }
        callback(retval);   // Send the result
    });
}

/*
    This function inserts a users testing bot into the database. If the user already has
    a bot for the specific challenge in the database, it updates the source code. If they
    dont have a bot in the database, this function inserts a new bot.

    Arguments:
        1) botSourceCode - String version of the source code to be uploaded to the database.
        2) userID - The id of the user that is testing their bot.
        3) challengeID - The id of the challenge that the user is currently testing.
        4) languageID - The id of the language that the source code is written in.
        5) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'true' if the insertion was successfull.
*/
function uploadCode(botSourceCode, userID, challengeID, languageID, callback) {
    var retval;

    // Column names: uid, challenge_id, language_id, needs_compiled, errors, warnings, error_messages, warning_messages, source_code
    db.query('SELECT uid FROM test_arena_bots WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {                      // Error with the database
            retval = 'error';
            logMessage(err);
        } else {
            if (rows[0] == undefined) { // Code for this challenge does not exist in the db, insert new row
                var time = Date.now();
                var codeToUpload = { uid: userID, challenge_id: challengeID, language_id: languageID, needs_compiled: time, source_code: botSourceCode, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };

                // Column names: uid, challenge_id, language_id, needs_compiled, errors, warnings, error_messages, warning_messages, source_code
                db.query('INSERT INTO test_arena_bots SET ?', codeToUpload, function (err, rows) {
                    if (err) {          // Error with the database
                        retval = 'error';
                        logMessage(err);
                    } else {
                        retval = 'true';
                        logMessage('Row inserted into test_arena_bots.');
                    }
                    callback(retval);   // Send the result
                });
            }
            else {                      // Code for this challenge exists in the db, update the row
                var time = Date.now();
                var codeToUpdate = { language_id: languageID, source_code: botSourceCode, needs_compiled: time, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };

                // Column names: uid, challenge_id, language_id, needs_compiled, errors, warnings, error_messages, warning_messages, source_code
                db.query('UPDATE test_arena_bots SET ?', codeToUpdate, function (err, rows) {
                    if (err) {          // Error with the database
                        retval = 'error';
                        logMessage(err);
                    } else {
                        retval = 'true';
                        logMessage('Row updated in test_arena_bots.');
                    }
                    callback(retval);   // Send the result
                });
            }
        }
    });
}

/*
    This function saves a users testing bot in the database. First, this function
    inserts a new bot into the user_bots table with the userID and challengeID and
    saves the bot_id of the newly inserted bot. Then, the function uses the bot_id
    to insert a new row into the user_bots_versions table.

    Arguments:        
        1) userID - The id of the user that is testing their bot.
        2) challengeID - The id of the challenge that the user is currently testing.
        3) languageID - The id of the language that the source code is written in.
        4) sourceCode - String version of the source code to be uploaded to the database.
        5) botName - The name of the bot given by the user.
        6) botDescription - The description of the bot given by the user.
        7) callback(retval) - The callback method is called at the end of this function
                        and passes back the following information via retval:
                        1) 'error' if the database encountered an error.
                        2) 'true' if the insertion was successfull.
*/
function saveTestingBot(userID, challengeID, languageID, sourceCode, botName, botDescription, callback) {
    var retval;
    var botToInsert = { uid: userID, challenge_id: challengeID, default_version: 1, name: botName, description: botDescription };
    
    // Column names: bot_id, uid, challenge_id, default_version, name, creation_date, description, public
    db.query('INSERT INTO user_bots SET ?', botToInsert, function (err, rows) {
        if (err) {                      // Error with the database
            retval = 'error';
            callback(retval);           // Send the result
            logMessage(err);
        } else {
            var botID = rows.insertId;  // Get the bot_id of the newly inserted row            
            var botVersionToInsert = { bot_id: botID, version: 1, language_id: languageID, comments: 'none', source_code: sourceCode };

            // Column names: bot_id, version, creation_date, language_id, comments, errors, warnings, error_messages, warning_messages, source_code
            db.query('INSERT INTO user_bots_versions SET ?', botVersionToInsert, function (err, rows) {
                if (err) {              // Error with the database                    
                    retval = 'error';
                    logMessage(err);
                } else {
                    retval = botID.toString();
                }
                callback(retval);       // Send the result
            });
        }
    });
}

/******************************************************


        END QUERY FUNCTIONS


******************************************************/

/******************************************************


        CORS REQUESTS

        Each statement listens for a request on a 
        specific url, it then calls the appropriate
        function. Once that function finishes, it
        sends the data to the client


******************************************************/

// localhost:5050/get_match?id=12345
app.get('/get_match', function(req, res, next){
    var match_id = req.query.id;

    getMatch(match_id, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/get_test_turn?cid=101
app.get('/get_test_turn', function(req, res, next){
    var challenge_id = req.query.cid;
    //var user_id = req.session.user;
    var user_id = 12345;

    getTestMatchTurn(user_id, challenge_id, function (data) {
		res.header('Access-Control-Allow-Origin', base);
		res.send(data); 
	});
});

// localhost:5050/upload_turn_request?cid=101&botType='TEST_ARENA'&lid=1&botID=3&botVersion=1&player=2&lastTurnIndex=3
app.get('/upload_turn_request', function (req, res, next) {
    //var user_id = req.session.user;
    var user_id = 12345;
    var challenge_id = req.query.cid;
    var bot_type = req.query.botType;
    var language_id = req.query.lid;
    var bot_id = req.query.botID;
    var bot_version = req.query.botVersion;
    var player = req.query.player;
    var last_turn_index = req.query.lastTurnIndex;

    uploadTurnRequest(user_id, challenge_id, bot_type, language_id, bot_id, bot_version, player, last_turn_index, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/uploadCode?cid=101&lid=1&needs_compiled=1
app.post('/upload_code', function(req, res, next){
    var source_code = req.body;
    //var user_id = req.session.user;
    var user_id = 12345;
	var challenge_id = req.query.cid;
	var language_id = req.query.lid;

	uploadCode(source_code, user_id, challenge_id, language_id, function (data) {
	    res.header('Access-Control-Allow-Origin', base);
	    res.send(data);
    });
});

// localhost:5050/save_testing_bot?cid=101&lid=1&name='hello'&desc='description'
app.post('/save_testing_bot', function (req, res, next) {
    //var user_id = req.session.user;
    var user_id = 12346;
    var challenge_id = req.query.cid
    var language_id = req.query.lid;
    var source_code = req.body;
    var bot_name = req.query.name;
    var bot_description = req.query.desc;

    saveTestingBot(user_id, challenge_id, language_id, source_code, bot_name, bot_description, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/get_languages
app.get('/get_languages', function(req, res, next){	
    getLanguages(function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/get_templates?cid=101
app.get('/get_templates', function(req, res, next){
	var challenge_id = req.query.cid;
	
    getTemplates(challenge_id, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/get_compiler_errors?cid=101
app.get('/get_compiler_errors', function (req, res, next) {
    //var user_id = req.session.user;
    var user_id = 12345
    var challenge_id = req.query.cid;

    getCompilerErrorsAndWarnings(user_id, challenge_id, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

// localhost:5050/get_user_bot?botID=3
app.get('/get_user_bot', function (req, res, next) {
    var user_bot_id = req.query.botID;

    getUserBot(user_bot_id, function (data) {
        res.header('Access-Control-Allow-Origin', base);
        res.send(data);
    });
});

/******************************************************


        END CORS REQUESTS


******************************************************/
var log = true;

function logMessage(message) {
	if(log) {
		console.log(message);
	}
}

openConnection();
// Start the server
http.createServer(app).listen(port, function() {
	logMessage('Server listening on port ' + port + '.');
});

//var gameInit = "{\"background\":\"games/checkers/CheckerBoard.png\",\"defaultTimestep\":1.0,\"defaultBot\":1,\"imagesToLoad\":[{\"imagePath\":\"games/checkers/basic_red.png\",\"name\":\"basic_red\"},{\"imagePath\":\"games/checkers/basic_white.png\",\"name\":\"basic_white\"},{\"imagePath\":\"games/checkers/king_red.png\",\"name\":\"king_red\"},{\"imagePath\":\"games/checkers/king_white.png\",\"name\":\"king_white\"}],\"entity\":[{\"id\":1,\"type\":\"object\",\"visible\":true,\"initX\":190,\"initY\":90,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":2,\"type\":\"object\",\"visible\":true,\"initX\":310,\"initY\":90,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":3,\"type\":\"object\",\"visible\":true,\"initX\":430,\"initY\":90,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":4,\"type\":\"object\",\"visible\":true,\"initX\":550,\"initY\":90,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":5,\"type\":\"object\",\"visible\":true,\"initX\":250,\"initY\":150,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":6,\"type\":\"object\",\"visible\":true,\"initX\":370,\"initY\":150,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":7,\"type\":\"object\",\"visible\":true,\"initX\":490,\"initY\":150,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":8,\"type\":\"object\",\"visible\":true,\"initX\":610,\"initY\":150,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":9,\"type\":\"object\",\"visible\":true,\"initX\":190,\"initY\":210,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":10,\"type\":\"object\",\"visible\":true,\"initX\":310,\"initY\":210,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":11,\"type\":\"object\",\"visible\":true,\"initX\":430,\"initY\":210,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":12,\"type\":\"object\",\"visible\":true,\"initX\":550,\"initY\":210,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_red\"},{\"id\":13,\"type\":\"object\",\"visible\":true,\"initX\":250,\"initY\":390,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":14,\"type\":\"object\",\"visible\":true,\"initX\":370,\"initY\":390,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":15,\"type\":\"object\",\"visible\":true,\"initX\":490,\"initY\":390,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":16,\"type\":\"object\",\"visible\":true,\"initX\":610,\"initY\":390,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":17,\"type\":\"object\",\"visible\":true,\"initX\":190,\"initY\":450,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":18,\"type\":\"object\",\"visible\":true,\"initX\":310,\"initY\":450,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":19,\"type\":\"object\",\"visible\":true,\"initX\":430,\"initY\":450,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":20,\"type\":\"object\",\"visible\":true,\"initX\":550,\"initY\":450,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":21,\"type\":\"object\",\"visible\":true,\"initX\":250,\"initY\":510,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":22,\"type\":\"object\",\"visible\":true,\"initX\":370,\"initY\":510,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":23,\"type\":\"object\",\"visible\":true,\"initX\":490,\"initY\":510,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"},{\"id\":24,\"type\":\"object\",\"visible\":true,\"initX\":610,\"initY\":510,\"width\":60,\"height\":60,\"flipped\":false,\"rotation\":0.0,\"value\":\"basic_white\"}]}";
//gameInit = JSON.parse(gameInit);
//var turns = "[{\"timescale\":1.0,\"turnChanges\":[{\"id\":9,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":270}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121212\\n01212121\\n12101010\\n01010101\\n14141414\\n41414141\\n14141414\\n\",\"stdout\":\"A3B4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":14,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":330}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121212\\n01212121\\n12101010\\n01014101\\n14101414\\n41414141\\n14141414\\n\",\"stdout\":\"D6E5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":9,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121212\\n01212121\\n10101010\\n21014101\\n14101414\\n41414141\\n14141414\\n\",\"stdout\":\"B4A5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":19,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":390}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121212\\n01212121\\n10101010\\n21014101\\n14141414\\n41410141\\n14141414\\n\",\"stdout\":\"E7D6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":12,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":270}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121212\\n01212101\\n10101012\\n21014101\\n14141414\\n41410141\\n14141414\\n\",\"stdout\":\"G3H4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":22,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":450}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121212\\n01212101\\n10101012\\n21014101\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"D8E7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":10,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":270}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121212\\n01012101\\n12101012\\n21014101\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"C3B4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":14,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":270}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121212\\n01012101\\n12101412\\n21010101\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"E5F4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":11,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121212\\n01010101\\n12101412\\n21010121\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"E3G5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":14,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":210}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121212\\n01010141\\n12101012\\n21010121\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"F4G3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":8,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":270}},{\"id\":14,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121210\\n01010101\\n12101212\\n21010121\\n14141414\\n41414141\\n14101414\\n\",\"stdout\":\"H2F4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":13,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":330}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121210\\n01010101\\n12101212\\n21410121\\n10141414\\n41414141\\n14101414\\n\",\"stdout\":\"B6C5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":8,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212121\\n12121210\\n01010101\\n12101012\\n21412121\\n10141414\\n41414141\\n14101414\\n\",\"stdout\":\"F4E5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":13,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":210}},{\"id\":10,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212121\\n12121210\\n41010101\\n10101012\\n21012121\\n10141414\\n41414141\\n14101414\\n\",\"stdout\":\"C5A3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":4,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":150}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12121212\\n41010101\\n10101012\\n21012121\\n10141414\\n41414141\\n14101414\\n\",\"stdout\":\"G1H2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":19,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":270}},{\"id\":8,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12121212\\n41010101\\n10101412\\n21010121\\n10101414\\n41414141\\n14101414\\n\",\"stdout\":\"D6F4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":9,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":390}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12121212\\n41010101\\n10101412\\n01010121\\n12101414\\n41414141\\n14101414\\n\",\"stdout\":\"A5B6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":17,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":330}},{\"id\":9,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12121212\\n41010101\\n10101412\\n01410121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"A7C5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":6,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":210}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12101212\\n41210101\\n10101412\\n01410121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"D2C3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":17,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":270}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12101212\\n41210101\\n14101412\\n01010121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"C5B4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":6,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":330}},{\"id\":17,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12101212\\n41010101\\n10101412\\n21010121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"C3A5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":19,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":210}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12101212\\n41014101\\n10101012\\n21010121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"F4E3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":270}},{\"id\":19,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12101012\\n41010101\\n10121012\\n21010121\\n10101414\\n01414141\\n14101414\\n\",\"stdout\":\"F2D4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":16,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":270}},{\"id\":11,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12101012\\n41010101\\n10121412\\n21010101\\n10101410\\n01414141\\n14101414\\n\",\"stdout\":\"H6F4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":12,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n12101012\\n41010101\\n10121410\\n21010121\\n10101410\\n01414141\\n14101414\\n\",\"stdout\":\"H4G5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":270}},{\"id\":12,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n12101012\\n41010101\\n10121414\\n21010101\\n10101010\\n01414141\\n14101414\\n\",\"stdout\":\"F6H4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":210}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n10101012\\n41210101\\n10121414\\n21010101\\n10101010\\n01414141\\n14101414\\n\",\"stdout\":\"B2C3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":20,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":390}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n10101012\\n41210101\\n10121414\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"G7H6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":4,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":210}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21212101\\n10101010\\n41210121\\n10121414\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"H2G3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":150}},{\"id\":4,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21212101\\n10101410\\n41210101\\n10121410\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"H4F2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":3,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":210}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"21210101\\n10101410\\n41210121\\n10121410\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"E1G3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":16,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":150}},{\"id\":3,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"21210101\\n10101414\\n41210101\\n10121010\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"F4H2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":1,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":150}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01210101\\n12101414\\n41210101\\n10121010\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"A1B2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":90}},{\"id\":15,\"changes\":{\"value\":\"king_white\"}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01215101\\n12101014\\n41210101\\n10121010\\n21010101\\n10101014\\n01414101\\n14101414\\n\",\"stdout\":\"F2E1\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":6,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":390}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01215101\\n12101014\\n41210101\\n10121010\\n01010101\\n12101014\\n01414101\\n14101414\\n\",\"stdout\":\"A5B6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":18,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":330}},{\"id\":6,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01215101\\n12101014\\n41210101\\n10121010\\n41010101\\n10101014\\n01014101\\n14101414\\n\",\"stdout\":\"C7A5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01215101\\n12101014\\n41210101\\n10101010\\n41210101\\n10101014\\n01014101\\n14101414\\n\",\"stdout\":\"D4C5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":21,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":450}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01215101\\n12101014\\n41210101\\n10101010\\n41210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"B8A7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":2,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":150}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n12121014\\n41210101\\n10101010\\n41210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"C1D2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":13,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":90}},{\"id\":1,\"changes\":{\"visible\":false}},{\"id\":13,\"changes\":{\"value\":\"king_white\"}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01515101\\n10121014\\n01210101\\n10101010\\n41210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"A3C1\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":2,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":210}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01515101\\n10101014\\n01212101\\n10101010\\n41210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"D2E3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":18,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":270}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01515101\\n10101014\\n01212101\\n14101010\\n01210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"A5B4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":330}},{\"id\":18,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01515101\\n10101014\\n01012101\\n10101010\\n21210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"C3A5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":13,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":150}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10151014\\n01012101\\n10101010\\n21210101\\n10101014\\n41014101\\n10101414\\n\",\"stdout\":\"C1D2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":390}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10151014\\n01012101\\n10101010\\n01210101\\n12101014\\n41014101\\n10101414\\n\",\"stdout\":\"A5B6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":13,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":270}},{\"id\":2,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01210101\\n12101014\\n41014101\\n10101414\\n\",\"stdout\":\"D2F4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":450}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01210101\\n10101014\\n41214101\\n10101414\\n\",\"stdout\":\"B6C7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":22,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":390}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01210101\\n10141014\\n41210101\\n10101414\\n\",\"stdout\":\"E7D6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":450}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01010101\\n10141014\\n41212101\\n10101414\\n\",\"stdout\":\"C5E7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":21,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":390}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01010101\\n14141014\\n01212101\\n10101414\\n\",\"stdout\":\"A7B6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":510}},{\"id\":5,\"changes\":{\"value\":\"king_red\"}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01010101\\n14141014\\n01012101\\n13101414\\n\",\"stdout\":\"C7B8\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":150}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01010101\\n10101514\\n01010101\\n10101510\\n01010101\\n14141014\\n01012101\\n13101414\\n\",\"stdout\":\"E1F2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":190,\"y\":450}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01010101\\n10101514\\n01010101\\n10101510\\n01010101\\n14141014\\n31012101\\n10101414\\n\",\"stdout\":\"B8A7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":90}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01010101\\n14141014\\n31012101\\n10101414\\n\",\"stdout\":\"F2E1\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":5,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":330}},{\"id\":21,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n10101510\\n01310101\\n10141014\\n01012101\\n10101414\\n\",\"stdout\":\"A7C5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":22,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":250,\"y\":270}},{\"id\":5,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n14101510\\n01010101\\n10101014\\n01012101\\n10101414\\n\",\"stdout\":\"D6B4\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":510}},{\"id\":7,\"changes\":{\"value\":\"king_red\"}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n14101510\\n01010101\\n10101014\\n01010101\\n10131414\\n\",\"stdout\":\"E7D8\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":23,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":450}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101014\\n01010101\\n14101510\\n01010101\\n10101014\\n01014101\\n10131014\\n\",\"stdout\":\"F8E7\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":490,\"y\":390}},{\"id\":23,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101014\\n01010101\\n14101510\\n01010101\\n10101314\\n01010101\\n10101014\\n\",\"stdout\":\"D8F6\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":16,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":90}},{\"id\":16,\"changes\":{\"value\":\"king_white\"}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015151\\n10101010\\n01010101\\n14101510\\n01010101\\n10101314\\n01010101\\n10101014\\n\",\"stdout\":\"H2G1\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":330}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015151\\n10101010\\n01010101\\n14101510\\n01010131\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"F6G5\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":16,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":610,\"y\":150}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015101\\n10101015\\n01010101\\n14101510\\n01010131\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"G1H2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":430,\"y\":210}},{\"id\":13,\"changes\":{\"visible\":false}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015101\\n10101015\\n01013101\\n14101010\\n01010101\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"G5E3\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":16,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":550,\"y\":90}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01015151\\n10101010\\n01013101\\n14101010\\n01010101\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"H2G1\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":7,\"changes\":{\"start\":0.0,\"end\":0.39,\"x\":370,\"y\":150}}],\"currentPlayer\":1,\"nextPlayer\":2,\"stdin\":\"01015151\\n10131010\\n01010101\\n14101010\\n01010101\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"E3D2\"},{\"timescale\":1.0,\"turnChanges\":[{\"id\":15,\"changes\":{\"action\":\"jump\",\"start\":0.0,\"end\":0.39,\"x\":310,\"y\":210}},{\"id\":7,\"changes\":{\"visible\":false}}],\"currentPlayer\":2,\"nextPlayer\":1,\"stdin\":\"01010151\\n10101010\\n01510101\\n14101010\\n01010101\\n10101014\\n01010101\\n10101014\\n\",\"stdout\":\"E1C3\"}]";
//turns = JSON.parse(turns);
//putMatch(gameInit, turns);
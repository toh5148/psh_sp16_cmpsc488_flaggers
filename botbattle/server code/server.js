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
var base = 'http://localhost:13558';
//Tom's base
//var base = 'http://localhost:50363';

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
	    /*if(err){
	        console.log(err);
	    } else {
	        console.log('Connection established.');
	    }*/
	});
}

// ****************************************************


//          QUERY FUNCTIONS


// ****************************************************

/********************************************************************


   START PLAYBACK FUNCTIONS


********************************************************************/

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
            //console.log(err);
        } else if (rows[0] == undefined) {  // Match does not exists
			retval = 'null';
			//console.log('ERROR: Match with id:' + matchID + ' not found.');
        } else {
            var match = rows[0];           
            var ready = match.ready_for_playback.toString('hex');  
			
            if (ready == false) {           // Match is not ready for playback
                retval = 'pending';
                //console.log('ERROR: Match with id:' + matchID + ' is not ready for playback.');
            } else {
                var winnerSTR = match.winner;
				var winnerOBJ = '{"winner": "' + winnerSTR + '"}';  // Convert the string to a JSON object
                var init_message = match.game_initialization_message;
                var turns = match.turns;

                retval = JSON.parse('[' + winnerOBJ + ',' + init_message + ',' + turns + ']');
                //console.log('Data for match with id:' + matchID + ' sent to the client.');
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
            //console.log(err);
        } else if (rows[0] == undefined) {  // Match does not exists           
            retval = 'null';	
            //console.log('ERROR: Test instance with user_id:' + userID + ' and challenge_id:' + challengeID + ' not found.');
        } else {       	
            var match = rows[0];		      
            var status = match.last_turn_status.toUpperCase();
            
            if (status == 'PENDING') {          // Turn is not ready to be displayed
                retval = 'pending';
                //console.log('ERROR: Test instance with user_id: ' + userID + ' and challenge_id:' + challengeID +
                //    ' is not ready to be displayed.');               
            } else if (status == 'DISPLAYED') { // Turn has already been displayed
                retval = 'displayed';
                //console.log('ERROR: Test instance with user_id: ' + userID + ' and challenge_id:' + challengeID +
                //    ' has already been displayed.');
            } else {
                var turns = match.turns;
                var init_message = match.game_initialization_message;

                retval = JSON.parse('[' + init_message + ',' + turns + ']');
                //console.log('Data for match with user_id:' + userID + ' and challenge_id:' + challengeID + ' sent to the client.');

                // Change the last_turn_status to DISPLAYED
                // Column names: uid, challenge_id, last_turn_status, game_initialization_message, turns
                db.query('UPDATE test_arena_matches SET last_turn_status = "DISPLAYED" WHERE uid = ' + userID
                    + ' AND challenge_id = ' + challengeID, function (err, rows) {
                        /*if (err) {
                            console.log(err);
                        } else {
                            console.log('Set match with user_id:' + userID + ' and challenge_id:' + challengeID + ' to DISPLAYED in test_arena_matches.');
                        }*/
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
            //console.log(err);
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
                        //console.log(err);
                    } else {
                        retval = 'true';
                        //console.log('Row inserted into the pending_test_arena_turns table.');
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
                        //console.log(err);
                    } else {
                        retval = 'true';
                        //console.log('Row updated in pending_test_arena_turns table.');
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
            //console.log(err);
        } else if (rows[0] == undefined) {  // No languages in table
			retVal = 'null';
			//console.log('ERROR: No languages found');
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
			//console.log('Returned language list.');
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
                //console.log(err);
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
                //console.log('Sent compiler error messages for challenge_id:' + challengeID + ' and user_id:' + userID);
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
            //console.log(err);
        } else if (rows[0] == undefined) {  // No templates found
			retVal = 'null';
			//console.log('ERROR: No templates found for challenge_id:' + cid + '.');
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
			//console.log('Returned test arena templates list.');
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
        console.log(rows);
        if (err) {                          // Error with the database
            retval = 'error';
            //console.log(err);
        } else if (rows[0] == undefined) {  // User bot does not exist
            retval = 'null';
            //console.log('ERROR: The bot with bot_id:' + botID + ' does not exist.');
        } else {
            retval = rows[0].default_version.toString();
            //console.log('Sent default_version:' + retval + ' to the client for bot_id:' + botID + '.');
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
            //console.log(err);
        } else {
            if (rows[0] == undefined) { // Code for this challenge does not exist in the db, insert new row
                var time = Date.now();
                var codeToUpload = { uid: userID, challenge_id: challengeID, language_id: languageID, needs_compiled: time, source_code: botSourceCode, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };

                // Column names: uid, challenge_id, language_id, needs_compiled, errors, warnings, error_messages, warning_messages, source_code
                db.query('INSERT INTO test_arena_bots SET ?', codeToUpload, function (err, rows) {
                    if (err) {          // Error with the database
                        retval = 'error';
                        //console.log(err);
                    } else {
                        retval = 'true';
                        //console.log('Row inserted into test_arena_bots.');
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
                        //console.log(err);
                    } else {
                        retval = 'true';
                        //console.log('Row updated in test_arena_bots.');
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
            //console.log(err);
        } else {
            var botID = rows.insertId;  // Get the bot_id of the newly inserted row            
            var botVersionToInsert = { bot_id: botID, version: 1, language_id: languageID, comments: 'none', source_code: sourceCode };

            // Column names: bot_id, version, creation_date, language_id, comments, errors, warnings, error_messages, warning_messages, source_code
            db.query('INSERT INTO user_bots_versions SET ?', botVersionToInsert, function (err, rows) {
                if (err) {              // Error with the database                    
                    retval = 'error';
                    //console.log(err);
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

openConnection();
// Start the server
http.createServer(app).listen(port, function() {
	//console.log('Server listening on port ' + port + '.');
});
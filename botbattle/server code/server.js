// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var colors = require('colors'); // for colors in the console
var app = express();
var port = 5050;
var db; // connection variable
var base = 'http://localhost:13558';

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
	        console.log(colors.red(err));
	    } else {
	        console.log(colors.green('Connection established.'));
	    }
	});
}

// Closes the connection to the database
function closeConnection() {
	db.end(function(err) {
	    if (err){
	        console.log(colors.red(err));
	    } else {
	        console.log(colors.green('Connection terminated.'));
	    }
	});
}

// ****************************************************


//          QUERY FUNCTIONS


// ****************************************************

function getMatch(matchID, callback) {
    var retval;

    // column names: match_id, winner, game_initialization_message, turns, ready_for_playback
    db.query('SELECT * FROM matches WHERE match_id = ?', matchID, function (err, rows) {
        if (err) { // error with the database
            retval = 'false';
            console.log(colors.red(err));
        } else if (rows[0] == undefined) {  // Match does not exists
			retval = 'null';
			console.log(colors.red('ERROR: Match with id:' + matchID + ' not found.'));
        } else {                            // Match exist
            var match = rows[0];           
            var ready = match.ready_for_playback.toString('hex');  
			
            if (ready == false) {           // match is not ready for playback
                retval = '-1';
                console.log(colors.yellow('ERROR: Match with id:' + matchID + ' is not ready for playback.'));
            } else {
                var winnerSTR = match.winner;
				var winnerOBJ = '{"winner": "' + winnerSTR + '"}'; // convert the string to a JSON object
                var init_message = match.game_initialization_message;
                var turns = match.turns;

                retval = JSON.parse('[' + winnerOBJ + ',' + init_message + ',' + turns + ']');
                console.log('Data for match with id:' + matchID + ' sent to the client.');
            }
        }
        callback(retval); // send the result
    });
}

function getTestMatchTurn(userID, challengeID, callback){
    var retval;

	// column names: uid, challenge_id, game_initialization_message, turns, last_turn_status
	db.query('SELECT game_initialization_message, turns, last_turn_status FROM test_arena_matches ' + 
	'WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {			
            retval = 'false';
            console.log(colors.red(err));
        } else if (rows[0] == undefined) {  // Match does not exists           
            retval = 'null';	
            console.log(colors.red('ERROR: Test instance with user_id:' + userID + ' and challenge_id:' + challengeID + ' not found.'));
        } else {                            // Match exist       	
            var match = rows[0];		      
            var status = match.last_turn_status;
            
            if (status == 'PENDING') {       // turn is not ready to be displayed
                retval = '-1';
                console.log(colors.yellow('ERROR: Test instance with user_id: ' + userID + ' and challenge_id:' + challengeID +
                    ' is not ready to be displayed.'));               
            } else {
                var turns = match.turns;
                var init_message = match.game_initialization_message;

                retval = JSON.parse('[' + init_message + ',' + turns + ']');
                console.log('Data for match with user_id:' + userID + ' and challenge_id:' + challengeID + ' sent to the client.');

                // Change the last_turn_status to DISPLAYED
                if (status == 'READY') {
                    db.query('UPDATE test_arena_matches SET last_turn_status = "DISPLAYED" WHERE uid = ' + userID
                        + ' AND challenge_id = ' + challengeID, function (err, rows) {
                            if (err) {
                                console.log(colors.red(err));
                            } else {
                                console.log('Set match with user_id:' + userID + ' and challenge_id:' + challengeID + ' to DISPLAYED in test_arena_matches.');
                            }
                        });
                }
            }		
        }         
        callback(retval); // send the result        
    }); 
}

function uploadTurnRequest(userID, challengeID, botType, languageID, botID, botVersion, playerNum, lastTurnIndex, callback) {
    var retval;
    var turnToUpload = { uid: userID, challenge_id: challengeID, bot_type: botType, language_id: languageID,
        bot_id: botID, bot_version: botVersion, player: playerNum, last_turn_index: lastTurnIndex };

    // columns: uid, challenge_id, bot_type, language_id, bot_id, bot_version, player, last_turn_index
    db.query('INSERT INTO pending_test_arena_turns SET ?', turnToUpload, function (err, rows) {
        if (err) {
            retval = 'false';
            console.log(colors.red(err));
        } else {
            retval = 'true';
            console.log('Row inserted into the pending_test_arena_turns table.');
        }
        callback(retval);
    });
}

function getLanguages(callback) {
    var retVal;
    // column names: language_id, name
    db.query('SELECT * FROM languages', function (err, rows) {
        if (err) { // error with the database
            retVal = 'false';
            console.log(colors.red(err));
        } else if (rows[0] == undefined) {  // No languages in table
			retVal = 'null';
			console.log(colors.red('ERROR: No languages found'));
        } else {                            // Language(s) exist
			var rowsLeft = true;
			var i = 0;
			retVal = '[';
			while(rowsLeft)
			{
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
			console.log('Returned language list.');
        }
        callback(retVal); // send the result
    });
}

function getTemplates(cid, callback) {
    var retVal;
    // column names: challenge_id, language_id, source_code
    db.query('SELECT language_id, source_code FROM test_arena_template_bots WHERE challenge_id = ' + cid, function (err, rows) {
        if (err) { // error with the database
            retVal = 'false';
            console.log(colors.red(err));
        } else if (rows[0] == undefined) {  // No templates with cid
			retVal = 'null';
			console.log(colors.red('ERROR: No templates found for challenge_id:' + cid + '.'));
        } else {                            // Template(s) exist
			var rowsLeft = true;
			var i = 0;
			retVal = '[';
			while(rowsLeft)
			{
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
			console.log('Returned test arena templates list.');
        }
        callback(retVal); // send the result
    });
}


function uploadCode(botText, userID, challengeID, languageID, needs_compiled, callback){	
    var retval;

	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
    db.query('SELECT uid FROM test_arena_bots WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {
            retval = 'false';
            console.log(colors.red(err));
        } else {
            if (rows[0] == undefined) { // Code for this challenge does not exist in the db, insert new row
                var codeToUpload = { uid: userID, challenge_id: challengeID, language_id: languageID, source_code: botText, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };
                db.query('INSERT INTO test_arena_bots SET ?', codeToUpload, function (err, rows) {
                    if (err) {
                        retval = 'false';
                        console.log(colors.red(err));
                    } else {
                        retval = 'true';
                        console.log('Row inserted into test_arena_bots.');
                    }
                    callback(retval); // send the result
                });
            }
            else {                      // Code for this challenge exists in the db, update the row
                var codeToUpdate = { language_id: languageID, source_code: botText, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };

                db.query('UPDATE test_arena_bots SET ?', codeToUpdate, function (err, rows) {
                    if (err) {
                        retval = 'false';
                        console.log(colors.red(err));
                    } else {
                        retval = 'true';
                        console.log('Row updated in test_arena_bots.');
                    }
                    callback(retval); // send the result
                });
            }
        }
    });
}

// function uploadmatch(init, turn) {
	// var uploadValue = {match_id:123, winner: 'tom', game_initialization_message: init, turns: turn, ready_for_playback: 1};
	// db.query('INSERT INTO matches SET ?', uploadValue, function (err, rows) {
        // if (err) { // error with the database
            // console.log(colors.red(err));
        // } else {                            // Template(s) exist
			// console.log(colors.green('Inserted!'));
        // }
    // });
// }

// ****************************************************


//          END QUERY FUNCTIONS


// ****************************************************

// ****************************************************


//          CORS REQUESTS


// ****************************************************

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
	var needs_compiled = req.query.needs_compiled;

	uploadCode(source_code, user_id, challenge_id, language_id, needs_compiled, function (data) {
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

// ****************************************************


//          END CORS REQUESTS


// ****************************************************

openConnection();
// Start the server
http.createServer(app).listen(port, function() {
	console.log(colors.cyan('Server listening on port ' + port + '.'));
});
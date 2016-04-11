// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var cookieParser = require('cookie-parser');
var colors = require('colors'); // for colors in the console
var app = express();
var port = 5050;
var numAttempts = 0; // number of ties we tried to connect to the db and failed
var db; // connection variable
var base = 'http://localhost:50363';

app.use(cookieParser());
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
			console.log(colors.green('Returned language list'));
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
			console.log(colors.red('WARNING: No templates found'));
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
			console.log(colors.green('Returned test arena bot templates list'));
        }
        callback(retVal); // send the result
    });
}


function uploadCode(botText, userID, challengeID, languageID, needs_compiled, callback){	
    var retval;

	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
    db.query('SELECT uid FROM test_arena_bots WHERE uid = ' + userID + ' AND challenge_id = ' + challengeID, function (err, rows) {
        if (err) {
            retval = false;
            console.log(colors.red(err));
        } else {
            if (rows[0] == undefined) { // Code for this challenge does not exist in the db, insert new row
                var codeToUpload = { uid: userID, challenge_id: challengeID, language_id: languageID, source_code: botText, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };
                db.query('INSERT INTO test_arena_bots SET ?', codeToUpload, function (err, rows) {
                    if (err) {
                        retval = false;
                        console.log(colors.red(err));
                    } else {
                        retval = true;
                        console.log('Row inserted into test_arena_bots.');
                    }
                    callback(retval); // send the result
                });
            }
            else {                      // Code for this challenge exists in the db, update the row
                var codeToUpdate = { language_id: languageID, source_code: botText, errors: 0, error_messages: 'none', warnings: 0, warning_messages: 'none' };

                db.query('UPDATE test_arena_bots SET ?', codeToUpdate, function (err, rows) {
                    if (err) {
                        retval = false;
                        console.log(colors.red(err));
                    } else {
                        retval = true;
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

// localhost:5050/uploadCode?cid=101&lid=1&needs_compiled=1
app.post('/uploadCode', function(req, res, next){
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

//Putting this code here since Josh sent it to me on 4/10...
//Going to try to insert it into the database ASAP

// var gameInit = '{"background":"games/checkers/CheckerBoard.png","defaultTimestep":1.0,"mapId":1,"entity":[{"id":1,"type":"object","visible":true,"initX":160,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":2,"type":"object","visible":true,"initX":160,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":3,"type":"object","visible":true,"initX":160,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":4,"type":"object","visible":true,"initX":160,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":5,"type":"object","visible":true,"initX":160,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":6,"type":"object","visible":true,"initX":160,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":7,"type":"object","visible":true,"initX":160,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":8,"type":"object","visible":true,"initX":160,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":9,"type":"object","visible":true,"initX":160,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":10,"type":"object","visible":true,"initX":160,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":11,"type":"object","visible":true,"initX":160,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":12,"type":"object","visible":true,"initX":160,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_red.png"}},{"id":13,"type":"object","visible":true,"initX":160,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":14,"type":"object","visible":true,"initX":160,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":15,"type":"object","visible":true,"initX":160,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":16,"type":"object","visible":true,"initX":160,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":17,"type":"object","visible":true,"initX":160,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":18,"type":"object","visible":true,"initX":160,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":19,"type":"object","visible":true,"initX":160,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":20,"type":"object","visible":true,"initX":160,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":21,"type":"object","visible":true,"initX":160,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":22,"type":"object","visible":true,"initX":160,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":23,"type":"object","visible":true,"initX":160,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}},{"id":24,"type":"object","visible":true,"initX":160,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"args":{"value":"games/checkers/basic_white.png"}}]}';

// var turnsDataCheckers = '[{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":160,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21212121\\n12121212\\n21212121\\n10101010\\n41010101\\n10141414\\n41414141\\n14141414\\n","stdout":"B6A5"},{"timescale":1.0,"turnChanges":[{"id":9,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21212121\\n12121212\\n01212121\\n12101010\\n41010101\\n10141414\\n41414141\\n14141414\\n","stdout":"A3B4"},{"timescale":1.0,"turnChanges":[{"id":15,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21212121\\n12121212\\n01212121\\n12101010\\n41014101\\n10141014\\n41414141\\n14141414\\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21212121\\n12121212\\n01210121\\n12101210\\n41014101\\n10141014\\n41414141\\n14141414\\n","stdout":"E3F4"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21212121\\n12121212\\n01210121\\n12101210\\n41014101\\n10141414\\n41414101\\n14141414\\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":6,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21212121\\n12101212\\n01212121\\n12101210\\n41014101\\n10141414\\n41414101\\n14141414\\n","stdout":"D2E3"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21212121\\n12101212\\n01212121\\n12101210\\n41014101\\n14141414\\n41014101\\n14141414\\n","stdout":"C7B6"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n12121212\\n01212121\\n12101210\\n41014101\\n14141414\\n41014101\\n14141414\\n","stdout":"E1D2"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n12121212\\n01212121\\n12101210\\n41014101\\n14141414\\n41414101\\n10141414\\n","stdout":"B8C7"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":160,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10121212\\n21212121\\n12101210\\n41014101\\n14141414\\n41414101\\n10141414\\n","stdout":"B2A3"},{"timescale":1.0,"turnChanges":[{"id":23,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10121212\\n21212121\\n12101210\\n41014101\\n14141414\\n41414141\\n10141014\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":6,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10121212\\n21210121\\n12121210\\n41014101\\n14141414\\n41414141\\n10141014\\n","stdout":"E3D4"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10121212\\n21210121\\n12121210\\n41414101\\n14101414\\n41414141\\n10141014\\n","stdout":"D6C5"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":15,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10121212\\n21210121\\n12121010\\n41410101\\n14121414\\n41414141\\n10141014\\n","stdout":"F4D6"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":6,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10121212\\n21214121\\n12101010\\n41010101\\n14121414\\n41414141\\n10141014\\n","stdout":"C5E3"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":21,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}},{"id":11,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_red.png"}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10121212\\n21214121\\n12101010\\n41010101\\n14101414\\n41014141\\n13141014\\n","stdout":"D6B8"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10121212\\n21214121\\n12101010\\n41410101\\n10101414\\n41014141\\n13141014\\n","stdout":"B6C5"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10101212\\n21214121\\n12101210\\n41410101\\n10101414\\n41014141\\n13141014\\n","stdout":"D2F4"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10101212\\n21214121\\n12101210\\n41410101\\n10141414\\n41010141\\n13141014\\n","stdout":"E7D6"},{"timescale":1.0,"turnChanges":[{"id":7,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":14,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"21210121\\n10101012\\n21210121\\n12121210\\n41410101\\n10141414\\n41010141\\n13141014\\n","stdout":"F2D4"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":7,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"21210121\\n10101012\\n21214121\\n12101210\\n41010101\\n10141414\\n41010141\\n13141014\\n","stdout":"C5E3"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210121\\n12101012\\n21214121\\n12101210\\n41010101\\n10141414\\n41010141\\n13141014\\n","stdout":"A1B2"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210121\\n12101012\\n21214121\\n12101210\\n41010141\\n10141410\\n41010141\\n13141014\\n","stdout":"H6G5"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210121\\n12101012\\n21214121\\n12101010\\n41010141\\n10141412\\n41010141\\n13141014\\n","stdout":"F4H6"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210121\\n12101012\\n21214121\\n12101010\\n41014141\\n10101412\\n41010141\\n13141014\\n","stdout":"D6E5"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":23,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}},{"id":3,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_red.png"}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210121\\n12101012\\n21214121\\n12101010\\n41014141\\n10101410\\n41010101\\n13141314\\n","stdout":"H6F8"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210121\\n12101012\\n21214121\\n12101014\\n41014101\\n10101410\\n41010101\\n13141314\\n","stdout":"G5H4"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210121\\n12101012\\n21214101\\n12101214\\n41014101\\n10101410\\n41010101\\n13141314\\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":12,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210121\\n12101012\\n21214141\\n12101014\\n41010101\\n10101410\\n41010101\\n13141314\\n","stdout":"E5G3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":19,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210121\\n12101010\\n21214101\\n12101214\\n41010101\\n10101410\\n41010101\\n13141314\\n","stdout":"H2F4"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210121\\n12101410\\n21210101\\n12101214\\n41010101\\n10101410\\n41010101\\n13141314\\n","stdout":"E3F2"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":18,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n12101010\\n21212101\\n12101214\\n41010101\\n10101410\\n41010101\\n13141314\\n","stdout":"G1E3"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n12101010\\n21212101\\n12101214\\n41014101\\n10101010\\n41010101\\n13141314\\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":20,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n12101010\\n21212101\\n12101014\\n41010101\\n10121010\\n41010101\\n13141314\\n","stdout":"F4D6"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n12101010\\n21212141\\n12101010\\n41010101\\n10121010\\n41010101\\n13141314\\n","stdout":"H4G3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n12101010\\n21012141\\n12121010\\n41010101\\n10121010\\n41010101\\n13141314\\n","stdout":"C3D4"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":9,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n12101010\\n21412141\\n10121010\\n01010101\\n10121010\\n41010101\\n13141314\\n","stdout":"A5C3"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n12101010\\n21412141\\n10121010\\n01010101\\n10121010\\n41010131\\n13141014\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":160,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":1,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}},{"id":13,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_white.png"}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"51210101\\n10101010\\n21012141\\n10121010\\n01010101\\n10121010\\n41010131\\n13141014\\n","stdout":"C3A1"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"51210101\\n10101010\\n21012141\\n10101010\\n01012101\\n10121010\\n41010131\\n13141014\\n","stdout":"D4E5"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":3,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"51210101\\n10101010\\n21012141\\n10101010\\n01012101\\n10121410\\n41010101\\n13141010\\n","stdout":"H8F6"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"51210101\\n10101010\\n21012141\\n10101010\\n01010101\\n10121410\\n41010121\\n13141010\\n","stdout":"E5G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"51210101\\n10101410\\n21012101\\n10101010\\n01010101\\n10121410\\n41010121\\n13141010\\n","stdout":"G3F2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"51210101\\n10101410\\n21012101\\n10101010\\n01010101\\n10101410\\n41012121\\n13141010\\n","stdout":"D6E7"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"51210101\\n10101410\\n21012101\\n10101010\\n01010101\\n10101410\\n41412121\\n13101010\\n","stdout":"D8C7"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":22,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"51210101\\n10101410\\n21012101\\n10101010\\n01010101\\n10131410\\n41012121\\n10101010\\n","stdout":"B8D6"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n15101410\\n21012101\\n10101010\\n01010101\\n10131410\\n41012121\\n10101010\\n","stdout":"A1B2"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n15101410\\n21010101\\n10121010\\n01010101\\n10131410\\n41012121\\n10101010\\n","stdout":"E3D4"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n10101410\\n21510101\\n10121010\\n01010101\\n10131410\\n41012121\\n10101010\\n","stdout":"B2C3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":8,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_red.png"}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n10101410\\n21510101\\n10121010\\n01010101\\n10131410\\n41010121\\n10101310\\n","stdout":"E7F8"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":4,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210101\\n10101410\\n21010101\\n10101010\\n01015101\\n10131410\\n41010121\\n10101310\\n","stdout":"C3E5"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":13,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01210101\\n10101410\\n21010101\\n10101310\\n01010101\\n10101410\\n41010121\\n10101310\\n","stdout":"D6F4"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":16,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_white.png"}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01210151\\n10101010\\n21010101\\n10101310\\n01010101\\n10101410\\n41010121\\n10101310\\n","stdout":"F2G1"},{"timescale":1.0,"turnChanges":[{"id":2,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10121010\\n21010101\\n10101310\\n01010101\\n10101410\\n41010121\\n10101310\\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10121510\\n21010101\\n10101310\\n01010101\\n10101410\\n41010121\\n10101310\\n","stdout":"G1F2"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10121510\\n21010101\\n10101010\\n01013101\\n10101410\\n41010121\\n10101310\\n","stdout":"F4E5"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":11,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10121510\\n21010101\\n10141010\\n01010101\\n10101010\\n41010121\\n10101310\\n","stdout":"F6D4"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10121510\\n01010101\\n12141010\\n01010101\\n10101010\\n41010121\\n10101310\\n","stdout":"A3B4"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10121010\\n01010101\\n12141010\\n01010101\\n10101010\\n41010121\\n10101310\\n","stdout":"F2G1"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":160,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10121010\\n01010101\\n10141010\\n21010101\\n10101010\\n41010121\\n10101310\\n","stdout":"B4A5"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10121015\\n01010101\\n10141010\\n21010101\\n10101010\\n41010121\\n10101310\\n","stdout":"G1H2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":10,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_red.png"}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10121015\\n01010101\\n10141010\\n21010101\\n10101010\\n41010101\\n10101313\\n","stdout":"G7H8"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10121010\\n01010151\\n10141010\\n21010101\\n10101010\\n41010101\\n10101313\\n","stdout":"H2G3"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10121010\\n01010151\\n10141010\\n01010101\\n12101010\\n41010101\\n10101313\\n","stdout":"A5B6"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":5,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10121010\\n01010151\\n10141010\\n01410101\\n10101010\\n01010101\\n10101313\\n","stdout":"A7C5"},{"timescale":1.0,"turnChanges":[{"id":2,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101010\\n01012151\\n10141010\\n01410101\\n10101010\\n01010101\\n10101313\\n","stdout":"D2E3"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":2,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10101410\\n01010151\\n10101010\\n01410101\\n10101010\\n01010101\\n10101313\\n","stdout":"D4F2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101410\\n01010151\\n10101010\\n01410101\\n10101010\\n01013101\\n10101013\\n","stdout":"F8E7"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10101410\\n01010151\\n10141010\\n01010101\\n10101010\\n01013101\\n10101013\\n","stdout":"C5D4"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101410\\n01010151\\n10141010\\n01010101\\n10101310\\n01010101\\n10101013\\n","stdout":"E7F6"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":24,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_white.png"}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10101010\\n01010151\\n10141010\\n01010101\\n10101310\\n01010101\\n10101013\\n","stdout":"F2G1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10101010\\n01010151\\n10141010\\n01010101\\n10101010\\n01010131\\n10101013\\n","stdout":"F6G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10101015\\n01010101\\n10141010\\n01010101\\n10101010\\n01010131\\n10101013\\n","stdout":"G3H2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10101015\\n01010101\\n10141010\\n01010101\\n10101310\\n01010101\\n10101013\\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10101515\\n01010101\\n10141010\\n01010101\\n10101310\\n01010101\\n10101013\\n","stdout":"G1F2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101515\\n01010101\\n10141010\\n01010101\\n10101010\\n01013101\\n10101013\\n","stdout":"F6E7"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101015\\n01010101\\n10141010\\n01010101\\n10101010\\n01013101\\n10101013\\n","stdout":"F2E1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101015\\n01010101\\n10141010\\n01010101\\n10101010\\n01010101\\n10101313\\n","stdout":"E7F8"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101015\\n01410101\\n10101010\\n01010101\\n10101010\\n01010101\\n10101313\\n","stdout":"D4C3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101015\\n01410101\\n10101010\\n01010101\\n10101010\\n01010131\\n10101310\\n","stdout":"H8G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015151\\n10101010\\n01410101\\n10101010\\n01010101\\n10101010\\n01010131\\n10101310\\n","stdout":"H2G1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015151\\n10101010\\n01410101\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"F8E7"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015151\\n14101010\\n01010101\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"C3B2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015151\\n14101010\\n01010101\\n10101010\\n01010101\\n10101010\\n01013101\\n10101310\\n","stdout":"G7F8"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":17,"changes":{"action":"update","starttime":0.8,"endtime":1.0,"args":{"value":"CheckersGame/assets/king_white.png"}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515151\\n10101010\\n01010101\\n10101010\\n01010101\\n10101010\\n01013101\\n10101310\\n","stdout":"B2C1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515151\\n10101010\\n01010101\\n10101010\\n01010101\\n10101310\\n01010101\\n10101310\\n","stdout":"E7F6"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515101\\n10101015\\n01010101\\n10101010\\n01010101\\n10101310\\n01010101\\n10101310\\n","stdout":"G1H2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515101\\n10101015\\n01010101\\n10101010\\n01010101\\n10101310\\n01010131\\n10101010\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101310\\n01010131\\n10101010\\n","stdout":"H2G3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"F6E7"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":220,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n15101010\\n01010151\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"C1B2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n15101010\\n01010151\\n10101010\\n01010101\\n10101013\\n01013101\\n10101010\\n","stdout":"G7H6"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":280,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101013\\n01013101\\n10101010\\n","stdout":"B2C1"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"H6G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101010\\n01013131\\n10101010\\n","stdout":"G3F2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101310\\n01013101\\n10101010\\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101310\\n01013101\\n10101010\\n","stdout":"F2G3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01515101\\n10101010\\n01010151\\n10101010\\n01013101\\n10101010\\n01013101\\n10101010\\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01510101\\n10101510\\n01010151\\n10101010\\n01013101\\n10101010\\n01013101\\n10101010\\n","stdout":"E1F2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01510101\\n10101510\\n01010151\\n10101010\\n01013101\\n10101010\\n01010101\\n10131010\\n","stdout":"E7D8"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10151510\\n01010151\\n10101010\\n01013101\\n10101010\\n01010101\\n10131010\\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10151510\\n01010151\\n10101310\\n01010101\\n10101010\\n01010101\\n10131010\\n","stdout":"E5F4"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":10,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10151510\\n01010101\\n10101010\\n01015101\\n10101010\\n01010101\\n10131010\\n","stdout":"G3E5"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10151510\\n01010101\\n10101010\\n01015101\\n10101010\\n01013101\\n10101010\\n","stdout":"D8E7"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10151010\\n01010101\\n10101010\\n01015101\\n10101010\\n01013101\\n10101010\\n","stdout":"F2G1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10151010\\n01010101\\n10101010\\n01015101\\n10101010\\n01010101\\n10101310\\n","stdout":"E7F8"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":180,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10101010\\n01015101\\n10101010\\n01015101\\n10101010\\n01010101\\n10101310\\n","stdout":"D2E3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10101010\\n01015101\\n10101010\\n01015101\\n10101010\\n01010131\\n10101010\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":240,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010151\\n10101010\\n01015101\\n10101510\\n01010101\\n10101010\\n01010131\\n10101010\\n","stdout":"E5F4"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010151\\n10101010\\n01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101310\\n","stdout":"G7F8"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10101510\\n01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101310\\n","stdout":"G1F2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101510\\n01015101\\n10101510\\n01010101\\n10101010\\n01010131\\n10101010\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":300,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10101510\\n01015101\\n10101010\\n01010151\\n10101010\\n01010131\\n10101010\\n","stdout":"F4G5"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10101510\\n01015101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101310\\n","stdout":"G7F8"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":120,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01010101\\n10151510\\n01010101\\n10101010\\n01010151\\n10101010\\n01010101\\n10101310\\n","stdout":"E3D2"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01010101\\n10151510\\n01010101\\n10101010\\n01010151\\n10101010\\n01013101\\n10101010\\n","stdout":"F8E7"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":60,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010151\\n10101010\\n01013101\\n10101010\\n","stdout":"D2E1"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":340,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010151\\n10101010\\n01010101\\n10131010\\n","stdout":"E7D8"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101015\\n01010101\\n10131010\\n","stdout":"G5H6"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":400,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101015\\n01013101\\n10101010\\n","stdout":"D8E7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101010\\n01013151\\n10101010\\n","stdout":"H6G7"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101010\\n01010151\\n10101310\\n","stdout":"E7F8"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":580,"y":480,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101010\\n01010101\\n10101315\\n","stdout":"G7H8"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":520,"y":420,"width":60,"height":60,"rotation":0.0,"flipped":false}}}],"currentPlayer":0,"nextPlayer":1,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101010\\n01010131\\n10101015\\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"move","starttime":0.0,"endtime":0.39,"args":{"x":460,"y":360,"width":60,"height":60,"rotation":0.0,"flipped":false}}},{"id":8,"changes":{"action":"hide","starttime":0.4,"endtime":0.79,"args":{}}}],"currentPlayer":1,"nextPlayer":0,"stdin":"01015101\\n10101510\\n01010101\\n10101010\\n01010101\\n10101510\\n01010101\\n10101010\\n","stdout":"H8F6"}]';

// uploadmatch(gameInit, turnsDataCheckers);
// console.log("finished uploading?");
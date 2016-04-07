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
var base = 'http://localhost:13558';

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
                console.log('Data for match with user_id:' + userID + ' and challange_id:' + challengeID + ' sent to the client.');

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

// ****************************************************


//          END CORS REQUESTS


// ****************************************************

openConnection();
// Start the server
http.createServer(app).listen(port, function() {
	console.log(colors.cyan('Server listening on port ' + port + '.'));
});

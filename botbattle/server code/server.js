// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var cookieParser = require('cookie-parser');
var app = express();
var port = 5050;
var numAttempts = 0; // number of ties we tried to connect to the db and failed
var db; // connection variable
var base = 'http://localhost:13558';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Location of file: C:\Users\kaido_000\Documents\GitHub\psh_sp16_cmpsc488_flaggers\botbattle\server code

/*i = JSON.stringify(i);
t = JSON.stringify(t);
//var win = 'player 1';
openConnection();
var game_instance1 = { uid: 12345, challenge_id: 101, game_initialization_message: i, turns: t, last_turn_status: 'READY' };
db.query('INSERT INTO test_arena_matches SET ?', game_instance1, function(err,res){
  if(err) throw err;

  console.log('row inserted');
  closeConnection();
});*/

// Opens the connection to the database, throws an error if connection failed.
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
		console.log('ERROR: Error connecting to the ' + credentials.database + ' database.');
		throw err;
	  } else {
		console.log('       Connection established');
	  }
	});	
}

// Closes the connection to the database, throws error if closing the connection failed
function closeConnection() {
	db.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	  if (err){
		console.log('ERROR: Error terminating the connection.')
		throw err;
	  } else {
		console.log('       Connection terminated.');
	  }
	});
}

function getMatch(id, callback) {
    var retval;
    // column names: match_id, winner, game_initialization_message, turns, ready_for_playback
	db.query('SELECT * FROM matches WHERE match_id = ?', id, function (err, rows) {
        if (err) { // error with the database
            retval = 'false';
			console.log('ERROR: Error with the DB.');
        } else if (rows[0] == undefined) { // Match does not exists
			retval = 'null';
            console.log('ERROR: Match with id:' + id + ' not found.');
        } else { // Match exist
            var match = rows[0];           
            var ready = match.ready_for_playback.toString('hex');  
			
            if (ready == false) { // match is not ready for playback
				retval = '-1';    
            } else {
                var winnerSTR = match.winner;
				var winnerOBJ = '{"winner": "' + winnerSTR + '"}';
                var init_message = match.game_initialization_message;
                var turns = match.turns;
                retval = JSON.parse('[' + winnerOBJ + ',' + init_message + ',' + turns + ']');
            }
        }
        callback(retval); // send the result
    });
}

function getTestMatchTurn(uid, cid, callback){
    var retval;
	// column names: uid, challenge_id, game_initialization_message, turns, last_turn_status
	db.query('SELECT game_initialization_message, turns, last_turn_status FROM test_arena_matches ' + 
	'WHERE uid = ' + uid + ' AND challenge_id = ' + cid + ' AND last_turn_status = "READY"', function (err, rows) {
        if (err) {			
            retval = 'false';
			console.log('ERROR: Error with the DB.');
        } else if (rows[0] == undefined) { // Match does not exists           
            retval = 'null';	
			console.log('ERROR: Test instance with id:' + id + ' not found.');			
        } else { // Match exist       	
            var match = rows[0];		      
            var ready = match.last_turn_status;
            
            if (ready == 'READY'){
                var turns = match.turns;
                var init_message = match.game_initialization_message;
                retval = JSON.parse('[' + init_message + ',' + turns + ']');

                // Change the last_turn_status to DISPLAYED
                /*db.query('UPDATE test_arena_matches SET last_turn_status = "DISPLAYED" WHERE uid = ' + uid + '
                    + 'AND challenge_id = ' + cid, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log('       Set match with uid:' + uid + '  cid:' + cid + '  to DISPLAYED.');
                    });*/
            } else  {   // turn is not ready to be displayed
                retval = '-1';		            
            }		
        }         
        callback(retval); // send the result        
    }); 
}


function uploadCode(botText, cid, lid, needs_compiled, callback){
	
	var retval;
	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
	openConnection();
	// create data to store in db
	var bot = { uid: 12345 , challenge_id: 101, language_id: 1, source_code: botText, errors: 0, error_messages: 'a', warnings: 0, warning_messages: 'b' };
	
	db.query('INSERT INTO test_arena_bots SET ?', bot, function(err,res){
		if(err) throw err;

		console.log('row inserted');
		closeConnection();
	});
}


// THE FOLLOWING URLS WILL PROBABLY CHANGE ALONG
// WITH THE PARAMETERS

// localhost:5050/get_match?id=12345
app.get('/get_match', function(req, res, next){
	var id = req.query.id;
	var msg = getMatch(id, function(data){
		if (data == '-1')
			console.log('ERROR: Playback match with match_id: ' + id + ' is not ready for playback.');
		else
			console.log('       Playback match sent for match_id: ' + id);
		res.header('Access-Control-Allow-Origin', base);
		//res.header('Access-Control-Allow-Credentials', true);
		res.send(data);
	});
});

// localhost:5050/get_test_turn?cid=101
app.get('/get_test_turn', function(req, res, next){
	// TODO: get uid
    var cid = req.query.cid;
    //var uid = req.session.user;
    var uid = 12345;
    //console.log(uid);
	var msg = getTestMatchTurn(uid, cid, function (data) {
		if (data == '-1')
			console.log('ERROR: Test arena turn sent for uid: ' + uid + '    cid: ' + cid);
		else
			console.log('       Test arena turn sent for uid: ' + uid + '    cid: ' + cid);
		res.header('Access-Control-Allow-Origin', base);
		//res.header('Access-Control-Allow-Credentials', true);
		res.send(data); 
	});
});

// localhost:5050/uploadCode?cid=1&lid=121&needs_compiled=1
app.post('/uploadCode', function(req, res){
	var text = req.body.selectedCode;
	//var uid = req.session.user;
	var uid = 12345;
	var cid = req.query.cid;
	var lid = req.query.lid;
	var needs_compiled = req.query.needs_compiled;
	var msg = uploadCode(text, uid, cid, lid, needs_compiled, function (data) {
	        console.log('server sent: ' + data);
	        res.header('Access-Control-Allow-Origin', base);
	        res.send(data);
    });
});


openConnection();
//getTestMatchTurn(12345, 101, function (x) { });
// Start the server
http.createServer(app).listen(port, function() {
	console.log('Server listening on port ' + port);
});

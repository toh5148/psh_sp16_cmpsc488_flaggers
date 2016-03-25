// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var app = express();
var port = 5050;
var con; // connection variable

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Location of file: C:\Users\kaido_000\Documents\GitHub\psh_sp16_cmpsc488_flaggers\botbattle\server code
// Insert a row into the table
/*var str = '[ { \'command\':\'test testing_arena instance, please delete later\' } ]';
var game_instance = { challenge_id: 101, user_id: 1, command: str};
con.query('INSERT INTO testarena_turns SET ?', game_instance, function(err,res){
  if(err) throw err;

  console.log('row inserted');
});*/

/* 
	This function queries the database for a specific match id
	Arguments:
		id - Match id
		
	When query finishes, call the 'callback' function giving it the result
*/
function getMatch(id, callback){
	var retval;
	// column names: id, command, winner_id
	con.query('SELECT command FROM match_turns WHERE id = ?', id, function(err, rows){
		if(err) {
			retval = false;
		} else if (rows[0] != undefined){ // Match exists				
			//console.log(rows[0].command);
			
			// Will there be more than 1 command for each id?
			retval = rows[0].command;			
		} else{ // Match does not exist
			console.log('ERROR: Match with id:' + id + ' not found.');
			retval = null;
		}
		callback(retval);
	});
}

/* 
	This function queries the database for a specific test instance id
	Arguments:
		id - Test Instance id
		
	When query finishes, call the 'callback' function giving it the result
*/
function getTestInstance(id, callback){
	var retval;
	// column names: challenge_id, user_id, command
	con.query('SELECT command FROM testarena_turns WHERE challenge_id = ?', id, function(err, rows){
		if(err) {
			retval = false;
		}		
		else if (rows[0] != undefined) { // Match exists			
			//console.log(rows[0].command);	
			
			// Will there be more than 1 command for each id?
			retval = rows[0].command;			
		} else{ // Match does not exist
			console.log('ERROR: Test instance with id:' + id + ' not found.')
			retval = null;
		}
		callback(retval);
	});
}

// THE FOLLOWING URLS WILL PROBABLY CHANGE ALONG
// WITH THE PARAMETERS

// localhost:5050/get_match?id=105
app.get('/get_match', function(req, res, next){
	var id = req.query.id;
	var msg = getMatch(id, function(data){
		console.log('server sent: ' + data);
		res.send(data);
	});
});

// localhost:5050/get_test_instance?uid=105&cid=101
app.get('/get_test_instance', function(req, res, next){
	var user_id = req.query.uid;
	var challenge_id = req.query.cid;
	var msg = getTestInstance(user_id, function(data){
		console.log('server sent: ' + data);
		res.send(msg);
	});
});

// localhost:5050/open_database_connection
app.get('/open_database_connection', function(req, res, next){
	// Create a connection variable
	con = mysql.createConnection(
	{
	  host: credentials.host,
	  user: credentials.user,
	  password: credentials.password,
	  database: credentials.database
	});
	con.connect(function(err){
	  if(err){
		console.log('Error connecting to bbweb database');
		res.send(false);
	  } else {
		console.log('Connection established');
		res.send(true);
	  }
	});	
});

// localhost:5050/close_database_connection
app.get('/close_database_connection', function(req, res, next){
	con.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	  if (err){
		console.log('Error terminating the connection.')
		res.send(false);
	  } else {
		console.log('Connection terminated.');
		res.send(true);
	  }
	});
});

// Redirect to the testingarena webpage
app.get('/testarena', function(req, res, next) {
	res.redirect('..\botbattle\testingarena.html');
});

// Redirect to the playback webpage
app.get('/playback', function(req, res, next) {
	res.redirect('..\botbattle\playback.html');
});

// Start the server
http.createServer(app).listen(port, function() {
	console.log('Server listening on port ' + port);
});
// Import statements
var mysql = require("mysql");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var port = 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Create a connection variable
var con = mysql.createConnection(
{
  host: "hbgwebfe.hbg.psu.edu",
  user: "bbweb",
  password: "sun16event",
  database: "bbweb"
});

// Try and connect to the database
function openConnectionToDatabase() {
	con.connect(function(err){
	  if(err){
		console.log('Error connecting to bbweb database');
		return;
	  }
	  console.log('Connection established');
	});
}

// Close the connection to the database
function closeConnectionToDatabase(){
	con.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	  console.log("Connection terminated.");
	});
}

// Insert a row into the table
/*var str = "[ { \"command\":\"test testing_arena instance, please delete later\" } ]";
var game_instance = { challenge_id: 101, user_id: 1, command: str};
con.query('INSERT INTO testarena_turns SET ?', game_instance, function(err,res){
  if(err) throw err;

  console.log('row inserted');
});*/

/* 
	This function queries the database for a specific match id
	Arguments:
		id - Match id
		
	Returns:
		JSON Object - String representation of a JSON object that contains the initialization message and turns for a match
		false - There was an error querying the database.
		null - Match does not exist.
*/
function getMatch(id){
		openConnectionToDatabase();
	// column names: id, command, winner_id
	con.query('SELECT command FROM match_turns WHERE id = ?', id, function(err, rows){
		if(err) {
			throw err;
			return false;
		} else if (rows[0] != undefined){ // Match exists				
			console.log(rows[0].command);
			
			// Will there be more than 1 command for each id?
			return rows[0].command;			
		}
		else{ // Match does not exist
			console.log("ERROR: Match with id:" + id + " not found.")
			return null;
		}	
	});
	closeConnectionToDatabase();
}

/* 
	This function queries the database for a specific test instance id
	Arguments:
		id - Test Instance id
		
	Returns:
		JSON Object - String representation of a JSON object that contains the next turn for the test instance.
		false - There was an error querying the database.
		null - Match does not exist.
*/
function getTestInstance(id){
	// column names: challenge_id, user_id, command
	con.query('SELECT command FROM testarena_turns WHERE challenge_id = ?', id, function(err, rows){
		if(err) {
			throw err;
			return false;
		}		
		else if (rows[0] != undefined) { // Match exists			
			console.log(rows[0].command);	
			
			// Will there be more than 1 command for each id?
			return rows[0].command;			
		} else{ // Match does not exist
			console.log("ERROR: Test instance with id:" + id + " not found.")
			return null;
		}	
	});
}

// THE FOLLOWING URLS WILL PROBABLY CHANGE ALONG
// WITH THE PARAMETERS
app.get("/get_match", function(req, res){
	var id = req.param('id');
	var msg = getMatch(id);
	
	console.log("server sent: " + msg);
	res.send(msg);
});

app.get("/get_test_instance", function(req, res){
	var user_id = req.param('uid');
	var challenge_id = req.param('cid');
	var msg = getTestInstance(id);
	
	console.log(msg);
	res.send(msg);
});

app.get("/open_database_connection", function(req, res){
	openConnectionToDatabase();
	res.send(true);
});

app.get("/close_database_connection", function(req, res){
	closeConnectionToDatabase();
	res.send(true);
});

// Start the server
http.createServer(app).listen(port, function() {
	console.log("Server listening on port " + port);
});
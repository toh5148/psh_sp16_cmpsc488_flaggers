// Import statements
var mysql = require("mysql");

// Create a connection variable
var con = mysql.createConnection(
{
  host: "hbgwebfe.hbg.psu.edu",
  user: "bbweb",
  password: "sun16event",
  database: "bbweb"
});

// Try and connect to the database
con.connect(function(err){
  if(err){
    console.log('Error connecting to bbweb database');
    return;
  }
  console.log('Connection established');
});

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
		JSON Object - JSON object that contains the initialization message and turns for a match
		false - There was an error querying the database.
		null - Match does not exist.
*/
function getMatch(id){
	// column names: challenge_id, user_id, command
	con.query('SELECT command FROM match_turns WHERE id = ?', id, function(err, rows){
		if(err) {
			throw err;
			return false;
		} else if (rows[0] != undefined){ // Match exists				
			console.log(JSON.stringify(rows[0].command));
			
			// Turn the text recieved into a JSON object
			// Will there be more than 1 command for each id?
			return JSON.parse(rows[0].command);			
		}
		else{ // Match does not exist
			console.log("ERROR: Match with id:" + id + " not found.")
			return null;
		}	
	});
}

/* 
	This function queries the database for a specific test instance id
	Arguments:
		id - Test Instance id
		
	Returns:
		JSON Object - JSON object that contains the next turn for the test instance.
		false - There was an error querying the database.
		null - Match does not exist.
*/
function getTestInstance(id){
	// column names: id, command, winner_id
	con.query('SELECT command FROM testarena_turns WHERE challenge_id = ?', id, function(err, rows){
		if(err) {
			throw err;
			return false;
		}		
		else if (rows[0] != undefined) { // Match exists			
			console.log(JSON.stringify(rows[0].command));	
			
			// Turn the text recieved into a JSON object
			// Will there be more than 1 command for each id?
			return JSON.parse(rows[0].command);			
		} else{ // Match does not exist
			console.log("ERROR: Test instance with id:" + id + " not found.")
			return null;
		}	
	});
}

// Close the connection to the database
function closeConnection(){
	con.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	  console.log("Connection terminated.");
	});
}

// Tests
getTestInstance(1011);
getTestInstance(12011);
getTestInstance(101);
getMatch(101);
getMatch(105);

closeConnection();
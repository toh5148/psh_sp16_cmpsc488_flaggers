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
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

/*var str = "[ { command:\"test game instance, please delete later\" } ]";
var game_instance = { id: 105, command: str, winner_id: 20};
con.query('INSERT INTO match_turns SET ?', game_instance, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});*/

function sendRequest(id){
	// column names: id, command, winner_id
	con.query('SELECT command FROM match_turns  WHERE id = ?', id, function(err, rows){
		if(err) {
			alert("Match id not found");
			console.log("Match id:" + id + " not found.");
			return false;
		}

		console.log('Data received from Db:\n');	
		// Turn the text recieved into a JSON object
		var match_commands = JSON.parse(rows[0].command);
		console.log(JSON.stringify(match_commands));
		
		return match_commands;		
	});
}

function closeConnection(){
	con.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	});
}

var x = sendRequest(105);
closeConnection();
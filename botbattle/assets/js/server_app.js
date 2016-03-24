// Import statements
var mysql = require("mysql");

// Create a connection variable
var con = mysql.createConnection({
  host: "hbgwebfe.hbg.psu.edu",
  user: "bbweb",
  password: "sun16event",
  database: ""
});

// Try and connect to the database
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
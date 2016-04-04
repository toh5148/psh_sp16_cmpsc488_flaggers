// Import statements
var mysql = require('mysql');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var credentials = require('credentials');
var app = express();
var port = 5050;
var numAttempts = 0; // number of ties we tried to connect to the db and failed
var con; // connection variable

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Location of file: C:\Users\kaido_000\Documents\GitHub\psh_sp16_cmpsc488_flaggers\botbattle\server code
// Insert a row into the table
/*var i = {
    background: 'background.png',
    defaultTimestep: 1,
    entity: [
        {
            id: 101,
            type: 'spriteRabbit',
            visible: true,
            initX: 50,
            initY: 100,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0
        },
        {
            id: 102,
            type: 'spriteChicken',
            visible: true,
            initX: 500,
            initY: 400,
            width: 50,
            height: 50,
            flipped: true,
            rotation: 0
        },
        {
            id: 103,
            type: 'object',
            visible: true,
            initX: 250,
            initY: 350,
            width: 50,
            height: 50,
            flipped: true,
            rotation: 0,
            value: 'brickWall'
        },
        {
            id: 104,
            type: 'text',
            visible: true,
            initX: 50,
            initY: 50,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0,
            value: 'Turn: 1',
			fill: '#808080'
        }
    ],
    stdIn: '000',
    stdOut: '111',
    stdErr: '222'
};

var t = [
	{
		timeScale: 1,
		turnChanges: [
			{
				id: 101,
				changes: [
					{
						action: 'walk',
						start: 0,
						end: .2,
						x: 300,
						y: 200
					},
					{
						action: 'walk',
						start: .2,
						end: .3,
						x: 350,
						y: 150
					},
					{
						action: 'walk',
						start: .3,
						end: 1,
						x: 300,
						y: 50,
                        rotation: 90
					}
				]
			},
			{
				id: 102,
				changes: [
					{
						action: 'walk',
						start: .2,
						end: .8,
						x: 550,
						y: 450,
                        width: 200,
                        height: 200
					}
				]
			},
            {
                id: 103,
                changes: [
                    {
                        action: 'move',
                        start: 0,
                        end: 1,
                        x: 250,
                        y: 250,
                        width: 20,
                        height: 20,
                        rotation: 360
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 2',
                        fill: '#000000'
                    }
                ]
            }
		],
        stdIn: 'aaa',
        stdOut: 'bbb',
        stdErr: 'ccc'
	},
	{
		timeScale: 2,
		turnChanges: [
			{
				id: 101,
				changes: [
					{
						start: 0,
						end: .2,
						x: 300,
						y: 200
					},
					{
						start: .2,
						end: .3,
						x: 350,
						y: 150
					},
					{
						start: .3,
						end: 1,
						x: 50,
						y: 100,
                        rotation: 90
					}
				]
			},
            {
                id: 102,
                changes: [
                    {
                        action: 'walk',
                        visible: false,
                        start: .2,
                        end: .8
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 3',
                        backgroundColor: 'rgba(255,0,0,0.25)',
                        fill: '#808080'
                    }
                ]
            }
		],
        stdIn: 'ddd',
        stdOut: 'eee',
        stdErr: 'fff'
	},
    {
        timeScale: 1,
        turnChanges: [
            {
                id: 101,
                changes: [
                    {
                        action: 'walk',
                        start: 0,
                        end: .2,
                        x: 300,
                        y: 200
                    },
                    {
                        action: 'walk',
                        start: .2,
                        end: .3,
                        x: 350,
                        y: 150
                    },
                    {
                        action: 'walk',
                        start: .3,
                        end: 1,
                        x: 300,
                        y: 50
                    }
                ]
            },
            {
                id: 102,
                changes: [
                    {
                        action: 'walk',
                        visible: true,
                        start: .2,
                        end: .8,
                        x: 400,
                        y: 300,
                        flipped: false
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 4'
                    }
                ]
            }
        ],
        stdIn: 'ggg',
        stdOut: 'hhh',
        stdErr: 'iii'
    }
];

var x = '[ ' + JSON.stringify(i) + ' , ' + JSON.stringify(t) + ' ]';
x = JSON.stringify(x);*/

/*openConnection();
var game_instance = { id: 12345, command: x, winner_id: 1};
con.query('INSERT INTO match_turns SET ?', game_instance, function(err,res){
  if(err) throw err;

  console.log('row inserted');
  closeConnection();
});*/

// Opens the connection to the database, throws an error if connection failed.
function openConnection() {
	con = mysql.createConnection(
	{
	  host: credentials.host,
	  user: credentials.user,
	  password: credentials.password,
	  database: credentials.database
	});
	con.connect(function(err){
	  if(err){
		console.log('Error connecting to the ' + credentials.database + ' database.');
		throw err;
	  } else {
		console.log('Connection established');
	  }
	});	
}

// Closes the connection to the database, throws error if closing the connection failed
function closeConnection() {
	con.end(function(err) {
	  // The connection is terminated gracefully
	  // Ensures all previously enqueued queries are still executed
	  // before sending a COM_QUIT packet to the MySQL server.
	  if (err){
		console.log('Error terminating the connection.')
		throw err;
	  } else {
		console.log('Connection terminated.');
	  }
	});
}

/* 
	This function queries the database for a specific match id
	Arguments:
		id - Match id
		
	When query finishes, call the 'callback' function giving it the result
*/
function getMatch(id, callback){
	var retval;
	openConnection();
	// column names: match_id, game_initialization_message, turns, ready_for_playback
	//con.query('SELECT game_initialization_message, turns FROM matches WHERE match_id = ?', id, function(err, rows){
	con.query('SELECT command FROM match_turns WHERE id = ?', id, function(err, rows){
		if(err) { // error with the database
			retval = false;
		} else if (rows[0] == undefined){ // Match does not exists
			console.log('ERROR: Match with id:' + id + ' not found.');
			retval = null;					
		} else{ // Match exist
			//console.log(rows[0].command);
			
			// Will there be more than 1 command for each id?
		    retval = rows[0].command;
		    retval = JSON.parse(retval);
		}
		callback(retval); // send the result
	});
	closeConnection();
}

/* 
	This function queries the database for a specific test instance id
	Arguments:
		id - Test Instance id
		
	When query finishes, call the 'callback' function giving it the result
*/
function getTestInstance(uid, cid, callback){
	var retval;
	// column names: uid, challenge_id, game_initialization_message, turns
	con.query('SELECT command FROM testarena_turns WHERE challenge_id = ?', id, function(err, rows){
		if(err) {
			retval = false;
		}		
		else if (rows[0] == undefined) { // Match does not exists	
			console.log('ERROR: Test instance with id:' + id + ' not found.')
			retval = null;			
		} else{ // Match exist
			//console.log(rows[0].command);	
			
			// Will there be more than 1 command for each id?
			retval = rows[0].command;
		}
		callback(retval); // send the result
	}); 
}

/*

function uploadCode(botText, callback){
	
	var retval;
	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
	openConnection();
	// create data to store in db
	var bot = { uid: 12345, challenge_id: 1, language_id: 1, source_code: botText };
	con.query('INSERT INTO test_arena_bots SET ?', bot, function(err,res){
		if(err) throw err;

		console.log('row inserted');
		closeConnection();
	});
}

function uploadFile(botFile, callback){
	
	var retval;
	// convert file to string for storage in db
	var botText = new String(botFile);
	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
	openConnection();
	// create data to store in db
	var bot = { uid: 12345, challenge_id: 1, language_id: 1, source_code: botText };
	con.query('INSERT INTO test_arena_bots SET ?', bot, function(err,res){
		if(err) throw err;

		console.log('row inserted');
		closeConnection();
	});
}


*/




// THE FOLLOWING URLS WILL PROBABLY CHANGE ALONG
// WITH THE PARAMETERS

// localhost:5050/get_match?id=12345
app.get('/get_match', function(req, res, next){
	var id = req.query.id;
	console.log('id=' + id);
	var msg = getMatch(id, function(data){
	    console.log('server sent: ' + data);
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});

// localhost:5050/get_test_instance?uid=105&cid=101
app.get('/get_test_instance', function(req, res, next){
	var user_id = req.query.uid;
	var challenge_id = req.query.cid;
	var msg = getTestInstance(user_id, function(data){
		console.log('server sent: ' + data);
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data); 
	});
});


/*

// localhost:5050/uploadCode
app.get('/uploadCode', function(req, res, next){
	

}

// localhost:5050/uploadFile
app.get('/uploadFile', function(req, res, next){
	

}

*/


// localhost:5050/openDB
app.get('/openDB', function(req, res, next){
	try { 
		openConnection();
		res.send(true);
	} catch (err) {
		console.log('Error connecting to the ' + credentials.database + ' database.');
		res.send(false);
	}
});

// localhost:5050/closeDB
app.get('/closeDB', function(req, res, next){
	try {
		closeConnection(); 
		res.send(true);
	} catch (err) {
		console.log('Error terminating the connection.');
		res.send(false);
	}
});

// Start the server
http.createServer(app).listen(port, function() {
	console.log('Server listening on port ' + port);
});
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Location of file: C:\Users\kaido_000\Documents\GitHub\psh_sp16_cmpsc488_flaggers\botbattle\server code
// Insert a row into the table
var i = {
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
/*i = JSON.stringify(i);
t = JSON.stringify(t);
var win = 'player 1';
openConnection();
var game_instance = { match_id: 1234, winner: win, game_initialization_message: i, turns: t, ready_for_playback: 0 };
db.query('INSERT INTO matches SET ?', game_instance, function(err,res){
	//db.query('DELETE FROM matches WHERE match_id = 12345', game_instance, function(err,res){
  if(err) throw err;

  console.log('row inserted');
  closeConnection();
});*/

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

function getTestMatchTurn(uid, cid, init, callback){
    var retval;
	// column names: uid, challenge_id, game_initialization_message, turns, last_turn_status
	db.query('SELECT game_initialization_message, turns, last_turn_status FROM test_arena_matches ' + 
	'WHERE uid = ? AND challenge_id = ? AND last_turn_status = ?',
        uid, cid, 'READY', function (err, rows) {
        if (err) {			
            retval = 'false';
			console.log('ERROR: Error with the DB.');
        } else if (rows[0] == undefined) { // Match does not exists           
            retval = 'null';	
			console.log('ERROR: Test instance with id:' + id + ' not found.');			
        } else { // Match exist
            console.log('rows: ' + rows);	
            var match = rows[0];		      
            var ready = match.last_turn_status;
            if (ready == 'READY'){
                var turns = match.turns;
                if (init) {
                    var init_message = match.game_initialization_message;
                    retval = JSON.parse('[' + init_message + ',' + turns + ']');
                } else {
                    retval = JSON.parse(turns);
                }

                // Change the last_turn_status to DISPLAYED
                db.query('UPDATE test_arena_matches SET last_turn_status = ? WHERE uid = ? AND challenge_id = ?',
                    'DISPLAYED', uid, cid, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log('       Set match with uid:' + uid + '  cid:' + cid + '  to DISPLAYED.');
                    });
            } else  {   // turn is not ready to be displayed
                retval = '-1';		            
            }		
        }         
        callback(retval); // send the result        
    }); 
}


function uploadCode(botText, uid, cid, lid, needs_compiled, callback){
	
	var retval;
	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
	openConnection();
	// create data to store in db
	var bot = { uid: uid, challenge_id: cid, language_id: lid, source_code: botText };
	db.query('INSERT INTO test_arena_bots SET ?', bot, function(err,res){
		if(err) throw err;

		console.log('       row inserted');
		closeConnection();
	});
}

function uploadFile(botFile, uid, cid, lid, needs_compiled, callback){
	
	var retval;
	// convert file to string for storage in db
	var botText = new String(botFile);
	// column names: uid, challenge_id, language_id, source_code, errors, error_messages, warnings, warning_messages, needs_compiled
	openConnection();
	// create data to store in db
	var bot = { uid: uid, challenge_id: cid, language_id: lid, source_code: botText };
	db.query('INSERT INTO test_arena_bots SET ?', bot, function(err,res){
		if(err) throw err;

		console.log('       row inserted');
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
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true);
		res.send(data);
	});
});

// localhost:5050/get_test_turn?cid=101
app.get('/get_test_turn', function(req, res, next){
	// TODO: get uid
	var cid = req.query.cid;
	var msg = getTestMatchTurn(uid, cid, false, function (data) {
		if (data == '-1')
			console.log('ERROR: Test arena turn sent for uid: ' + uid + '    cid: ' + cid);
		else
			console.log('       Test arena turn sent for uid: ' + uid + '    cid: ' + cid);
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true);
		res.send(data); 
	});
});

// localhost:5050/get_test_turn_and_init?cid=101
app.get('/get_test_turn_and_init', function (req, res, next) {
	// TODO: get uid
    var cid = req.query.cid;
    var msg = getTestMatchTurn(uid, cid, true, function (data) {
		if (data == '-1')
			console.log('ERROR: Test arena turn and init message sent for uid: ' + uid + '    cid: ' + cid);
		else
			console.log('       Test arena turn and init message sent for uid: ' + uid + '    cid: ' + cid);
        res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', true);
        res.send(data);
    });
});




// localhost:5050/uploadCode?uid=101&cid=1&lid=121&needs_compiled=1
app.post('/uploadCode', function(req, res){
	var text = req.body.selectedCode;
<<<<<<< HEAD
	var msg = uploadCode(text, function (data) {
=======
	var uid = req.query.uid;
	var cid = req.query.cid;
	var lid = req.query.lid;
	var needs_compiled = req.query.needs_compiled;
	var msg = uploadCode(text, uid, cid, lid, needs_compiled, function (data) {
        console.log('server sent: ' + data);
>>>>>>> origin/master
        res.header('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

// localhost:5050/uploadFile?uid=101&cid=1&lid=121&needs_compiled=1
app.post('/uploadFile', function(req, res){
	var botFile = req.body.botFile;
<<<<<<< HEAD
	var msg = uploadFile(botFile, function (data) {
=======
	var uid = req.query.uid;
	var cid = req.query.cid;
	var lid = req.query.lid;
	var needs_compiled = req.query.needs_compiled;
	var msg = uploadFile(botFile, uid, cid, lid, needs_compiled, function (data) {
        console.log('server sent: ' + data);
>>>>>>> origin/master
        res.header('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
});

openConnection();
// Start the server
http.createServer(app).listen(port, function() {
	console.log('Server listening on port ' + port);
});

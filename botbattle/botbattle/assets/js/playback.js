/*  Functions in here are used to control the playback
    options of playback mode within a display session */

function GoToStart() {
    /*If we're storing the entire set of moves, we should just be 
    able to grab the 'Game Initialization Message' to line pieces up */
	restoreGameState(0);
}

function StepBackOneTurn() {
    /* We'll probably have to start at the beginning of the match
    and keep track of the last position of each entity up until
    one turn before the current turn and make those adjustments */
	restoreGameState(turn-1);
}

function Pause() {
    /* Should just stop updating the rendering */
	playing=false;
}

function Play() {
    /* Should be able to just start playing from current position
    (turn number) at the speed adjustment given as a multiplier */
	playing=true;
}

function StepForwardOneTurn() {
    /* Make adjustments for the next turn and pause at the start */
	restoreGameState(turn+1);
}

function GoToEnd() {
    /* Go to the end of the game and show the final positions
    of each of the entities */
	restoreGameState(turns.length);
}

function ChangePlaybackSpeed(newSpeed) {
    /* Change the playback speed of this 'class'...should continue
    in whichever mode (play/paused) that it was in before */
	playbackSpeed=newSpeed;
}


/* The rest of these functions are to retrieve match data from the 
    server and set the appropriate variables for the GDM to run correctly */

function retrieveMatch() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var matchID = -1;
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == "matchid") {
            matchID = pair[1];
            break;
        }
    }
    
    //Take care of query string errors
    if (matchID == -1) {
        //No match id was provided in the query string
        /*Redirect them to an error page with links and
          possible causes of error */
        window.location.href = "error/playbackerror.html";
    }
    else {
        matchRequest(matchID);
    }
}

// Function to get an XMLHttpRequest that will be used to send an ajax call
function getXMLHttpRequest() {
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		// Code for IE6, IE5
		xhttp = new ActiveObject("Microsoft.XMLHTTP");
	}
	return xhttp;
}

function matchRequest(matchID) {
    /* TODO: Sawyer, Taha, Jack
    Make an ajax request to your server function to retrieve 
    the match data associated with the matchID provided as an 
    argument. When the match data ('Game Initialization Message' 
    and 'Turns Data') is recieved, pass the JSON object(s) as a 
    parameter to the function 'handleCommands()'. Tom will
    handle the JSON object(s) and setting correct variables. */
    
	var xhttp = getXMLHttpRequest();
	var url = "/get_match?id=" + matchID;
	xhttp.open("GET", url, function(req, res) {
		console.log("website got: " + res);
		if (res == null){ // error with the db
			console.log("The database encountered an error.")
		} else if (res == undefined){ // Match does not exist in db
			console.log("The match with id:" + matchID + " does not exist.")
		} else {
			// Turn the string that is returned into a JSON object
			// could throw an exception if the string is not in the
			// correct JSON format
			var json = JSON.parse(res);
			//var gameInitializationMessage = json[0];
			//var turnsData = json[1];
			/*  As of right now the database is only setup to return 1 json object
				which will contain the initilization message and turns data.
				I can have the ajax call return 1 JSON object that contains an array of
				2 JSON objects. 1 object in the array will be the gameInitializationMessage,
				the 2nd object will be the turns data*/
			//handleCommands(gameInitializationMessage, turnsData);
		}
	});
}

function handleCommands(initMessage, turnData) {
    //TODO: Tom
}
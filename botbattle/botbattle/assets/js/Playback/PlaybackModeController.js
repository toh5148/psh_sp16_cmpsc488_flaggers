function retrieveMatch() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var matchID = -1;
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == "mid") {
            matchID = pair[1];
            break;
        }
    }
    
    //Handle query string errors
    if (matchID == -1) {
        //No match id was provided in the query string
        /*Redirect them to an error page with links and
          possible causes of error */
        sendError("mes=p1");
    }
    else {
        matchRequest(matchID);
    }
}

function sendError(qString) {
    window.location.href = "error.html?" + qString;
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
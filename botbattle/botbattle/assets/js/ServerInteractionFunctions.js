var base_url = 'http://localhost:5050';

// Create the XHR object used to send CORS calls to the server
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

/********************************************************************


    START BOT UPLOAD FUNCTIONS


********************************************************************/

function uploadFile() {
    //TODO: Write all code to interact with the server in this function
    //Tom will provide all needed parameters for the database as arguments
    //in a call to this function, still deciding where it will go to but
    //most likey just call a function with the BOT_ID and/or error messages
    //as arguments.
    var url = base_url + "/uploadFile$uid=" + uid + "&cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(selectedFile);

    xhr.onreadystatechange = function () {
	    var DONE = 4; // readyState 4 means the request is done.
	    var OK = 200; // status 200 is a successful return.
	    if (xhr.readyState === DONE) {
	     if (xhr.status === OK) 
	      console.log(xhr.responseText); // 'This is the returned text.'
	    } 
	    else {
	      console.log('Error: ' + xhr.status); // An error occurred during the request.
	    }
  }
    //This should be similar to uploadCode except you're sending a file up
    //instead of the code and handle it differently within the server function
}

function uploadCode(selectedCode) {
    //TODO: Write all code to interact with the server in this function
    //Tom will provide all needed parameters for the database as arguments
    //in a call to this function, still deciding where it will go to but
    //most likey just call a function with the BOT_ID and/or error messages
    //as arguments.
    var url = base_url + "/uploadCode$uid=" + uid + "&cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(selectedCode);

    xhr.onreadystatechange = function () {
	    var DONE = 4; // readyState 4 means the request is done.
	    var OK = 200; // status 200 is a successful return.
	    if (xhr.readyState === DONE) {
	     if (xhr.status === OK) 
	      console.log(xhr.responseText); // 'This is the returned text.'
	    } 
	    else {
	      console.log('Error: ' + xhr.status); // An error occurred during the request.
	    }
  }
}


/********************************************************************


   END BOT UPLOAD FUNCTIONS


********************************************************************/


/********************************************************************


    START PLAYBACK FUNCTIONS


********************************************************************/


function getMatch(matchID) {
    var url = base_url + '/get_match?id=' + matchID;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        var response = xhr.responseText;
        //console.log(response);
        if (response == 'false') {       // database encountered an error
            console.log('The database encountered an error.');
            alert('The database encountered an error.');
        } else if (response == 'null') { // match does not exist
            console.log('The specified match with id:' + matchID + ' does not exist.');
            alert('The specified match with id:' + matchID + ' does not exist.');
        } else if (response == '-1') {    // match is not ready for playback
            // poll db again
            console.log('The specified match with id:' + matchID + ' is not ready for playback.');
            alert('The specified match with id:' + matchID + ' is not ready for playback.');
        } else {
            var json = JSON.parse(response);
            var winner = json[0].winner;
            var init_message = json[1];
            var turns = json[2];
			
            handleCommands(winner, init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}


/********************************************************************


   END PLAYBACK FUNCTIONS


********************************************************************/


/********************************************************************


    START TESTING ARENA FUNCTIONS


********************************************************************/

// init should be true if the game_initialization_message should be returned or false if it should not
function getTestTurn(challengeID) {
    var url = base_url + '/get_test_turn?cid=' + challengeID;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        var response = xhr.responseText;
        if (response == 'false') {       // database encountered an error
            console.log('The database encountered an error.');
            alert('The database encountered an error.');
        } else if (response == 'null') { // match does not exist
            console.log('The specified match with user_id:' + userID + ' and challenge_id:' + challengeID
                + 'does not exist.');
            alert('The specified match with user_id:' + userID + ' and challenge_id:' + challengeID
                + 'does not exist.');
        } else if (response == '-1') {    // match is not ready for playback
            // poll db again
            console.log('The specified match with cid:' + challengeID + ' is not ready for playback.');
            alert('The specified match with cid:' + challengeID + ' is not ready for playback.');
        } else {
            var json = JSON.parse(response);           
            var init_message = json[0];
            var turns = json[1];
           
            handleCommands(init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getLanguages() {
    //TODO: Query the 'languages' table for all languages and return them as the json object
    //This functionality is as per Dr. Blum - 4/5/16
    //return languages;
}

function getTemplates(cid) {
    //TODO: Query the 'bot templates' table for all templates relating to the 'cid' and return the json object
    //This functionality is as per Dr. Blum - 4/5/16
    //return templates;
}

/********************************************************************


   END TESTING ARENA FUNCTIONS


********************************************************************/



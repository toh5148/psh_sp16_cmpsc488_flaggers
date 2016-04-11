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

function uploadCode(selectedCode, challenge_id, language_id, needs_compiled) {
    var url = base_url + "/upload_code?cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;
    
    // Create the CORS request to the server
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    xhr.onload = function () {
        if (xhr.responseText == 'true')
            alert('Code uploaded successfully.');
        else
            alert('Code did not uploaded successfully.');
    }

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send(selectedCode);
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
        if (response == 'false') {          // database encountered an error
            alert('The database encountered an error.');
        } else if (response == 'null') {    // match does not exist
            alert('The specified match with id:' + matchID + ' does not exist.');
        } else if (response == '-1') {      // match is not ready for playback
            // poll db again
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
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}


/********************************************************************


   END PLAYBACK FUNCTIONS


********************************************************************/


/********************************************************************


    START TESTING ARENA FUNCTIONS


********************************************************************/

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
        if (response == 'false') {           // database encountered an error
            alert('The database encountered an error.');
        } else if (response == 'null') {    // match does not exist
            alert('The specified match with challenge_id:' + challengeID + ' does not exist.');
        } else if (response == '-1') {       // match is not ready for playback
            // poll db again
            alert('The specified match with challenge_id:' + challengeID + ' is not ready for playback.');
        } else {
            var json = JSON.parse(response);           
            var init_message = json[0];
            var turns = json[1];
           
            handleTestTurns(init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getLanguages() {
    var url = base_url + '/get_languages';

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
        if (response == 'false') {          // database encountered an error
            alert('The database encountered an error.');
        } else {
            var json = JSON.parse(response);
            setLanguageVariables(json);
        }
        getTemplates(getChallengeID());
    };

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getTemplates(cid) {
    var url = base_url + '/get_templates?cid=' + cid;

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
        if (response == 'false') {          // database encountered an error
            alert('The database encountered an error.');
        } else {
            var json = JSON.parse(response);
            setTemplateVariables(json);
        }
    };

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}

/********************************************************************


   END TESTING ARENA FUNCTIONS


********************************************************************/
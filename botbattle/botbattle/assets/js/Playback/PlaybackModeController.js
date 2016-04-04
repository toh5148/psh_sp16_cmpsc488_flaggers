var base_url = 'http://localhost:5050';

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

// Create the XHR object used to send CORS calls to the server
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
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

function matchRequest(matchID) {
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
        if (response == 'false') {       // database encountered an error
            console.log('The database encountered an error.');
            alert('The database encountered an error.');
        } else if (response == 'null') { // match does not exist
            console.log('The specified match with id:' + matchID + ' does not exist.');
            alert('The specified match with id:' + matchID + ' does not exist.');
        } else if (response == '-1'){    // match is not ready for playback
            // poll db again
        } else {
            var json = JSON.parse(response);
            var winner = json[0];
            var init_message = json[1];
            var turns = json[2];

            //console.log("Received Data from Server");
            //console.log("winner:");
            //console.log(winner);
            //console.log("init_message:");
            //console.log(JSON.stringify(init_message, null, 2));
            //console.log("turns:");
            //console.log(JSON.stringify(turns, null, 2));

            handleCommands(winner, init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

function handleCommands(winner, initMessage, turnData) {
    // TODO: tom do something with the winner
    gameInitializer = initMessage;
    turns = turnData;
    console.log("Set database commands to GDM vars.");
    ready = true;
    create();
}
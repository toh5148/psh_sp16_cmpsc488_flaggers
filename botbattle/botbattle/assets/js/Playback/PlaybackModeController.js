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
    var url = 'http://localhost:5050/get_match?id=' + matchID;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        var response = xhr.responseText;
        if (response == false) { // database encountered an error
            console.log('The database encountered an error.');
        } else if (response == undefined) { // match does not exist
            console.log('The specified match with id:' + matchID + ' does not exist.');
        }
        else {
            var json = JSON.parse(response);
            var init_message = json[0];
            var turns = json[1];

            console.log("\ninit_message:");
            console.log(JSON.stringify(init_message, null, 2));
            console.log("\nturns:");
            console.log(JSON.stringify(turns, null, 2));

            handleCommands(init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

function handleCommands(initMessage, turnData) {
    //TODO: Tom
}
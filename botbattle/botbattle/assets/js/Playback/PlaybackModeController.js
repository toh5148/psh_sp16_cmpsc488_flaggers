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

// Create the XHR object.
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
    /* TODO: Sawyer, Taha
    Make an ajax request to your server function to retrieve 
    the match data associated with the matchID provided as an 
    argument. When the match data ('Game Initialization Message' 
    and 'Turns Data') is recieved, pass the JSON object(s) as a 
    parameter to the function 'handleCommands()'. Tom will
    handle the JSON object(s) and setting correct variables. */
    console.log('Match_id: ' + matchID);
    var url = 'http://localhost:5050/get_match?id=' + matchID;

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        if (text == false) {
            console.log('website got: ' + text)
        } else if (text == undefined) {
            console.log('website got: ' + text);
        }
        else {
            console.log('website got: ' + text);
            /*var json = JSON.parse(text);
            var init_message = json[0];
            var turns = json[1];
            handleCommands(init_message, turns);*/
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
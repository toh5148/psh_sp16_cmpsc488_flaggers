var base_url = 'http://localhost:5050';

function beginPageLoad() {
    //This function will retrieve a "cid" from the query string
    //If it cannot retrieve a cid, it will redirect to the "error.html"
    //page wth an appropriate error specified in a query string...
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var cid = -1;
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "cid")  // Request 'cid' as the query string....TODO: Tom might change
        {
            cid = pair[1];
            break;
        }
    }

    if(cid==-1) { // No challenge specified...send them to error page;
        window.location.href = "error.html";
        sendError("mes=t1");
    }
    else {
        //Passed all error checks
        //Begin Testing Mode initilization
        initTestingArena(cid);
    }

}


function sendError(qString) {
    window.location.href = "error.html?" + qString;
}

function initTestingArena(cid) {

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

// init should be true if the game_initialization_message should be returned or false if it should not
function turnRequest(userID, challengeID, init) {
    if (init)
        var url = base_url + '/get_test_turn_and_init?uid=' + userID + '&cid=' + challengeID;
    else
        var url = base_url + '/get_test_turn?uid=' + userID + '&cid=' + challengeID;

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
        } else {
            var json = JSON.parse(response);
            if (init) { // did we recieve a game_initialization_message
                var init_message = json[0];
                var turns = json[1];
            } else {
                var init_message = null;
                var turns = json;
            }            

            //console.log("Received Data from Server");
            //console.log("init_message:");
            //console.log(JSON.stringify(init_message, null, 2));
            //console.log("turns:");
            //console.log(JSON.stringify(turns, null, 2));
            
            handleCommands(init_message, turns);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}
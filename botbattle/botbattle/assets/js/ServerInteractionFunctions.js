var base_url = 'http://localhost:5050';     // Base url of the server

var timeout_playback_match = 10 * 1000;     // [How long to wait in seconds] * 1000 = miliseconds
var timeout_test_turn = 3 * 1000;
var timeout_languages = 7 * 1000;           
var timeout_templates = 7 * 1000;
var timeout_upload_code = 3 * 1000;
var timeout_get_errors = 3 * 1000;
var timeout_save_testing_bot = 4 * 1000;

var timeout_counter = 0;                    // Counter for how many times we have resent the request
var timeout_counter_errors = 0;
var error_limit = 5;                        // How many times do we want to resend the request if we receive an error

/* 
    This function creates the XHR object used to send CORS calls to the server.

    Arguments:
        1) method - The method that will be used to send the CORS request (e.g. GET, POST, etc.).
        2) url - The url that the CORS request will be sent to.
*/
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);        // XHR for Chrome/Firefox/Opera/Safari
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();         // XDomainRequest for IE
        xhr.open(method, url);
    } else {
        xhr = null;                         // CORS not supported
    }
    return xhr;
}

/********************************************************************


    START BOT UPLOAD FUNCTIONS


********************************************************************/

/*
    This function sends a request to the server to upload a bot's source code to the database.
    If uploading fails, the function will resend the request to the server until the code was
    uploaded successfully or until the function has succeeded the allocated number of times it
    can send the request.

    Arguments:
        1) selectedCode - String version of the source code to be uploaded to the database.
        2) challenge_id - The id of the challenge that the source code is related to.
        3) language_id - The id of the language that the source code is written in.
        4) needs_compiled - Does the source code need compiled? 0 = false, 1 = true.
*/
function uploadCode(selectedCode, challenge_id, language_id, needs_compiled) {
    var url = base_url + "/upload_code?cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;
    
    // Create the CORS request to the server
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        if (xhr.responseText == 'true') {
            timeout_counter = 0;
            alert('Code uploaded successfully.');
        } else {
            if (timeout_counter < error_limit) {// Try to upload the code again
                timeout_counter++;
                setTimeout(function () { uploadCode(selectedCode, challenge_id, language_id, needs_compiled); }, timeout_upload_code);
            } else {                            // Upload has failed to many times, so there is a problem with the database
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        }
    }

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send(selectedCode);
}

/*
    This function sends a request to the server to SAVE a bot's source code to the user bot database.
    If uploading fails, the function will resend the request to the server until the code was
    uploaded successfully or until the function has succeeded the allocated number of times it
    can send the request.

    Arguments:
        1) selectedCode - String version of the source code to be uploaded to the database.
        2) challenge_id - The id of the challenge that the source code is related to.
        3) language_id - The id of the language that the source code is written in.
*/
function saveTestingArenaBot(selectedCode, challengeID, languageID, botName, botDescription) {
    var url = base_url + "/save_testing_bot?cid=" + challengeID + "&lid=" + languageID + "&name=" + botName + "&desc=" + botDescription;

    // Create the CORS request to the server
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response, bot id is passed in the response text
    xhr.onload = function () {
        if (xhr.responseText == 'false') {
            if (timeout_counter < error_limit) {// Try to upload the code again
                timeout_counter++;
                setTimeout(function () { saveTestingArenaBot(selectedCode, challengeID, languageID, botName, botDescription); }, timeout_save_testing_bot);
            } else {                            // Upload has failed to many times, so there is a problem with the database
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else {            
            timeout_counter = 0;
            alert('Code saved successfully. The bot_id is ' + xhr.responseText);
        }
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

/*
    This function sends a request to the server to query the database for a match
    that has already been completed. If the query is successful, it passes the data
    needed to play the match to the handleCommands function. If the match is not
    ready for playback, the function will resend the request to the server until
    the match is ready for playback or until the function has succeeded the allocated
    number of times it can send the request.
    
    Arguments:
        1) matchID - The id of the match that we are trying to playback.
*/
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
        
        if (response == 'false') {              // Database encountered an error
            if (timeout_counter < error_limit) {// Poll db again 
                timeout_counter++;
                setTimeout(function () { getMatch(matchID); }, timeout_playback_match);
            } else {                            // Polling has failed to many times, so there is a problem with the database
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else if (response == 'null') {        // Match does not exist
            timeout_counter = 0;
            alert('The specified match with id:' + matchID + ' does not exist.');
        } else if (response == '-1') {          // Match is not ready for playback, poll the database again
            setTimeout(function () { getMatch(matchID); }, timeout_playback_match);
        } else {
            timeout_counter = 0;
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

/*
    This function sends a request to the server to insert a turn request into the database.
    If the server was unable to insert the turn request, this function will send the request
    again until it was inserted successfully or until the function has succeeded the allocated
    number of times it can send the request.

    Arguments:
        1) challengeID - The id of the challenge that we are currently running.
        2) botType - String version of the type of bot (e.g. TEST_ARENA, USER, etc.).
        3) languageID - The id of the language that the bot is written in.
        4) botID - The id of the bot that is being tested.
        5) botVersion - The version of the bot that is being tested.
        6) lastTurnIndex - The last turn that was displayed to the user.
*/
function putTurnRequest(challengeID, botType, languageID, botID, botVersion, player, lastTurnIndex) {
    var url = base_url + '/upload_turn_request?cid=' + challengeID + '&botType=' + botType +
        '&lid=' + languageID + '&botID=' + botID + '&botVersion=' + botVersion + '&player=' + player +
        '&lastTurnIndex=' + lastTurnIndex;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        var response = xhr.responseText;

        if (response == 'false') {              // Database encountered an error, poll the database again
                setTimeout(function () {
                    putTurnRequest(challengeID, botType, languageID, botID, botVersion, player, lastTurnIndex);
                }, timeout_test_turn);
        }
        else {
            //Successfulling wrote request to database
            matchRequestSubmitted(lastTurnIndex == -1);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

/*
    This function sends a request to the server to query the database for the turns for
    a specified testing challenge. If the server was unable to query the database, this
    function resends the request until the query was successfull or until the function
    has succeeded the allocated number of times it can send the request. If the challenge
    does not exist, it displays an error message. If the turn is not ready for playback,
    this function will continue to send the request to the server until the turn is ready
    for playback. Then, the function passes the data to display a turn to the
    handleTestTurns function.

    Arguments:
        1) challengeID - The id of the challenge we are trying to get a turn for.
        2) firstTurn - Is this the first turn of the match?
*/
function getTestTurn(challengeID, firstTurn) {
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

        if (response == 'false') {              // Database encountered an error
            if (timeout_counter < error_limit) {// Poll the database again
                timeout_counter++;
                setTimeout(function () { getTestTurn(challengeID, firstTurn); }, timeout_test_turn);
            } else {                            // Polling has failed to many times, so there is a problem with the database  
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else if (response == 'null') {        // Match does not exist
            timeout_counter = 0;
            alert('The specified match with challenge_id:' + challengeID + ' does not exist.');
        } else if (response == '-1') {          // Match is not ready for playback, poll the database again
            setTimeout(function () { getTestTurn(challengeID, firstTurn); }, timeout_test_turn);
        } else {
            timeout_counter = 0;
            var json = JSON.parse(response);           
            var init_message = json[0];
            var turns = json[1];
           
            handleTestTurns(init_message, turns, firstTurn);
        }
    };

    xhr.onerror = function () {
        console.log('Woops, there was an error making the request.');
    };

    xhr.send();
}

/*
    This function sends a request to the server to query the database for all of
    the languages that a bot can be written in. If the server was unable to query
    the database, this function will resend the request until the languages are
    returned or until the function has succeeded the allocated number of times it
    can send the request. Once this function has the languages, it sets the language
    variables and calls the getTemplates function in order to get the code templates
    for the specified language.
*/
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

        if (response == 'false') {              // Database encountered an error
            if (timeout_counter < error_limit) {// Poll the database again
                timeout_counter++;
                setTimeout(function () { getLanguages(); }, timeout_languages);
            } else {                            // Polling has failed to many times, so there is a problem with the database  
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else {
            timeout_counter = 0;
            var json = JSON.parse(response);
            setLanguageVariables(json);
            getTemplates(getChallengeID());
        }
    };

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getTemplates(challengeID) {
    var url = base_url + '/get_templates?cid=' + challengeID;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    // Successfully got a response
    xhr.onload = function () {
        var response = xhr.responseText;

        if (response == 'false') {              // Database encountered an error
            if (timeout_counter < error_limit) {// Poll the database again
                timeout_counter++;
                setTimeout(function () { getTemplates(challengeID); }, timeout_templates);
            } else {                            // Polling has failed to many times, so there is a problem with the database
                timeout_counter = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else if (response == 'null') {
            timeout_counter = 0;
            alert('No source code templates found for the given challenge.');
        } else {
            timeout_counter = 0;
            var json = JSON.parse(response);
            setTemplateVariables(json);
        }
    };

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getCompilerErrors(challengeID) {
    var url = base_url + '/get_compiler_errors?cid=' + challengeID;

    // Create the CORS request to the server
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported on the current browser');
        return;
    }

    xhr.onload = function () {
        var response = xhr.responseText;

        if (response == 'false') {                      // Server had an error
            if (timeout_counter_errors < error_limit) { // Poll the database again
                timeout_counter_errors++;
                setTimeout(function () { getCompilerErrors(challengeID); }, timeout_get_errors);
            } else {                                    // Polling has failed to many times, so there is a problem with the database
                timeout_counter_errors = 0;
                alert('The database encountered an error. Please try again later.');
            }
        } else {
            timeout_counter_errors = 0;
            var json = JSON.parse(response);
            var num_errors = json.errors;
            var num_warnings = json.warnings;
            var error_messages = json.error_messages;
            var warning_messages = json.warning_messages;

            console.log('num_errors: ' + num_errors +
                '\nnum_warnings: ' + num_warnings +
                '\nerror_messages: ' + error_messages +
                '\nwarning_messages: ' + warning_messages);

            /* ****************************************************

                I HAVE THE INFO WHAT SHOULD I DO WITH IT?

            ******************************************************/
        }
    }

    xhr.onerror = function () {
        console.error('Woops, there was an error making the request.');
    };

    xhr.send();
}

/********************************************************************


   END TESTING ARENA FUNCTIONS


********************************************************************/
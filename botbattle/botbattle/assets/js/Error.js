/********************

 assets/js/errors.js

 *******************/

const GENERIC = "There was an unknown error.";
const PLAYBACK_NOID = "There was an error due to attempting to navigate to the 'Playback' page with no match id specified";
const TESTING_NOID = "There was an error due to attempting to navigate to the 'Testing Arena' page with no challenge id specified";


function sendError(errorNumber, message) {
    switch (errorNumber) {
        case 0:
            //default error with specified message
            addError(message);
            break;


        //If prefixed by a '1' - playback mode error
        //If prefixed by a '2' - testing arena error
        case 10:
            //Playback error 0: no match id specified
            addError(PLAYBACK_NOID);
            break;
        case 20:
            //Testing arena error 0: no challange id specified
            addError(TESTING_NOID);
            break;
        default:
            addError(GENERIC);
    }
}

function addError(message) {
    console.error("ERROR: " + message);
    alert(message);
}

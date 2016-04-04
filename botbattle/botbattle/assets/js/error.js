/*****************************************************************
 
 assets/js/error.js

 This file holds all functions relating to the error.html page only

*******************************************************************/

const GENERIC = "You have reached this page for an unknown reason";
const PLAYBACK_NOID = "You have reached this page while attempting to navigate to the 'Playback' page with no match id specified";
const TESTING_NOID = "You have reached this page while attempting to navigate to the 'Testing Arena' page with no challenge id specified";


function generatePage() {
    var mesID = getMessageID();
    
    switch (mesID) {
        case null:
            // No mes id specified, display default error page
            addError(GENERIC);
            break;
        case "p1":
            //Playback error 1: no match id specified
            addError(PLAYBACK_NOID);
            break;
        case "t1":
            //Testing arena error 1: no challange id specified
            addError(TESTING_NOID);
            break;
        default:
            //Didn't fit (should never be reached - null handles not specified
    }
}

function addError(message) {
    var list_item = "<li>" + message + "</li>";
    document.getElementById("ul_errorReasons").innerHTML += list_item;
}
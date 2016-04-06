
function beginPageLoad() {

    var cid = getChallengeID(); //from QueryStringFunctions.js
    //var languages = getLanguages();
    //var templates = getTemplates(cid);


    if (cid == -1) {
        // No challenge specified
        sendError(20, "");
    }
    else {
        //Passed all error checks
        //Begin Testing Mode Initilization
        
        initTestingArena(cid);
    }

    document.getElementById("ddl_languages1").innerHTML = "<option>Java</option>"; // TODO: TOM - set the list options to languages sent by db
}

function initTestingArena(cid) {
    setInput(); //TODO: TOM
}
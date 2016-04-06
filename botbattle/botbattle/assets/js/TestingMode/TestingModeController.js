var currentTurn = 1;
var tempCounter = 1; //TODO REMOVE

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

    //setLanguages();
    document.getElementById("ddl_languages1").innerHTML = "<option>Java</option>"; // TODO: TOM - set the list options to languages sent by db
    document.getElementById("ddl_languages1").innerHTML += "<option>Python</option>";
    document.getElementById("ddl_languages1").innerHTML += "<option>C++</option>";

    document.getElementById("ddl_languages2").innerHTML = "<option>Java</option>"; // TODO: TOM - set the list options to languages sent by db
    document.getElementById("ddl_languages2").innerHTML += "<option>Python</option>";
    document.getElementById("ddl_languages2").innerHTML += "<option>C++</option>";
}

function initTestingArena(cid) {
    //setInput(); //TODO: TOM
    getTestTurn(cid);
    //Write first pending turn request
    
    //When retrieved, get the game initilization message and set that
    
    //Start testing arena functions (allow users to upload/write) and hit next turn
}

function updateCompilerErrors(playerNum) {
    var errorsLeft = true;
    document.getElementById("div_compilerErrors" + playerNum).innerHTML = "";

    while (errorsLeft) {
        var error = "Error: this is a test error...";
        addCompilerError(playerNum, error);
        errorsLeft = false;
    }
}

function addCompilerError(playerNum, error) {
    document.getElementById("div_compilerErrors" + playerNum).innerHTML += error + tempCounter + "<br/>";
}

function handleTestTurns(init, turns) {
    gameInitializer = initMessage;
    turns = turnData;
    console.log("Set turn data commands to GDM vars.");
    ready = true;
    create();
}
var currentTurn = 1;
var tempCounter = 1; //TODO REMOVE


//These are used for keeping track of language and templates
var languageNames = [];
var languageIDs = [];
var templatesCode = [];
var langReady = false;
var templatesReady = false;




function beginPageLoad() {

    var cid = getChallengeID(); //from QueryStringFunctions.js
    getLanguages();
    getTemplates(cid);

    if (cid == -1) {
        // No challenge specified
        sendError(20, "");
    }
    else {
        //Passed all error checks
        //Begin Testing Mode Initilization
        initTestingArena(cid);
    }
}

function initTestingArena(cid) {
    //Write first pending turn request

    writeInitialTurnRequest(cid);
    //Write a function here that polls until completion??
    //getInitialTurn(cid);
    //When this function is finished, it will call handleTestTurns with the true flag set
}

function writeInitialTurnRequest(cid) {

}

function handleTestTurns(init, turnData, first) {
    if (first) {
        //If it's the first turn, just set the initMessage
        //turnData will be null in this condition
        gameInitializer = init;
        ready = true;
        create();
    }
    else {
        //It's not the first turn, just set the turns to be turnData
        turns = turnData;
    }
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

function setLanguageVariables(languages) {
    var languagesLeft = true;
    var i = 0;
    var j = 0;

    while (languagesLeft) {
        languageNames[j] = languages[i];
        languageIDs[j] = languages[i+1];

        i = i + 2;
        j = j + 1;

        if(languages[i] == undefined) {
            languagesLeft = false;
        }
    }

    if (templatesReady) {
        //Means it has been incremented twice
        setLanguageAndTemplates();
    }
    langReady = true;
    //Combination of languageNames[a] and languageIDs[a] links the language to it's value/id
}

function setTemplateVariables(templates) {
    //TODO: theres a bug with this if it is returned before languages are set...Tom is working on it
    var templatesLeft = true;
    var i = 0;

    var tempSource;
    var tempID;

    while (templatesLeft) {
        tempSource = templates[i];
        tempID = templates[i + 1];
        
        for(var j = 0; j < languageIDs.length; j++) {
            if(languageIDs[j] == tempID) {
                templatesCode[j] = tempSource;
            }
        }

        i = i + 2;

        if (templates[i] == undefined) {
            templatesLeft = false;
        }
    }

    if (langReady) {
        //Means it has been incremented twice
        setLanguageAndTemplates();
    }

    templatesReady = true;
    //Combination of templatesCode[a] and languageIDs[a] links the templateCode to it's value/id
}

function setLanguageAndTemplates() {
    //Function will set languages drop down and first listed source code to the editor
    for (var i = 1; i <= 2; i++) {
        document.getElementById("ddl_languages" + i).innerHTML = "";

        for (var j = 0; j < languageIDs.length; j++) {
            document.getElementById("ddl_languages" + i).innerHTML += "<option value=\'" + languageIDs[j] + "\'>" + languageNames[j] + "</option>";
        }
        var editor = ace.edit("div_editorP" + i);
        editor.setValue(templatesCode[0]);
    }
}

function langChange(playerNum) {
    var editor = ace.edit("div_editorP" + playerNum);
    var value = document.getElementById("ddl_languages" + playerNum).value;
    for(var j = 0; j < languageIDs.length; j++) {
        if(languageIDs[j] == value) {
            editor.setValue(templatesCode[j]);
        }
    }
}
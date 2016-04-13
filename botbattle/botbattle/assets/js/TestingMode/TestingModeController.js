var currentTurn = 1;
var tempCounter = 1; //TODO REMOVE


//These are used for keeping track of language and templates
var languageNames = [];
var languageIDs = [];
var templatesCode = [];

//These are used to keep track of information for each player's bot
var Player_1_Bot_ID, Player_2_Bot_ID; //Int Types
var Player_1_Bot_Version, Player_2_Bot_Version; //Int Version Type
var Player_1_Bot_Ready, Player_2_Bot_Ready; //Boolean types
var Player_1_Bot_Type, Player_2_Bot_Type; //String type -- either 'user' or 'test_arena'

function beginPageLoad() {

    var cid = getChallengeID(); //from QueryStringFunctions.js
    getLanguages(); // getTemplates(cid) is called after languages are returned

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
    //writeFirstTurnRequest(cid);
    //Get the first turn data...(This should be set 
    //getTestTurn(cid, true);
    //When this function is finished, it will call handleTestTurns with the true flag set
}

function writeFirstTurnRequest(cid) {
    var challengeID = cid;
    var botType;
    var langID;
    var botID;
    var botVersion;
    var playerNum;
    var lastTurnIndex;

    if (Player_1_Bot_Ready) {
        botType = Player_1_Bot_Type;
        playerNum = 1;
        lastTurnIndex = -1;

        if (botType == 'test_arena') {
            langID = getLanguageID(1);
            botID = null;
            botVersion = null;
        }
        else if (botType == 'user') {
            langID = null;
            botID = Player_1_Bot_ID;
            //botVersion will require a db query to get the default bot version from user_bots table for the given bot id....do this when checking public bot
            botVersion = Player_1_Bot_Version;
        }
    }
    else {
        //Bot isn't ready (due to change or no upload, etc)
        //Throw alert and log in console
        alert("Cannot complete next turn, please upload your new bot or changes or finish selecting a valid public bot.");
        console.warn("WARNING: Cannot complete next turn, please upload your new bot or changes or finish selecting a valid public bot.");
        return;
    }

    putTurnRequest(challengeID, botType, langID, botID, botVersion, playerNum, lastTurnIndex);
}

function writeTurnRequest(cid) {
    //Database schema for pending_test_arena_turns
    //pending_turn_id		    → Auto Increment, Unique
    //uid: integer			    → Primary Key, Foreign Key (users.uid)
    //challenge_id: integer		→ Primary Key, Foreign Key (challenges.challenge_id)
    //bot_type: varchar(10)
    //language_id: int(11)		→ Foreign Key (languages.language_id ), NULLABLE
    //bot_id: integer			→ Foreign Key (bot_versions.bot_id), NULLABLE
    //bot_version: integer		→ Foreign Key (bot_versions.version), NULLABLE
    //player: integer	
    //last_turn_index: integer

    var challengeID = cid;
    var botType;
    var langID;
    var botID;
    var botVersion;
    var playerNum;
    var lastTurnIndex;

    var Bot_Ready = false;

    switch (playerNum) {
        case 1:
            Bot_Ready = Player_1_Bot_Ready;
            botType = Player_1_Bot_Type;
            botID = Player_1_Bot_ID;
            botVersion = Player_1_Bot_Version;
            break;
        case 2:
            Bot_Ready = Player_2_Bot_Ready;
            botType = Player_2_Bot_Type;
            botID = Player_2_Bot_ID;
            botVersion = Player_2_Bot_Version;
            break;
        default:
            console.error("ERROR: Invalid player number value: " + playerNum);
            return;
    }

    if (Bot_Ready) {
        lastTurnIndex = 3; //TODO: Get the current turn number (Should be stored  in gdm)

        if (botType == 'test_arena') {
            langID = document.getElementById("ddl_languages" + playerNum).value;;
            botID = null;
            botVersion = null;
        }
        else if (botType == 'user') {
            langID = null;
            botID = Player_1_Bot_ID;
            //botVersion will require a db query to get the default bot version from user_bots table for the given bot id....do this when checking public bot
            botVersion = Player_1_Bot_Version;
        }
    }
    else {
        //Bot isn't ready (due to change or no upload, etc)
        //Throw alert and log in console
        alert("Cannot complete next turn, please upload your new bot or changes or finish selecting a valid public bot.");
        console.warn("WARNING: Cannot complete next turn, please upload your new bot or changes or finish selecting a valid public bot.");
        return;
    }

    putTurnRequest(challengeID, botType, langID, botID, botVersion, playerNum, lastTurnIndex);
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

    //Combination of languageNames[a] and languageIDs[a] links the language to it's value/id
}

function setTemplateVariables(templates) {
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


    setLanguageAndTemplates();
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
    var changeTemplates = document.getElementById("chk_changeTemplates" + playerNum).checked;
    console.log(changeTemplates);
    if (changeTemplates) {
        var editor = ace.edit("div_editorP" + playerNum);
        var value = document.getElementById("ddl_languages" + playerNum).value;
        for (var j = 0; j < languageIDs.length; j++) {
            if (languageIDs[j] == value) {
                editor.setValue(templatesCode[j]);
            }
        }
    }
}

function doNextTurn() {
    writeTurnRequest(getChallengeID()); //Upon completion of writing turn request, matchRequestSubmitted() is called
}

function matchRequestSubmitted() {
    //Since the turn request was successfully submitted we can make the request for the display of the test turn
    getTestTurn(getChallengeID(), false);
}
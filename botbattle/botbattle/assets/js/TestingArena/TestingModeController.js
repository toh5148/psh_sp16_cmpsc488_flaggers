var nextPlayer = 1;
var tempCounter = 1; //TODO REMOVE


//These are used for keeping track of language and templates
var languageNames = [];
var languageIDs = [];
var templatesCode = [];

function beginPageLoad() {
    setLoadingDisplay();
    var cid = getChallengeID(); //from QueryStringFunctions.js
    getLanguages(); // getTemplates(cid) is called after languages are returned

    if (cid == -1) {
        // No challenge specified
        sendError(20, "");
    }
    else {
        //Passed all error checks
        //Begin Testing Mode Initilization
        initTestingArena1(cid);
    }
}

function initTestingArena(cid) {
    //Write first pending turn request
    writeFirstTurnRequest(cid);
    //Get the first turn data...
    //When this function is finished, it will call handleTestTurns with the true flag set
}

function initTestingArena1(cid) {
    simulateNextTurn(-1);
}

function writeFirstTurnRequest(cid) {
    var challengeID;
    var botType;
    var langID;
    var botID;
    var botVersion;
    var playerNum;
    var lastTurnIndex;

    //Bot type won't be looked at since it's the first turn(lastTurnIndex == -1)
    //So just set language == 1 as dummy data that won't be read
    challengeID = cid;
    botType = TEST_ARENA_STRING;
    botID = null;
    botVersion = null;
    langID = 1;
    playerNum = 1;
    lastTurnIndex = -1;

    putTurnRequest(challengeID, botType, langID, botID, botVersion, playerNum, lastTurnIndex);
}

function writeTurnRequest(cid) {
    var challengeID = cid;
    var botType;
    var langID;
    var botID;
    var botVersion;
    var playerNum = getNextPlayer();
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
        lastTurnIndex = getGDMTurn(); //TODO: Get the current turn number (Should be stored  in gdm)

        if (botType == TEST_ARENA_STRING) {
            langID = document.getElementById("ddl_languages" + playerNum).value;;
            botID = null;
            botVersion = null;
        }
        else if (botType == USER_STRING) {
            langID = null;
            //botID and botVersion set in switch case
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
        turns = [];
        create();
    }
    else {
        //It's not the first turn, so set both turnData and first
        turns = turnData;
        gameInitializer = init;
        setNewTestingArenaTurn();
    }
}

function doNextTurn() {
    writeTurnRequest(getChallengeID()); //Upon completion of writing turn request, matchRequestSubmitted() is called
    clearBots();
}

function undoTestTurn() {
    restoreGameState(turn - 1);
    turns.pop();
    clearBots();
}

function matchRequestSubmitted(first) {
    //Since the turn request was successfully submitted we can make the request for the turn data
    getTestTurn(getChallengeID(), first);
}

function getNextPlayer() {
    //This function should check "nextPlayer" field of the current turn in the turn data
    //If no turn data, current turn is player 1
    var player = turns[turns.length - 1].nextPlayer;

    return player;
}

function getGDMTurn() {
    var turnNumber = -1;

    if (turn != undefined) {
        turnNumber = turn;
    }

    return turnNumber;
}

function attemptUpload(playerNum) {
    if (nextPlayer == playerNum) {
        upload(playerNum);
    }
    else {
        //Attempting to upload a bot for playerNum...but it isn't playerNum's turn so bot would overwrite
        //So throw alert and don't upload
        alert('Woops! You are attempting to upload a bot for player ' + playerNum + ', but it is currently player ' + nextPlayer + '\'s turn. Upload was aborted');
    }
}

function setLoadingDisplay(visible) {
    if (visible) {
        document.getElementById('loading').style.display = "block";
    }
    else {
        document.getElementById('loading').style.display = "none";
    }
}

function updateCurrentBot() {

}

function clearBots() {
    Player_1_Bot_Ready = false;
    Player_2_Bot_Ready = false;
}
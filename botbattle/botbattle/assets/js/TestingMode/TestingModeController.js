var nextPlayer = 1;
var tempCounter = 1; //TODO REMOVE


//These are used for keeping track of language and templates
var languageNames = [];
var languageIDs = [];
var templatesCode = [];

//These are used to keep track of information for each player's bot
var Player_1_Bot_ID, Player_2_Bot_ID; //Int Types
var Player_1_Bot_Version, Player_2_Bot_Version; //Int Version Type
var Player_1_Bot_Ready, Player_2_Bot_Ready; //Boolean types
var Player_1_Bot_Type, Player_2_Bot_Type; //String type -- equal to one of the constants set below

const USER_STRING = 'user';
const TEST_ARENA_STRING = 'test_arena';

function beginPageLoad() {
    setLoadingDisplay();
    var cid = getChallengeID();
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
    writeFirstTurnRequest(cid);
    //Get the first turn data...(This should be set )
    getTestTurn(cid, true);
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

    botType = Player_1_Bot_Type;
    playerNum = 1;
    lastTurnIndex = -1;

    //Bot data won't be used for first turn, so go with default data...
    langID = 1;
    botID = null;
    botVersion = null;

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
        create();
    }
    else {
        //It's not the first turn, just set the turns to be turnData
        turns = turnData;
        //setNewTestingArenaTurn();
        nextPlayer = getNextPlayer();
    }
}

function doNextTurn() {
    writeTurnRequest(getChallengeID()); //Upon completion of writing turn request, matchRequestSubmitted() is called
}

function undoTestTurn() {
    restoreGameState(turn - 1);
}

function matchRequestSubmitted() {
    //Since the turn request was successfully submitted we can make the request for the turn data
    getTestTurn(getChallengeID(), false);
}

function getNextPlayer() {
    //This function should check "nextPlayer" field of the current turn in the turn data
    //If no turn data, current turn is player 1
    var player = 1;

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
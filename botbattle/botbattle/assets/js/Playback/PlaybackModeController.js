function retrieveMatch() {
    PLAYBACK_MODE = true;
    var matchID = getMatchID();

    //Handle query string errors
    if (matchID == -1) {
        /* No match id was provided in the query string */
        sendError(10, "");
    }
    else {
        getMatch(matchID);
    }
}

function handleCommands(winner, initMessage, turnData) {
    gameInitializer = initMessage;
    turns = turnData;
    create();
}
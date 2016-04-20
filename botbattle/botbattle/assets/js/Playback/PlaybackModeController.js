function retrieveMatch() {
    PLAYBACK_MODE = true;
    var matchID = getMatchID();

    //Handle query string errors
    if (matchID == -1) {
        /*No match id was provided in the query string
          Redirect them to an error page with links and
          possible causes of error */
        sendError(10, "");
    }
    else {
        //setInput();
        getMatch(matchID);
    }
}

function handleCommands(winner, initMessage, turnData) {
    gameInitializer = initMessage;
    turns = turnData;
    console.log("Set database commands to GDM vars.");
    create();
}
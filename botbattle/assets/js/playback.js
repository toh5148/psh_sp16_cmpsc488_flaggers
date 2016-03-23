/*  Functions in here are used to control the playback
    options of playback mode within a display session */

function GoToStart() {
    /*If we're storing the entire set of moves, we should just be 
    able to grab the 'Game Initialization Message' to line pieces up */
	restoreGameState(0);
	startTurn(0,false);
}

function StepBackOneTurn() {
    /* We'll probably have to start at the beginning of the match
    and keep track of the last position of each entity up until
    one turn before the current turn and make those adjustments */
	restoreGameState(turn-1);
}

function Pause() {
    /* Should just stop updating the rendering */
	playing=false;
}

function Play() {
    /* Should be able to just start playing from current position
    (turn number) at the speed adjustment given as a multiplier */
	playing=true;
}

function StepForwardOneTurn() {
    /* Make adjustments for the next turn and pause at the start */
	restoreGameState(turn+1);
}

function GoToEnd() {
    /* Go to the end of the game and show the final positions
    of each of the entities */
	restoreGameState(turns.length);
}

function ChangePlaybackSpeed(newSpeed) {
    /* Change the playback speed of this 'class'...should continue
    in whichever mode (play/paused) that it was in before */
	playbackSpeed=newSpeed;
}

function retrieveMatch() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var matchID = -1;
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == "matchid") {
            matchID = pair[1];
            break;
        }
    }
}
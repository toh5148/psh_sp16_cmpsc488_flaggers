var curStatus = null;

//'turn' variable referenced is stored in GameDisplayModule.js

const CONST_PAUSED = "Paused";
const CONST_PLAYING = "Playing";
const CONST_START = "Start of Match";
const CONST_END = "End of Match";

function goToStart() {
    setPlaybackStatus(CONST_START);
    restoreGameState(0);
}

function stepBackOneTurn() {
    setPlaybackStatus(CONST_PAUSED);
    restoreGameState(turn - 1);
}

function pause() {
    setPlaybackStatus(CONST_PAUSED);
    console.log("Pause clicked");
    playing = false;
}

function play() {
    setPlaybackStatus(CONST_PLAYING);
    playing = true;
}

function stepForwardOneTurn() {
    setPlaybackStatus(CONST_PAUSED);
    restoreGameState(turn + 1); /// Turn stored in 
}

function goToEnd() {
    setPlaybackStatus(CONST_END);
    restoreGameState(turns.length);
}

function changePlaybackSpeed() {
    var newSpeed = document.getElementById("sldr_Speed").value;
    playbackSpeed = newSpeed;
}

function setPlaybackStatus(statusMessage) {
    if (curStatus == null) {
        curStatus = statusMessage;
    }
    document.getElementById("div_status").innerHTML = "Status: " + statusMessage;
}
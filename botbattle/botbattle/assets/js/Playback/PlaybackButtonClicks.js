var curStatus = null;

//'turn' variable referenced is stored in GameDisplayModule.js

const CONST_PAUSED = "Paused";
const CONST_PLAYING = "Playing";
const CONST_START = "Start of Match";
const CONST_END = "End of Match";

function btn_goToStart_Click() {
    setPlaybackStatus(CONST_START);
    restoreGameState(0);
}

function btn_stepBack_Click() {
    setPlaybackStatus(CONST_PAUSED);
    restoreGameState(turn - 1);
}

function btn_pause_Click() {
    setPlaybackStatus(CONST_PAUSED);
    console.log("Pause clicked");
    playing = false;
}

function btn_play_Click() {
    setPlaybackStatus(CONST_PLAYING);
    playing = true;
}

function btn_stepForward_Click() {
    setPlaybackStatus(CONST_PAUSED);
    restoreGameState(turn + 1); /// Turn stored in 
}

function btn_goToEnd_Click() {
    setPlaybackStatus(CONST_END);
    restoreGameState(turns.length);
}

function sldr_speed_change() {
    var newSpeed = document.getElementById("sldr_Speed").value;
    playbackSpeed = newSpeed;
}

function setPlaybackStatus(statusMessage) {
    if (curStatus == null) {
        curStatus = statusMessage;
    }
    document.getElementById("div_status").innerHTML = "Status: " + statusMessage;
}
function goToStart() {
    restoreGameState(0);
}

function stepBackOneTurn() {
    restoreGameState(turn - 1);
}

function pause() {
    playing = false;
}

function play() {
    playing = true;
}

function stepForwardOneTurn() {
    restoreGameState(turn + 1);
}

function goToEnd() {
    restoreGameState(turns.length);
}

function changePlaybackSpeed() {
    var newSpeed = document.getElementById("sldr_Speed").value;
    playbackSpeed = newSpeed;
}
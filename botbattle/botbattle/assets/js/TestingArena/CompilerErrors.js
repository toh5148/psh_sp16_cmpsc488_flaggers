

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
function beginPageLoad() {
    var cid = getChallengeID(); //from QueryStringFunctions.js

    if (cid == -1) {
        // No challenge specified...send them to error page;
        window.location.href = "error.html";
        sendError("mes=t1");
    }
    else {
        //Passed all error checks
        //Begin Testing Mode initilization
        initTestingArena(cid);
    }

}


function sendError(qString) {
    window.location.href = "error.html?" + qString;
}

function initTestingArena(cid) {

}
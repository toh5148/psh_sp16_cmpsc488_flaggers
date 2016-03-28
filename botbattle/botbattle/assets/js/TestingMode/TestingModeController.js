function beginPageLoad() {
    //This function will retrieve a "cid" from the query string
    //If it cannot retrieve a cid, it will redirect to the "error.html"
    //page wth an appropriate error specified in a query string...
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var matchID = -1;
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "cid")  // Request 'cid' as the query string....TODO: Tom might change
        {
            matchID = pair[1];
            break;
        }
    }

    if(cid==-1) { // No challenge specified...send them to error page;
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
    window.location.href = "error.html" + qString;
}

function initTestingArena(cid) {

}
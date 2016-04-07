
function getChallengeID() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "cid") {
            return pair[1];
            break;
        }
    }

    return -1;
}

function getMatchID() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "mid") {
            return pair[1];
            break;
        }
    }

    return -1;
}

function getMessageID() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == "mes") {
            return pair[1];
            break;
        }
    }

    return null;
}
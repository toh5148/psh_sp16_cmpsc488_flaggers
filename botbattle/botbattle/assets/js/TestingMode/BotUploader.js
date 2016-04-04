
// Create the XHR object used to send CORS calls to the server
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function upload(playerNum) {
    var uploadType = getUploadType(playerNum);
    //Verified - upload type will hold number 1-4, or -1 in case of 'alien pig sighting'?
    switch (uploadType) {
        //If default or public, there is no upload necessary
        //1 - Upload File - upload file directly
        //2 - Edit Code - take code from correct editor, create file and upload
        //3 - Public - may not exist (publically), but we don't upload
        //4 - Default - should definitely exist
        case 1:
            uploadFileChoice(playerNum);
            break;
        case 2:
            uploadCodeChoice(playerNum);
            break;
        case 3:
            publicBotChoice(playerNum);
            break;
        case 4:
            defaultBotChoice(playerNum);
            break
        default:
            //setError("mes=t2");
            break;
    }
}

function getUploadType(playerNum) {
    //This function will check which of the '4' options (Upload, code, public, default)
    //are selected and return an int value relating to the correct option
    //1 - Upload File
    //2 - Edit Code
    //3 - Public
    //4 - Default
    var str_upload = "rb_p" + playerNum + "Upload";
    var str_edit = "rb_p" + playerNum + "Edit";
    var str_public = "rb_p" + playerNum + "Public";
    var str_default = "rb_p" + playerNum + "Default";

    if (document.getElementById(str_upload).checked) {
        return 1;
    }
    else if (document.getElementById(str_edit).checked) {
        return 2;
    }
    else if (document.getElementById(str_public).checked) {
        return 3;
    }
    else if (document.getElementById(str_default).checked) {
        return 4;
    }
    else {
        return -1;
    }
}

function uploadFileChoice(playerNum) {
    var selectedFile = document.getElementById("file_p" + playerNum + "Upload").files[0];
    alert(selectedFile.name);
    //Can send this file up to server now
}

function uploadCodeChoice(playerNum) {
    var editor = ace.edit("div_editorP1");
    var selectedCode = editor.getValue();
    alert(selectedCode);
    // has text to send to server now
     var url = 'http://localhost:5050/UploadBot;
     
    // Create the CORS request to the server
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
}

function publicBotChoice(playerNum) {
    
}

function defaultBotChoice(playerNum) {

}

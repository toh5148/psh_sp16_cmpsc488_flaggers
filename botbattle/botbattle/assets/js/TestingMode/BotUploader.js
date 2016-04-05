﻿
var base_url = 'http://localhost:5050';

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
    //  Current Test Arena Bots Scheme - as of 4/3/16 9:58pm

    //  CREATE TABLE IF NOT EXISTS `test_arena_bots` (
    //  `uid` int(11) NOT NULL,
    //  `challenge_id` int(11) NOT NULL,
    //  `language_id` int(11) NOT NULL DEFAULT 1,
    //  `needs_compiled` bit(1) NOT NULL DEFAULT 1,
    //  `errors`   int(11), 
    //  `warnings` int(11),
    //  `error_messages` text,
    //  `warning_messages` text,
    //  `source_code` mediumtext NOT NULL,
    //  PRIMARY KEY (`uid`, `challenge_id`, `language_id`),
    //  KEY (`uid`),
    //  KEY (`challenge_id`),
    //  KEY (`language_id`))

    var uid = 123;
    var challenge_id = 1;
    var language_id = 1;
    var needs_compiled = 1;
    var errors = 0;
    var warnings = 0;
    var error_messages = "errors...";
    var warning_messages = "warnings...";

    //File will fulfill 'source_code' - TODO: Server code to handle extracting text from file
    var selectedFile = document.getElementById("file_p" + playerNum + "Upload").files[0];

    uploadFile(selectedFile, uid, challenge_id, language_id, needs_compiled);
}

function uploadFile(electedFile, uid, challenge_id, language_id, needs_compiled) {
    //TODO: Write all code to interact with the server in this function
    //Tom will provide all needed parameters for the database as arguments
    //in a call to this function, still deciding where it will go to but
    //most likey just call a function with the BOT_ID and/or error messages
    //as arguments.
    var url = base_url + "/uploadFile$uid=" + uid + "&cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(selectedFile);

    xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
     if (xhr.status === OK) 
      console.log(xhr.responseText); // 'This is the returned text.'
    } 
    else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
    //This should be similar to uploadCode except you're sending a file up
    //instead of the code and handle it differently within the server function
}

function uploadCodeChoice(playerNum) {
    //  Current Test Arena Bots Scheme - as of 4/3/16 9:58pm

    //  CREATE TABLE IF NOT EXISTS `test_arena_bots` (
    //  `uid` int(11) NOT NULL,
    //  `challenge_id` int(11) NOT NULL,
    //  `language_id` int(11) NOT NULL DEFAULT 1,
    //  `needs_compiled` bit(1) NOT NULL DEFAULT 1,
    //  `errors`   int(11), 
    //  `warnings` int(11),
    //  `error_messages` text,
    //  `warning_messages` text,
    //  `source_code` mediumtext NOT NULL,
    //  PRIMARY KEY (`uid`, `challenge_id`, `language_id`),
    //  KEY (`uid`),
    //  KEY (`challenge_id`),
    //  KEY (`language_id`))

    var uid = 123;
    var challenge_id = 1;
    var language_id = 1;
    var needs_compiled = 1;
    var errors = 0;
    var warnings = 0;
    var error_messages = "errors...";
    var warning_messages = "warnings...";

    var selectedCode = ace.edit("div_editorP" + playerNum).getValue();

    uploadCode(selectedCode, uid, challenge_id, language_id, needs_compiled);
}

function uploadCode(selectedCode, uid, challenge_id, language_id, needs_compiled) {
    //TODO: Write all code to interact with the server in this function
    //Tom will provide all needed parameters for the database as arguments
    //in a call to this function, still deciding where it will go to but
    //most likey just call a function with the BOT_ID and/or error messages
    //as arguments.
    var url = base_url + "/uploadCode$uid=" + uid + "&cid=" + challenge_id + "&lid=" + language_id + "&needs_compiled=" + needs_compiled;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(selectedCode);

    xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
     if (xhr.status === OK) 
      console.log(xhr.responseText); // 'This is the returned text.'
    } 
    else {
      console.log('Error: ' + xhr.status); // An error occurred during the request.
    }
  }
}

function publicBotChoice(playerNum) {
    //Should grab name of bot and attempt to find it in one of the databases...
    //Return an error code if it isn't found or isn't public
}

function defaultBotChoice(playerNum) {
    //Should have some default bot selection for each challenge...
    //I'm still figuring out where this is stored
}

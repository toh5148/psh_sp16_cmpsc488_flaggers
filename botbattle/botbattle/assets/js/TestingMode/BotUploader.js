
function readText(f, playerNum) {
    //This function is called by onchange of the input file type
    //in the testing arena html page. It will change the code in the
    //code editor to the text contents of the file selected.
    var editor = ace.edit("div_editorP" + playerNum);
    if (f.files && f.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            editor.setValue(output.toString(), 1);
        };
        reader.readAsText(f.files[0]);
    }
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
            break;
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
    //Since we're just placing the code from the file in the code editor,
    //for the sake of writing duplicate code, just call uploadCodeChoice(playerNum)
    //from within here..

    uploadCodeChoice(playerNum);
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
    var challenge_id = getChallengeID();
    var language_id = 1;
    var needs_compiled = 1;
    var errors = 0;
    var warnings = 0;
    var error_messages = 'none';
    var warning_messages = 'none';

    var selectedCode = ace.edit("div_editorP" + playerNum).getValue();
    //alert("a");
    uploadCode(selectedCode, uid, challenge_id, language_id, needs_compiled);
}

function publicBotChoice(playerNum) {
    //Should grab name of bot and attempt to find it in one of the databases...
    //Return an error code if it isn't found or isn't public
}

function defaultBotChoice(playerNum) {
    //Should have some default bot selection for each challenge...
    //I'm still figuring out where this is stored
}

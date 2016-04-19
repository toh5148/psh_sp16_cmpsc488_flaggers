function setLanguageVariables(languages) {
    var languagesLeft = true;
    var i = 0;
    var j = 0;

    while (languagesLeft) {
        languageNames[j] = languages[i];
        languageIDs[j] = languages[i+1];

        i = i + 2;
        j = j + 1;

        if(languages[i] == undefined) {
            languagesLeft = false;
        }
    }

    //Combination of languageNames[a] and languageIDs[a] links the language to it's value/id
}

function setTemplateVariables(templates) {
    var templatesLeft = true;
    var i = 0;

    var tempSource;
    var tempID;

    while (templatesLeft) {
        tempSource = templates[i];
        tempID = templates[i + 1];
        
        for(var j = 0; j < languageIDs.length; j++) {
            if(languageIDs[j] == tempID) {
                templatesCode[j] = tempSource;
            }
        }

        i = i + 2;

        if (templates[i] == undefined) {
            templatesLeft = false;
        }
    }


    setLanguageAndTemplates();
    //Combination of templatesCode[a] and languageIDs[a] links the templateCode to it's value/id
}

function setLanguageAndTemplates() {
    //Function will set languages drop down and first listed source code to the editor
    for (var i = 1; i <= 2; i++) {
        document.getElementById("ddl_languages" + i).innerHTML = "";

        for (var j = 0; j < languageIDs.length; j++) {
            document.getElementById("ddl_languages" + i).innerHTML += "<option value=\'" + languageIDs[j] + "\'>" + languageNames[j] + "</option>";
        }
        var editor = ace.edit("div_editorP" + i);
        editor.setValue(templatesCode[0]);
    }
}

function langChange(playerNum) {
    var changeTemplates = document.getElementById("chk_changeTemplates" + playerNum).checked;
    console.log(changeTemplates);
    if (changeTemplates) {
        var editor = ace.edit("div_editorP" + playerNum);
        var value = document.getElementById("ddl_languages" + playerNum).value;
        for (var j = 0; j < languageIDs.length; j++) {
            if (languageIDs[j] == value) {
                editor.setValue(templatesCode[j]);
            }
        }
    }
}
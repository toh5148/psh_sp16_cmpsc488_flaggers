var playerTabSelected = 1;

function tab_click(ele) {
    var ID = ele.id;

    resetAllTabs();

    switch (ID) {
        case "tabs_player1":
            document.getElementById("div_Player1Tab").className = "main_tab";
            document.getElementById("tabs_player1").className = "tab_select";
            playerTabSelected = 1;
            break;
        case "tabs_player2":
            document.getElementById("div_Player2Tab").className = "main_tab";
            document.getElementById("tabs_player2").className = "tab_select";
            playerTabSelected = 2;
            break;
        case "tabs_gamedisplay":
            document.getElementById("div_GameDisplayTab").className = "main_tab";
            document.getElementById("tabs_gamedisplay").className = "tab_select";
            break;
    }
}

function resetAllTabs() {
    //Containers
    document.getElementById("div_Player1Tab").className = "main_tab_hidden";
    document.getElementById("div_Player2Tab").className = "main_tab_hidden";
    document.getElementById("div_GameDisplayTab").className = "main_tab_hidden";

    //Tabs
    document.getElementById("tabs_player1").className = "tab_noselect";
    document.getElementById("tabs_player2").className = "tab_noselect";
    document.getElementById("tabs_gamedisplay").className = "tab_noselect";
}

function Player1_BotTypeClick(ele) {
    var value = ele.value;

    document.getElementById("div_editorHolder1").style.display = "none";
    document.getElementById("file_p1Upload").style.display = "none";
    document.getElementById("div_p1PublicBot").style.display = "none";
    document.getElementById("btn_P1Save").style.display = "none";

    switch (value) {
        case "UploadFile":
            document.getElementById("file_p1Upload").style.display = "block";
            document.getElementById("btn_P1Save").style.display = "block";
            Player_1_Bot_Type = TEST_ARENA_STRING;
            break;
        case "EditCode":
            document.getElementById("div_editorHolder1").style.display = "inline-block";
            var editor = ace.edit("div_editorP1");
            editor.resize();
            document.getElementById("btn_P1Save").style.display = "block";
            Player_1_Bot_Type = TEST_ARENA_STRING;
            break;
        case "PublicBot":
            document.getElementById("div_p1PublicBot").style.display = "block";
            Player_1_Bot_Type = USER_STRING;
            break;
    }
}

function Player2_BotTypeClick(ele) {
    var value = ele.value;

    document.getElementById("div_editorHolder2").style.display = "none";
    document.getElementById("file_p2Upload").style.display = "none";
    document.getElementById("div_p2PublicBot").style.display = "none";
    document.getElementById("btn_P2Save").style.display = "none";

    switch (value) {
        case "UploadFile":
            document.getElementById("file_p2Upload").style.display = "block";
            document.getElementById("btn_P2Save").style.display = "block";
            Player_2_Bot_Type = TEST_ARENA_STRING;
            break;
        case "EditCode":
            document.getElementById("div_editorHolder2").style.display = "inline-block";
            var editor = ace.edit("div_editorP2");
            editor.resize();
            document.getElementById("btn_P2Save").style.display = "none";
            Player_2_Bot_Type = TEST_ARENA_STRING;
            break;
        case "PublicBot":
            document.getElementById("div_p2PublicBot").style.display = "block";
            Player_2_Bot_Type = USER_STRING;
            break;
        case "PreloadedBot":
            break;
    }
}

function UploadBot_click(ele) {
    var ID = ele.id;
    switch (ID) {
        case "btn_P1Upload":
            upload(1);
            break;
        case "btn_P2Upload":
            upload(2);
            break;
    }
}

function SaveBot_click(ele) {
    var ID = ele.id;
    switch (ID) {
        case "btn_P1Save":
            saveBot(1);
            break;
        case "btn_P2Save":
            saveBot(2);
            break;
    }
}

function next_click() {
    doNextTurn();
}

function undo_click() {
    restoreGameState(turn - 1);
}
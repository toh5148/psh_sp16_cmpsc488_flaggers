var P1_Change = -1, P2_Change = -1;

function tab_click(ele) {
    var ID = ele.id;

    resetAllTabs();

    switch (ID) {
        case "tabs_player1":
            document.getElementById("div_Player1Tab").className = "main_tab";
            document.getElementById("tabs_player1").className = "tab_select";
            break;
        case "tabs_player2":
            document.getElementById("div_Player2Tab").className = "main_tab";
            document.getElementById("tabs_player2").className = "tab_select";
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

    switch (value) {
        case "UploadFile":
            document.getElementById("div_editorP1").style.display = "none";
            document.getElementById("file_p1Upload").style.display = "block";
            document.getElementById("div_p1PublicBot").style.display = "none";
            break;
        case "EditCode":
            document.getElementById("div_editorP1").style.display = "inline-block";
            document.getElementById("file_p1Upload").style.display = "none";
            document.getElementById("div_p1PublicBot").style.display = "none";
            break;
        case "PublicBot":
            document.getElementById("div_editorP1").style.display = "none";
            document.getElementById("file_p1Upload").style.display = "none";
            document.getElementById("div_p1PublicBot").style.display = "block";
            break;
        case "PreloadedBot":
            document.getElementById("div_editorP1").style.display = "none";
            document.getElementById("file_p1Upload").style.display = "none";
            document.getElementById("div_p1PublicBot").style.display = "none";
            break;
    }
}

function Player2_BotTypeClick(ele) {
    var value = ele.value;

    switch (value) {
        case "UploadFile":
            document.getElementById("div_editorP2").style.display = "none";
            document.getElementById("file_p2Upload").style.display = "block";
            document.getElementById("div_p2PublicBot").style.display = "none";
            break;
        case "EditCode":
            document.getElementById("div_editorP2").style.display = "inline-block";
            document.getElementById("file_p2Upload").style.display = "none";
            document.getElementById("div_p2PublicBot").style.display = "none";
            break;
        case "PublicBot":
            document.getElementById("div_editorP2").style.display = "none";
            document.getElementById("file_p2Upload").style.display = "none";
            document.getElementById("div_p2PublicBot").style.display = "block";
            break;
        case "PreloadedBot":
            document.getElementById("div_editorP2").style.display = "none";
            document.getElementById("file_p2Upload").style.display = "none";
            document.getElementById("div_p2PublicBot").style.display = "none";
            break;
    }
}

function UploadBot_click(ele) {
    var ID = ele.id;

    switch (ID) {
        case "btn_P1Upload":
            P1_Change = false;
            upload(1);
            break;
        case "btn_P2Upload":
            P2_Change = false;
            upload(2);
            break;
    }

    if(!P2_Change && !P1_Change)
    {
        document.getElementById("div_uploadWarnings").style.display = "none";
    }
}

function next_click() {

}

function undo_click() {

}
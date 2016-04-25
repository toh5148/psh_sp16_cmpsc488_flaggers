function setInput() {
    setGameInit();
    setGameTurns();
    console.log("Set database commands to Test Command Vars");
    create();
}

function setGameInit() {
    gameInitializer = {
        "background": "assets/images/background.png",
        "defaultTimestep": 1,
        "defaultBot": 1,
        "imagesToLoad": [{
            "imagePath": "games/checkers/basic_red.png",
            "name": "basic_red"
        },
            {
                "imagePath": "games/checkers/king_red.png",
                "name": "king_red"
            }
        ],
        "entity": [
            {
                "id": 101,
                "type": "spriteRabbit",
                "visible": true,
                "initX": 50,
                "initY": 100,
                "width": 50,
                "height": 50,
                "flipped": false,
                "rotation": 0
            },
            {
                "id": 102,
                "type": "spriteChicken",
                "visible": true,
                "initX": 500,
                "initY": 400,
                "width": 50,
                "height": 50,
                "flipped": true,
                "rotation": 0
            },
            {
                "id": 103,
                "type": "object",
                "visible": true,
                "initX": 250,
                "initY": 350,
                "width": 50,
                "height": 50,
                "flipped": true,
                "rotation": 0,
                "value": "basic_red"
            },
            {
                "id": 104,
                "type": "text",
                "visible": true,
                "initX": 50,
                "initY": 50,
                "width": 50,
                "height": 50,
                "flipped": false,
                "rotation": 0,
                "value": "Turn: 1",
                "font": "30pt Arial",
                "fill": "#00FF00",
                "backgroundColor": "#808080"
            }
        ],
        "stdin": "111",
        "stdout": ["222","222"],
        "stderr": "333"
    };
}

function setGameTurns() {
    turns = [
        {
            "timescale": 1,
            "currentPlayer": 1,
            "nextPlayer": 2,
            "stdin": "aaa",
            "stdout": "bbb",
            "stderr": "ccc",
            "turnChanges": [
                {
                    "id": 101,
                    "changes": [
                        {
                            "action": "walk",
                            "start": 0,
                            "end": 0.2,
                            "x": 300,
                            "y": 200
                        },
                        {
                            "action": "walk",
                            "start": 0.2,
                            "end": 0.3,
                            "x": 350,
                            "y": 150
                        },
                        {
                            "action": "walk",
                            "start": 0.3,
                            "end": 1,
                            "x": 300,
                            "y": 50,
                            "rotation": 90
                        }
                    ]
                },
                {
                    "id": 102,
                    "changes": [
                        {
                            "action": "walk",
                            "start": 0,
                            "end": 0.8,
                            "x": 550,
                            "y": 450,
                            "width": 200,
                            "height": 200
                        }
                    ]
                },
                {
                    "id": 103,
                    "changes": [
                        {
                            "action": "move",
                            "start": 0.9,
                            "end": 1,
                            "x": 250,
                            "y": 250,
                            "width": 50,
                            "height": 50,
                            "rotation": 360
                        }
                    ]
                },
                {
                    "id": 104,
                    "changes": [
                        {
                            "action": "setText",
                            "start": 1,
                            "value": "Turn: 2",
                            "fill": "#000000"
                        }
                    ]
                }
            ]
        },
        {
            "timescale": 2,
            "currentPlayer": 2,
            "nextPlayer": 1,
            "stdin": "aaa",
            "stdout": "bbb",
            "stderr": "ccc",
            "turnChanges": [
                {
                    "id": 101,
                    "changes": [
                        {
                            "start": 0,
                            "end": 0.2,
                            "x": 300,
                            "y": 200
                        },
                        {
                            "start": 0.2,
                            "end": 0.3,
                            "x": 350,
                            "y": 150
                        },
                        {
                            "start": 0.3,
                            "end": 1,
                            "x": 50,
                            "y": 100,
                            "rotation": 90
                        }
                    ]
                },
                {
                    "id": 102,
                    "changes": [
                        {
                            "action": "walk",
                            "visible": false,
                            "start": 0.2,
                            "end": 0.8
                        }
                    ]
                },
                {
                    "id": 104,
                    "changes": [
                        {
                            "action": "setText",
                            "start": 1,
                            "value": "Turn: 3",
                            "backgroundColor": "rgba(255,0,0,0.25)",
                            "fill": "#808080",
                            "fontStyle": "italic",
                            "fontWeight": "bold",
                            "fontSize": 5
                        }
                    ]
                },
                {
                    "id": 103,
                    "changes": [
                        {
                            "start": 1,
                            "value": "king_red"
                        }
                    ]
                },
                {
                    "id": 105,
                    "changes": [
                        {
                            "start": 0.3,
                            "create": {
                                "id": 105,
                                "type": "spriteMummy",
                                "visible": true,
                                "initX": 500,
                                "initY": 400,
                                "width": 50,
                                "height": 50,
                                "flipped": true,
                                "rotation": 0
                            }
                        },
                        {
                            "action": "walk",
                            "visible": true,
                            "x": 700,
                            "y": 500,
                            "start": 0.5,
                            "end": 0.8
                        }
                    ]
                }
            ],
        },
        {
            "timescale": 1,
            "currentPlayer": 1,
            "nextPlayer": 2,
            "stdin": "aaa",
            "stdout": "bbb",
            "stderr": "ccc",
            "turnChanges": [
                {
                    "id": 101,
                    "changes": [
                        {
                            "action": "walk",
                            "start": 0,
                            "end": 0.2,
                            "x": 300,
                            "y": 200
                        },
                        {
                            "action": "walk",
                            "start": 0.2,
                            "end": 0.3,
                            "x": 350,
                            "y": 150
                        },
                        {
                            "action": "walk",
                            "start": 0.3,
                            "end": 1,
                            "x": 300,
                            "y": 50
                        }
                    ]
                },
                {
                    "id": 102,
                    "changes": [
                        {
                            "action": "walk",
                            "visible": true,
                            "start": 0.2,
                            "end": 0.8,
                            "x": 400,
                            "y": 300,
                            "flipped": false
                        }
                    ]
                },
                {
                    "id": 103,
                    "changes": [
                        {
                            "action": "jump",
                            "start": 0,
                            "end": 1,
                            "x": 450,
                            "y": 250,
                        }
                    ]
                },
                {
                    "id": 104,
                    "changes": [
                        {
                            "action": "setText",
                            "start": 1,
                            "value": "Turn: 4"
                        }
                    ]
                }
            ],
        },
        {
            "timescale": 1,
            "currentPlayer": 2,
            "nextPlayer": 1,
            "stdin": "aaa",
            "stdout": "bbb",
            "stderr": "ccc",
            "turnChanges": [
                {
                    "id": 101,
                    "changes": [
                        {
                            "action": "walk",
                            "start": 0,
                            "end": 0.2,
                            "x": 300,
                            "y": 200
                        },
                        {
                            "action": "walk",
                            "start": 0.2,
                            "end": 0.3,
                            "x": 350,
                            "y": 150
                        },
                        {
                            "action": "walk",
                            "start": 0.3,
                            "end": 1,
                            "x": 300,
                            "y": 50
                        }
                    ]
                },
                {
                    "id": 102,
                    "changes": [
                        {
                            "action": "walk",
                            "visible": true,
                            "start": 0.2,
                            "end": 0.8,
                            "x": 400,
                            "y": 300,
                            "flipped": false
                        }
                    ]
                },
                {
                    "id": 103,
                    "changes": [
                        {
                            "action": "jump",
                            "start": 0,
                            "end": 1,
                            "x": 450,
                            "y": 250,
                        }
                    ]
                },
                {
                    "id": 104,
                    "changes": [
                        {
                            "action": "setText",
                            "start": 1,
                            "value": "Turn: 4"
                        }
                    ]
                }
            ],
        }
    ];

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*function setGameInit() {
    gameInitializer = {"background":"games/checkers/CheckerBoard.png","defaultTimestep":1.0,"defaultBot":1,"imagesToLoad":[{"imagePath":"games/checkers/basic_red.png","name":"basic_red"},{"imagePath":"games/checkers/basic_white.png","name":"basic_white"},{"imagePath":"games/checkers/king_red.png","name":"king_red"},{"imagePath":"games/checkers/king_white.png","name":"king_white"}],"entity":[{"id":1,"type":"object","visible":true,"initX":160,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":2,"type":"object","visible":true,"initX":280,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":3,"type":"object","visible":true,"initX":400,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":4,"type":"object","visible":true,"initX":520,"initY":60,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":5,"type":"object","visible":true,"initX":220,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":6,"type":"object","visible":true,"initX":340,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":7,"type":"object","visible":true,"initX":460,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":8,"type":"object","visible":true,"initX":580,"initY":120,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":9,"type":"object","visible":true,"initX":160,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":10,"type":"object","visible":true,"initX":280,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":11,"type":"object","visible":true,"initX":400,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":12,"type":"object","visible":true,"initX":520,"initY":180,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":13,"type":"object","visible":true,"initX":220,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":14,"type":"object","visible":true,"initX":340,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":15,"type":"object","visible":true,"initX":460,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":16,"type":"object","visible":true,"initX":580,"initY":360,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":17,"type":"object","visible":true,"initX":160,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":18,"type":"object","visible":true,"initX":280,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":19,"type":"object","visible":true,"initX":400,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":20,"type":"object","visible":true,"initX":520,"initY":420,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":21,"type":"object","visible":true,"initX":220,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":22,"type":"object","visible":true,"initX":340,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":23,"type":"object","visible":true,"initX":460,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":24,"type":"object","visible":true,"initX":580,"initY":480,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"}]}
}

function setGameTurns() {
    turns = [{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n21212101\n10101012\n01010101\n14141414\n41414141\n14141414\n","stdout":"G3H4"},{"timescale":1.0,"turnChanges":[{"id":15,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n21212101\n10101012\n01014101\n14141014\n41414141\n14141414\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":7,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121012\n21212121\n10101012\n01014101\n14141014\n41414141\n14141414\n","stdout":"F2G3"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121012\n21212121\n10101012\n01414101\n10141014\n41414141\n14141414\n","stdout":"B6C5"},{"timescale":1.0,"turnChanges":[{"id":7,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121012\n21212101\n10101212\n01414101\n10141014\n41414141\n14141414\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":15,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}},{"id":7,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121012\n21212141\n10101012\n01410101\n10141014\n41414141\n14141414\n","stdout":"E5G3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}},{"id":15,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n21212101\n10101212\n01410101\n10141014\n41414141\n14141414\n","stdout":"H2F4"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n21212101\n10101212\n01410101\n14141014\n01414141\n14141414\n","stdout":"A7B6"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n21212101\n10101012\n01410121\n14141014\n01414141\n14141414\n","stdout":"F4G5"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}},{"id":8,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n21212101\n10101412\n01410101\n14141010\n01414141\n14141414\n","stdout":"H6F4"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n21210101\n10101412\n01410121\n14141010\n01414141\n14141414\n","stdout":"E3G5"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n21210101\n10101412\n01410121\n14141410\n01410141\n14141414\n","stdout":"E7F6"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":420}},{"id":19,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n21210101\n10101412\n01410101\n14141010\n01412141\n14141414\n","stdout":"G5E7"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}},{"id":11,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n21210101\n10101412\n01410101\n14141410\n01410141\n14101414\n","stdout":"D8F6"},{"timescale":1.0,"turnChanges":[{"id":9,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n01210101\n12101412\n01410101\n14141410\n01410141\n14101414\n","stdout":"A3B4"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":180}},{"id":9,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n41210101\n10101412\n01010101\n14141410\n01410141\n14101414\n","stdout":"C5A3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121010\n41010101\n12101412\n01010101\n14141410\n01410141\n14101414\n","stdout":"C3B4"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121010\n41010101\n12101412\n01410101\n10141410\n01410141\n14101414\n","stdout":"B6C5"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n10121010\n41210101\n12101412\n01410101\n10141410\n01410141\n14101414\n","stdout":"B2C3"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n10121010\n41210101\n12101412\n01414101\n10141010\n01410141\n14101414\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n10121010\n41010101\n12121412\n01414101\n10141010\n01410141\n14101414\n","stdout":"C3D4"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}},{"id":5,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n10121010\n41410101\n12101412\n01410101\n10141010\n01410141\n14101414\n","stdout":"E5C3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n10121010\n41410101\n10101412\n21410101\n10141010\n01410141\n14101414\n","stdout":"B4A5"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n14121010\n01410101\n10101412\n21410101\n10141010\n01410141\n14101414\n","stdout":"A3B2"},{"timescale":1.0,"turnChanges":[{"id":6,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}},{"id":22,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n14101010\n01010101\n12101412\n21410101\n10141010\n01410141\n14101414\n","stdout":"D2B4"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":180}},{"id":6,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n14101010\n41010101\n10101412\n21010101\n10141010\n01410141\n14101414\n","stdout":"C5A3"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01212121\n14101010\n41210101\n10101412\n21010101\n10141010\n01410141\n14101414\n","stdout":"A1C3"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01212121\n14101010\n41210101\n10101412\n21410101\n10101010\n01410141\n14101414\n","stdout":"D6C5"},{"timescale":1.0,"turnChanges":[{"id":2,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":120}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01012121\n14121010\n41210101\n10101412\n21410101\n10101010\n01410141\n14101414\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01012121\n14121010\n41210101\n10101412\n21410101\n10101014\n01410101\n14101414\n","stdout":"G7H6"},{"timescale":1.0,"turnChanges":[{"id":2,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01012121\n14101010\n41212101\n10101412\n21410101\n10101014\n01410101\n14101414\n","stdout":"D2E3"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":120}},{"id":2,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01012121\n14141010\n41210101\n10101012\n21410101\n10101014\n01410101\n14101414\n","stdout":"F4D2"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01012121\n14141010\n41010101\n12101012\n21410101\n10101014\n01410101\n14101414\n","stdout":"C3B4"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":420}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01012121\n14141010\n41010101\n12101012\n21410101\n10101014\n01410141\n14101410\n","stdout":"H8G7"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}},{"id":16,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01010121\n14101010\n41210101\n12101012\n21410101\n10101014\n01410141\n14101410\n","stdout":"E1C3"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01010121\n14101010\n41210101\n12101012\n21410101\n14101014\n01010141\n14101410\n","stdout":"C7B6"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":360}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01010121\n14101010\n41210101\n10101012\n21410101\n14121014\n01010141\n14101410\n","stdout":"B4D6"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01010121\n14101010\n41210101\n10101012\n21410101\n14121414\n01010101\n14101410\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01010121\n14101010\n41210101\n10101012\n01410101\n14121414\n01210101\n14101410\n","stdout":"A5C7"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":420}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01010121\n14101010\n41210101\n10101012\n01410101\n14121414\n41210101\n10101410\n","stdout":"B8A7"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01010121\n14101010\n41010101\n12101012\n01410101\n14121414\n41210101\n10101410\n","stdout":"C3B4"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":60}},{"id":13,"changes":{"value":"king_white"}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510121\n10101010\n41010101\n12101012\n01410101\n14121414\n41210101\n10101410\n","stdout":"B2C1"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":480}},{"id":10,"changes":{"value":"king_red"}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510121\n10101010\n41010101\n12101012\n01410101\n14121414\n41010101\n13101410\n","stdout":"C7B8"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510121\n10101010\n41010101\n12101012\n41410101\n10121414\n41010101\n13101410\n","stdout":"B6A5"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":120}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n10101012\n41010101\n12101012\n41410101\n10121414\n41010101\n13101410\n","stdout":"G1H2"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}},{"id":3,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n10101012\n41410101\n10101012\n01410101\n10121414\n41010101\n13101410\n","stdout":"A5C3"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n10101012\n41410101\n10101012\n01410101\n10101414\n41012101\n13101410\n","stdout":"D6E7"},{"timescale":1.0,"turnChanges":[{"id":23,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":360}},{"id":1,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n10101012\n41410101\n10101012\n01410101\n10141414\n41010101\n13101010\n","stdout":"F8D6"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n10101010\n41410121\n10101012\n01410101\n10141414\n41010101\n13101010\n","stdout":"H2G3"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n10101010\n41410121\n10101012\n01410141\n10141410\n41010101\n13101010\n","stdout":"H6G5"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n10101010\n41410121\n10101012\n01410141\n10141410\n41310101\n10101010\n","stdout":"B8C7"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n14101010\n01410121\n10101012\n01410141\n10141410\n41310101\n10101010\n","stdout":"A3B2"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":300}},{"id":23,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n14101010\n01410121\n10101012\n01413141\n10101410\n41010101\n10101010\n","stdout":"C7E5"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":240}},{"id":10,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n14101010\n01410121\n10141012\n01410141\n10101010\n41010101\n10101010\n","stdout":"F6D4"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}},{"id":20,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n14101010\n01410121\n10141010\n01410101\n10101210\n41010101\n10101010\n","stdout":"H4F6"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n14101010\n01410121\n14141010\n01010101\n10101210\n41010101\n10101010\n","stdout":"C5B4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n14101010\n01410101\n14141210\n01010101\n10101210\n41010101\n10101010\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":180}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n14101010\n01414101\n14101210\n01010101\n10101210\n41010101\n10101010\n","stdout":"D4E3"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n14101010\n01414101\n14101010\n01010121\n10101210\n41010101\n10101010\n","stdout":"F4G5"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":180}}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n14101010\n41414101\n10101010\n01010121\n10101210\n41010101\n10101010\n","stdout":"B4A3"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":360}}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n14101010\n41414101\n10101010\n01010101\n10101212\n41010101\n10101010\n","stdout":"G5H6"},{"timescale":1.0,"turnChanges":[{"id":17,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":60}},{"id":17,"changes":{"value":"king_white"}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n10101010\n41414101\n10101010\n01010101\n10101212\n41010101\n10101010\n","stdout":"B2A1"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n10101010\n41414101\n10101010\n01010101\n10101012\n41010121\n10101010\n","stdout":"F6G7"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14101010\n01414101\n10101010\n01010101\n10101012\n41010121\n10101010\n","stdout":"A3B2"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":480}},{"id":12,"changes":{"value":"king_red"}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14101010\n01414101\n10101010\n01010101\n10101012\n41010101\n10101310\n","stdout":"G7F8"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14101410\n01410101\n10101010\n01010101\n10101012\n41010101\n10101310\n","stdout":"E3F2"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14101410\n01410101\n10101010\n01010101\n10101012\n41013101\n10101010\n","stdout":"F8E7"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":60}},{"id":24,"changes":{"value":"king_white"}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510151\n14101010\n01410101\n10101010\n01010101\n10101012\n41013101\n10101010\n","stdout":"F2G1"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":480}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510151\n14101010\n01410101\n10101010\n01010101\n10101012\n41010101\n10101310\n","stdout":"E7F8"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14101015\n01410101\n10101010\n01010101\n10101012\n41010101\n10101310\n","stdout":"G1H2"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14101015\n01410101\n10101010\n01010101\n10101012\n41010131\n10101010\n","stdout":"F8G7"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141015\n01010101\n10101010\n01010101\n10101012\n41010131\n10101010\n","stdout":"C3D2"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141015\n01010101\n10101010\n01010101\n10101312\n41010101\n10101010\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":60}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510151\n14141010\n01010101\n10101010\n01010101\n10101312\n41010101\n10101010\n","stdout":"H2G1"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510151\n14141010\n01010101\n10101010\n01010131\n10101012\n41010101\n10101010\n","stdout":"F6G5"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141015\n01010101\n10101010\n01010131\n10101012\n41010101\n10101010\n","stdout":"G1H2"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141015\n01010101\n10101310\n01010101\n10101012\n41010101\n10101010\n","stdout":"G5F4"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":360}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141015\n01010101\n10101310\n01010101\n14101012\n01010101\n10101010\n","stdout":"A7B6"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141015\n01010131\n10101010\n01010101\n14101012\n01010101\n10101010\n","stdout":"F4G3"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}},{"id":12,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141010\n01010101\n10101510\n01010101\n14101012\n01010101\n10101010\n","stdout":"H2F4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141010\n01010101\n10101510\n01010101\n14101010\n01010121\n10101010\n","stdout":"H6G7"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":300}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141010\n01010101\n10101510\n41010101\n10101010\n01010121\n10101010\n","stdout":"B6A5"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":480}},{"id":4,"changes":{"value":"king_red"}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141010\n01010101\n10101510\n41010101\n10101010\n01010101\n10101310\n","stdout":"G7F8"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141010\n01010151\n10101010\n41010101\n10101010\n01010101\n10101310\n","stdout":"F4G3"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":420}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141010\n01010151\n10101010\n41010101\n10101010\n01013101\n10101010\n","stdout":"F8E7"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141010\n01010101\n10101510\n41010101\n10101010\n01013101\n10101010\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":360}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141010\n01010101\n10101510\n41010101\n10101310\n01010101\n10101010\n","stdout":"E7F6"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51510101\n14141010\n01010151\n10101010\n41010101\n10101310\n01010101\n10101010\n","stdout":"F4G3"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":300}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51510101\n14141010\n01010151\n10101010\n41013101\n10101010\n01010101\n10101010\n","stdout":"F6E5"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":60}},{"id":18,"changes":{"value":"king_white"}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51515101\n14101010\n01010151\n10101010\n41013101\n10101010\n01010101\n10101010\n","stdout":"D2E1"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51515101\n14101010\n01010151\n10131010\n41010101\n10101010\n01010101\n10101010\n","stdout":"E5D4"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":580,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51515101\n14101015\n01010101\n10131010\n41010101\n10101010\n01010101\n10101010\n","stdout":"G3H2"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":400,"y":180}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51515101\n14101015\n01013101\n10101010\n41010101\n10101010\n01010101\n10101010\n","stdout":"D4E3"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":{"action":"jump","start":0.39,"end":0.39,"x":340,"y":120}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51015101\n14151015\n01013101\n10101010\n41010101\n10101010\n01010101\n10101010\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":60}},{"id":13,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51315101\n14101015\n01010101\n10101010\n41010101\n10101010\n01010101\n10101010\n","stdout":"E3C1"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":520,"y":180}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51315101\n14101010\n01010151\n10101010\n41010101\n10101010\n01010101\n10101010\n","stdout":"H2G3"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":160,"y":180}},{"id":14,"changes":{"visible":false}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51015101\n10101010\n31010151\n10101010\n41010101\n10101010\n01010101\n10101010\n","stdout":"C1A3"},{"timescale":1.0,"turnChanges":[{"id":24,"changes":{"action":"jump","start":0.39,"end":0.39,"x":460,"y":240}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51015101\n10101010\n31010101\n10101510\n41010101\n10101010\n01010101\n10101010\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":{"action":"jump","start":0.39,"end":0.39,"x":220,"y":240}}],"currentPlayer":1,"nextPlayer":2,"stdin":"51015101\n10101010\n01010101\n13101510\n41010101\n10101010\n01010101\n10101010\n","stdout":"A3B4"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":{"action":"jump","start":0.39,"end":0.39,"x":280,"y":180}},{"id":4,"changes":{"visible":false}}],"currentPlayer":2,"nextPlayer":1,"stdin":"51015101\n10101010\n01410101\n10101510\n01010101\n10101010\n01010101\n10101010\n","stdout":"A5C3"}]
}*/
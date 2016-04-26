function setInput() {
    setGameInit();
    setGameTurns();
    console.log("Set database commands to Test Command Vars");
    create();
}

/*function setGameInit() {
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

}*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setGameInit() {
    gameInitializer = {"background":"games/checkers/CheckerBoard.png","defaultTimestep":1.0,"defaultBot":1,"imagesToLoad":[{"imagePath":"games/checkers/basic_red.png","name":"basic_red"},{"imagePath":"games/checkers/basic_white.png","name":"basic_white"},{"imagePath":"games/checkers/king_red.png","name":"king_red"},{"imagePath":"games/checkers/king_white.png","name":"king_white"}],"entity":[{"id":1,"type":"object","visible":true,"initX":190,"initY":90,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":2,"type":"object","visible":true,"initX":310,"initY":90,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":3,"type":"object","visible":true,"initX":430,"initY":90,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":4,"type":"object","visible":true,"initX":550,"initY":90,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":5,"type":"object","visible":true,"initX":250,"initY":150,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":6,"type":"object","visible":true,"initX":370,"initY":150,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":7,"type":"object","visible":true,"initX":490,"initY":150,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":8,"type":"object","visible":true,"initX":610,"initY":150,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":9,"type":"object","visible":true,"initX":190,"initY":210,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":10,"type":"object","visible":true,"initX":310,"initY":210,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":11,"type":"object","visible":true,"initX":430,"initY":210,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":12,"type":"object","visible":true,"initX":550,"initY":210,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_red"},{"id":13,"type":"object","visible":true,"initX":250,"initY":390,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":14,"type":"object","visible":true,"initX":370,"initY":390,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":15,"type":"object","visible":true,"initX":490,"initY":390,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":16,"type":"object","visible":true,"initX":610,"initY":390,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":17,"type":"object","visible":true,"initX":190,"initY":450,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":18,"type":"object","visible":true,"initX":310,"initY":450,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":19,"type":"object","visible":true,"initX":430,"initY":450,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":20,"type":"object","visible":true,"initX":550,"initY":450,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":21,"type":"object","visible":true,"initX":250,"initY":510,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":22,"type":"object","visible":true,"initX":370,"initY":510,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":23,"type":"object","visible":true,"initX":490,"initY":510,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"},{"id":24,"type":"object","visible":true,"initX":610,"initY":510,"width":60,"height":60,"flipped":false,"rotation":0.0,"value":"basic_white"}]}
}

function setGameTurns() {
    turns = [{"timescale":1.0,"turnChanges":[{"id":11,"changes":[{"start":0.0,"end":0.39,"x":490,"y":270}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n21210121\n10101210\n01010101\n14141414\n41414141\n14141414\n","stdout":"E3F4"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":[{"start":0.0,"end":0.39,"x":310,"y":330}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n21210121\n10101210\n01410101\n14101414\n41414141\n14141414\n","stdout":"D6C5"},{"timescale":1.0,"turnChanges":[{"id":11,"changes":[{"start":0.0,"end":0.39,"x":430,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n21210121\n10101010\n01412101\n14101414\n41414141\n14141414\n","stdout":"F4E5"},{"timescale":1.0,"turnChanges":[{"id":15,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":370,"y":270}]},{"id":11,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n21210121\n10141010\n01410101\n14101014\n41414141\n14141414\n","stdout":"F6D4"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":[{"start":0.0,"end":0.39,"x":430,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n21010121\n10141010\n01412101\n14101014\n41414141\n14141414\n","stdout":"C3E5"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":[{"start":0.0,"end":0.39,"x":250,"y":270}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n21010121\n14141010\n01012101\n14101014\n41414141\n14141414\n","stdout":"C5B4"},{"timescale":1.0,"turnChanges":[{"id":9,"changes":[{"start":0.0,"end":0.39,"x":310,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n01010121\n14141010\n01212101\n14101014\n41414141\n14141414\n","stdout":"A3C5"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":[{"start":0.0,"end":0.39,"x":190,"y":210}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n41010121\n10141010\n01212101\n14101014\n41414141\n14141414\n","stdout":"B4A3"},{"timescale":1.0,"turnChanges":[{"id":10,"changes":[{"start":0.0,"end":0.39,"x":370,"y":390}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121212\n41010121\n10141010\n01210101\n14121014\n41414141\n14141414\n","stdout":"E5D6"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":430,"y":330}]},{"id":10,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121212\n41010121\n10141010\n01214101\n14101014\n41014141\n14141414\n","stdout":"C7E5"},{"timescale":1.0,"turnChanges":[{"id":7,"changes":[{"start":0.0,"end":0.39,"x":430,"y":210}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212121\n12121012\n41012121\n10141010\n01214101\n14101014\n41014141\n14141414\n","stdout":"F2E3"},{"timescale":1.0,"turnChanges":[{"id":15,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":490,"y":150}]},{"id":7,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212121\n12121412\n41010121\n10101010\n01214101\n14101014\n41014141\n14141414\n","stdout":"D4F2"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":430,"y":210}]},{"id":15,"changes":[{"visible":false}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121012\n41012121\n10101010\n01214101\n14101014\n41014141\n14141414\n","stdout":"G1E3"},{"timescale":1.0,"turnChanges":[{"id":13,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":370,"y":270}]},{"id":9,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121012\n41012121\n10141010\n01014101\n10101014\n41014141\n14141414\n","stdout":"B6D4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":310,"y":330}]},{"id":13,"changes":[{"visible":false}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121012\n41010121\n10101010\n01214101\n10101014\n41014141\n14141414\n","stdout":"E3C5"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":[{"start":0.0,"end":0.39,"x":310,"y":450}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121012\n41010121\n10101010\n01214101\n10101014\n41414141\n14101414\n","stdout":"D8C7"},{"timescale":1.0,"turnChanges":[{"id":12,"changes":[{"start":0.0,"end":0.39,"x":490,"y":270}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121012\n41010101\n10101210\n01214101\n10101014\n41414141\n14101414\n","stdout":"G3F4"},{"timescale":1.0,"turnChanges":[{"id":18,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":550,"y":210}]},{"id":12,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121012\n41010141\n10101010\n01210101\n10101014\n41414141\n14101414\n","stdout":"E5G3"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":490,"y":270}]},{"id":18,"changes":[{"visible":false}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121010\n41010101\n10101210\n01210101\n10101014\n41414141\n14101414\n","stdout":"H2F4"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":[{"start":0.0,"end":0.39,"x":490,"y":390}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121010\n41010101\n10101210\n01210101\n10101414\n41414101\n14101414\n","stdout":"G7F6"},{"timescale":1.0,"turnChanges":[{"id":8,"changes":[{"start":0.0,"end":0.39,"x":550,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121010\n41010101\n10101010\n01210121\n10101414\n41414101\n14101414\n","stdout":"F4G5"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":490,"y":270}]},{"id":8,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121010\n41010101\n10101410\n01210101\n10101410\n41414101\n14101414\n","stdout":"H6F4"},{"timescale":1.0,"turnChanges":[{"id":4,"changes":[{"start":0.0,"end":0.39,"x":250,"y":390}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n12121010\n41010101\n10101410\n01010101\n12101410\n41414101\n14101414\n","stdout":"C5B6"},{"timescale":1.0,"turnChanges":[{"id":22,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":190,"y":330}]},{"id":4,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n12121010\n41010101\n10101410\n41010101\n10101410\n41014101\n14101414\n","stdout":"C7A5"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":[{"start":0.0,"end":0.39,"x":310,"y":210}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n10121010\n41210101\n10101410\n41010101\n10101410\n41014101\n14101414\n","stdout":"B2C3"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":[{"start":0.0,"end":0.39,"x":310,"y":450}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n10121010\n41210101\n10101410\n41010101\n10101410\n41414101\n10101414\n","stdout":"B8C7"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":[{"start":0.0,"end":0.39,"x":370,"y":270}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n10121010\n41010101\n10121410\n41010101\n10101410\n41414101\n10101414\n","stdout":"C3D4"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":[{"start":0.0,"end":0.39,"x":430,"y":210}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n10121010\n41014101\n10121010\n41010101\n10101410\n41414101\n10101414\n","stdout":"F4E3"},{"timescale":1.0,"turnChanges":[{"id":6,"changes":[{"start":0.0,"end":0.39,"x":490,"y":270}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n10101010\n41014101\n10121210\n41010101\n10101410\n41414101\n10101414\n","stdout":"D2F4"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":[{"start":0.0,"end":0.39,"x":370,"y":390}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n10101010\n41014101\n10121210\n41010101\n10141410\n41014101\n10101414\n","stdout":"C7D6"},{"timescale":1.0,"turnChanges":[{"id":5,"changes":[{"start":0.0,"end":0.39,"x":310,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21212101\n10101010\n41014101\n10101210\n41210101\n10141410\n41014101\n10101414\n","stdout":"D4C5"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":250,"y":270}]},{"id":5,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21212101\n10101010\n41014101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"D6B4"},{"timescale":1.0,"turnChanges":[{"id":2,"changes":[{"start":0.0,"end":0.39,"x":370,"y":150}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21012101\n10121010\n41014101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":310,"y":90}]},{"id":2,"changes":[{"visible":false}]},{"id":16,"changes":[{"value":"king_white"}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21512101\n10101010\n41010101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"E3C1"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":[{"start":0.0,"end":0.39,"x":490,"y":150}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21510101\n10101210\n41010101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"E1F2"},{"timescale":1.0,"turnChanges":[{"id":16,"changes":[{"start":0.0,"end":0.39,"x":370,"y":150}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21010101\n10151210\n41010101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"C1D2"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":[{"start":0.0,"end":0.39,"x":430,"y":210}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21010101\n10151010\n41012101\n14101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"F2E3"},{"timescale":1.0,"turnChanges":[{"id":21,"changes":[{"start":0.0,"end":0.39,"x":310,"y":210}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21010101\n10151010\n41412101\n10101210\n41010101\n10101410\n41014101\n10101414\n","stdout":"B4C3"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":[{"start":0.0,"end":0.39,"x":370,"y":270}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21010101\n10151010\n41410101\n10121210\n41010101\n10101410\n41014101\n10101414\n","stdout":"E3D4"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":[{"start":0.0,"end":0.39,"x":370,"y":390}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21010101\n10151010\n41410101\n10121210\n41010101\n10141410\n41010101\n10101414\n","stdout":"E7D6"},{"timescale":1.0,"turnChanges":[{"id":3,"changes":[{"start":0.0,"end":0.39,"x":430,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"21010101\n10151010\n41410101\n10101210\n41012101\n10141410\n41010101\n10101414\n","stdout":"D4E5"},{"timescale":1.0,"turnChanges":[{"id":20,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":370,"y":270}]},{"id":3,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"21010101\n10151010\n41410101\n10141210\n41010101\n10141010\n41010101\n10101414\n","stdout":"F6D4"},{"timescale":1.0,"turnChanges":[{"id":1,"changes":[{"start":0.0,"end":0.39,"x":250,"y":150}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"01010101\n12151010\n41410101\n10141210\n41010101\n10141010\n41010101\n10101414\n","stdout":"A1B2"},{"timescale":1.0,"turnChanges":[{"id":14,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":310,"y":90}]},{"id":1,"changes":[{"visible":false}]},{"id":14,"changes":[{"value":"king_white"}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n10151010\n01410101\n10141210\n41010101\n10141010\n41010101\n10101414\n","stdout":"A3C1"},{"timescale":1.0,"turnChanges":[{"id":6,"changes":[{"start":0.0,"end":0.39,"x":430,"y":330}]}],"currentPlayer":1,"nextPlayer":2,"stdin":"01510101\n10151010\n01410101\n10141010\n41012101\n10141010\n41010101\n10101414\n","stdout":"F4E5"},{"timescale":1.0,"turnChanges":[{"id":19,"changes":[{"action":"jump","start":0.0,"end":0.39,"x":490,"y":270}]},{"id":6,"changes":[{"visible":false}]}],"currentPlayer":2,"nextPlayer":1,"stdin":"01510101\n10151010\n01410101\n10141410\n41010101\n10101010\n41010101\n10101414\n","stdout":"D6F4"}]
}
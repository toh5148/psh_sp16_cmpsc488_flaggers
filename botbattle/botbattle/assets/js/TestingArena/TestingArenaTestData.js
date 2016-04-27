var init = {
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
    "stdout": ["222", "222"],
    "stderr": "333"
};

var test1 = [
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
        }
];

var test2 = [
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
        }
];

var test3 = [
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
        }
];

function simulateNextTurn(turnNumber1) {
    if (turnNumber1 == -1) {
        handleTestTurns(init, null, true);
    }
    else if (turnNumber1 == 0) {
        handleTestTurns(init, test1, false);
    }
    else if (turnNumber1 == 1) {
        handleTestTurns(init, test2, false);
    }
    else if (turnNumber1 == 2) {
        handleTestTurns(init, test3, false);
    }
}
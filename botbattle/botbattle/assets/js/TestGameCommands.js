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
                           "value": "games/checkers/basic_red.png"
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
        ]
    };
}

function setGameTurns() {
    turns = [
                   {
                       "timeScale": 1,
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
                                     "start": 0.2,
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
                                     "start": 0,
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
                       ],
                       "stdin": "aaa",
                       "stdout": "bbb",
                       "stderr": "ccc"
                   },
                   {
                       "timeScale": 2,
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
                                     "value": "games/checkers/king_red.png"
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
                       "stdin": "ddd",
                       "stdout": "eee",
                       "stderr": "fff"
                   },
                   {
                       "timeScale": 1,
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
                       "stdin": "ggg",
                       "stdout": "hhh",
                       "stderr": "iii"
                   }
   ];
}

/*function setGameInit() {
    gameInitializer = {
        "background": "games/checkers/CheckerBoard.png",
        "defaultTimestep": 1.0,
        "mapId": 1,
        "entity": [
           {
               "id": 1,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 60,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 2,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 60,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 3,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 60,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 4,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 60,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 5,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 120,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 6,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 120,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 7,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 120,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 8,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 120,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 9,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 180,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 10,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 180,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 11,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 180,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 12,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 180,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_red.png"
           },
           {
               "id": 13,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 360,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 14,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 360,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 15,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 360,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 16,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 360,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 17,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 420,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 18,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 420,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 19,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 420,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 20,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 420,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 21,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 480,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 22,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 480,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 23,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 480,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           },
           {
               "id": 24,
               "type": "object",
               "visible": true,
               "initX": 160,
               "initY": 480,
               "width": 60,
               "height": 60,
               "flipped": false,
               "rotation": 0.0,
               "value": "games/checkers/basic_white.png"
           }
        ]
    };
}

function setGameTurns() {
    turns = [
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 160,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21212121\n12121212\n21212121\n10101010\n41010101\n10141414\n41414141\n14141414\n",
       "stdout": "B6A5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 9,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21212121\n12121212\n01212121\n12101010\n41010101\n10141414\n41414141\n14141414\n",
       "stdout": "A3B4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 15,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21212121\n12121212\n01212121\n12101010\n41014101\n10141014\n41414141\n14141414\n",
       "stdout": "F6E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21212121\n12121212\n01210121\n12101210\n41014101\n10141014\n41414141\n14141414\n",
       "stdout": "E3F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 20,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21212121\n12121212\n01210121\n12101210\n41014101\n10141414\n41414101\n14141414\n",
       "stdout": "G7F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 6,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21212121\n12101212\n01212121\n12101210\n41014101\n10141414\n41414101\n14141414\n",
       "stdout": "D2E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 18,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21212121\n12101212\n01212121\n12101210\n41014101\n14141414\n41014101\n14141414\n",
       "stdout": "C7B6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 3,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n12121212\n01212121\n12101210\n41014101\n14141414\n41014101\n14141414\n",
       "stdout": "E1D2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 21,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n12121212\n01212121\n12101210\n41014101\n14141414\n41414101\n10141414\n",
       "stdout": "B8C7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 5,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 160,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10121212\n21212121\n12101210\n41014101\n14141414\n41414101\n10141414\n",
       "stdout": "B2A3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 23,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10121212\n21212121\n12101210\n41014101\n14141414\n41414141\n10141014\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 6,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10121212\n21210121\n12121210\n41014101\n14141414\n41414141\n10141014\n",
       "stdout": "E3D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 14,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10121212\n21210121\n12121210\n41414101\n14101414\n41414141\n10141014\n",
       "stdout": "D6C5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 15,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10121212\n21210121\n12121010\n41410101\n14121414\n41414141\n10141014\n",
       "stdout": "F4D6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 14,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 6,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10121212\n21214121\n12101010\n41010101\n14121414\n41414141\n10141014\n",
       "stdout": "C5E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 21,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          },
          {
              "id": 11,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_red.png"
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10121212\n21214121\n12101010\n41010101\n14101414\n41014141\n13141014\n",
       "stdout": "D6B8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 18,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10121212\n21214121\n12101010\n41410101\n10101414\n41014141\n13141014\n",
       "stdout": "B6C5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 3,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10101212\n21214121\n12101210\n41410101\n10101414\n41014141\n13141014\n",
       "stdout": "D2F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 19,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10101212\n21214121\n12101210\n41410101\n10141414\n41010141\n13141014\n",
       "stdout": "E7D6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 7,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 14,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "21210121\n10101012\n21210121\n12121210\n41410101\n10141414\n41010141\n13141014\n",
       "stdout": "F2D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 18,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 7,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "21210121\n10101012\n21214121\n12101210\n41010101\n10141414\n41010141\n13141014\n",
       "stdout": "C5E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 1,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210121\n12101012\n21214121\n12101210\n41010101\n10141414\n41010141\n13141014\n",
       "stdout": "A1B2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210121\n12101012\n21214121\n12101210\n41010141\n10141410\n41010141\n13141014\n",
       "stdout": "H6G5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 3,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210121\n12101012\n21214121\n12101010\n41010141\n10141412\n41010141\n13141014\n",
       "stdout": "F4H6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 19,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210121\n12101012\n21214121\n12101010\n41014141\n10101412\n41010141\n13141014\n",
       "stdout": "D6E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 3,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 23,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          },
          {
              "id": 3,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_red.png"
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210121\n12101012\n21214121\n12101010\n41014141\n10101410\n41010101\n13141314\n",
       "stdout": "H6F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210121\n12101012\n21214121\n12101014\n41014101\n10101410\n41010101\n13141314\n",
       "stdout": "G5H4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 12,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210121\n12101012\n21214101\n12101214\n41014101\n10101410\n41010101\n13141314\n",
       "stdout": "G3F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 19,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 12,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210121\n12101012\n21214141\n12101014\n41010101\n10101410\n41010101\n13141314\n",
       "stdout": "E5G3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 19,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210121\n12101010\n21214101\n12101214\n41010101\n10101410\n41010101\n13141314\n",
       "stdout": "H2F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 18,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210121\n12101410\n21210101\n12101214\n41010101\n10101410\n41010101\n13141314\n",
       "stdout": "E3F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 4,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 18,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n12101010\n21212101\n12101214\n41010101\n10101410\n41010101\n13141314\n",
       "stdout": "G1E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 20,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n12101010\n21212101\n12101214\n41014101\n10101010\n41010101\n13141314\n",
       "stdout": "F6E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 20,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n12101010\n21212101\n12101014\n41010101\n10121010\n41010101\n13141314\n",
       "stdout": "F4D6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n12101010\n21212141\n12101010\n41010101\n10121010\n41010101\n13141314\n",
       "stdout": "H4G3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n12101010\n21012141\n12121010\n41010101\n10121010\n41010101\n13141314\n",
       "stdout": "C3D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 9,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n12101010\n21412141\n10121010\n01010101\n10121010\n41010101\n13141314\n",
       "stdout": "A5C3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 3,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n12101010\n21412141\n10121010\n01010101\n10121010\n41010131\n13141014\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 160,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 1,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          },
          {
              "id": 13,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_white.png"
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "51210101\n10101010\n21012141\n10121010\n01010101\n10121010\n41010131\n13141014\n",
       "stdout": "C3A1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "51210101\n10101010\n21012141\n10101010\n01012101\n10121010\n41010131\n13141014\n",
       "stdout": "D4E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 3,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "51210101\n10101010\n21012141\n10101010\n01012101\n10121410\n41010101\n13141010\n",
       "stdout": "H8F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "51210101\n10101010\n21012141\n10101010\n01010101\n10121410\n41010121\n13141010\n",
       "stdout": "E5G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "51210101\n10101410\n21012101\n10101010\n01010101\n10121410\n41010121\n13141010\n",
       "stdout": "G3F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "51210101\n10101410\n21012101\n10101010\n01010101\n10101410\n41012121\n13141010\n",
       "stdout": "D6E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 22,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "51210101\n10101410\n21012101\n10101010\n01010101\n10101410\n41412121\n13101010\n",
       "stdout": "D8C7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 22,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "51210101\n10101410\n21012101\n10101010\n01010101\n10131410\n41012121\n10101010\n",
       "stdout": "B8D6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n15101410\n21012101\n10101010\n01010101\n10131410\n41012121\n10101010\n",
       "stdout": "A1B2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 4,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n15101410\n21010101\n10121010\n01010101\n10131410\n41012121\n10101010\n",
       "stdout": "E3D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n10101410\n21510101\n10121010\n01010101\n10131410\n41012121\n10101010\n",
       "stdout": "B2C3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 8,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_red.png"
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n10101410\n21510101\n10121010\n01010101\n10131410\n41010121\n10101310\n",
       "stdout": "E7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 13,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 4,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210101\n10101410\n21010101\n10101010\n01015101\n10131410\n41010121\n10101310\n",
       "stdout": "C3E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 13,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01210101\n10101410\n21010101\n10101310\n01010101\n10101410\n41010121\n10101310\n",
       "stdout": "D6F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 16,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_white.png"
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01210151\n10101010\n21010101\n10101310\n01010101\n10101410\n41010121\n10101310\n",
       "stdout": "F2G1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 2,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10121010\n21010101\n10101310\n01010101\n10101410\n41010121\n10101310\n",
       "stdout": "C1D2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10121510\n21010101\n10101310\n01010101\n10101410\n41010121\n10101310\n",
       "stdout": "G1F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 11,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10121510\n21010101\n10101010\n01013101\n10101410\n41010121\n10101310\n",
       "stdout": "F4E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 11,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10121510\n21010101\n10141010\n01010101\n10101010\n41010121\n10101310\n",
       "stdout": "F6D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 5,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10121510\n01010101\n12141010\n01010101\n10101010\n41010121\n10101310\n",
       "stdout": "A3B4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10121010\n01010101\n12141010\n01010101\n10101010\n41010121\n10101310\n",
       "stdout": "F2G1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 5,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 160,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10121010\n01010101\n10141010\n21010101\n10101010\n41010121\n10101310\n",
       "stdout": "B4A5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10121015\n01010101\n10141010\n21010101\n10101010\n41010121\n10101310\n",
       "stdout": "G1H2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 10,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_red.png"
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10121015\n01010101\n10141010\n21010101\n10101010\n41010101\n10101313\n",
       "stdout": "G7H8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10121010\n01010151\n10141010\n21010101\n10101010\n41010101\n10101313\n",
       "stdout": "H2G3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 5,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10121010\n01010151\n10141010\n01010101\n12101010\n41010101\n10101313\n",
       "stdout": "A5B6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 5,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10121010\n01010151\n10141010\n01410101\n10101010\n01010101\n10101313\n",
       "stdout": "A7C5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 2,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101010\n01012151\n10141010\n01410101\n10101010\n01010101\n10101313\n",
       "stdout": "D2E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 2,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10101410\n01010151\n10101010\n01410101\n10101010\n01010101\n10101313\n",
       "stdout": "D4F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101410\n01010151\n10101010\n01410101\n10101010\n01013101\n10101013\n",
       "stdout": "F8E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10101410\n01010151\n10141010\n01010101\n10101010\n01013101\n10101013\n",
       "stdout": "C5D4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101410\n01010151\n10141010\n01010101\n10101310\n01010101\n10101013\n",
       "stdout": "E7F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 24,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_white.png"
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10101010\n01010151\n10141010\n01010101\n10101310\n01010101\n10101013\n",
       "stdout": "F2G1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10101010\n01010151\n10141010\n01010101\n10101010\n01010131\n10101013\n",
       "stdout": "F6G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10101015\n01010101\n10141010\n01010101\n10101010\n01010131\n10101013\n",
       "stdout": "G3H2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10101015\n01010101\n10141010\n01010101\n10101310\n01010101\n10101013\n",
       "stdout": "G7F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10101515\n01010101\n10141010\n01010101\n10101310\n01010101\n10101013\n",
       "stdout": "G1F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101515\n01010101\n10141010\n01010101\n10101010\n01013101\n10101013\n",
       "stdout": "F6E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101015\n01010101\n10141010\n01010101\n10101010\n01013101\n10101013\n",
       "stdout": "F2E1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101015\n01010101\n10141010\n01010101\n10101010\n01010101\n10101313\n",
       "stdout": "E7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101015\n01410101\n10101010\n01010101\n10101010\n01010101\n10101313\n",
       "stdout": "D4C3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101015\n01410101\n10101010\n01010101\n10101010\n01010131\n10101310\n",
       "stdout": "H8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015151\n10101010\n01410101\n10101010\n01010101\n10101010\n01010131\n10101310\n",
       "stdout": "H2G1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015151\n10101010\n01410101\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "F8E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015151\n14101010\n01010101\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "C3B2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015151\n14101010\n01010101\n10101010\n01010101\n10101010\n01013101\n10101310\n",
       "stdout": "G7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 17,
              "changes": {
                  "action": "update",
                  "starttime": 0.8,
                  "endtime": 1.0,
                  "args": {
                      "value": "games/checkers/king_white.png"
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515151\n10101010\n01010101\n10101010\n01010101\n10101010\n01013101\n10101310\n",
       "stdout": "B2C1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515151\n10101010\n01010101\n10101010\n01010101\n10101310\n01010101\n10101310\n",
       "stdout": "E7F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515101\n10101015\n01010101\n10101010\n01010101\n10101310\n01010101\n10101310\n",
       "stdout": "G1H2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515101\n10101015\n01010101\n10101010\n01010101\n10101310\n01010131\n10101010\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01010101\n10101310\n01010131\n10101010\n",
       "stdout": "H2G3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "F6E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 220,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n15101010\n01010151\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "C1B2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n15101010\n01010151\n10101010\n01010101\n10101013\n01013101\n10101010\n",
       "stdout": "G7H6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 280,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01010101\n10101013\n01013101\n10101010\n",
       "stdout": "B2C1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "H6G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515101\n10101510\n01010101\n10101010\n01010101\n10101010\n01013131\n10101010\n",
       "stdout": "G3F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515101\n10101510\n01010101\n10101010\n01010101\n10101310\n01013101\n10101010\n",
       "stdout": "G7F6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01010101\n10101310\n01013101\n10101010\n",
       "stdout": "F2G3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01515101\n10101010\n01010151\n10101010\n01013101\n10101010\n01013101\n10101010\n",
       "stdout": "F6E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01510101\n10101510\n01010151\n10101010\n01013101\n10101010\n01013101\n10101010\n",
       "stdout": "E1F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01510101\n10101510\n01010151\n10101010\n01013101\n10101010\n01010101\n10131010\n",
       "stdout": "E7D8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10151510\n01010151\n10101010\n01013101\n10101010\n01010101\n10131010\n",
       "stdout": "C1D2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 10,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10151510\n01010151\n10101310\n01010101\n10101010\n01010101\n10131010\n",
       "stdout": "E5F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 10,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10151510\n01010101\n10101010\n01015101\n10101010\n01010101\n10131010\n",
       "stdout": "G3E5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10151510\n01010101\n10101010\n01015101\n10101010\n01013101\n10101010\n",
       "stdout": "D8E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10151010\n01010101\n10101010\n01015101\n10101010\n01013101\n10101010\n",
       "stdout": "F2G1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10151010\n01010101\n10101010\n01015101\n10101010\n01010101\n10101310\n",
       "stdout": "E7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 180,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10101010\n01015101\n10101010\n01015101\n10101010\n01010101\n10101310\n",
       "stdout": "D2E3"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10101010\n01015101\n10101010\n01015101\n10101010\n01010131\n10101010\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 240,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010151\n10101010\n01015101\n10101510\n01010101\n10101010\n01010131\n10101010\n",
       "stdout": "E5F4"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010151\n10101010\n01015101\n10101510\n01010101\n10101010\n01010101\n10101310\n",
       "stdout": "G7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 24,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10101510\n01015101\n10101510\n01010101\n10101010\n01010101\n10101310\n",
       "stdout": "G1F2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101510\n01015101\n10101510\n01010101\n10101010\n01010131\n10101010\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 300,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10101510\n01015101\n10101010\n01010151\n10101010\n01010131\n10101010\n",
       "stdout": "F4G5"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10101510\n01015101\n10101010\n01010151\n10101010\n01010101\n10101310\n",
       "stdout": "G7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 120,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01010101\n10151510\n01010101\n10101010\n01010151\n10101010\n01010101\n10101310\n",
       "stdout": "E3D2"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01010101\n10151510\n01010101\n10101010\n01010151\n10101010\n01013101\n10101010\n",
       "stdout": "F8E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 17,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 60,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010151\n10101010\n01013101\n10101010\n",
       "stdout": "D2E1"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 340,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010151\n10101010\n01010101\n10131010\n",
       "stdout": "E7D8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101015\n01010101\n10131010\n",
       "stdout": "G5H6"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 400,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101015\n01013101\n10101010\n",
       "stdout": "D8E7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101010\n01013151\n10101010\n",
       "stdout": "H6G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101010\n01010151\n10101310\n",
       "stdout": "E7F8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 580,
                      "y": 480,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101010\n01010101\n10101315\n",
       "stdout": "G7H8"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 8,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 520,
                      "y": 420,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          }
       ],
       "currentPlayer": 0,
       "nextPlayer": 1,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101010\n01010131\n10101015\n",
       "stdout": "F8G7"
   },
   {
       "timescale": 1.0,
       "turnChanges": [
          {
              "id": 16,
              "changes": {
                  "action": "move",
                  "starttime": 0.0,
                  "endtime": 0.39,
                  "args": {
                      "x": 460,
                      "y": 360,
                      "width": 60,
                      "height": 60,
                      "rotation": 0.0,
                      "flipped": false
                  }
              }
          },
          {
              "id": 8,
              "changes": {
                  "action": "hide",
                  "starttime": 0.4,
                  "endtime": 0.79,
                  "args": {

                  }
              }
          }
       ],
       "currentPlayer": 1,
       "nextPlayer": 0,
       "stdin": "01015101\n10101510\n01010101\n10101010\n01010101\n10101510\n01010101\n10101010\n",
       "stdout": "H8F6"
   }
    ];
}*/
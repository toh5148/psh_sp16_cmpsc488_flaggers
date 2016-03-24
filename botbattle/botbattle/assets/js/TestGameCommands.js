var gameInitializer = {
    background: 'background.png',
    defaultTimestep: 2,
    entity: [{
        id: 101,
        type: 'spriteZombie',
        visible: true,
        initX: 1,
        initY: 2,
        width: 32,
        height: 32,
        flipped: false,
        rotation: 0
    },
	{
	    id: 102,
	    type: 'spriteZombie',
	    visible: true,
	    initX: 10,
	    initY: 8,
	    width: 32,
	    height: 32,
	    flipped: false,
	    rotation: 0
	}]
}

var turns = [
	{
	    timeScale: 1,
	    turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 1,
					    y1: 2,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 6,
					    y2: 1
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 10,
					    y1: 8,
					    x2: 11,
					    y2: 9
					}
			    ]
			}
	    ]
	},
	{
	    timeScale: 2,
	    turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 6,
					    y1: 1,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 1,
					    y2: 2
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 11,
					    y1: 9,
					    x2: 10,
					    y2: 8
					}
			    ]
			}
	    ]
	},
    {
        timeScale: 1,
        turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 1,
					    y1: 2,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 6,
					    y2: 1
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 10,
					    y1: 8,
					    x2: 11,
					    y2: 9
					}
			    ]
			}
        ]
    },
	{
	    timeScale: 2,
	    turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 6,
					    y1: 1,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 1,
					    y2: 2
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 11,
					    y1: 9,
					    x2: 10,
					    y2: 8
					}
			    ]
			}
	    ]
	},
    {
        timeScale: 1,
        turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 1,
					    y1: 2,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 6,
					    y2: 1
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 10,
					    y1: 8,
					    x2: 11,
					    y2: 9
					}
			    ]
			}
        ]
    },
	{
	    timeScale: 2,
	    turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 6,
					    y1: 1,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 1,
					    y2: 2
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 11,
					    y1: 9,
					    x2: 10,
					    y2: 8
					}
			    ]
			}
	    ]
	},
    {
        timeScale: 1,
        turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 1,
					    y1: 2,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 6,
					    y2: 1
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 10,
					    y1: 8,
					    x2: 11,
					    y2: 9
					}
			    ]
			}
        ]
    },
	{
	    timeScale: 2,
	    turnChanges: [
			{
			    id: 101,
			    changes: [
					{
					    action: 'move',
					    start: 0,
					    end: .2,
					    x1: 6,
					    y1: 1,
					    x2: 6,
					    y2: 4
					},
					{
					    action: 'move',
					    start: .2,
					    end: .3,
					    x1: 6,
					    y1: 4,
					    x2: 7,
					    y2: 3
					},
					{
					    action: 'move',
					    start: .3,
					    end: 1,
					    x1: 7,
					    y1: 3,
					    x2: 1,
					    y2: 2
					}
			    ]
			},
			{
			    id: 102,
			    changes: [
					{
					    action: 'move',
					    start: .2,
					    end: .8,
					    x1: 11,
					    y1: 9,
					    x2: 10,
					    y2: 8
					}
			    ]
			}
	    ]
	}
];
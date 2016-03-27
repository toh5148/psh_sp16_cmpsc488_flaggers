var gameInitializer = {
    background: 'background.png',
    defaultTimestep: 1,
    entity: [
        {
            id: 101,
            type: 'spriteRabbit',
            visible: true,
            initX: 50,
            initY: 100,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0
        },
        {
            id: 102,
            type: 'spriteChicken',
            visible: true,
            initX: 500,
            initY: 400,
            width: 50,
            height: 50,
            flipped: true,
            rotation: 0
        },
        {
            id: 103,
            type: 'object',
            visible: true,
            initX: 250,
            initY: 350,
            width: 50,
            height: 50,
            flipped: true,
            rotation: 0,
            value: 'brickWall'
        },
        {
            id: 104,
            type: 'text',
            visible: true,
            initX: 50,
            initY: 50,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0,
            value: 'Turn: 1',
			fill: '#808080'
        }
    ],
    stdIn: '000',
    stdOut: '111',
    stdErr: '222'
};

var turns = [
	{
		timeScale: 1,
		turnChanges: [
			{
				id: 101,
				changes: [
					{
						action: 'walk',
						start: 0,
						end: .2,
						x: 300,
						y: 200
					},
					{
						action: 'walk',
						start: .2,
						end: .3,
						x: 350,
						y: 150
					},
					{
						action: 'walk',
						start: .3,
						end: 1,
						x: 300,
						y: 50,
                        rotation: 90
					}
				]
			},
			{
				id: 102,
				changes: [
					{
						action: 'walk',
						start: .2,
						end: .8,
						x: 550,
						y: 450,
                        width: 200,
                        height: 200
					}
				]
			},
            {
                id: 103,
                changes: [
                    {
                        action: 'move',
                        start: 0,
                        end: 1,
                        x: 250,
                        y: 250,
                        width: 20,
                        height: 20,
                        rotation: 360
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 2',
                        fill: '#000000'
                    }
                ]
            }
		],
        stdIn: 'aaa',
        stdOut: 'bbb',
        stdErr: 'ccc'
	},
	{
		timeScale: 2,
		turnChanges: [
			{
				id: 101,
				changes: [
					{
						start: 0,
						end: .2,
						x: 300,
						y: 200
					},
					{
						start: .2,
						end: .3,
						x: 350,
						y: 150
					},
					{
						start: .3,
						end: 1,
						x: 50,
						y: 100,
                        rotation: 90
					}
				]
			},
            {
                id: 102,
                changes: [
                    {
                        action: 'walk',
                        visible: false,
                        start: .2,
                        end: .8
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 3',
                        backgroundColor: 'rgba(255,0,0,0.25)',
                        fill: '#808080'
                    }
                ]
            }
		],
        stdIn: 'ddd',
        stdOut: 'eee',
        stdErr: 'fff'
	},
    {
        timeScale: 1,
        turnChanges: [
            {
                id: 101,
                changes: [
                    {
                        action: 'walk',
                        start: 0,
                        end: .2,
                        x: 300,
                        y: 200
                    },
                    {
                        action: 'walk',
                        start: .2,
                        end: .3,
                        x: 350,
                        y: 150
                    },
                    {
                        action: 'walk',
                        start: .3,
                        end: 1,
                        x: 300,
                        y: 50
                    }
                ]
            },
            {
                id: 102,
                changes: [
                    {
                        action: 'walk',
                        visible: true,
                        start: .2,
                        end: .8,
                        x: 400,
                        y: 300,
                        flipped: false
                    }
                ]
            },
            {
                id: 104,
                changes: [
                    {
                        action: 'setText',
                        start: 1,
                        value: 'Turn: 4'
                    }
                ]
            }
        ],
        stdIn: 'ggg',
        stdOut: 'hhh',
        stdErr: 'iii'
    }
];
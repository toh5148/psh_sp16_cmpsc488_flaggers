var gameInitializer = {
    background: 'background.png',
    defaultTimestep: 1,
    entity: [
        {
            id: 101,
            type: 'spriteRabbit',
            visible: true,
            initX: 1,
            initY: 2,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0
        },
        {
            id: 102,
            type: 'spriteChicken',
            visible: true,
            initX: 10,
            initY: 8,
            width: 50,
            height: 50,
            flipped: true,
            rotation: 0
        },
        {
            id: 103,
            type: 'object',
            visible: true,
            initX: 5,
            initY: 7,
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
            initX: 1,
            initY: 1,
            width: 50,
            height: 50,
            flipped: false,
            rotation: 0,
            value: 'Turn: 1'
        }
    ]
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
						x: 6,
						y: 4
					},
					{
						action: 'walk',
						start: .2,
						end: .3,
						x: 7,
						y: 3
					},
					{
						action: 'walk',
						start: .3,
						end: 1,
						x: 6,
						y: 1,
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
						x: 11,
						y: 9,
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
                        x: 5,
                        y: 5,
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
		]
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
						x: 6,
						y: 4
					},
					{
						start: .2,
						end: .3,
						x: 7,
						y: 3
					},
					{
						start: .3,
						end: 1,
						x: 1,
						y: 2,
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
                        backgroundColor: 'rgba(255,0,0,0.25)'
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
                        action: 'walk',
                        start: 0,
                        end: .2,
                        x: 6,
                        y: 4
                    },
                    {
                        action: 'walk',
                        start: .2,
                        end: .3,
                        x: 7,
                        y: 3
                    },
                    {
                        action: 'walk',
                        start: .3,
                        end: 1,
                        x: 6,
                        y: 1
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
                        x: 8,
                        y: 6,
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
        ]
    }
];
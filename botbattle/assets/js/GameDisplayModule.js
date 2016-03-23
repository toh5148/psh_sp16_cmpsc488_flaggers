const gameWidth=800,gameHeight=600,tileWidth=50,tileHeight=50,fps=60,
	halfWidth=tileWidth/2,halfHeight=tileHeight/2,tileColumns=gameWidth/tileWidth,tileRows=gameHeight/tileHeight;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'div_gameCanvas',
    { preload: preload, create: create, update: drawTurn }),
	playing, turn, defaultTimestep, turnTime, timeIncr, turnLength, playbackSpeed,
	entities, entityList, entityChangeNums, gameStates;

function preload() {
    gameDisplayWindow.load.image('background', 'assets/images/background.png');
    gameDisplayWindow.load.spritesheet('zombie', 'assets/images/zombie.png', 32, 32);
}

function create() {
    gameDisplayWindow.add.image(0, 0, 'background');
    defaultTimestep = gameInitializer.defaultTimestep;
    entities = [];
    entityList = [];
    playbackSpeed = 1;
    gameStates = [{}];
    turn = 0;
    createEnts();
    generateTurnChanges();
    generateGameStates();
    restoreGameState(0);
}

function drawTurn() {
    if (!playing) return;
    if (turnTime > 1)
        startTurn(turn + 1, false);
    if (!playing) return;
    var tc = turns[turn].turnChanges;
    for (var i = 0; i < tc.length; i++) {
        var c = tc[i], e = entities[c.id];
        if (!(e.id in entityChangeNums))
            entityChangeNums[e.id] = 0;
        var cn = entityChangeNums[e.id];
        while (cn < c.changes.length && c.changes[cn].end < turnTime) {
            entityChangeNums[e.id]++;
            cn = entityChangeNums[e.id];
        }
        if (cn < c.changes.length ) {
            var c2 = c.changes[cn];
            if (turnTime >= c2.start && turnTime <= c2.end)
                e.action(c2, turnTime);
        }
    }
    turnTime += timeIncr * playbackSpeed;
}

function createEnts(){
    var e = gameInitializer.entity;
    for (var i = 0; i < e.length; i++)
        addEnt(e[i]);
}

function addEnt(e){
    var ent=new Entity(e);
    gameStates[0][e.id] = {
        action: 'create',
        start: 0,
        end: 1,
        initX: e.initX,
        initY: e.initY,
        initWidth: e.width,
        initHeight: e.height,
        initRotation: e.rotation,
        flipped: e.flipped
    };
    entities[ent.id] = ent;
    entityList.push(ent);
}

function generateTurnChanges(){
    var prevChange={};
    for(var i=0;i<entityList.length;i++){
        var id=entityList[i].id;
        prevChange[id]=gameStates[0][id];
    }
    for(var i=0;i<turns.length;i++){
        var turnChanges=turns[i].turnChanges;
        for(var j=0;j<turnChanges.length;j++){
            var changes=turnChanges[j].changes, id=turnChanges[j].id;
            for(var k=0;k<changes.length;k++){
                var c=changes[k];
                addDefaultValues(c,prevChange[id]);
                prevChange[id]=c;
            }
        }
    }
}

var defaultValues = ['initX', 'initY', 'initWidth', 'initHeight', 'initRotation', 'flipped'];
var defaultReplace = ['x', 'y', 'width', 'height', 'rotation', 'flipped'];

function addDefaultValues(change, prevChange) {
    for (var i = 0; i < defaultValues.length; i++) {
        var value = defaultValues[i], replace = defaultReplace[i];
        if (!(value in change)) {
            if (replace in prevChange)
                change[value] = prevChange[replace];
            else
                change[value] = prevChange[value];
        }
    }
}

function generateGameStates() {
    for (var i = 0; i < turns.length; i++) {
        var gs = {}, tc = turns[i].turnChanges;
        for (var j = 0; j < tc.length; j++) {
            var c = tc[j];
            gs[c.id] = c.changes[c.changes.length - 1];
        }
        gameStates.push(gs);
    }
}

function restoreGameState(turnNum) {
    if (turnNum < 0)
        turnNum = 0;
    for (var i = 0; i < entityList.length; i++) {
        var j = turnNum, ent = entityList[i], entId = ent.id;
        while (!(entId in gameStates[j]))
            j--;
        ent.action(gameStates[j][entId], 1);
    }
    startTurn(turnNum, false);
    playing = false;
}

function startTurn(tn,tm) {
    if (tn < 0)
        tn = 0;
    if (tn >= turns.length) {
        playing = false;
        turnTime = Infinity;
        turn = turns.length;
        return;
    }
    turn = tn;
    if (tm)
        turnTime = 1;
    else
        turnTime = 0;
    turnLength = defaultTimestep * turns[turn].timeScale;
    timeIncr = 1 / (fps * turnLength);
    entityChangeNums = {};
}

function ChangePlaybackSpeed(newSpeed) {
    playbackSpeed = newSpeed;
}

function Entity(e) {
    this.id = e.id;
    this.type = e.type;
    this.sprite = gameDisplayWindow.add.sprite(0, 0, 'zombie');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.width = e.width;
    this.sprite.height = e.height;
    this.animations = [];
    this.action = function (f, t) {

        // Movement
        var m = 1 / (f.end - f.start);
        var t1 = (f.end - t) * m, t2 = (t - f.start) * m;
        if('x' in f)
            this.sprite.x = (f.initX * t1 + f.x * t2) * tileWidth;
        else
            this.sprite.x = f.initX * tileWidth;
        if('y' in f)
            this.sprite.y = (f.initY * t1 + f.y * t2) * tileHeight;
        else
            this.sprite.y = f.initY * tileHeight;

        // Animation
        var animDir, xDist, yDist;
        if(!('x' in f))
            xDist=0;
        else
            xDist = f.x - f.initX;
        if(!('y' in f))
            yDist=0;
        else
            yDist = f.y - f.initY;
        if (Math.abs(yDist) > Math.abs(xDist)) {
            if (yDist < 0)
                animDir = 'up';
            else
                animDir = 'down';
        }
        else {
            if (xDist < 0)
                animDir = 'left';
            else
                animDir = 'right';
        }
        var anim=this.animations['walk_'+animDir];
        this.sprite.frame = anim.frames[Math.floor((t - f.start) * anim.speed) % anim.frames.length];
    };
    this.addAnimations = function () {
        switch (this.type) {
            case 'spriteZombie':
                this.animations['init'] = {frames: [0], speed: 0};
                this.animations['walk_down'] = {frames: [0, 1, 2], speed: 15};
                this.animations['walk_left'] = {frames: [3, 4, 5], speed: 15};
                this.animations['walk_right'] = {frames: [6, 7, 8], speed: 15};
                this.animations['walk_up'] = {frames: [9, 10, 11], speed: 15};
                break;
        }
    };
    this.addAnimations();
}

var gameInitializer = {
    background: 'background.png',
    defaultTimestep: 1,
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
						y: 1
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
						y: 9
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
						x: 1,
						y: 2
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
                        start: .2,
                        end: .8,
                        x: 8,
                        y: 6
                    }
                ]
            }
        ]
    }
];
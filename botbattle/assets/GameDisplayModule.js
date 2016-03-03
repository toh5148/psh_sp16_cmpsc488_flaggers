const gameWidth=tileWidth*tileColumns,gameHeight=tileHeight*tileRows,
	notificationAreaHeight=32,notificationX=gameWidth/2,notificationY=gameHeight+notificationAreaHeight/2;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight+notificationAreaHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update }),
	tileSheetIndices=[], backgroundTiles=[], entities=[], animatingEnts=[],
	notification;

function preload() {
    loadImages();
}

function create() {
	tileSheet = 'tiles';
	var tileTypes = setBackgroundTiles();
	for (var y = 0; y < tileRows; y++) {
		backgroundTiles[y] = [];
		for (var x = 0; x < tileColumns; x++)
			backgroundTiles[y][x] = gameDisplayWindow.add.sprite(x * tileHeight, y * tileWidth, tileSheet, tileTypes[y][x]);
	}
	var commands = [
        { id: 'diamond', cmd: 'create', type: 'diamond', x: 15, y: 10 },
		{id: 'player', cmd: 'create', type: 'player', x: 5, y: 6},
		{id: 'star', cmd: 'create', type: 'star', x: Math.floor(Math.random() * tileColumns), y: Math.floor(Math.random() * tileRows)},
		{id: 'player', cmd: 'move', x: 5, y: 5},
		{id: 'player', cmd: 'move', x: 5, y: 6},
		{id: 'player', cmd: 'move', x: 6, y: 6},
		{id: 'player', cmd: 'move', x: 6, y: 5},
		{id: 'player', cmd: 'move', x: 7, y: 5 },
        {id: 'player', cmd: 'move', x: 7, y: 6 },
        {id: 'player', cmd: 'move', x: 8, y: 6 },
        {id: 'player', cmd: 'move', x: 8, y: 7 },
        {id: 'player', cmd: 'move', x: 9, y: 7 },
        {id: 'player', cmd: 'move', x: 9, y: 8 },
        {id: 'player', cmd: 'move', x: 10, y: 8 },
        {id: 'player', cmd: 'move', x: 10, y: 9 },
        {id: 'player', cmd: 'move', x: 11, y: 9 },
        {id: 'player', cmd: 'move', x: 11, y: 10 },
        {id: 'player', cmd: 'move', x: 12, y: 10 },
        {id: 'player', cmd: 'move', x: 12, y: 11 },
        {id: 'player', cmd: 'move', x: 13, y: 11 },
        {id: 'player', cmd: 'move', x: 13, y: 12 },
        { id: 'player', cmd: 'move', x: 14, y: 12 },
        { id: 'player', cmd: 'move', x: 15, y: 12 },
        { id: 'player', cmd: 'move', x: 15, y: 11 },
        { id: 'player', cmd: 'move', x: 15, y: 10 },
        { id: 'player', cmd: 'move', x: 16, y: 10 },
        { id: 'player', cmd: 'move', x: 16, y: 9 },
        { id: 'player', cmd: 'move', x: 16, y: 8 },
        { id: 'player', cmd: 'move', x: 15, y: 8 },
        { id: 'player', cmd: 'move', x: 14, y: 8 },
        { id: 'player', cmd: 'move', x: 14, y: 9 },
        { id: 'player', cmd: 'move', x: 14, y: 10 },
        { id: 'player', cmd: 'move', x: 15, y: 10 },
		{id: 'player', cmd: 'playAnimation', anim: 'move_left'},
		{id: 'player', cmd: 'playAnimation', anim: 'move_right'},
		{id: 'diamond', cmd: 'move', x: 15, y: 11},
		{id: 'diamond', cmd: 'move', x: 15, y: 10},
		{id: 'diamond', cmd: 'wait'},
		{id: 'diamond', cmd: 'move', x: 15, y: 9},
		{cmd: 'notification', text: 'example notification' }
	];
	var graphics = gameDisplayWindow.add.graphics(0, 0);
    graphics.beginFill(0x000000, 1);
    graphics.drawRect(0, gameHeight, gameWidth, notificationAreaHeight);
	notification = gameDisplayWindow.add.text(notificationX, notificationY, '', { font: '16px Arial', fill: '#ffffff' });
	notification.anchor.set(0.5);
	makeGameState(commands);
}

function update() {
    if (animatingEnts.length > 0) {
        for (var i = 0; i < animatingEnts.length; i++)
            animatingEnts[i].animate();
    }
}

function makeGameState(commands){
	for(var i = 0; i < commands.length; i++){
		var c = commands[i];
		if(c.cmd == 'create')
			entities[c.id] = new Entity(c.type,c.x,c.y);
		else if(c.cmd == 'notification'){
			notification.setText(c.text);
		}
		else{
			var e = entities[c.id];
			if(!e.hasCommands){
				e.currentCommand = -1;
				e.frameTime = -1;
				e.hasCommands = true;
				e.commands = [];
				animatingEnts.push(e);
			}
			e.commands.push(c);
		}
		
	}
}

function Entity(type,x,y) {
	this.xOrigin = 0;
	this.yOrigin = 0;
	this.type = type;
    this.x = x;
    this.y = y;
	this.commands = [];
	this.currentCommand = -1;
	this.frameTime = -1;
	this.hasCommands = false;
	this.makeSprite = function (sprite) {
		this.sprite = gameDisplayWindow.add.sprite(this.x * tileWidth - this.xOrigin, this.y * tileHeight - this.yOrigin, sprite);
	}
	this.animate = function () {
		if(this.currentCommand == -1){
			this.currentCommand = 0;
			var c=this.commands[0];
			animationCommands[c.cmd].start.call(this,c);
			return;
		}
		var c=this.commands[this.currentCommand];
		if(this.frameTime<=0){
			animationCommands[c.cmd].finish.call(this,c);
			this.currentCommand++;
			if(this.currentCommand<this.commands.length){
				var c=this.commands[this.currentCommand];
				animationCommands[c.cmd].start.call(this,c);
			}
			else{
				var i=0;
				while(animatingEnts[i]!=this)
					i++;
				animatingEnts[i]=animatingEnts[animatingEnts.length-1];
				animatingEnts.pop();
			}
		}
		else{
			animationCommands[c.cmd].anim.call(this,c);
			this.frameTime--;
		}
	}
	instantiateEntity[this.type].call(this);
}
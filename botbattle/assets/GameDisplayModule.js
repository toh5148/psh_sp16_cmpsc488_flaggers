const gameWidth=tileWidth*tileColumns,gameHeight=tileHeight*tileRows,
	notificationAreaHeight=32,notificationX=gameWidth/2,notificationY=gameHeight+notificationAreaHeight/2;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight+notificationAreaHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var tileSheetIndices=[], backgroundTiles=[], entities=[], animatingEntsList=[];
var animatingEnts=0;

function preload() {
    loadImages();
}

function create() {
	// Code to set initial game state
	// Set space for notification
    // Set background tiles
	var tileTypes = setBackgroundTiles();
	for (var y = 0; y < tileRows; y++) {
		backgroundTiles[y] = [];
		for (var x = 0; x < tileColumns; x++)
			backgroundTiles[y][x] = gameDisplayWindow.add.sprite(x * tileHeight, y * tileWidth, tileTypes[y][x].sheet, tileTypes[y][x].index);
	}
    // Run initial commands to create the initial state
	var commands = [
		{id: 'player', cmd: 'create', type: 'player', sprite: 'dude', x: Math.floor(Math.random() * tileColumns), y: Math.floor(Math.random() * tileRows)},
		{id: 'star', cmd: 'create', type: 'star', sprite: 'star', x: Math.floor(Math.random() * tileColumns), y: Math.floor(Math.random() * tileRows)},
		{id: 'diamond', cmd: 'create', type: 'diamond', sprite: 'diamond', x: Math.floor(Math.random() * tileColumns), y: Math.floor(Math.random() * tileRows)}
	];
	makeGameState(commands);
	entities['player'].startMove();
	var graphics = gameDisplayWindow.add.graphics(0, 0);

    // graphics.lineStyle(2, 0xffd900, 1);

    graphics.beginFill(0xFF0000, 1);
    graphics.drawRect(0, gameHeight, gameWidth, notificationAreaHeight);
	var notification = gameDisplayWindow.add.text(notificationX, notificationY-59, "cccccccccccclick and drag me",
		{ font: '32px Arial', fill: '#000000', boundsAlignH: 'center', boundsAlignH: 'middle' });
}

function update() {
    if (animatingEnts > 0) {
        for (var i = 0; i < animatingEnts; i++)
            animatingEntsList[i].animate();
    }
}

function makeGameState(commands){
	for(var i=0;i<commands.length;i++){
		var c=commands[i];
		if(c.cmd=='create')
			entities[c.id]=new Entity(c.type,c.x,c.y,c.sprite);
	}
}

function Entity(type,x,y,spriteName) {
	this.type=type;
    this.x = x;
    this.y = y;
    this.spriteName = spriteName;
    this.sprite = gameDisplayWindow.add.sprite(x * tileWidth, y * tileHeight, spriteName);
	
	// Move this elsewhere
	if(instantiateEntity[type]!=null)
		instantiateEntity[type](this);
    if (x * tileWidth >= gameWidth / 2) {
        this.hDir = 'left';
        this.dir = 'left';
    }
    else {
        this.hDir = 'right';
        this.dir = 'right';
    }
    if (y * tileHeight >= gameHeight / 2)
        this.vDir = 'up';
    else
        this.vDir = 'down';
    this.animationTimeRemaining;
    this.animating = false;
    this.startMove = function () {
        var destx, desty;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                destx = this.x - 1;
                desty = this.y;
                this.dir = 'left';
                this.hDir = 'left';
                break;
            case 1:
                destx = this.x + 1;
                desty = this.y;
                this.dir = 'right';
                this.hDir = 'right';
                break;
            case 2:
                destx = this.x;
                desty = this.y - 1;
                this.dir = 'up';
                this.vDir = 'up';
                break;
            case 3:
                destx = this.x;
                desty = this.y + 1;
                this.dir = 'down';
                this.vDir = 'down';
                break;
        }
        this.findPlayAnim('move');
        this.animating = true;
		animatingEntsList.push(this);
        animatingEnts++;
        this.movex = (destx - this.x) * tileWidth / animationTime;
        this.movey = (desty - this.y) * tileHeight / animationTime;
        this.x = destx;
        this.y = desty;
        this.animationTimeRemaining = animationTime;
    }
    this.animate = function () {
        if (!this.animating)
            return;
        this.animationTimeRemaining--;
        if (this.animationTimeRemaining === 0) {
            this.sprite.x = this.x * tileWidth;
            this.sprite.y = this.y * tileHeight;
            this.animating = false;
            animatingEnts--;
			animatingEntsList.pop();
			this.findPlayAnim('idle');
			this.startMove();
        }
        else {
            this.sprite.x += this.movex;
            this.sprite.y += this.movey;
        }
    }
    this.findPlayAnim = function (animationName) {
        // First try to play animation corresponding to current direction
        if (this.playAnim(animationName + '_' + this.dir)) return;
        // If that doesn't exist, play animation corresponding to last hDir or vDir
        if (this.dir === 'left' || this.dir === 'right') {
            if (this.playAnim(animationName + '_' + this.vDir)) return;
        }
        else{
            if (this.playAnim(animationName + '_' + this.hDir)) return;
        }
        // If that doesn't exist either, play default animation
        this.playAnim(animationName + '_default');
        // If that still doesn't exist, play nothing
        return;
    }
    this.playAnim = function (animationName) {
        if (this.sprite.animations.getAnimation(animationName) != null) {
            this.sprite.animations.play(animationName);
            return true;
        }
        return false;
    }
}
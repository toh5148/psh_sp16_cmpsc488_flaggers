const gameWidth=800,gameHeight=600,tileWidth=50,tileHeight=50,tileColumns=gameWidth/tileWidth,tileRows=gameHeight/tileHeight,fps=60;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update }),
	defaultTimestep,turnTime,timeIncr;
	entities = [];

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

var changes = [
	{
		id: 101,
		changes: [
			{
				action: 'move',
				start: 0,
				end: .2,
				startX: 1,
				startY: 2,
				x: 6,
				y: 4
			},
			{
				action: 'move',
				start: .2,
				end: .3,
				startX: 6,
				startY: 4,
				x: 7,
				y: 3
			},
			{
				action: 'move',
				start: .3,
				end: 1,
				startX: 7,
				startY: 3,
				x: 6,
				y: 1
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
				startX: 10,
				startY: 8,
				x: 11,
				y: 9
			}
		]
	}
];

function preload(){
	gameDisplayWindow.load.image('background', 'assets/images/background.png');
	gameDisplayWindow.load.spritesheet('zombie', 'assets/images/zombie.png',32,32);
}

function create(){
	gameDisplayWindow.add.image(0,0,'background');
	defaultTimestep=gameInitializer.defaultTimestep;
	timeIncr=1/(fps*defaultTimestep);
	var e=gameInitializer.entity;
	for(var i=0;i<e.length;i++){
		entities[e[i].id]=new entity(e[i]);
	}
	turnTime=0;
}

function update(){
	for(var i=0;i<changes.length;i++){
		var c = changes[i], e = entities[c.id];
		if(e.changeNum<c.changes.length){
			if(c.changes[e.changeNum].end<turnTime)
				e.changeNum++;
			if(e.changeNum<c.changes.length){
				var c2 = c.changes[e.changeNum];
				if(turnTime>=c2.start && turnTime<=c2.end)
					e[c2.action](c2);
			}
		}
	}
	turnTime += timeIncr;
}

function entity(e){
	this.id = e.id;
	this.type = e.type;
	this.visible = e.visible;
	this.x = e.initX;
	this.y = e.initY;
	this.width = e.width;
	this.height = e.height;
	this.flipped = e.flipped;
	this.rotation = e.rotation;
	this.sprite = gameDisplayWindow.add.sprite(this.x*tileWidth,this.y*tileHeight,'zombie');
	this.changeNum = 0;
	this.animations = [];
	this.move = function(f){
		// position
		var m = 1/(f.end-f.start);
		var t1 = (f.end-turnTime)*m,t2 = (turnTime-f.start)*m;
		this.sprite.x = (f.startX*t1+f.x*t2)*tileWidth;
		this.sprite.y = (f.startY*t1+f.y*t2)*tileHeight;
		// animation
		var anim,xDist=f.x-f.startX,yDist=f.y-f.startY;
		if(Math.abs(yDist)>Math.abs(xDist)){
			if(yDist<0)
				anim=this.animations['move_up'];
			else
				anim=this.animations['move_down'];
		}
		else{
			if(xDist<0)
				anim=this.animations['move_left'];
			else
				anim=this.animations['move_right'];
		}
		this.sprite.frame=anim.frames[Math.floor((turnTime-f.start)*anim.speed)%anim.frames.length];
	}
	this.addAnimations = function(){
		switch(this.type){
			case 'spriteZombie':
				this.animations['move_down']={frames: [0,1,2], speed: 15};
				this.animations['move_left']={frames: [3,4,5], speed: 15};
				this.animations['move_right']={frames: [6,7,8], speed: 15};
				this.animations['move_up']={frames: [9,10,11], speed: 15};
				break;
		}
	}
	this.addAnimations();
}
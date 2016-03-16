const gameWidth=800,gameHeight=600,tileWidth=50,tileHeight=50,tileColumns=gameWidth/tileWidth,tileRows=gameHeight/tileHeight,fps=60;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'div_gameCanvas', { preload: preload, create: create, update: update }),
	playing, turn, defaultTimestep, turnTime, timeIncr, turnLength,
	entities, entityList, entityChangeNums, gameStates;

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
						startX: 6,
						startY: 1,
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
						x: 1,
						y: 2
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
		]
	}
];

function preload(){
	gameDisplayWindow.load.image('background', 'assets/images/background.png');
	gameDisplayWindow.load.spritesheet('zombie', 'assets/images/zombie.png',32,32);
}

function create(){
	playing=false;
	gameDisplayWindow.add.image(0,0,'background');
	entities=[];
	var e=gameInitializer.entity;
	entityList=[];
	for(var i=0;i<e.length;i++){
		var ent=new entity(e[i]);
		entities[e[i].id] = ent;
		entityList.push(ent);
	}
	defaultTimestep=gameInitializer.defaultTimestep;
	turn=-1;
	turnTime=Infinity;
	turnLength=0;
	timeIncr=0;
	generateGameStates();
}

function update(){
	if(!playing)
		return;
	if(turnTime>1)
		startTurn(turn+1,false);
	var tc=turns[turn].turnChanges;
	for(var i=0;i<tc.length;i++){
		var c = tc[i], e = entities[c.id];
		if(!(e.id in entityChangeNums))
			entityChangeNums[e.id]=0;
		var cn=entityChangeNums[e.id];
		if(cn<c.changes.length){
			if(c.changes[cn].end<turnTime){
				entityChangeNums[e.id]++;
				cn=entityChangeNums[e.id];
			}
			if(cn<c.changes.length){
				var c2 = c.changes[cn];
				if(turnTime>=c2.start && turnTime<=c2.end)
					e[c2.action](c2);
			}
		}
	}
	turnTime += timeIncr;
}

function generateGameStates(){
	gameStates = [];
	var initialgs={};
	for(var i=0;i<entityList.length;i++){
		var entId=entityList[i].id, ent=entities[entId];
		initialgs[entId]={
			x: ent.initX,
			y: ent.initY
		};
	}
	gameStates.push(initialgs);
	for(var i=0;i<turns.length;i++){
		var gs={};
		var tc=turns[i].turnChanges;
		for(var j=0;j<tc.length;j++){
			var entId=tc[j].id, ent=entities[entId], changes=tc[j].changes, k=changes.length-1;
			while(k>=0 && changes[k].action!='move')
				k--;
			if(k>=0){
				var moveChange=changes[k];
				gs[entId]={
					x: moveChange.x,
					y: moveChange.y
				};
			}
		}
		gameStates.push(gs);
	}
}

function restoreGameState(n){
	for(var i=0;i<entityList.length;i++){
		var j=n,ent=entityList[i],entId=ent.id;
		while(!(entId in gameStates[j]))
			j--;
		var eInfo=gameStates[j][entId];
		ent.sprite.x=eInfo.x*tileWidth;
		ent.sprite.y=eInfo.y*tileHeight;
	}
}

function startTurn(tn,tm){
	turn=tn;
	if(tm)
		turnTime=1;
	else
		turnTime=0;
	turnLength=defaultTimestep*turns[turn].timeScale; // * playback factor
	timeIncr=1/(fps*turnLength);
	entityChangeNums = {};
}

/*function addChangeInfo(){
	for(var t=0;t<turns.length;t++){
		var tc=turns[t].turnChanges;
		for(var c=0;c<tc.length;c++){
			var change=tc[c];
			switch(change.action){
				case 'move':
					if(!(startX in change)){
						if(c==0){
							if(t==0)
								change.startX=entities[change.id].x;
							else
								change.startX=turns[t-1].turnChanges
						}
					}
					break;
			}
		}
	}
}*/

function entity(e){
	this.id = e.id;
	this.type = e.type;
	this.visible = e.visible;
	this.initX = e.initX;
	this.initY = e.initY;
	this.width = e.width;
	this.height = e.height;
	this.flipped = e.flipped;
	this.rotation = e.rotation;
	this.sprite = gameDisplayWindow.add.sprite(this.initX*tileWidth,this.initY*tileHeight,'zombie');
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
		this.sprite.frame=this.getFrame((turnTime-f.start),anim);
	}
	this.getFrame = function(num,anim){
		return anim.frames[Math.floor(num*anim.speed)%anim.frames.length];
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

function Play_click(){
	playing=true;
}

function Pause_click(){
	playing=false;
}

function GoToStart_click(){
	restoreGameState(0);
	startTurn(0,false);
}

function GoToEnd_click(){
	restoreGameState(turns.length);
	startTurn(turns.length,false);
}
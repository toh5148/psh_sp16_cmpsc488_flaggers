// Code for displaying the game on the game display window, in phaser
// This module stores all entity data within changes, thus the state of an entity at a specific point in time can be
//  perfectly restored upon running the change

const gameWidth=800,gameHeight=600,fps=60;
var gameDisplayWindow, playing, turn, defaultTimestep, turnTime, turnFrame, turnLength, playbackSpeed,
	entities, entityList, entityChangeNums, gameStates, gameInitializer, turns,
    defaultValues = ['visible', 'initX', 'initY', 'initWidth', 'initHeight', 'flipped', 'value'],
    defaultReplace = ['visible', 'x', 'y', 'width', 'height', 'flipped', 'value'],
    textProperties = ['font', 'backgroundColor', 'fill'],
    textDefaults = ['bold 20pt Arial', null, '#000000'],
    spriteActions = ['walk', 'fall', 'attack', 'defend'];

function create() {
    playbackSpeed = 1;
    gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'div_gameCanvas',
        {preload: preload, create: onCreateWindow, update: drawTurn})
}

function preload() {
    // Load graphical assets
    // Load background
    gameDisplayWindow.load.image('background', gameInitializer.background);
    // Load sprites
    sl = spriteList.sprites;
    for (var i = 0; i < sl.length; i++) {
        var spr = spriteList[sl[i]];
        gameDisplayWindow.load.spritesheet(sl[i], spr.spriteSheet, spr.width, spr.height);
    }
    // Get and preload all object images
    var images = gameInitializer.imagesToLoad;
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        gameDisplayWindow.load.image(img.name, img.imagePath);
    }
    // Set default timestep
    defaultTimestep = gameInitializer.defaultTimestep;
    //Load Default Bot ID from Game Init Message -- DEFAULT_BOT_ID is declared in BotUploader.js
    DEFAULT_BOT_ID = gameInitializer.defaultBot;
    startGame();
}

function startGame(){
    // Start the game, or restart it if already started
    // Set initial variables
    entities = [];
    entityList = [];
    gameStates = [];
    turn = 0;
    // Generate game
    createEnts();                           // Create entity objects
    generateTurnChanges();                  // Set initial values for all turn changes
    generateGameStates();                   // Save game states
    generateRows(gameInitializer, turns);   // Generate rows for the status table
}

function createEnts(){
    // Create all the entity objects
    gameStates.push({});
    var e = gameInitializer.entity;
    for (var i = 0; i < e.length; i++)
        addEnt(e[i],0);
}

function addEnt(e,t) {
    // Create an entity object and add its initial game state as a change
    var gs = {
        action: 'create',
        start: 0,
        end: 1,
        visible: e.visible,
        initX: e.initX,
        initY: e.initY,
        initRotation: e.rotation,
        flipped: e.flipped,
        anim: {frames: [0], speed: 0}
    };
    if(t>0)
        gs.visible=false;
    if (e.type == 'text') {
        gs.value = e.value;
        for (var i = 0; i < textProperties.length; i++) {
            var p = textProperties[i];
            if (p in e)
                gs[p] = e[p];
            else
                gs[p] = textDefaults[i];
        }
    }
    else {
        gs.initWidth = e.width;
        gs.initHeight = e.height;
        if (e.type == 'object')
            gs.value = e.value;
    }
    gameStates[0][e.id] = gs;
    // Make the entity object
    var ent = new Entity(e,t);
    entities[ent.id] = ent;
    entityList.push(ent);
}

function generateTurnChanges() {
    // Set the initial values for all turn changes (initX, initY, etc)
    // This enables us to fully restore the state of an entity by playing an animation
    var prevChange = {};
    for (var i = 0; i < entityList.length; i++) {
        var id = entityList[i].id;
        prevChange[id] = gameStates[0][id];
    }
    for (var i = 0; i < turns.length; i++) {
        var turnChanges = turns[i].turnChanges;
        for (var j = 0; j < turnChanges.length; j++) {
            var changes = turnChanges[j].changes, id = turnChanges[j].id;
            for (var k = 0; k < changes.length; k++) {
                var c = changes[k];
                if('create' in c) {
                    addEnt(c.create, i);
                    prevChange[id] = gameStates[0][id];
                    c.visible = c.create.visible;
                }
                addDefaultValues(id, c, prevChange[id]);
                prevChange[id] = c;
            }
        }
    }
}

function addDefaultValues(id, change, prevChange) {
    // Add default values to an individual change
    for (var i = 0; i < defaultValues.length; i++) {
        var value = defaultValues[i], replace = defaultReplace[i];
        if (!(value in change)) {
            if (replace in prevChange)
                change[value] = prevChange[replace];
            else if (value in prevChange)
                change[value] = prevChange[value];
        }
    }
    if (!('initRotation' in change)) {
        var initRotation = prevChange.initRotation;
        if ('rotation' in prevChange)
            initRotation += prevChange.rotation;
        change.initRotation = initRotation;
    }
    if (!(anim in change)) {
        var anim = entities[id].getAnimation(change);
        if (anim == null)
            anim = {frames: [prevChange.anim.frames[0]], speed: 0};
        change.anim = anim;
    }
    if (entities[id].type == 'text') {
        for (var i = 0; i < textProperties.length; i++) {
            var c = textProperties[i];
            if ((c in prevChange) && !(c in change))
                change[c] = prevChange[c];
        }
    }
}

function generateGameStates() {
    // Generate game states using the most recent change of every entity so we can restore them later
    for (var i = 0; i < turns.length; i++) {
        var gs = {}, tc = turns[i].turnChanges;
        for (var j = 0; j < tc.length; j++) {
            var c = tc[j];
            gs[c.id] = c.changes[c.changes.length - 1];
            entities[c.id].finalTurn = i + 1;
        }
        gameStates.push(gs);
    }
}

function onCreateWindow(){
    // Set background
    var bkg = gameDisplayWindow.add.image(0, 0, 'background');
    bkg.width = gameWidth;
    bkg.height = gameHeight;
    // Spawn entities
    spawnEnts();
}

function spawnEnts() {
    // Spawn entities
    for (var i = 0; i < entityList.length; i++)
        entityList[i].instantiate();
    // Set first turn
    restoreGameState(0);
    console.log("The GDM create method has now run");
}

function drawTurn() {
    // Draw the state of the game every frame
    if (!playing) return;
    // Go to next turn if current turn has ended
    if (turnTime > 1)
        startTurn(turn + 1);
    // Stop if we've reached the end
    if (!playing) return;
    // Get current turn changes
    var tc = turns[turn].turnChanges;
    // Iterate through the turn changes
    for (var i = 0; i < tc.length; i++) {
        // Get the change to execute for this entity
        var c = tc[i], e = entities[c.id];
        if (!(e.id in entityChangeNums))
            entityChangeNums[e.id] = 0;
        var cn = entityChangeNums[e.id];
        var changes = c.changes;
        while (cn < changes.length - 1 && changes[cn + 1].start <= turnTime) {
            entityChangeNums[e.id]++;
            cn = entityChangeNums[e.id];
        }
        // Execute change
        if (cn < changes.length) {
            var c2 = changes[cn];
            if (turnTime >= c2.start) {
                if (!('end' in c2) || turnTime <= c2.end)
                    e.action(c2, turnTime);
                else if(('end' in c2) && turnTime > c2.end)
                    e.action(c2, c2.end);
            }
        }
    }
    // Increase turn time
    turnFrame++;
    turnTime = (turnFrame * playbackSpeed) / (fps * turnLength);
    gameDisplayWindow.world.sort();
}

function restoreGameState(turnNum) {
    startTurn(turnNum);
    playing = false;
}

function startTurn(tn) {
    // Load the beginning of a turn
    if (tn < 0)
        tn = 0;
    for (var i = 0; i < entityList.length; i++) {
        var ent = entityList[i], j = Math.min(tn,ent.finalTurn), entId = ent.id;
        while (!(entId in gameStates[j]))
            j--;
        gs=gameStates[j][entId];
        ent.action(gs, gs.end);
    }
    // Set the beginning variables of a turn
    if (tn < 0)
        tn = 0;
    if (tn >= turns.length) {
        playing = false;
        turnTime = Infinity;
        turn = turns.length;
        updateStatusTable(turn);
        return;
    }
    turn = tn;
    updateStatusTable(turn);
    turnTime = 0;
    turnLength = defaultTimestep * turns[turn].timescale;
    turnFrame = 0;
    entityChangeNums = {};
}

function setNewTestingArenaTurn() {
    // Call when receiving a new set of turns
    for(var i=0;i<entityList.length;i++)
        entityList[i].obj.destroy();
    startGame();
    spawnEnts();
    // Set turn
    restoreGameState(turns.length-1);
}

function Entity(e,ft) {
    this.initMessage = e;               // Initialization of this entity
    this.id = this.initMessage.id;      // Unique numerical id
    this.type = this.initMessage.type;  // The type of entity: 'object', 'text', or a type of sprite
    this.firstTurn = ft;                // The first turn this entity exists on, for deleting in the testing arena
    this.finalTurn = 0;                 // The last turn on which this entity executes a change
    if (this.type == 'object' || this.type == 'text')
        this.isAnimated = false;
    else {
        this.isAnimated = true;
        this.animations = spriteList[this.type];
    }
    // Create the sprite or text object
    this.instantiate = function() {
        if (this.type == 'object') {
            this.obj = gameDisplayWindow.add.sprite(0, 0, this.initMessage.value);
            this.obj.name = this.initMessage.value;
            this.obj.anchor.setTo(0.5, 0.5);
        }
        else if (this.type == 'text')
            this.obj = gameDisplayWindow.add.text(0, 0, this.initMessage.value);
        else {
            this.obj = gameDisplayWindow.add.sprite(0, 0, this.initMessage.type);
            this.obj.anchor.setTo(0.5, 0.5);
        }
    };
    // Code to execute when performing a change
    this.action = function (f, t) {
        // Object/Text value
        if(this.type == 'object') {
            if(this.obj.name != f.value) {
                this.obj.destroy();
                this.obj = gameDisplayWindow.add.sprite(0, 0, f.value);
                this.obj.name = f.value;
                this.obj.anchor.setTo(0.5, 0.5);
            }
        }
        else if(this.type == 'text') {
            this.obj.text = f.value;
            for (var i = 0; i < textProperties.length; i++) {
                var c = textProperties[i];
                if (c in f)
                    this.obj.style[c] = f[c];
            }
            this.obj.style.fontSize=80;
            this.obj.style.fontWeight='bold';
        }

        // Visibility
        if (!f.visible) {
            this.obj.visible = false;
            return;
        }
        this.obj.visible = true;

        // Movement
        var m = 1 / (f.end - f.start),
            t1 = (f.end - t) * m, t2 = 1 - t1,
            time = t - f.start, scaledTime = time * m;
        if ('x' in f)
            this.obj.x = (f.initX * t1 + f.x * t2);
        else
            this.obj.x = f.initX;
        if ('y' in f)
            this.obj.y = (f.initY * t1 + f.y * t2);
        else
            this.obj.y = f.initY;

        // Sprite/text properties
        if (this.type != 'text') {
            if ('width' in f)
                this.obj.width = f.initWidth * t1 + f.width * t2;
            else
                this.obj.width = f.initWidth;
            if ('height' in f)
                this.obj.height = f.initHeight * t1 + f.height * t2;
            else
                this.obj.height = f.initHeight;
        }
        if ('rotation' in f)
            this.obj.angle = scaledTime * f.rotation + f.initRotation;
        else
            this.obj.angle = f.initRotation;
        if (f.flipped)
            this.obj.width *= -1;

        // Animation
        if (this.isAnimated) {
            var anim = f.anim;
            this.obj.frame = anim.frames[Math.floor(time * anim.speed) % anim.frames.length];
        }

        // Depth
        this.obj.z = this.obj.y;

        // Special Actions
        if('action' in f){
            if(f.action in specialActions)
                specialActions[f.action].call(this,f,{m,t1,t2,time,scaledTime});
        }
    };
    // For default values
    this.getAnimation = function (f) {
        if (!('action' in f) || spriteActions.indexOf(f.action) < 0)
            return null;
        return this.animations[f.action];
    };
}
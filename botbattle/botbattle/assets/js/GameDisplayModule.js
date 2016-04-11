const gameWidth=800,gameHeight=600,fps=60;
var gameDisplayWindow = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'div_gameCanvas',
    { preload: preload, create: create, update: drawTurn }),
	playing, turn, defaultTimestep, turnTime, turnFrame, turnLength, playbackSpeed,
	entities, entityList, entityChangeNums, gameStates,
    defaultValues = ['visible', 'initX', 'initY', 'initWidth', 'initHeight', 'flipped', 'value'],
    defaultReplace = ['visible', 'x', 'y', 'width', 'height', 'flipped', 'value'],
    textProperties = ['font', 'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'backgroundColor', 'fill', 'align',
        'boundsAlignH','boundsAlignV', 'stroke', 'strokeThickness', 'wordWrap', 'wordWrapWidth', 'tabs'];
spriteActions = ['walk', 'fall', 'attack', 'defend'];

var gameInitializer, turns;

var ready = false;
var playbackMode; //TODO: Set to true for playback mode, set to false for testing arena mode. (Shouldn't be too much difference between them)

function preload() {
    // Load graphical assets
    gameDisplayWindow.load.image('background', 'assets/images/background.png');
    gameDisplayWindow.load.spritesheet('spriteRabbit', 'assets/images/spriteBunny.png', 800, 800);
    gameDisplayWindow.load.spritesheet('spriteChicken', 'assets/images/spriteChicken.png', 800, 800);
    //gameDisplayWindow.load.spritesheet('spriteZombie', 'assets/images/spriteZombie.png', 800, 800);
    //gameDisplayWindow.load.spritesheet('spriteAlien', 'assets/images/spriteAlien.png', 800, 800);
    gameDisplayWindow.load.image('brickWall', 'assets/images/brickWall.png');
}

function create() {
    if (ready) {

        // Set background
        var bkg = gameDisplayWindow.add.image(0, 0, 'background');
        bkg.width = gameWidth;
        bkg.height = gameHeight;
        // Set default timestep
        defaultTimestep = gameInitializer.defaultTimestep;
        // Set initial variables
        entities = [];
        entityList = [];
        playbackSpeed = 1;
        gameStates = [];
        turn = 0;
        // Generate game
        createEnts();
        generateTurnChanges();
        generateGameStates();
        generateRows(gameInitializer, turns);
        // Set first turn
        restoreGameState(0);
        ready = false;
        console.log("The GDM create method has now run");
        //console.log(JSON.stringify(gameInitializer, null, 2));
        //console.log(JSON.stringify(turns, null, 2));
    }
}

function drawTurn() {
    // Draw the state of the game every frame
    if (!playing) return;
    // Go to next turn if current turn has ended
    if (turnTime > 1)
        startTurn(turn + 1, false);
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
            if (turnTime >= c2.start && (!('end' in c2) || turnTime <= c2.end))
                e.action(c2, turnTime);
        }
    }
    // Increase turn time
    turnFrame++;
    turnTime = (turnFrame * playbackSpeed) / (fps * turnLength);
}

function createEnts(){
    // Spawn all the entities
    gameStates.push({});
    var e = gameInitializer.entity;
    for (var i = 0; i < e.length; i++)
        addEnt(e[i]);
}

function addEnt(e) {
    // Spawn an entity and add its initial game state
    var ent = new Entity(e);
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
    if (e.type == 'text') {
        gs.value = e.value;
        for (var i = 0; i < textProperties.length; i++) {
            var p = textProperties[i];
            if (p in e)
                gs[p] = e[p];
            else
                gs[p] = ent.obj[p];
        }
    }
    else {
        gs.initWidth = e.width;
        gs.initHeight = e.height;
        if (e.type == 'object')
            gs.value = e.value;
    }
    gameStates[0][e.id] = gs;
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
        }
        gameStates.push(gs);
    }
}

function restoreGameState(turnNum) {
    // Load the beginning of a turn
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
    // Set the beginning variables of a turn
    if (tn < 0)
        tn = 0;
    if (tn >= turns.length) {
        playing = false;
        turnTime = Infinity;
        turn = turns.length;
        showRows(turn);
        return;
    }
    turn = tn;
    showRows(turn);
    if (tm)
        turnTime = 1;
    else
        turnTime = 0;
    turnLength = defaultTimestep * turns[turn].timeScale;
    turnFrame = 0;
    entityChangeNums = {};
}

function Entity(e) {
    this.id = e.id;
    this.type = e.type;
    this.animations = animationList[e.type];
    // Create the sprite or text object
    if (this.type == 'object') {
        this.obj = gameDisplayWindow.add.sprite(0, 0, e.value);
        this.obj.anchor.setTo(0.5, 0.5);
        this.isAnimated = false;
    }
    else if (this.type == 'text') {
        this.obj = gameDisplayWindow.add.text(0, 0, e.value);
        this.isAnimated = false;
    }
    else {
        this.isAnimated = true;
        this.obj = gameDisplayWindow.add.sprite(0, 0, e.type);
        this.obj.anchor.setTo(0.5, 0.5);
    }
    // Code to execute when performing a change
    this.action = function (f, t) {
        // Visibility
        if (!f.visible) {
            this.obj.visible = false;
            return;
        }
        this.obj.visible = true;

        // Movement
        var m = 1 / (f.end - f.start),
            t1 = (f.end - t) * m, t2 = (t - f.start) * m,
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
        if(this.type == 'object')
            this.obj.sprite = f.value;
        else if(this.type == 'text') {
            this.obj.text = f.value;
            for(var i=0;i<textProperties.length;i++){
                var c=textProperties[i];
                if(c in f)
                    this.obj[c]=f[c];
            }
        }

        // Animation
        if (this.isAnimated) {
            var anim = f.anim;
            this.obj.frame = anim.frames[Math.floor(time * anim.speed) % anim.frames.length];
        }
    };
    // For default values
    this.getAnimation = function (f) {
        if (!('action' in f) || spriteActions.indexOf(f.action) < 0)
            return null;
        return this.animations[f.action];
    };
}

var animationList = {
    spriteRabbit: {
        walk: {frames: [0,1,2,3,4,5,6,7,8,9], speed: 15},
        fall: {frames: [13,14], speed: 15},
        attack: {frames: [15,16,17,18,19], speed: 15},
        defend: {frames: [10,11,12,12,12,12,12,11], speed: 15}
    },
    spriteChicken: {
        walk: {frames: [0,1,2,3,4,5], speed: 15},
        fall: {frames: [11], speed: 15},
        attack: {frames: [6,7,8], speed: 15},
        defend: {frames: [10,10,9], speed: 15}
    }
    
    //TODO: Josiah other 2 sprites animations list.
};
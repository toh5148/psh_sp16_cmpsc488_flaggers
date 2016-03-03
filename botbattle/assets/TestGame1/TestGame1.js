const tileWidth=32,tileHeight=32,	// Size of tile sprites, in pixels
	tileColumns=20,tileRows=15,		// Size of map, in tiles
	animationTime=30;				// Time to complete a normal animation

function loadImages() {
	// Load sprite assets
    gameDisplayWindow.load.image('star', 'assets/TestGame1/star.png');
    gameDisplayWindow.load.image('diamond', 'assets/TestGame1/diamond.png');
	// Load spritesheet assets, specifying the width and height of individual sprites
    gameDisplayWindow.load.spritesheet('dude', 'assets/TestGame1/dude.png', 32, 48);
	// Load the background tile sheet
    gameDisplayWindow.load.spritesheet('tiles', 'assets/TestGame1/tiles.png', 32, 32);
}

function setBackgroundTiles() {
	// Function to set the background tiles at the beginning of the match
	// This should be a 2d array of ints corresponding to incides on the 'tiles' sheet
	var backgroundTiles = [];
	for (var y = 0; y < tileRows; y++) {
		backgroundTiles[y] = [];
		for (var x = 0; x < tileColumns; x++) {
			backgroundTiles[y][x] = Math.floor(Math.random() * 4);
		}
	}
	return backgroundTiles;
}

var instantiateEntity = {
	// Code to execute when an instance of an entity is created
	player: function() {
		this.yOrigin = 32;															// Set the x and y origin of the sprite
		this.makeSprite('dude');													// Instantiate the sprite
		this.sprite.animations.add('idle', [4], 10, true);							// Add the animations to the sprite (name, frames, frame rate)
		this.sprite.animations.add('move_left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('move_right', [5, 6, 7, 8], 10, true);
		this.sprite.animations.play('idle');										// Play the default state
	},
	star: function() {
		this.makeSprite('star');
	},
	diamond: function() {
		this.makeSprite('diamond');
	}
}

// List of animation commands for this specific game - modify as needed

var animationCommands = {
	
	wait: {									// Waiting command - do nothing until it's over
		start: function(command){
			this.frameTime = 60;			// We want this animation to last 60 frames, so we set the frameTime to 60
		},
		anim: function(command){},
		finish: function(command){}
	},
	
	playAnimation: {						// Command to play an animation but not do anything else
		start: function(command){
			this.frameTime = 30;
			this.sprite.animations.play(command.anim);
		},
		anim: function(command){},
		finish: function(command){
			this.sprite.animations.play('idle');	// We need to reset the sprite to the default state after the animation plays
		}
	},
	
	move: {									// Command to move sprite from one position to another
		start: function(command){
			var time = 30;
			this.frameTime = time;
			this.movex = ((command.x - this.x) * tileWidth) / time;				// Set the distance to move each frame of the animation
			this.movey = ((command.y - this.y) * tileHeight) / time;
			if(this.movex<0)
				this.sprite.animations.play('move_left');
			else if(this.movex>0)
				this.sprite.animations.play('move_right');
			else{
				if(this.movey<0)
					this.sprite.animations.play('move_left');
				else if(this.movey>0)
					this.sprite.animations.play('move_right');		
			}
		},
		anim: function(command){
			this.sprite.x += this.movex;							// Move the sprite once per frame
			this.sprite.y += this.movey;
		},
		finish: function(command){
			this.x = command.x;										// Set the sprite's tile position to the final position
			this.y = command.y;
			this.sprite.x = this.x * tileWidth - this.xOrigin;		// Set the sprite's pixel position to the final position
            this.sprite.y = this.y * tileHeight - this.yOrigin;
			this.sprite.animations.play('idle')						// Play the default animation
		}
	}
}
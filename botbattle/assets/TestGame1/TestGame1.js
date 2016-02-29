const tileWidth=32,tileHeight=32,	// Size of tile sprites, in pixels
	tileColumns=20,tileRows=15,		// Size of map, in tiles
	animationTime=30;				// Time to complete a normal animation

function loadImages() {
	// Load sprite assets
    gameDisplayWindow.load.image('star', 'assets/TestGame1/star.png');
    gameDisplayWindow.load.image('diamond', 'assets/TestGame1/diamond.png');
	// Load spritesheet assets, specifying the width and height of individual sprites
    gameDisplayWindow.load.spritesheet('tiles', 'assets/TestGame1/tiles.png', 32, 32);
    gameDisplayWindow.load.spritesheet('dude', 'assets/TestGame1/dude.png', 32, 48);
}

function setBackgroundTiles() {
	// Set the background tiles at the beginning of the match
	var backgroundTiles = [];
	for (var y = 0; y < tileRows; y++) {
		backgroundTiles[y] = [];
		for (var x = 0; x < tileColumns; x++) {
			backgroundTiles[y][x] = {sheet: 'tiles', index: Math.floor(Math.random() * 4)};
		}
	}
	return backgroundTiles;
}

var instantiateEntity = {
	// Code to execute when an instance of an entity is created
	player: function(entity) {
		entity.sprite.animations.add('move_left', [0, 1, 2, 3], 10, true);
		entity.sprite.animations.add('move_right', [5, 6, 7, 8], 10, true);
		entity.sprite.animations.add('idle_default', [4], 10, true);
	}
}
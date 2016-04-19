var spriteList = {
    sprites: ['spriteRabbit','spriteChicken','spriteMonster','spriteMummy'],
    spriteRabbit: {
        spriteSheet: 'assets/images/spriteRabbit.png',
        width: 800,
        height: 800,
        walk: {frames: [0,1,2,3,4,5,6,7,8,9], speed: 15},
        fall: {frames: [13,14], speed: 15},
        attack: {frames: [15,16,17,18,19], speed: 15},
        defend: {frames: [10,11,12,12,12,12,12,11], speed: 15}
    },
    spriteChicken: {
        spriteSheet: 'assets/images/spriteChicken.png',
        width: 800,
        height: 800,
        walk: {frames: [0,1,2,3,4,5], speed: 15},
        fall: {frames: [11], speed: 15},
        attack: {frames: [6,7,8], speed: 15},
        defend: {frames: [10,10,9], speed: 15}
    },
    spriteMonster: {
        spriteSheet: 'assets/images/spriteMonster.png',
        width: 39,
        height: 40,
        walk: {frames: [0,1,2,3], speed: 15},
        fall: {frames: [4,5,6,7], speed: 15},
        attack: {frames: [8,9,10,11], speed: 15},
        defend: {frames: [12,13,14,15], speed: 15},
    },
    spriteMummy: {
        spriteSheet: 'assets/images/spriteMummy.png',
        width: 37,
        height: 45,
        walk: {frames: [0,1,2,3], speed: 15},
        fall: {frames: [4,5,6,7], speed: 15},
        attack: {frames: [8,9,10,11], speed: 15},
        defend: {frames: [12,13,14,15], speed: 15},
    }
};
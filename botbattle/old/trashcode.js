
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
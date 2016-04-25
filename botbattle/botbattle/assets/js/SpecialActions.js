// Special actions for specific games
var specialActions = {
    jump: function (f, t) {
        var height = (1-Math.pow(t.scaledTime*2 - 1, 2)) * 50;
        this.obj.y -= height;
        this.obj.z += height;
        //console.log(this.obj.y);
    }
};
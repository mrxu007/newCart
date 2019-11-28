
cc.Class({
    extends: cc.Component,

    properties: {
 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 50;
        this.speed = 560;

    },

    start () {

    },

    onCollisionEnter: function () {
        this.node.getComponent(cc.AudioSource).play();
        
        this.node.removeFromParent();
    },

    update (dt) {
        this.node.y -= this.speed * dt;
        if(this.node.y < -1600)
        this.node.removeFromParent();
    },
});

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    moveOutBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(206.422,0)).easing(cc.easeBackInOut()));

    },
    moveInBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(0,0)).easing(cc.easeBackInOut()));

    },
   

    start () {

    },

    // update (dt) {},
});

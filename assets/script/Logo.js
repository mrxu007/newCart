// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //停止当前所有动画
    start () {

    },
    reset: function() {

    },
    Play() {

    },
    moveOutBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(0,1488.368)).easing(cc.easeBackInOut()));
    },
    moveInBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(0,577)).easing(cc.easeBackInOut()));

    },


    start () {

    },

    // update (dt) {},
});

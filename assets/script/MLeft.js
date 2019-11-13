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
    moveOutBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(-218.018,0)).easing(cc.easeBackInOut()));

    },
    moveInBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(0,0)).easing(cc.easeBackInOut()));

    },
    clickAudio: function(){
        
        // cc.audioEngine.playEffect( this.buttonAudio, false);
        cc.loader.loadRes('assets/button', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, false);
        });
    },

    start () {

    },

    // update (dt) {},
});

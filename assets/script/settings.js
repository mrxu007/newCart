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
        m_setting: cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },
    reset: function() {

    },
    Play() {

    },
    moveOutBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(-669.748,-12.144)).easing(cc.easeBackInOut()));
    },
    moveInBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(-578.19,-12.144)).easing(cc.easeBackInOut()));

    },
    //滑动切换
    toggleMeue: function() {
        
            if(!is){
                is = true;
                var moveTo = cc.moveTo(0.5,cc.v3(235.684,774.871));
                this.m_setting.runAction(moveTo);
                
            }else{
                is = false;
                var moveTo = cc.moveTo(0.5,cc.v3(83.451,774.871));
                this.m_setting.runAction(moveTo);
                
                
            } 


    },

    // update (dt) {},
});

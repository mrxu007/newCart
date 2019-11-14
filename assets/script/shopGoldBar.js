// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('define');
cc.Class({
    extends: cc.Component,

    properties: {
        m_labelGold : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_labelGold.string = '' + tranNumber( gDataCtl.GetGold(),1);
        this.updateTopData();
    },
    updateTopData: function() {
      
        this.m_labelGold.string =  '' + tranNumber( gDataCtl.GetGold(),1);
        
    },

    start () {

    },

    // update (dt) {},
});

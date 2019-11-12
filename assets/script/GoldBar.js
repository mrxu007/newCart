cc.Class({
    extends: cc.Component,

    properties: {
        m_labGold: cc.Label,
       
    },

    moveOutBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(-325.927,360.133)).easing(cc.easeBackInOut()));

    },
    moveInBar: function() {
        this.node.runAction(cc.moveTo(0.5,cc.v3(-325.927,140.26)).easing(cc.easeBackInOut()));

    },
    updateTopData: function() {
      
        this.m_labGold.string =  '' + tranNumber( gDataCtl.GetGold(),1);
        
    },
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_labGold.string = '' + tranNumber( gDataCtl.GetGold(),1);
        
    },


    // start () {

    // },
    

    // update (dt) {},
});

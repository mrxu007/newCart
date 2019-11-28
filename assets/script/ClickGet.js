cc.Class({
    extends: cc.Component,

    properties: {
        m_progress: cc.ProgressBar,
        m_labGold: cc.Label,
        m_topMenu: cc.Node,
        
       
                   
 
    },
    //按钮调用创建金币
    onClickGet:function(target,data) {
        var topPos = this.m_topMenu.getPosition();
        // console.log("调用金币时坐标"+this.node.getPosition());
        // console.log("获取金币");
        // console.log(this.node.getPosition());
        if(gDataCtl.getTaskGold() <= 0)return;
        gameCtl.createGoldAnim(
            this.node.getPosition(),
            cc.v3(topPos.x,topPos.y),
            300,
            20,
            gDataCtl.getTaskGold(),
            function(gold) {
                // console.log(gold);
                gDataCtl.AddGold(gold);
                // console.log(gold);
                var update = this.m_topMenu.getComponent('GoldBar');
                    update.updateTopData();
            }.bind(this)
            );
            gDataCtl.ClearTaskGold();
            this.updataGold();
    },
    //更新金币数量
    updataGold: function() {

        this.m_labGold.string = '' + tranNumber(gDataCtl.getTaskGold(),1);

    },
  

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        // console.log(topPos);
        this.updataGold();
    },

    start () {

    },

    update (dt) {
        var time = gDataCtl.getGoldAddtime(),
            dis = 1/time;
            dis *= dt;
       
        this.m_progress.progress += dis;
        if(this.m_progress.progress >= 1) {
            this.m_progress.progress = 0;
            var gold = gDataCtl.getAwardGold(100);
            gDataCtl.addTaskGold(gold);
            gDataCtl.save();
            this.updataGold();
        }
        
        
    },
});

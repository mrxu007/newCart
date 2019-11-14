

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

    // onLoad () {
    // },
    //储存只能储存字符串，但是传的是json，所以要进行转换
    save: function() {
        var str = JSON.stringify(gData);
        // console.log(str);
        cc.sys.localStorage.setItem('data',str);
        // console.log(str);
    },
    load: function() {
        var str = cc.sys.localStorage.getItem('data');
            gData = JSON.parse(str); 
            if(gData == null) {
                gData = {};
            }
            // console.log(gData);
            return gData;


    },
    reload: function () {
        cc.sys.localStorage.removeItem('data');
        this.save();
    },
    del: function() {
        // cc.sys.localStorage.removeItem('data');
        if( gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        gData.m_GoldValue = 0;

        console.log('数据已清空');
        this.save();

    },
    AddGold: function(gold) {
        if( gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        gData.m_GoldValue += gold;
        this.save();

    },
    GetGold: function() {
        if( gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        return gData.m_GoldValue;

    },
    //进度条增加金币
    //设置金币进度条时间
    setGoldAddTime: function(time) {
        
      gData.m_GetGoldTime = time;
      this.save();
    },
    //获取进度条时间
    getGoldAddtime: function(time) {
    
        if(gData.m_GetGoldTime == null) {
            gData.m_GetGoldTime = 20;
        }
        return gData.m_GetGoldTime;
    },
    //获取奖励金币
    getAwardGold: function(gold) {
        if(gData.m_AwardGold == null) {
            gData.m_AwardGold = 20;
        }
        return gData.m_AwardGold;
    },
  
    setAwardGold: function (gold) {
        if(gData.m_AwardGold == null) {
            gData.m_AwardGold = 20;
        }
        gData.m_AwardGold = gold;
        this.save();
    },
    addTaskGold: function(gold) {
        if(gData.m_TaskGold == null) {
            gData.m_TaskGold = 0;
        }
         gData.m_TaskGold += gold;
         this.save();
    },
    //实际上可以领多少钱
    getTaskGold: function(gold) {
        if(gData.m_TaskGold == null) {
            gData.m_TaskGold = 0;
        }
        return gData.m_TaskGold ;
        
    },
    //重置奖金
    ClearTaskGold: function() {
        gData.m_TaskGold = 0;
        this.save();
    },

    start () {

    },

    // update (dt) {},
});
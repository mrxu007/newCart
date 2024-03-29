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
    save: function () {
        var str = JSON.stringify(gData);
        // console.log(str);
        cc.sys.localStorage.setItem('data', str);
        // console.log(str);
    },
    //基础数据
    simpleData: function () {
        // console.log('已注入新的数据项');
        if (gData.BuyCartStatus == undefined) {
            gData.BuyCartStatus = [{
                    id: 0,
                    status: true
                },
                {
                    id: 1,
                    status: false
                },
                {
                    id: 2,
                    status: false
                },
                {
                    id: 3,
                    status: false
                },
                {
                    id: 4,
                    status: false
                },
            ];
        }
        if (gData.volume == undefined) {

            gData.volume = 0.7;
          
        }
        if (gData.DataStatus == undefined) {

            gData.DataStatus = 1;
            
        }
        if(gData.CartSkinId == undefined){

            gData.CartSkinId = 0;
        }
        if(gData.gameStartButtonStatus == undefined)
        {
            gData.gameStartButtonStatus = 0;
        }
        if(gData.gameScore == undefined){

            gData.gameScore = 0
        }
    },
    load: function () {
        var str = cc.sys.localStorage.getItem('data');
        gData = JSON.parse(str);
        if (gData == null) {
            gData = {};
        }
        this.simpleData();
        console.log(gData);
        return gData;
    },
    reload: function () {
        cc.sys.localStorage.removeItem('data');
        this.save();
    },
    del: function () {
        // cc.sys.localStorage.removeItem('data');
        if (gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        gData.m_GoldValue = 0;
        gData.m_TaskGold = 0;
        gData.BuyCartStatus = [
            { id: 0, status: true},
            { id: 1, status: false},
            { id: 2, status: false},
            { id: 3, status: false},
            { id: 4, status: false},
        
        ];
        gData.gameStartButtonStatus = 0;

        gData.CartSkinId = 0;

        console.log('数据已清空');
        this.save();

    },
    AddGold: function (gold) {
        if (gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        gData.m_GoldValue += gold;
        this.save();

    },
    //购买车辆设置的
    AddGold2: function (gold) {
        if (gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        gData.m_GoldValue = gold;
        this.save();

    },
    GetGold: function () {
        if (gData.m_GoldValue == null) {
            gData.m_GoldValue = 0;
        }
        return gData.m_GoldValue;

    },
    //进度条增加金币
    //设置金币进度条时间
    setGoldAddTime: function (time) {

        gData.m_GetGoldTime = time;
        this.save();
    },
    //获取进度条时间
    getGoldAddtime: function () {


        gData.m_GetGoldTime = 20;

        return gData.m_GetGoldTime;
    },
    //获取奖励金币
    getAwardGold: function (gold) {

        gData.m_AwardGold = gold;


        return gData.m_AwardGold;
    },

    setAwardGold: function (gold) {
        if (gData.m_AwardGold == null) {
            gData.m_AwardGold = 20;
        }
        gData.m_AwardGold = gold;
        this.save();
    },


    addTaskGold: function (gold) {
        if (gData.m_TaskGold == null) {
            gData.m_TaskGold = 0;
        }
        gData.m_TaskGold += gold;
        this.save();
    },
    //实际上可以领多少钱
    getTaskGold: function (gold) {
        if (gData.m_TaskGold == null) {
            gData.m_TaskGold = 0;
        }
        return gData.m_TaskGold;

    },
    //重置奖金
    ClearTaskGold: function () {
        gData.m_TaskGold = 0;
        this.save();
    },
    //设置本地音乐的状态
    setRoomVoiceStatus(status) {
        if (gData.RoomVoiceStatus == null) {
            gData.RoomVoiceStatus = true;
        } else {
            gData.RoomVoiceStatus = status;
        }
        this.save();
        // console.log('当前本地设置的音乐状态是'+gData.RoomVoiceStatus);
    },
    //获取本地音乐的状态
    getRoomVoiceStatus: function () {
        // console.log('当前正在读取');
        if (gData.RoomVoiceStatus == null) {
            gData.RoomVoiceStatus = true;
        }
        return gData.RoomVoiceStatus;
    },
    //设置音量
    setVle: function (vl) {
        if (gData.volume = null) {
            // console.log('data文件:自动生成gData.volume变量');
            gData.volume = 0.7;
        } else {
            gData.volume = vl;
        }

        this.save();
        return gData.volume;
        // console.log('data文件:已保存音量'+gData.volume);

    },
    //获取音量
    getVle: function () {
        // console.log('正在读取音量'+gData.volume);
        return gData.volume;
    },

    setPlayRoomMusicId: function (id) {

        gData.RoomMusicId = id
        this.save();
        // console.log('data文件:设置---音频的id:'+ id);
    },
    getPlayRoomMusicId: function () {
        // console.log('data文件:获取---音频的id:'+ gData.RoomMusicId);
        return gData.RoomMusicId;
    },
    //设置车的购买状态
    setCartStatus: function (cartInfoId) {
        // console.log(gData.BuyCartStatus[cartInfo].status);
        gData.BuyCartStatus[cartInfoId].status = true;
        // console.log(gData);
        this.save();
        // gData.BuyCartStatus[cartInfoId].status;
    },
    //获取购买车的状态
    getCartStatus: function () {
        // console.log(gData.BuyCartStatus);
        return gData.BuyCartStatus;
    },
    // getCartStatus: function()
    // {
    //     gData.BuyCartStatus[i]
    // }
    //设置游戏里面车的皮肤
    setCartSkinId: function(id){

        gData.CartSkinId = id;
        console.log('当前车辆皮肤id为'+ gData.CartSkinId);
        this.save(); 
    },
    //获取游戏里面车的皮肤
    
    getCartSkinId: function(){

        return gData.CartSkinId;
    },
    //设置初始按钮状态
    setGameStartButtonStatus:function(status){

        gData.gameStartButtonStatus = status;
        console.log('当前车辆初始按钮的状态为'+ gData.gameStartButtonStatus);
        this.save();
    },
    //获取初始按钮状态
    getGameStartButtonStatus:function(){

        return gData.gameStartButtonStatus;
    },
    //保存游戏里的的积分
    setGameScore: function(score){

        gData.gameScore = score;
        console.log('保存游戏积分成功');
        this.save();
    },
    getGameScore: function(){

        return gData.gameScore
    },
    //读取游戏里的积分
    

    start() {

    },

    // update (dt) {},
});
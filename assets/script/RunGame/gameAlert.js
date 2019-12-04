// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var gameApi = require('GameAPI');
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        m_advertisement: cc.Prefab, //广告弹窗
        // m_advert_close: cc.Node,
        // m_advert_time: cc.Label,
        m_gameAlert: cc.Node,
        gold_num: cc.Label,
        gold_num_advice: cc.Label,
        score: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    
     
        //获取金币数
        this.gold_num.string = this.node.parent.getComponent('game_page').goldScore;
        this.gold_num_advice.string = this.node.parent.getComponent('game_page').goldScore * 10;
        this.score.string = this.node.parent.getComponent('game_page').score;
        cc.director.preloadScene('RoomScene2');

        var gameScore = parseInt(this.score.string);

        if(gameScore > gameApi.getGameScore1()){

            gameApi.setGameScore1(gameScore);
        }

        
    },

  
    changeToRoomscene2: function(){
        var goldNomle =  parseInt(this.gold_num.string);
        console.log('获取到的正常金币为'+goldNomle+typeof goldNomle);
        gameApi.setGold(goldNomle);
        cc.director.loadScene("RoomScene2");
    },


   
    btShowAdvert : function () {
        var goldTen = parseInt(this.gold_num_advice.string);
        console.log('获取到的广告金币为' + goldTen + typeof goldTen);
        gameApi.setGold(goldTen);
        
        var ad= cc.instantiate(this.m_advertisement);
        console.log(ad);
        cc.find('Canvas').addChild(ad);
      
    },
    

    // start () {

    // },

    // update (dt) {},
});

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// var Alert = {
//     _alert: null,           // prefab
//     _detailLabel:   null,   // 内容
//     _cancelButton:  null,   // 确定按钮
//     _enterButton:   null,   // 取消按钮
//     _enterCallBack: null,   // 回调事件
//     _animSpeed:     0.3,    // 动画速度
//     _sprite:        null,   //人物
// };

cc.Class({
    extends: cc.Component,

    properties: {
        help: {
            default: null,
            type: cc.Button,
        },
        again: {
            default: null,
            type: cc.Button,
        },
        coinNum: {
            default: null,
            type: cc.Label,
        },
        buttonAudio: {
            default: null,
            type: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this.coinNum.string = cc.sys.localStorage.getItem("coinNum");
    },

    friendHelp: function () {
        console.log('好友助力');
        cc.audioEngine.playEffect(this.buttonAudio, false);
        
    },
    
    playAgain: function () {
        console.log('再来一次');
        
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.director.loadScene('RoomScene');
        
    },



    start () {

    },

    // update (dt) {},
});

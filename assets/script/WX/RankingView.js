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
        
        groupFriendButton: cc.Node,
        friendButton: cc.Node,
        gameOverButton: cc.Node,
        rankingScrollView: cc.Sprite,//显示排行榜的
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //判断是否是微信小游戏
        if(CC_WECHATGAME){

            window.wx.showShareMenu({withShareTicket: true});
            window.wx.postMessage({//发送消息给子域
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        }
    },
    //好友排名
    friendButtonFunc:function(event) {
        if(CC_WECHATGAME) {
            //发消息给子域
            window.wx.postMessage({//发送消息给子域
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        }else {
            cc.log("当前不是微信环境测试：获取好友排行榜数据。x1");
        }
    },
    //群排名
    groupFriendButtonFunc: function(event) {
        if(CC_WECHATGAME) {
            window.wx.shareAppMessage({
                success:(res) =>{
                    if(res.shareTickets != undefined && res.shareTickets.length > 0) {
                        window.wx.postMessage({//发送消息给子域
                            messageType: 5,
                            MAIN_MENU_NUM: "x1",
                            shareTicket: res.shareTickets[0]
                        });
                    }
                }
            });
        }else{
            cc.log("当前不是微信环境测试：获取群排行榜数据。x1")
        }
    },
    //获取横向展示排行榜数据
    gameOverButtonFunc: function (event) {
        if(CC_WECHATGAME) {
            window.wx.postMessage({//发送消息给子域
                messageType: 4,
                MAIN_MENU_NUM: 'x1'
            });
        }else{
            cc.log('当前不是微信环境测试：获取横向展示排行榜数据x1');
        }
    },
    //提交本地最高分，稍后这里需要完善，判断本地是否最高分，是就上传，不是就不上传

    SubmitScoreButtonFunc: function() {
        let getScore = gameApi.getGameScore1();
        let score = getScore;
        if(CC_WECHATGAME) {
            window.wx.postMessage({//发送消息给子域
                messageType: 3,
                MAIN_MENU_NUM: 'x1',
                score: score,
            });
        }else{
            cc.log('当前不是微信环境测试：提交得分：x1：当前最高分为'+score);
        }
    },

    // update (dt) {},
});

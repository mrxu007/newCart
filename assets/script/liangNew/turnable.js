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

        turn_node: {
            default: null,
            type: cc.Node,
        },
        choice_btn: {
            default: null,
            type: cc.Node,
        },
        btn_clip: {
            default: null,
            type: cc.AudioClip,
        },
        gold_label: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.root = cc.find("Canvas");
        //初始化旋转角度
        this.turn_node.angle = 0;
        //初始化转动速度
        this.turn_speed = 180;
        //转盘减速的加速度
        this.turn_accle = 30;
        //计时器
        this.timer = 0;
        //奖品
        this.gold_num = 0;

        this.gold_label.active = false;

    },

    // start () {
    //     //初始加载转盘加速动画
    //     this.turn_node.getComponent(cc.Animation).play('turn_start');
    // },

    //点击转动
    choice_play: function () {

        this.gold_label.active = false;
        

        this.choice_btn.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("back").active = false;
    
        var i = Math.floor(Math.random()*8)+1;
        console.log(i);
        var x = - (Math.random()*(360/8-10) +5 + (360/8)*(i-1));
        //var x = Math.random()*(360/8) + (360/8)*i;
        console.log(x);

        switch (i) {
            case 1: 
                console.log('大袋*2');
                this.gold_num = 400;
                break;
            case 2:
            case 6:
                console.log('小袋');
                this.gold_num = 100;
                break;
            case 3:
            case 7:
                console.log('蛋蛋');
                this.gold_num = 0;
                break;
            case 4:
            case 8:
                console.log('大袋');
                this.gold_num = 200;
                break;
            case 5:
                console.log('小袋*2');
                this.gold_num = 200;
                break;
        }
        var MainGoldBar = cc.find('Canvas/MainViewAll/MainView/MenuAll/TopMenu/Back/icon_Gold coin@1x/New Label');
        console.log(MainGoldBar.getComponent(cc.Label).string);
        var rotation = cc.rotateTo(3,x + 360*5).easing(cc.easeSineInOut());
        var finished = cc.callFunc(() => {
            this.choice_btn.getComponent(cc.Button).interactable = true;
            this.node.getChildByName("back").active = true;
        }, this);
        var get_gold = cc.callFunc(() => {
            this.gold_label.active = true;
            if(this.gold_num != 0){
               this.gold_label.string = '获得'+this.gold_num + '金币';
               var goldTen = parseInt(this.gold_num);
                console.log('获得大转盘金币为' + goldTen);
                gameApi.setGold(goldTen);
                MainGoldBar.getComponent(cc.Label).string = '' + tranNumber( gDataCtl.GetGold(),1);
                 
            }
            else{
                this.gold_label.string = '再接再厉';
            }
            
        }, this);
        var myAction = cc.sequence(rotation, finished, get_gold);
        this.turn_node.runAction(myAction);
    },

    //点击返回
    back_func: function () {
        cc.audioEngine.playEffect(this.btn_clip, false);
        this.node.removeFromParent();
        
    },

    //看视频
    display_btn: function () {

    },
    

    

    //update (dt) {},
});

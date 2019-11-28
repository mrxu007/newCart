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
        player_skin: {
            default: [],
            type: cc.SpriteFrame,
        },
        fail_alert_prefab: {
            default: null,
            type: cc.Prefab,
        },
        get_gold_clip: {
            default: null,
            type: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 60;
        this.touch = cc.find('Canvas/game_page/touch');
        //获取子节点anim
        this.anim = this.node.getChildByName('anim');
        this.registerEvent();
        this._set_player_skin();
        //初始化表现分
        this.score = 0;
    },

    start () {
        this.schedule(function() {
            this.score + 2;
        }, 1)
    },

    //设置皮肤
    _set_player_skin: function () {
        this.anim.getComponent(cc.Sprite).spriteFrame = this.player_skin[1];
    },

    onCollisionEnter: function (other, self) {
        if(other.node.group == 'tree'){
            this.node.group = 'default';
            this.node.getComponent(cc.AudioSource).play();
            this.anim.getComponent(cc.Animation).play(0);
            //给game_page表现分赋值
            this.node.parent.getComponent('game_page').score = this.score;
            this.scheduleOnce(function() {
                this.node.removeFromParent();
            }, 2);
            var alert = cc.instantiate(this.fail_alert_prefab);
            this.node.parent.addChild(alert);
            alert.zIndex = 200;
        } else if(other.node.group == 'money') {
            this.node.parent.getComponent('game_page').add_gold_score();
            this.score += 50;
            cc.audioEngine.playEffect(this.get_gold_clip);
        }
        
        
    },

    //注册监听触摸事件
    registerEvent() {
        // console.log("启动了触摸事件监听");

        this.touch.on(cc.Node.EventType.TOUCH_START,this.touchStart, this);
        // this.Touch_view.on(cc.Node.EventType.TOUCH_START, throttle(this.touchStart, 200), this);

        this.touch.on(cc.Node.EventType.TOUCH_END,this.touchEnd, this);
        
     
    },

    //触摸开始
    touchStart: function (event) {
        // console.log("触摸开始");
        var worldPoint = event.getLocation();
        touchStartX = worldPoint.x;
        touchStartY = worldPoint.y;
        // console.log("触摸开始",this.touchStartX);
    },
    // //节点外触发
    // touchCancel: function (event) {



    // },
    //节点内触发
    touchEnd: function (event) {


        var cart = this.node.getPosition();
        var cartX = cart.x;
        // console.log(cartX);
        var vector1 = cartX - 186;
        var vector2 = cartX + 186;
        // console.log("触摸结束节点内离开了屏幕");
        var touchEndPoint = event.getLocation();
        // console.log("离开屏幕",touchEndPoint.x);
        var endX = touchStartX - touchEndPoint.x;
        //判定方向
        if (endX > 0) {
            // console.log("判定向左");
            // console.log(endX);
            if (vector1 <= -160) {
                vector1 = -160;
            }
            this.moveChange('left', vector1);

        } else if (endX < 0) {
            if (vector2 >= 160) {
                vector2 = 160;
            }
            // console.log("判定向右");
            // console.log(endX);
            this.moveChange('right', vector2);


        } else {
            // console.log("一直点击一个地方不会触发滑动哦");

            return;

        }
    },
    //左右控制
    moveChange(direction, vector) {
        var notMove = false;
        if (direction == 'left') {
            

                if(!notMove){
                    notMove = true;
                    this.node.stopAllActions();
                    // console.log(notMove);
                    var seqLeft = cc.sequence(
                        cc.moveTo(0.1, cc.v3(vector, -339.762)),
                        cc.callFunc(function(){
                            notMove = false;
                            // console.log(notMove)
                        }.bind(this)),
                    );                       
                    this.node.runAction(seqLeft);
                }
        } else {
            
            if(!notMove){
                notMove = true;
                this.node.stopAllActions();
                var seqRight = cc.sequence(
                    cc.moveTo(0.1, cc.v3(vector, -339.762)),
                    cc.callFunc(function(){
                        
                        notMove = false;
                    }.bind(this)),
                );                        
                this.node.runAction(seqRight);
            }
        }
    },

    update (dt) {

    },
});

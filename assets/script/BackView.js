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

        cart: {
            type: cc.Node,
            default: null
        },
        Bt_move: {
            type: cc.Node,
            default: null
        },
        Touch_view: {
            type: cc.Node,
            default: null
        },
        Back_view: {
            type: cc.Node,
            default: null
        },
        M_Back1: {
            type: cc.Node,
            default: []
        },
        M_Back2: {
            type: cc.Node,
            default: []
        },
        // Money: cc.Prefab,
       


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
     
        this.registerEvent();
        this.moveBackGround();
        // setInterval(() => {
        //     this.createMoney();
            
        // },2000);
        //  初始化背景图标1位置
        
    },

    //注册监听触摸事件
    registerEvent() {
        console.log("启动了触摸事件监听");

        this.Touch_view.on(cc.Node.EventType.TOUCH_START,this.touchStart, this);
        // this.Touch_view.on(cc.Node.EventType.TOUCH_START, throttle(this.touchStart, 200), this);
        this.Touch_view.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        // this.Touch_view.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        // this.Touch_view.on(cc.Node.EventType.TOUCH_END, throttle(this.touchEnd, 200), this);
        this.Touch_view.on(cc.Node.EventType.TOUCH_END,this.touchEnd, this);
        
        //初始背景滚动2
        // var moveBack2 = cc.moveTo(6, cc.v3(0, -2200));
        // var seq = cc.sequence(moveBack2, cc.callFunc(this.moveRepeat, this));
        // this.M_Back1[1].runAction(seq);
    },
    //背景初始化滚动
    moveBackGround: function(){
        //控制公路

        for (let i = 0; i < this.M_Back1.length; i++) {
            let height = this.M_Back1[i].height;
            // console.log(height);
            this.M_Back1[i].setPosition(0,i*(height-58));
             //初始背景滚动1
            var moveBack1 = cc.moveTo(i*road+road, cc.v3(0, -(height-58)));
            var seq = cc.sequence(moveBack1, cc.callFunc(this.moveRepeat, this,road));
            this.M_Back1[i].runAction(seq);
            
        }
        //控制树
        //   for (let i = 0; i < this.M_Back2.length; i++) {
        //     let height = this.M_Back2[i].height;
            
        //     this.M_Back2[i].setPosition(0,i*(height-58));
        //      //初始背景滚动1
        //     var moveBack2 = cc.moveTo(i*tree+tree, cc.v3(0, -(height-58)));
        //     var seq = cc.sequence(moveBack2, cc.callFunc(this.moveRepeat, this,tree));
        //     this.M_Back2[i].runAction(seq);
            
        // }

    },
    //背景重复滚动
    moveRepeat: function (target,data) {
        let height = target.height;
        target.setPosition(0,(height-58));
        var moveBack1 = cc.moveTo(data*2, cc.v3(0, -(height-58)));
        var seq = cc.sequence(moveBack1, cc.callFunc(this.moveRepeat, this,data));
        target.runAction(seq);

    },
    //触摸开始
    touchStart: function (event) {
        // console.log("触摸开始");
        let worldPoint = event.getLocation();
        this.touchStartX = worldPoint.x;
        this.touchStartY = worldPoint.y;
        // console.log("触摸开始",this.touchStartX);
    },
    touchMove: function (event) {
        // console.log("触发移动");
    },
    // //节点外触发
    // touchCancel: function (event) {



    // },
    //节点内触发
    touchEnd: function (event) {


        let cart = this.cart.getPosition();
        let cartX = cart.x;
        // console.log(cartX);
        let vector1 = cartX - 280;
        let vector2 = cartX + 280;
        // console.log("触摸结束节点内离开了屏幕");
        let touchEndPoint = event.getLocation();
        // console.log("离开屏幕",touchEndPoint.x);
        let endX = this.touchStartX - touchEndPoint.x;
        //判定方向
        if (endX > 0) {
            // console.log("判定向左");
            // console.log(endX);
            if (vector1 <= -300) {
                vector1 = -300;
            }
            this.moveChange('left', vector1);

        } else if (endX < 0) {
            if (vector2 >= 270) {
                vector2 = 270;
            }
            // console.log("判定向右");
            // console.log(endX);
            this.moveChange('right', vector2);


        } else {
            console.log("一直点击一个地方不会触发滑动哦");

            return;

        }
    },
    //左右控制
    moveChange(direction, vector) {

        if (direction == 'left') {
            this.node.stopAllActions();
            
            var moveLeft = cc.moveTo(0.2, cc.v3(vector, -592.495));

            this.cart.runAction(moveLeft);

        } else {
            this.node.stopAllActions();
            var moveRight = cc.moveTo(0.2, cc.v3(vector, -592.495));

            this.cart.runAction(moveRight);
        }
      

    },
      //生成money、
    //   createMoney: function(){
    //     let Money = cc.instantiate(this.Money);
    //     Money.parent = this.node;
    //     Money.x =   -350+Math.random()*400 ;
    //     console.log(Money.x);
    //     //起点
    //     Money.y = 800;
    //     // Money.x = 0;

    // },












    // start() {},

    update (dt) {
        

    },
});
require('BackVIewData');

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
        touchStartX = worldPoint.x;
        touchStartY = worldPoint.y;
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
        let endX = touchStartX - touchEndPoint.x;
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
    // start() {},

    update (dt) {
        

    },
});
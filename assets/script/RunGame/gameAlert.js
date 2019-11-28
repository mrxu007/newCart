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
        m_advertisement: cc.Node,
        m_advert_close: cc.Node,
        m_advert_time: cc.Label,
        m_gameAlert: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_advert_close.active = false;
        this.m_advert_time.string = '5';
        this.timer = 5;

        this.schedule(function(){
            this.timer--;
            this.m_advert_time.string = this.timer;
            if(this.timer == 0 ){
                this.m_advert_close.active = true;
            }
        },1,4)
    },
    closeAdvertToRoomscene2:function(){
        this.m_advertisement.active = false;
        this.m_gameAlert.active = false;
        cc.director.loadScene("RoomScene2");
    },
    btShowAdvert : function () {
        this.m_advertisement.active = true;

      
    },
    

    // start () {

    // },

    // update (dt) {},
});

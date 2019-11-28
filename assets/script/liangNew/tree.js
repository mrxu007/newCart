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

        tree_sprite: {
            default: [],
            type: cc.SpriteFrame,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getChildByName('anim');
        this.speed = 560;
    },

    start () {
        this._set_tree_skin();
    },

    //设置树的皮肤
    _set_tree_skin: function() {
        var tree_ide = Math.floor(Math.random() * 3);
        
        this.anim.getComponent(cc.Sprite).spriteFrame = this.tree_sprite[tree_ide];
    },

    update (dt) {
        this.node.y -= this.speed * dt;
        if(this.node.y < -1900)
        this.node.removeFromParent();
    },
});

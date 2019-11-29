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
        tree_group: {
            default: [],
            type: cc.Prefab,
        },
        gold_prefab: {
            default: [],
            type: cc.Prefab,
        },
        player_prefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化金币得数
        this.goldScore = 0;
        //初始化表现分数
        this.score = 0;
        this.node.getComponent(cc.AudioSource).play();
    },

    start () {
        //生成车
        this.car_create();
        //无限生成金币
        this.schedule(function () {
            this.gold_create();
        }, 3);

        //无限生成树
        this.schedule(function () {
            this.tree_group_create();
        }, 2 + Math.random() * 1)

    },

    onEnable () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    },

    onDisable () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        //manager.enabledDebugDraw = false;
    },

    //随机生成树组
    tree_group_create: function () {
        var idn = Math.floor(Math.random() * 5);
        var _tree_group = cc.instantiate(this.tree_group[idn]);
        this.node.addChild(_tree_group);
        _tree_group.setPosition(0 ,1200);
        _tree_group.zIndex = 100;
    },

    //随机生成金币组
    gold_create: function () {
        var bt = Math.floor(Math.random() * 4);
        var gold = cc.instantiate(this.gold_prefab[bt]);
        this.node.addChild(gold);
        var pos = this._posion_spawn_gold();
        gold.setPosition(pos);
    },
    //金币的初始位置
    _posion_spawn_gold: function () {
        var pos = cc.v2(0, 0);
        //pos.x *= Math.floor(Math.random() * 3) - 1;
        pos.y = 600 + Math.random() * 300;
        return cc.v2(pos.x, pos.y);
    },

    //生成车
    car_create: function () {
        var player = cc.instantiate(this.player_prefab);
        this.node.addChild(player);
        player.setPosition(0, -339.762);
    },

    //金币加分
    add_gold_score: function () {
        this.goldScore ++;
    },

    update (dt) {},
});

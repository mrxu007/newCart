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

        Player: cc.Node,
        //Stones: cc.Node,
        stonePrefab: {
            default: null,
            type: cc.Prefab
        },
        goldPrefab: {
            default: null,
            type: cc.Prefab,
        },
        playAudio: {
            default: null,
            type: cc.AudioClip,
        },
        goldAudio: {
            default: null,
            type: cc.AudioClip,
        },
        BaseView: {
            default: null,
            type: cc.Node,
        },
        strongerPrefab: {
            default: null,
            type: cc.Prefab,
        },
        alert: {
            default: null,
            type: cc.Node,
        },
        treePrefab: {
            default: null,
            type: cc.Prefab,
        },
        scoreDisplay: {
            default: null,
            type: cc.Label,
        },


    },

    // LIFE-CYCLE CALLBACKS:


    // start () {

    // },

    //生成新的stone
    spawnNewStone: function () {
        // var newSpawnStone = cc.instantiate(this.stonePrefab);
        // newSpawnStone.parent = cc.find('Canvas');
        // newSpawnStone.getComponent('Goods').game = this;
        // newSpawnStone.setPosition(this.positionFunc());

        var stone = null;
        if (this.stonePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            stone = this.stonePool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            stone = cc.instantiate(this.stonePrefab);
        }
        stone.parent = cc.find('Canvas');
        stone.setPosition(this.positionFunc());
    },



    //生成金币方法
    spawnNewGold: function () {
        // var newSpawnGold = cc.instantiate(this.goldPrefab);
        // //把金币挂载到根节点上
        // newSpawnGold.parent = cc.find('Canvas');
        // newSpawnGold.getComponent('gold').game = this;
        // newSpawnGold.setPosition(this.positionFunc());


        var tree = null;
        if (this.treePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            tree = this.treePool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            tree = cc.instantiate(this.treePrefab);
        }
        tree.parent = cc.find('Canvas');
        tree.setPosition(this.positionFunc());

    },

    spawnNewTree: function () {
        // var newSpawnTree = cc.instantiate(this.treePrefab);
        // //把金币挂载到根节点上
        // newSpawnTree.parent = cc.find('Canvas');
        // newSpawnTree.getComponent('trees').game = this;
        // newSpawnTree.setPosition(this.positionFunc());

        var gold = null;
        if (this.goldPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            gold = this.goldPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            gold = cc.instantiate(this.goldPrefab);
        }
        gold.parent = cc.find('Canvas');
        gold.setPosition(this.positionFunc());
    },

    //生成技能方法
    spawnNewStronger: function (){
        var stronger = null;
        if (this.strongerPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            stronger = this.strongerPool.get();
           
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            stronger = cc.instantiate(this.strongerPrefab);
            
        }
        stronger.parent = cc.find('Canvas');
        stronger.setPosition(this.positionFunc());
        
    },


    //
    //
    //
    //
    //总生成
    spawnFunc: function () {
       var dat = Math.floor(Math.random() * 2);
        
        switch (dat) {

            //树
            case 0:
              
                this.spawnNewTree();
                break;
            //石头
            case 1:
               
                this.spawnNewStone();
                break;
            //金币
            // case 2:
            //     break;
        }
    },

    positionFunc: function () {
        var goldX = Math.floor(Math.random() * 3 - 1) * 300;
        var goldY = Math.random() * 300 + 2200;
 
        return cc.v2(goldX, goldY);
    },




    onLoad() {
        //cc.game.setFrameRate(90);
        
        this.alert.active = false;
        cc.audioEngine.playEffect(this.playAudio, true);
        //建立石头对象池
        this.stonePool = new cc.NodePool();
        var initCountS = 6;
        for (var i = 0; i < initCountS; ++i) {
            var stone = cc.instantiate(this.stonePrefab); // 创建节点
            this.stonePool.put(stone); // 通过 put 接口放入对象池
        }
        //建立树对象池
        this.treePool = new cc.NodePool();
        var initCountT = 6;
        for (var i = 0; i < initCountT; ++i) {
            var tree = cc.instantiate(this.treePrefab); // 创建节点
            this.treePool.put(tree); // 通过 put 接口放入对象池
        }
        //建立金币对象池
        this.goldPool = new cc.NodePool();
        var initCountG = 6;
        for (var i = 0; i < initCountG; ++i) {
            var gold = cc.instantiate(this.goldPrefab); // 创建节点
            this.goldPool.put(gold); // 通过 put 接口放入对象池
        }
        //建立技能对象池
        this.strongerPool = new cc.NodePool();
        var initCountSkill = 3;
        for (var i = 0; i < initCountSkill; ++i) {
            var stronger = cc.instantiate(this.strongerPrefab); // 创建节点
            this.strongerPool.put(stronger); // 通过 put 接口放入对象池
        }
        


        //this.spawnNewGold();
        //初始化金币数量
        this.goldNum = 0;
        //初始化秒数
        //this.timeOld = 0;
        cc.sys.localStorage.setItem("coinNum", this.goldNum);

        this.spawnFunc();

        this.schedule(function () {
            this.spawnFunc();
          
        }, 7, 4);

   

        this.schedule(function () {
            this.spawnNewStronger();
        }, 20, 3);

        

    },

    //start() {},

    //获取金币
    gainGold: function () {
        cc.audioEngine.playEffect(this.goldAudio, false);
        this.goldNum += 1;
        cc.sys.localStorage.setItem("coinNum", this.goldNum);
        
    },

    gameOver: function () {
        //cc.find('Canvas').stopAllActions();
        this.alert.active = true;
        //this.node.pauseAllActions();


    },

    update(dt) {
        var score = cc.sys.localStorage.getItem("coinNum") * 20 + cc.sys.localStorage.getItem("destroyNum") * 200;
        this.scoreDisplay.string = '分数：' + score;
    },
});

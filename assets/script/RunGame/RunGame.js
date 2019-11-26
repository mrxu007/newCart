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

        bg1: cc.Node,
        blockPrefab1: cc.Prefab,
        blockPrefab2: cc.Prefab,
        blockPrefab3: cc.Prefab,
        blockPrefab4: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.barrierPool = new cc.NodePool();
      
        
        
        //  console.log(random1);
        
       

            this.setBarrier();
            
   

        // console.log(barrierSrc);
        // console.log(src);
    },

    start () {
        
        
    },
    setBarrier:function()
    {   
        var posArray = new Array();
        var posArrayx = [-186, 0 , 186];
      
       
        for(var i = 0; i< 3; i++)
        {       
            var barrier1= this.createBarrier(this.node);
            var barrier1Pos = barrier1.getPosition().y;
            var randomRange = gameApi.randomRange(-1000,200);
            var posAll = barrier1Pos+randomRange;
             var randomx = Math.ceil(Math.random()*3);
            barrier1.setPosition(posArrayx[randomx],posAll);
            posArray.push(posAll);
            console.log('该预制体的位置y在'+posArray[i]);
        }
        
        // var bg1pos = this.bg1.getPosition().y;
        // var bg1pos = this.bg1.getPosition();
       
        

        
            // console.log(bg1pos);

    },
    //使用对象池调用障碍物的生成和销毁
    createBarrier: function (parentNode) 
    {
        // console.log('进来了一次')
        var barrier  = null;
        if(this.barrierPool.size() > 0) 
        {   // 通过 size 接口判断对象池中是否有空闲的对象
            console.log('已从对象池里拿去');
            barrier = this.barrierPool.get();
        }else
        {   // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            console.log('没有空闲对象，已从对象池生成');
            barrier = cc.instantiate(this.blockPrefab1);
        }
        barrier.parent = parentNode;//将生成的障碍物加入节点
        // this.node.addChild(barrier);
        
        // console.log('barrier.parent='+barrier.parent);
        return barrier;
        
    },
    onBarrierKilled: function (barrier) {
        // enemy 应该是一个 cc.Node
        this.barrierPool.put(barrier); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    }


    // update (dt) {},
});

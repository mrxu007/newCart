var data = require('data');
cc.Class({
    extends: cc.Component,

    properties: {

        MainViewAll: cc.Node,
        ShopBorder: cc.Node,
        Setting: cc.Node,
        Logo: cc.Node,
        GoldBar: cc.Node,
        MLeft: cc.Node,
        MRight: cc.Node,
        BtnMenu: cc.Node,
        MoneyAni: cc.Node,
        GoldPrefab: cc.Prefab,
        shopGold: cc.Node,
        m_SelHeroPrefab: cc.Prefab,
        m_ScrollContent: cc.Node,
        m_norHeroPrefab: cc.Prefab,
        m_shopBackUI: cc.SpriteAtlas,
        m_cartAll:[cc.Prefab],
        m_MainCartUI: [cc.SpriteAtlas],
        m_MainShowCart: cc.Sprite,
        m_topMenu: cc.Node,
       
        
        


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
        cc.loader.loadRes('assets/Main', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, true);
        });

        gDataCtl = new data();
        gameCtl = this;
        this.MainViewAll.setPosition(0, 0);
        this.ShopBorder.active = false;
        gDataCtl.load();
        // cc.audioEngine.play(this.buttonAudio, true, 1.0 )
        // var HeroArray = [];
      
        
       
        this.m_HeroData = new Array();
        this.m_HeroData[0] = { id : 0, style : 0 };
        this.m_HeroData[1] = { id : 1, style : 1 };
        this.m_HeroData[2] = { id : 2, style : 2 };
        this.m_HeroData[3] = { id : 3, style : 3 };
        this.m_HeroData[4] = { id : 4, style : 4 };
     

       
        //拿到商城背景被选中的预制体
        for (let i = 0; i < this.m_HeroData.length; i++) { 
            var  hero = cc.instantiate(this.m_norHeroPrefab);
            this.m_ScrollContent.addChild(hero);
            var Prefab = hero.getComponent('SelHeroPrefab');
                Prefab.setStyle(this.m_HeroData[i]);
            hero.id = i;
            hero.isChecked = false;
            hero = hero.on(cc.Node.EventType.TOUCH_END,this.touchEnd, this);
            
            // HeroArray.push(hero);
            // HeroArray[i].id = i;
            // HeroArray[i].isChecked = false;
            // console.log(hero.id);
            // console.log(hero.isChecked);
            
            
        }  
        //初始化默认第一个被选中
        var childrenArr = this.m_ScrollContent.children;
        // console.log(childrenArr);
            childrenArr[0].isChecked = true;
            var frame =  this.m_shopBackUI.getSpriteFrame('checked');
            childrenArr[0].getComponent(cc.Sprite).spriteFrame = frame;

        // for (let i = 0; i < HeroArray.length; i++) {
        //     HeroArray[i].
        // }
        //点击事件

        
        //拿到初始图标的位置
        // this.btStartPos = [];
        // for (let i = 0; i < this.R_btn_action.length; i++) {
        //     this.btStartPos[i] = this.R_btn_action[i].getPosition();
        //     // console.log(position);    

        // }
        //设置settings图标
        this.Setting = this.Setting.getComponent('settings');
        this.m_ClassArray.push(this.Setting);
        //设置Logo图标
        this.Logo = this.Logo.getComponent('Logo');
        this.m_ClassArray.push(this.Logo);
        //设置金币栏
        this.GoldBar = this.GoldBar.getComponent('GoldBar');
        this.m_ClassArray.push(this.GoldBar);
        //设置底部栏
        this.BtnMenu = this.BtnMenu.getComponent('BtnMenu');
        this.m_ClassArray.push(this.BtnMenu);
        //设置中间左边
        this.MLeft = this.MLeft.getComponent('MLeft');
        this.m_ClassArray.push(this.MLeft);
        //设置中间右边
        this.MRight = this.MRight.getComponent('MRight');
        this.m_ClassArray.push(this.MRight);
        //设置商店的金币刷新
        this.shopGold = this.shopGold.getComponent('shopGoldBar');
        
        


    },
    //点击切换该选中特效
    touchEnd : function(event) {
        cc.loader.loadRes('assets/button', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, false);
        });
        
        // console.log(event);
        self = this
        // console.log(event.target.id);
        // console.log(event.target.isChecked);
        
        
        // console.log(childrenArr);
        var childrenArr = this.m_ScrollContent.children;

        childrenArr.forEach((item) => {
           if(item.id == event.target.id ) {
                var cartArry = ['car01_1','car02_2','car03_1','car04_6','car05_1'];
                item.isChecked = true;
                var frame =  this.m_shopBackUI.getSpriteFrame('checked');
                // console.log('您选择了这辆车哦');
                childrenArr[item.id].getComponent(cc.Sprite).spriteFrame = frame;
                var sprite = this. m_MainCartUI[item.id].getSpriteFrame(cartArry[item.id]);
                this. m_MainShowCart.spriteFrame = sprite; 

            
           }else{

               item.isChecked = false;
               var frame =  this.m_shopBackUI.getSpriteFrame('notchecked');
               childrenArr[item.id].getComponent(cc.Sprite).spriteFrame = frame;
            //  
             
           }
          
        });
        // console.log(this.m_ScrollContent.children);
            
    },
    
    //进入游戏
    ChangeToGame: function () {
        
        cc.director.loadScene("GameScene");
        // cc.director.resume();
        cc.audioEngine.pauseAll();
    },
    //进入场景排行榜
    ChangeToLeaderBorder: function () {
        
        cc.director.loadScene("LeaderBorder");
        cc.audioEngine.pauseAll();
    },
    //动态化界面中的进入游戏按钮和选车图标
    // fadeOutOrIn: function (name) {
    //     var isPlay = false;
    //     console.log("初始化" + isPlay);
    //     if (!isPlay) {
    //         for (let i = 0; i < this.R_btn_action.length; i++) {
    //             var timer = cc.delayTime(0.5 * i);
    //             var moveTo;
    //             if (name == 'shop') {
    //                 // console.log("出发了ShopBorder");
    //                 moveTo = cc.moveTo(0.3, cc.v3(1136, this.btStartPos[i].y));
    //             } else {

    //                 moveTo = cc.moveTo(0.3, cc.v3(this.btStartPos[i]).x, this.btStartPos[i].y);
    //                 // console.log("出发了MainView");
    //             }

    //             isPlay = true;
    //             console.log("进入判断" + isPlay);
    //             var seq = cc.sequence(
    //                 timer,
    //                 moveTo,
    //                 cc.callFunc(function () {
    //                     isPlay = false;
    //                     console.log("进入回调" + isPlay);
    //                 }),
    //             );
    //             this.R_btn_action[i].runAction(seq);
    //         }
    //     }
    // },
    //切换ShopBorder和游戏主界面
    openShopBorder: function (event, data) {
        // console.log("触发了转向"+data);
        this.MainViewAll.active = false;
        // this.fadeOutOrIn(data);
        
        var update = this.shopGold.getComponent('shopGoldBar');
            update.updateTopData();
        this.ShopBorder.active = true;


    },
    //切换openMainView和游戏主界面
    openMainView: function (event, data) {
        // console.log("触发什么都没传"+data);   
        this.MainViewAll.active = true;
        // this.fadeOutOrIn(data);
        var update = this.m_topMenu.getComponent('GoldBar');
            update.updateTopData();
        
        this.ShopBorder.active = false;

    },
    ctor: function () {
        this.m_ClassArray = new Array();
        //创建对象池
        this.goldPool = new cc.NodePool();
        
    
    },
    tests: function (target, data) {
        if(data == "清空数据") {
          
            gDataCtl.del();


        }else if( data == "重载数据"){
            gDataCtl.setGoldAddTime(20);
            gDataCtl.setAwardGold(20);

        }
        else if (data == "移出") {
            for (let i = 0; i < this.m_ClassArray.length; i++) {
                var cls = this.m_ClassArray[i];
                if (cls.moveOutBar != null) {
                    cls.moveOutBar();
                }
            }

        } else if (data == "移入") {
            for (let i = 0; i < this.m_ClassArray.length; i++) {
                var cls = this.m_ClassArray[i];
                if (cls.moveInBar != null) {
                    cls.moveInBar();
                }
            }

        }
    },
    //创建金币(全局调用)
    /**
     * 
     * @param {起始位置} srcPos 
     * @param {目标位置} dstPos 
     * @param {圆半径} radius 
     * @param {切分多少块} goldCount 
     * 
     */
    createGoldAnim: function (srcPos, dstPos, radius, goldCount,addGold,callback) {
        var array = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);
        var nodeArray = new Array();
        for (let i = 0; i < array.length; i++) {
            var gold = this.createGold(this.node);
            var randPos = cc.v3(array[i].x + randomNumber(0, 50), array[i].y + randomNumber(0, 50));
            gold.setPosition(srcPos);
            nodeArray.push({
                gold,
                randPos
            });
            // console.log(nodeArray);
        }
        nodeArray.sort(function (a, b) {
            var disa = distance(a.randPos, dstPos);
            var disb = distance(b.randPos, dstPos);
            return disa - disb;
        });
        var notPlay = false;
        for (let i = 0; i < nodeArray.length; i++) {
            var pos = nodeArray[i].randPos;
            var node = nodeArray[i].gold;
            nodeArray[i].gold.id = i;
            var seq = cc.sequence(

                cc.moveTo(0.5, pos),
                cc.delayTime(0.02 * i),
                cc.moveTo(0.5, dstPos),
                cc.callFunc(function (node) {
                    // this.MoneyAni.stopAllActions();
                    if(!notPlay){
                        notPlay = true;
                        var seq2 = cc.sequence(
                            cc.scaleTo(0.1,0.7,0.7),
                            cc.scaleTo(0.1,0.45,0.45),
                            cc.callFunc(function(){
                                cc.loader.loadRes('assets/getmoney', cc.AudioClip, function (err, clip) {
                                    var audioID = cc.audioEngine.play(clip, false);
                                });
                                notPlay = false;
                            }.bind(this))
                        )
                        this.MoneyAni.runAction(seq2);

                    }
                    if(node.id == nodeArray.length -1){
                        if(callback != null){
                            callback(addGold);
                        }
                        
                    }
                    this.onGoldKilled(node);
                    // console.log("产生了回调");
                }.bind(this))

            );
            node.runAction(seq);

        }
    },
    //创建金币池
    createGold: function (parentNode) {
        let gold = null;
        if (this.goldPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            // console.log("已从金币对象池调用金币");
            gold = this.goldPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            // console.log("金币对象池库存为0,已创建新的金币");
            gold = cc.instantiate(this.GoldPrefab);
        }
        gold.parent = parentNode;
        return gold; // 将生成的金币加入节点树
        // enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },
    //销毁池
    onGoldKilled: function (gold) {
        // enemy 应该是一个 cc.Node
        this.goldPool.put(gold); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    /**
     * 求圆周上等分点的坐标的坐标
     * ox,oy为圆心坐标
     * r为半径
     * count为点的总个数
     */
    getPoint: function (r, ox, oy, count) {
        var point = [];
        var radians = (Math.PI / 180) * Math.round(360 / count),
            i = 0;
        for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);

            point.unshift({
                x: x,
                y: y
            }); //为保持数据顺时针
        }
        return point;
    },
    start() {

    },

    // update (dt) {},
});
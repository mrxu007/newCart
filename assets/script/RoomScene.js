var data = require('data');
var gameApi = require('GameAPI');
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
        m_cartAll: [cc.Prefab],
        m_MainCartUI: [cc.SpriteAtlas],
        m_MainShowCart: cc.Sprite,
        m_topMenu: cc.Node,
        m_RoomSceneUI1: cc.SpriteAtlas,
        m_voice: cc.Sprite, //左侧声音开关按钮
        m_Information: cc.Node, //车辆购买弹窗





    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        gDataCtl = new data();
        gameCtl = this;
        this.MainViewAll.setPosition(0, 0);
        this.ShopBorder.active = false;
        gDataCtl.load();

        var vle = gDataCtl.getVle();
        this.playMusic(vle);

        this.shopInit();
        this.buttonInit();
       
        
    },

    //按钮初始化
    buttonInit: function () {
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
    //商城初始化
    shopInit: function () {

        this.m_HeroData = new Array();
        this.m_HeroData[0] = {
            id: 0,
            style: 0
        };
        this.m_HeroData[1] = {
            id: 1,
            style: 1
        };
        this.m_HeroData[2] = {
            id: 2,
            style: 2
        };
        this.m_HeroData[3] = {
            id: 3,
            style: 3
        };
        this.m_HeroData[4] = {
            id: 4,
            style: 4
        };



        //拿到商城背景被选中的预制体
        for (var i = 0; i < this.m_HeroData.length; i++) {
            // console.log(this.m_HeroData.length);
            var hero = cc.instantiate(this.m_norHeroPrefab);
            // console.log(hero);
            this.m_ScrollContent.addChild(hero);
            var Prefab = hero.getComponent('SelHeroPrefab');
            Prefab.setStyle(this.m_HeroData[i]);
            hero.id = i;
            hero.isChecked = false;
            hero.buy = false;
            // hero = hero.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);

            // HeroArray.push(hero);
            // HeroArray[i].id = i;
            // HeroArray[i].isChecked = false;
            // console.log(hero.id);
            // console.log(hero.isChecked);


        }
        //初始化读取数据库车辆状态数据
        var childrenArr = this.m_ScrollContent.children;
        var Information = this.m_Information;
        var cartStatus = gameApi.getCartBuy();
        var shopGold = this.shopGold.getComponent('shopGoldBar');
        console.log(cartStatus);
        for (var i = 0; i < cartStatus.length; i++) {

            if (i == 0) {
                childrenArr[0].isChecked = true;
                childrenArr[0].buy = true;
                var frame = this.m_shopBackUI.getSpriteFrame('checked');
                childrenArr[0].getComponent(cc.Sprite).spriteFrame = frame;
                childrenArr[0].children[0].active = false;
                childrenArr[0].children[1].active = false;


            }
            if (cartStatus[i].status == true) {

                childrenArr[i].children[0].active = false;
                childrenArr[i].children[1].active = false;
                //  var parseNumber = parseInt(number)
                // console.log(number);
            } else {

                var price = i * 5000 + 999;
                childrenArr[i].children[1].getComponent(cc.Label).string = price + '金币';
            }

        }
        //点击按钮解锁

        childrenArr.forEach(function (item) {
            childrenArr[item.id].children[0].on('click', function (event) {
                // console.log(event);
                Information.active = true;
                var js1 = Information.getComponent('Information');
                var money = parseInt(childrenArr[item.id].children[1].getComponent(cc.Label).string);
                // console.log(money);
                var gDataCtlMoney = gDataCtl.GetGold();
                // console.log(gDataCtlMoney);
                if (gDataCtlMoney < money) {
                    js1.setLabel('还差' + (money - gDataCtlMoney) + '金币才可解锁');
                    // console.log( );

                } else {
                   
                    money =  gDataCtlMoney - money;
                    gameApi.setGold2(money); 
                    // shopGold = this.shopGold.getComponent('shopGoldBar');
                    // shopGold.updateTopData();
                  
                        shopGold.updateTopData(); 

                    js1.setLabel('已解锁,快去游戏体验吧！');
                    childrenArr[item.id].children[0].active = false;
                    cartStatus[item.id].buy = true;
                    childrenArr[item.id].children[1].active = false;
                    gameApi.setCartBuy(item.id);
                    //下面的buy属性可有可无
                    childrenArr[item.id].buy = true;



                }
            });

        });
        //商城选中的判断

        // console.log(childrenArr);
        // var childrenArr = this.m_ScrollContent.children;
        var shopUI = this.m_shopBackUI;
        var MainCartUI = this.m_MainCartUI;
        var MainShowCart = this.m_MainShowCart;
        // var Information = this.m_Information;
        // console.log(childrenArr);
        // console.log(childrenArr);
        childrenArr.forEach(function (item) {

            childrenArr[item.id].on(cc.Node.EventType.TOUCH_END, function (event) {

                cc.loader.loadRes('assets/button', cc.AudioClip, function (err, clip) {
                    var audioID = cc.audioEngine.play(clip, false);
                    // console.log(audioID);
                    // console.log(err);
                });
                //   console.log(childrenArr[item.id]);
                childrenArr.forEach(function (item1) {
                    if (item1.id == event.target.id) {
                        // console.log('这里是正确的');
                        // console.log(childrenArr);
                        var cartArry = ['car01_1', 'car02_2', 'car03_1', 'car04_6', 'car05_1'];
                        item1.isChecked = true;
                        var frame1 = shopUI.getSpriteFrame('checked');
                        childrenArr[item1.id].getComponent(cc.Sprite).spriteFrame = frame1;
                        if (cartStatus[item1.id].status == true) {
                            childrenArr[item.id].children[0].active = false;
                            var sprite = MainCartUI[item1.id].getSpriteFrame(cartArry[item1.id]);
                            // console.log(sprite);
                            MainShowCart.spriteFrame = sprite;

                        } else {
                            var frame2 = shopUI.getSpriteFrame('notchecked');
                            childrenArr[item1.id].getComponent(cc.Sprite).spriteFrame = frame2;
                            var frame3 = shopUI.getSpriteFrame('checked');
                            childrenArr[0].getComponent(cc.Sprite).spriteFrame = frame3;


                            var sprite = MainCartUI[0].getSpriteFrame(cartArry[0]);
                            // console.log(sprite);
                            MainShowCart.spriteFrame = sprite;
                            Information.active = true; //显示购买车辆弹窗
                            var js1 = Information.getComponent('Information');
                            js1.setLabel('车辆未解锁哦！'); //调用弹窗接口
                        }

                    } else {
                        item.isChecked = false;
                        // console.log('这里进入了');
                        var frame4 = shopUI.getSpriteFrame('notchecked');
                        childrenArr[item1.id].getComponent(cc.Sprite).spriteFrame = frame4;
                        // console.log(childrenArr);
                        //  

                    }




                }.bind(this), this);

            });
        });

    },
    //进入游戏
    ChangeToGame: function () {

        cc.director.loadScene("GameScene4");
        // cc.director.resume();
        cc.audioEngine.pauseAll();
    },
    ChangeToGame2: function () {

        cc.director.loadScene("GameScene4");
        // cc.director.resume();
        cc.audioEngine.pauseAll();
    },
    //进入场景排行榜
    ChangeToLeaderBorder: function () {

        cc.director.loadScene("LeaderBorder");
        // cc.audioEngine.pause(gDataCtl.getPlayRoomMusicId());
        cc.audioEngine.pauseAll();
    },
    //切换ShopBorder
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
        if (data == "清空数据") {

            gDataCtl.del();


        } else if (data == "重载数据") {
            gDataCtl.setGoldAddTime(20);
            gDataCtl.setAwardGold(20);

        } else if (data == "移出") {
            for (var i = 0; i < this.m_ClassArray.length; i++) {
                var cls = this.m_ClassArray[i];
                if (cls.moveOutBar != null) {
                    cls.moveOutBar();
                }
            }

        } else if (data == "移入") {
            for (var i = 0; i < this.m_ClassArray.length; i++) {
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
    createGoldAnim: function (srcPos, dstPos, radius, goldCount, addGold, callback) {
        var array = this.getPoint(radius, srcPos.x, srcPos.y, goldCount);
        var nodeArray = new Array();
        for (var i = 0; i < array.length; i++) {
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
        for (var i = 0; i < nodeArray.length; i++) {
            var pos = nodeArray[i].randPos;
            var node = nodeArray[i].gold;
            nodeArray[i].gold.id = i;
            var seq = cc.sequence(

                cc.moveTo(0.5, pos),
                cc.delayTime(0.02 * i),
                cc.moveTo(0.5, dstPos),
                cc.callFunc(function (node) {
                    // this.MoneyAni.stopAllActions();
                    if (!notPlay) {
                        notPlay = true;
                        var seq2 = cc.sequence(
                            cc.scaleTo(0.1, 0.8, 0.8),
                            cc.scaleTo(0.1, 0.65, 0.65),
                            cc.callFunc(function () {
                                cc.loader.loadRes('assets/getmoney', cc.AudioClip, function (err, clip) {
                                    var audioID = cc.audioEngine.play(clip, false);
                                });
                                notPlay = false;
                            }.bind(this))
                        )
                        this.MoneyAni.runAction(seq2);

                    }
                    if (node.id == nodeArray.length - 1) {
                        if (callback != null) {
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
        var gold = null;
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
    //设置提示车辆购买弹窗关闭
    setInformationClose: function () {
        this.m_Information.active = false;
    },
    //播放音乐
    //初始化读取音乐状态
    playMusic: function (volume) {

        // console.log(cc.audioEngine.getState(gDataCtl.getPlayRoomMusicId()));
        // if(gDataCtl.getPlayRoomMusicId > 0){
        cc.loader.loadRes('assets/Main', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, true, volume);
            gDataCtl.setPlayRoomMusicId(audioID);
        });

        var voiceStatus = gDataCtl.getRoomVoiceStatus();
        if (voiceStatus) {
            // console.log('当前'+gDataCtl.getPlayRoomMusicId());
            // console.log(voiceStatus);

            var frame1 = this.m_RoomSceneUI1.getSpriteFrame('icon_voice_open@1x');
            this.m_voice.getComponent(cc.Sprite).spriteFrame = frame1;
            // cc.audioEngine.setVolume(gDataCtl.getPlayRoomMusicId(), 1);
        } else {

            var frame2 = this.m_RoomSceneUI1.getSpriteFrame('icon_voice_close@1x');
            this.m_voice.getComponent(cc.Sprite).spriteFrame = frame2;
            // cc.audioEngine.setVolume(gDataCtl.getPlayRoomMusicId(), 0);
        }


    },
    //设置声音状态
    setVoice: function () {
        // console.log(is);
        var status = gDataCtl.getRoomVoiceStatus();
        if (status) {
            status = false;
            // cc.audioEngine.pause(gDataCtl.getPlayRoomMusicId());

            var volume = cc.audioEngine.setVolume(gDataCtl.getPlayRoomMusicId(), gDataCtl.setVle(0));
            // console.log('关闭音量：'+volume);

            gDataCtl.setRoomVoiceStatus(status);
            var frame1 = this.m_RoomSceneUI1.getSpriteFrame('icon_voice_close@1x')
            this.m_voice.getComponent(cc.Sprite).spriteFrame = frame1;
        } else {
            status = true;
            cc.audioEngine.setVolume(gDataCtl.getPlayRoomMusicId(), gDataCtl.setVle(1));
            // console.log('开启音量：'+volume);
            gDataCtl.setRoomVoiceStatus(status);
            var frame2 = this.m_RoomSceneUI1.getSpriteFrame('icon_voice_open@1x');
            this.m_voice.getComponent(cc.Sprite).spriteFrame = frame2;

        }



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
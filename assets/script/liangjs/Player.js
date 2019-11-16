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
        BaseView: cc.Node,
        Road: cc.Node,
        collisionAudio: {
            default: null,
            type: cc.AudioClip,
        },
        buttonAudio: {
            default: null,
            type: cc.AudioClip,
        },
        strongerAudio: {
            default: null,
            type: cc.AudioClip,
        },
        strongerNum: cc.Label,
        MainAction: cc.Node,
    },
    

    // LIFE-CYCLE CALLBACKS:

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },
 
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        //cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    //技能按钮
    onSkill: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        if (this.skill > 0) {
            // console.log('技能开启');
            this.skill -= 1;
            // this.schedule(() => {
            //     this.openSkill = true;
            // }, 3);
            this.openSkill = true;
            this.node.setScale(5, 5);
            this.scheduleOnce(() => {
                this.openSkill = false;
                this.node.setScale(4, 4);
                // console.log('技能结束');
            }, 3);
            this.strongerNum.string = this.skill;
        }
        
        

    },



    onLoad () {
        //技能数量
        this.skill = 0;
        //初始化技能关闭
        this.openSkill = false;
        //cc.sys.localStorage.setItem("openSkill", this.openSkill);

        //初始化摧毁数量
        this.destroyNum = 0;

        cc.sys.localStorage.setItem("destroyNum", this.destroyNum);
    },

    start () {
        
    },

    onCollisionEnter: function (other, self) {
        if(this.openSkill == false){
            if (other.node.group == 'goods' || other.node.group == 'tree') {
                this.skill = 0;
                cc.audioEngine.stopAll();
                cc.audioEngine.playEffect(this.collisionAudio, false);
                cc.director.pause();
           
                this.Road.getComponent('Control').gameOver();
                
                cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnFunc();
                this.strongerNum.string = 'x' + this.strongerNum;
            
            
            } else if(other.node.group == 'stronger') {
                cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').strongerPool.put(other.node);
                this.skill += 1;
                this.strongerNum.string = 'x' + this.skill;
                cc.audioEngine.playEffect(this.strongerAudio, false);

            } 
        } else {
            
            if(other.node.group == 'goods') {
                this.destroyNum += 1;
                cc.sys.localStorage.setItem("destroyNum", this.destroyNum);
                this.schedule(function () {
                    other.node.opacity -= 20;
                }, 0.1, 10);
                this.scheduleOnce(function () {
                    cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').stonePool.put(other.node);
                }, 1.1);
            }
            else if(other.node.group == 'tree') {
                this.destroyNum += 1;
                
                this.schedule(function () {
                    other.node.opacity -= 20;
                }, 10);
                this.scheduleOnce(function () {
                    cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').treePool.put(other.node);
                }, 1.1);
            }
            
            else if(other.node.group == 'stronger'){
                this.destroyNum += 1;
                cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').strongerPool.put(other.node);
                this.skill += 1;
                this.strongerNum.string = 'x' + this.skill;
                cc.audioEngine.playEffect(this.strongerAudio, false);
            }


        }
        

    },

    
    // update (dt) {
        
    // },
});

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
        // 金币和主角之间的距离小于这个数值时，就会完成收集
        // pickRadius: 0,
        speed: 0,
        accle: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    //捡到金币时调用
    onPicked: function() {

        cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').goldPool.put(this.node);
        cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').gainGold();  
        cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnNewGold();  
        
    },

    //碰撞
    onCollisionEnter: function (other, self) {
        if (other.node.group == 'player') {
            //调用收金币行为
            this.onPicked();
        } else if(other.node.group == 'goods' || other.node.group == 'money' || other.node.group == 'tree') {
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').goldPool.put(this.node);
            //this.game.spawnFunc();  
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnNewGold();
        }
    },


    update (dt) {
        
        this.speed += this.accle * dt;
        this.node.y -= this.speed * dt;
        if (this.node.y < -1000) {
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').goldPool.put(this.node);
            //this.game.spawnFunc(); 
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnNewGold();
        }
    },
});

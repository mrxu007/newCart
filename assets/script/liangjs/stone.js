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
        accle: 0,
        speed: 0,
        
    },

    // LIFE-CYCLE CALLBACKS:
    

     onLoad () {
        this.node.opacity = 255;
     },

    // start () {

    // },
    onCollisionEnter: function (other, self) {
        if (other.node.group == 'goods') {
            //调用收金币行为
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').stonePool.put(this.node);

            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnNewStone();
        } 
    },





    update (dt) {
        
        
        this.speed += this.accle * dt;
        this.node.y -= this.speed * dt;
        if (this.node.y < -1000) {
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').stonePool.put(this.node);
            cc.find('Canvas/BaseView/BG1/Back/Road').getComponent('Control').spawnFunc();
        }   
    },
});

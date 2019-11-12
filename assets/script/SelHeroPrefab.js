
cc.Class({
    extends: cc.Component,

    properties: {

     
        m_norHeroPrefab0: cc.Prefab,
     
    },
    //设置背景
    setStyle: function(heroData) {
        // console.log(heroData.style);

        this.setHeroStyle(heroData)
        
    
    },

    setHeroStyle: function(heroData) {

        var hero = cc.instantiate(this.m_norHeroPrefab0);
            this.node.addChild(hero);
        var Prefab = hero.getComponent('HeroUI');
            Prefab.setHeroStyle(heroData);

      
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

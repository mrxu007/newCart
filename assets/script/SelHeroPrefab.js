
cc.Class({
    extends: cc.Component,

    properties: {

     
        m_norHeroPrefab0: cc.Prefab,
        can_buyit: cc.Button,
        Price: cc.Label,
     
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
    setAudio: function(){
        cc.loader.loadRes('assets/button', cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.play(clip, false);
        });
    },
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

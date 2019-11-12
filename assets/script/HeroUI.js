cc.Class({
    extends: cc.Component,

    properties: {

        m_HeroUI: [cc.SpriteAtlas],
        m_Hero: cc.Sprite,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
     


    },
    setHeroStyle: function (heroData) {
        // console.log(heroData.id);
        switch (heroData.id) {
            

            case 0 :
                var sprite = this.m_HeroUI[heroData.id].getSpriteFrame('car01_1');
                // console.log( sprite);
                // console.log(sprite);
                this.m_Hero.spriteFrame = sprite;
                
                break;
            case 1 :
                var sprite = this.m_HeroUI[heroData.id].getSpriteFrame('car02_2');
                // console.log(sprite);
                this.m_Hero.spriteFrame = sprite;
                
                break;
            case 2 :
                var sprite = this.m_HeroUI[heroData.id].getSpriteFrame('car03_1');
                // console.log(sprite);
                this.m_Hero.spriteFrame = sprite;
                
                break;
            case 3 :
                var sprite = this.m_HeroUI[heroData.id].getSpriteFrame('car04_6');
                // console.log(sprite);
                this.m_Hero.spriteFrame = sprite;
                
                break;
            case 4 :
                var sprite = this.m_HeroUI[heroData.id].getSpriteFrame('car05_1');
                // console.log(sprite);
                this.m_Hero.spriteFrame = sprite;
                
                break;

        }


    },

    start() {

    },

    // update (dt) {},
});
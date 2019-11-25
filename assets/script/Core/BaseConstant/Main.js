
cc.Class({
    extends: cc.Component,
    onLoad ()
    {
        window.const.init();    
        window.data.init();
        window.cfg.init();
        window.AudioController.init();
        console.log('这里初始化了');
    },

 
    start()
    {          
     
        window.UIManager.showWindow(window.Constant.LayerEnum.UI,window.Constant.PrefabNameEnum.GAME_START_WIND);  
    }

});


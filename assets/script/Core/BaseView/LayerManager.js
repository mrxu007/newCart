/**
 * 这个脚本主要是保存 游戏中可能出现的界面层级

    UI层
    War层
    Tip层
    在游戏开始设计之初，考虑到的层级出现情况。

    脚本名:LayerManager 这个脚本与UIManager结合使用
 */
var dictionary = require("dictionary");

var LayerManager = function(){
};

LayerManager.m_layerDic = new dictionary();

LayerManager.init = function(){
},

LayerManager.getLayers = function(layer){
    if(!this.m_layerDic.containKey(layer))
    {
        console.log(layer + " is not exist");
        return;
    }
    return  this.m_layerDic.get(layer);
},

LayerManager.getLayer = function(layer)
{
    return  cc.find("Canvas/" + layer);
},

module.exports = LayerManager;

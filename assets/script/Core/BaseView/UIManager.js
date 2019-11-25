var dictionary = require("dictionary");
var ResourceManager = require("ResourceManager");

var UIManager = function()
{
   
};

UIManager.m_windDic = new dictionary();

//从资源中加载界面
UIManager.createWindow = function(layer,mName)
{
  ResourceManager.LoadWindow(mName,function(err, prefab){
       if(null == prefab)
       {
           console.log("null == prefab !!!");
           console.log(err);
           return;
       } 
       var view = window.cc.instantiate(prefab);  
       UIManager.m_windDic.add(mName,view);

       var layerObj = window.LayerManager.getLayer(layer);
       if(null == layerObj) 
       {
           console.log("layerObj is null");
           return; 
       }
       layerObj.addChild(view);
       console.log(view);
       view.addComponent(mName);
       UIManager.showWindow(layer,mName);
   });
}

//调用显示界面 如果画面中还未加载 则加载
UIManager.showWindow = function(layer,mName)
{
   if(!UIManager.m_windDic.containKey(mName))
   {

       UIManager.createWindow(layer,mName);
       return;
   }
   UIManager.m_windDic.get(mName).active = true;
}
//隐藏界面
UIManager.hideWindow = function(mName)
{

   UIManager.m_windDic.get(mName).active = false;
} 
//销毁界面
UIManager.destoryWindow = function(mName)
{
   UIManager.m_windDic.get(mName).destroy();
   UIManager.m_windDic.remove(mName);
}
//检查界面是否存在
UIManager.checkWindow = function(mName)
{
   if(UIManager.m_windDic.containKey(mName))
   {
       return true;
   }
   return false;
},
//销毁保存在容器中的界面
UIManager.clear = function()
{
  var count = this.m_windDic.count;
  for(var i = count-1; i >= 0;i--)
  {
      var name = this.m_windDic.getNameByIndex(i);
      this.destoryWindow(name);
  }
},
module.exports = UIManager;


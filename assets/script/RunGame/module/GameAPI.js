var data = require('data');
var gDataCtl = new data();
function gameApi ()
{
    //调用接口中转站
    console.log('接口自动实例化成功');
}
//通用随机数接口
gameApi.prototype.randomRange = function(upper,lower)
{   

    return Math.floor(Math.random() * (upper - lower) + lower);
    
}
//游戏内调用本地储存金币接口
gameApi.prototype.setGold = function(gold)
{
    gDataCtl.AddGold(gold);
}

//商城购买后设置购买状态
gameApi.prototype.setCartBuy  = function(cartInfo)
{
    return gDataCtl.setCartStatus(cartInfo);
}
//初始化加载商城车辆状态
gameApi.prototype.getCartBuy = function()
{
     return gDataCtl.getCartStatus();
}
//商城内调用本地储存金币接口
gameApi.prototype.setGold2 = function(gold)
{
    gDataCtl.AddGold2(gold);
}
//游戏皮肤id设置
gameApi.prototype.setCartSkin = function(id){
  
    gDataCtl.setCartSkinId(id);
}
//读取车子皮肤id
gameApi.prototype.getCartSkin = function(){
  
    return gDataCtl.getCartSkinId();
}
//设置新手按钮状态
gameApi.prototype.setButtonStatus = function(status){
    
    gDataCtl.setGameStartButtonStatus(status);
}
//读取新手按钮状态
gameApi.prototype.getButtonStatus = function(){
    
    return gDataCtl.getGameStartButtonStatus();
}
//设置游戏积分数据
gameApi.prototype.setGameScore1 = function(score){

    gDataCtl.setGameScore(score);
}
//读取游戏积分数据
gameApi.prototype.getGameScore1 = function(){

    return gDataCtl.getGameScore();
}

//游戏皮肤id获取
//暴露的外部接口调用
module.exports = new gameApi();
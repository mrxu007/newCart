var data = require('data');
var gDataCtl = new data();
function gameApi ()
{
    //调用接口中转站
    console.log('自动实例化成功');
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
module.exports = new gameApi();
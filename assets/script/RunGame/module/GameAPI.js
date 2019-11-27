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
module.exports = new gameApi();
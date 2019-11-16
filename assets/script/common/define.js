

window.gameCtl = null;
// 游戏所有的数据存放处
window.gData = {};
window.gDataCtl = null;
 window.is = false;
//全局随机数
window.randomNumber = function (lower,upper) {
    return Math.floor(Math.random() * (upper - lower) + lower);
}
//全局排序（js距离算法）
window.distance = function distance(p1,p2) {
    var dx = Math.abs(p2.x - p1.x),
        dy = Math.abs(p2.y - p1.y);
        return Math.sqrt(Math.pow( dx , 2) + Math.pow( dy , 2));
}
//货币进位
/**
 * 数字转整数 例如100000 转为10w
 * @param 需要转化的数  num
 * @param 需要保留的小数 point
 */
window.tranNumber = function(num, point) {
    var numStr = num.toString();
    // console.log(num + ':' +numStr +':' +numStr.length);
    //十万以内直接返回
    if(numStr.length < 6) {
        return numStr;
    }else if(numStr.length > 8){
        //大于8位数为亿
        var decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';

    }else if(numStr.length > 5){
        //大于6位数返回十万
        var decimal = numStr.substring(numStr.length - 4  ,numStr.length -4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
    }
    
}
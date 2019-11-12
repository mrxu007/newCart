//开始触摸的数据
var touchStartX = null;
var touchStartY = null;
//公路速度
var road = 5;
//树的速度
var tree = 4;
//节流措施，防止过度点触屏幕
//节流throttle代码
var throttle = function (func, delay) {

    let timeout;
    return function (event) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log(event);

            func.call(this, event)
        }, delay);
    }
}
//开始触摸的数据
window.touchStartX = null;
window.touchStartY = null;
//公路速度
window.road = 3;
//树的速度
window.tree = 4;
//节流措施，防止过度点触屏幕
//节流throttle代码
// window.throttle = function (func, delay) {

//     var timeout;
//     return function (event) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             console.log(event);

//             func.call(this, event)
//         }, delay);
//     }
// }
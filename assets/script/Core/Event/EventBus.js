/**
 * 游戏中会有很多地方是使用 数据驱动界面的方式来 刷新界面的显示，例如 这个游戏中的分数更新 路程更新。这其中就免不了 有基础的监听脚本
    简单的监听 分发 移除 功能
 */
var dictionary = require("dictionary");

var EventBus = function(){

};

EventBus.m_eventDic = new dictionary();

//注册一个事件监听
EventBus.addListener = function(mkey,mListenerHandler){
    var mHandler = [];
    if(EventBus.m_eventDic.containKey(mkey))
    {
        mHandler = EventBus.m_eventDic.get(mkey);
        mHandler.push(mListenerHandler);
        return;
    }
    mHandler.push(mListenerHandler);
    EventBus.m_eventDic.add(mkey,mHandler);
},

//移除一个事件监听
EventBus.removeListener = function(mkey){

    EventBus.m_eventDic.remove(mkey);
},

//触发一个事件监听
EventBus.pos =function(mkey,value = null){
    if(!EventBus.m_eventDic.containKey(mkey))
    {
        console.log("EventBus---Key:" + mkey + " is not exist");
        return;
    }
    var mHandler = EventBus.m_eventDic.get(mkey);
    for(var i=0;i<mHandler.length;i++)
    {
        if(value == null)
            mHandler[i]();
        else
            mHandler[i](value);
    }
},

module.exports = EventBus;


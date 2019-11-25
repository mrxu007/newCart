//在开发当中会有一些重复性的工作需要处理，比如读取一个json文件，将其中的数据 读取出来 保存在数据容器中。

//创建一个配置对象
var TestCfg = new Object();
//申明一个数据容器 
TestCfg.m_dataList=null,
// 申明 json配置文件的路径
TestCfg.m_sPath="",

TestCfg.init = function(target){

        TestCfg.m_dataList =new window.List();
        TestCfg.m_sPath ="TestCfg";

        //CCC读取json配置文件
        window.cc.loader.loadRes(TestCfg.m_sPath,(function(err,array){
            if(err)
            {
                console.log("错误信息:" + err);
                return;
            }
            
            // 以下操作:从json配置文件对象中取出数据保存到申明的JS对象中
            let jsonArry=array.json;
            for(var i = 0;i < jsonArry.length;i++)
            {
                var mData = jsonArry[i];
                var mVoData = TestCfgVoData;
                mVoData.setValue(mData);
                TestCfg.m_dataList.add(mVoData);
            }
        }).bind(this));
    },

 //返回 数据集合
    TestCfg.getTestCfgData = function(){
        return this.m_dataList;
    },

module.exports = TestCfg;


//申明一个对象
function TestCfgVoData(){
   this. m_nId;
    this.m_sName;
};
//对象的设置操作
TestCfgVoData.prototype.setValue = function(mData){
    this.m_nId = mData.id;
    this.m_sName = mData.name;
};
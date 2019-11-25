//定义一个List类型
function List()
{
    //定义 List的长度
    this.count = 0;
    //声明一个JS的数组，作为储存容器
    this.values = new Array();

}
//返回List的长度
List.prototype.lenght =  function()
{
    
    return this.count;
}, 
//检测List中是否存在 相对应的value值 存在即返回 在数组中的引索
//不存在就返回-1
List.prototype.checkValue = function(value)
{

    for(var i = 0; i<this.count;i++)
    {
        var isExist = false;
        isExist = this.values[i] == value;
        if(isExist)
        {
            return i;
        }
    }
    return -1;
}
//检测List中是否再存value值，存在返回true 不存在就返回false
List.prototype.contains = function(value)
{   

    for(var i = 0; i<this.count;i++)
    {
        var isExist = false;
        isExist = this.values[i] == value;
        if(isExist)
        {
            return true;
        }
    }
    return false;
}
//往List中，添加值value   List的长度就+1
//该添加值得方法为原始JS数组的操作方式
List.prototype.add = function(value)
{
    
    this.values.push(value);
    this.count = this.count + 1;
}
//根据 索引 移出List中的Value值 List count -1;
List.prototype.removeByIndex = function(index)
{
    
    this.values.splice(index,1);
    this.count = this.count - 1;
}
//根据 值 移出List中存在的 相应 值 List count -1
List.prototype.remove = function(value)
{

    var index = this.checkValue(value);
    if(index >= 0)
    {
        this.values.splice(index,1);
        this.count = this.count-1;
    }
}
//根据 索引 获得 List中存在的值
List.prototype.get = function()
{

    if(index >= this.count)
    {
        console.log("数组下标越界");
        return;
    }
    return this.values[index];
}
//清除 List 中保存的所有值 List的count -1
List.prototype.clear = function() 
{

    this.values.splice(0,this.count);
    this.count = 0;
}

module.exports = List;
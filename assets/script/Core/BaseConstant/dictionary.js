/**
 * 字典
 */

 //声明一个字典对象
 function dictionary()
 {

    this.count = 0;
    this.keys = new Array();
    this.values = new Array();
 }

 //检查是否存在某个key值
 dictionary.prototype.containKey = function(key)
 {
     
    var index = this.checkKeyId(key);
    if(index != -1)
    {
        
        return true;
    }
    return false;
  
 }
 //添加key-value数据
 dictionary.prototype.add = function(key,value)
 {
     var index = this.checkKeyId(key);
     if(index != -1)
     {
        console.log('dictionary文件下' + this);
        console.log(key + 'is exit');
     }
    this.keys[this.count] = key;
    this.values[this.count] = this.value;
    ++this.count;
 }
//根据key值移出数据
dictionary.prototype.remove = function ()
{
    var index = this.checkKeyId(key);
    if(-1 ==index )
    {
        console.log(key + 'does not exist');
        return null;
    }
    return this.values[index];
}
//检查是否存在当前key值
dictionary.prototype.checkKeyId = function(key)
{
    for(var i = 0; i<this.count;i++)
    {
        if(key == this.keys[i])
        {
            return i;
        }
    }
    return -1;
}
//根据索引值获得一个value 值
dictionary.prototype.getNameByIndex = function(index) 
{
    return this.keys[index];
}
module.exports = dictionary;

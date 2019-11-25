//UI层 警告层 提示层
var LayerEnum = {
    UI : "UI",
    WAR : "WAR",
    TIP : "TIP",
}
//声音Clip的分类
var AudioType=
{
    BGAudio:'BGM',//背景
    SXFAudio:'SXF',//音效
}
//音效集合
var GameClip=
{
    startBgm:"r_bgm_03",
    gameBgm:"r_bgm_01",
    overBgm:"u_bgm",
    score:"score",
    jump:"jump",
}
//预制体集合
var PrefabNameEnum = {
    GAME_START_WIND :"StartView",
    GAME_RUN_WIND : "GameView",       
    GAME_END_WIND : "GameOver",   
    GAME_TRANSITION_WID:"GameTransition",  
    RewardItem:'Star',  
    Buttle:'buttle',
    Barrier:'barrier',
    ScoreEffect:"ScoreFx",
    YM:"YM",
    
}
//路径的前缀
var RootPath = {
    PREFAB_ROOT_PATH : "prefabs/",
    WIND_ROOT_PATH : "prefabs/View/",
    ATLAS_ROOT_PATH : "atals/",
    CONFIG_ROOT_PATH : "configs/",
    AUDIO_ROOT_PATH:"Sound/",
    RewardItem:"prefabs/star/",
    Buttle:'prefabs/buttle/',
    Barrier:'prefabs/barrier/',
    Effect:"prefabs/effects/",     
}
//球的种类
var PlayerType=
{
    NormalBall:4001,
    RugbyBall:4002,
    SteelBall:4003,  //无敌状态
}
//怪物的种类
var BullteType=
{
    MiniButtle:3001,
    MidButtle:3002,
    MaxButtle:3003,
}
//障碍物种类
var BarrierType=
{ 
    NeedleBarrier:5001,
    WoodBarrier:5002,
}
//奖励的种类
var RewardItemType=
{
    StarType:1001,
    AppleType:1002,
    PearType:1003,
}
//奖励的排序方式
var SortType=
{
    LType:2001,
    IType:2002,
    OneLineType:2003,
    StarType:2004,
}
//障碍物的排列方式
var BarrierSortType=
{
    IType:6001,         
    OneLineType:6002,
}
//事件的ID集合
var EventTypeID=
{
    OnScoreChange:1,
    OnGameOver:2,
    OnGameRestart:3,

}
var Constant=
{
    LayerEnum:LayerEnum,
    PrefabNameEnum:PrefabNameEnum,
    RootPath:RootPath,
    PlayerType:PlayerType,
    BullteType:BullteType,
    RewardItemType:RewardItemType,
    SortType:SortType,
    EventTypeID:EventTypeID,
    BarrierSortType:BarrierSortType,
    AudioType:AudioType,
    GameClip:GameClip,
    BarrierType:BarrierType,
}
module.exports=Constant;

cc.Class({
    extends: cc.Component,

    properties: {
        index1:0,//金币商店索引
        index2:0,//经验商店索引
        land:null,//每个土地
        totalBieshu:1,//所有倍数增加
        seedBeishu:1,//种子倍数
    },

    init:function () {
    	var data = cc.sys.localStorage.getItem(window.Global.KEY_SHOP);
        // var data = { index1:this.index1,index2:this.index2,land:this.land,
        //  totalBieshu:this.totalBieshu,seedBeishu:this.seedBeishu};

		console.log("这个data：", data);
        if(!data){
            this.land = {};
        }else{
        
            this.index1 = data.index1;
			this.index2 = data.index2;
            this.land = data.land;
            this.totalBeishu = data.totalBeishu;
            this.seedBeishu = data.seedBeishu;

            console.log("这个data：", data.land);
              console.log("这个data：", data.totalBeishu);
        }
     
    },

    //升级利润倍数
    upLandReward:function (landIndex,beishu,shopIndex) {
           console.log("有问题？landItem:",this.land);
           var json = cc.sys.localStorage.getItem(window.Global.KEY_FARM,null);
           cc.log("输出这个js",json);
           var data = JSON.parse(json);

        var landItem = data.land[landIndex];
     console.log("shuchu:",landItem);
        if(!landItem){
            landItem = {};
            landItem.lirun = 1;
            landItem.zhekou = 1;
        }
        landItem.lirun *= beishu;
console.log("zhege shopIndexdezhi :",shopIndex);

        if(shopIndex == 1){
			this.index1++;
			
        }else{
            this.index2 ++;
        }
        this.saveData();
    },

    //升级折扣
    upgradeLandZhekou:function (landIndex,zhekou,shopIndex) {

        var landItem = this.land[landIndex];
        if(!landItem){
            landItem = {};
            landItem.lirun = 1;
            landItem.zhekou = 1;
        }
        landItem.zhekou *= zhekou/100;

        if(shopIndex){
            this.index1 ++;
        }else{
            this.index2 ++;
        }
        this.saveData();
    },

    upgradeTotal:function (beishu,shopIndex) {
        this.totalBeishu *=beishu;
        if(shopIndex){
            this.index1 ++;
        }else{
            this.index2 ++;
        }
        this.saveData();
    },

    upgradeSeed:function (beishu,shopIndex) {
        this.seedBeishu += beishu;
        if(shopIndex){
            this.index1 ++;
        }else{
            this.index2 ++;
        }
        this.saveData();
    },
   
    saveData:function () {
        var data = {index1:this.index1,index2:this.index2,land:this.land,totalBieshu:this.totalBieshu,seedBeishu:this.seedBeishu};
        var json = JSON.stringify(data);
        console.log("shuchu这个:",data);
        cc.sys.localStorage.setItem(window.Global.KEY_SHOP,json);
    },



});

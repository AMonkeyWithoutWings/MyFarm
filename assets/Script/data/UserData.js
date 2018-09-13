
cc.Class({
    extends: cc.Component,

    properties: {
        gold:"0",
        exp:0,
        land:null,
        unLockAnimal:null,
        beishu:1,
        shopData:null,
        tujian:0,
        lbNames:[][5],
    },

    init:function () {
        this.beishu = 1;
        this.gold = "0";
        this.exp = 0;
        this.land = {};
        this.unLockAnimal = {};
        this.shopData = {};
        this.tujian_sprite = 0;
        this.tujian_name = 0;
        this.lbNames=[][5];
    },

    setGold:function (_gold) {
        this.gold = _gold;
    },

    saveData:function () {
        var data = {gold:this.gold,exp:this.exp,land:this.land,tujian_sprite:this.tujian_sprite,tujian_name:this.tujian_sprite
        ,lbNames:this.lbNames};
      
        var json = JSON.stringify(data);
        cc.sys.localStorage.setItem(window.Global.KEY_FARM,json);
    },

    getData:function () {
        var json = cc.sys.localStorage.getItem(window.Global.KEY_FARM,null);
      
        if(json && json != ""){
            var data = JSON.parse(json);
            console.log("输出经验：",data);
            this.gold = data.gold;
            this.exp = data.exp;
            this.land  = data.land;
            this.tujian_name = data.tujian_name;
            this.tujian_sprite = data.tujian_sprite;
            this.lbNames = data.lbNames;
            this.unLockAnimal = data.unLockAnimal||{};
            console.log("输出经验：",data.land);
        }
      
    },
    
    saveShopItem:function (shopItem) {
        var shopData =  cc.sys.localStorage.getItem(window.Global.KEY_SHOP);
        console.log("输出这个shopData:",shopData);
        var index = shopData.index;
        if(!index){
            index = 0;
        }
        var item = shopData['shopTypeItem'][shopItem.type];

    }

});

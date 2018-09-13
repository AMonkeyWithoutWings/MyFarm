var Utils = require("Utils");
var UserData = require("UserData");
var ShopData = require("ShopData");
cc.Class({
    extends: cc.Component,

    properties: {
        leftFence:cc.Node,
        rightFence:cc.Node,
        fencePrefab:cc.Prefab,
        upgradeLayout:cc.Node,
        lbGold:cc.Label,
        relifeDialogPrefab:cc.Prefab,
        touchPanel:cc.Node,
        streak:cc.Node,
        cardDialog:cc.Node,
        shopDialog:cc.Node,
        lbExp:cc.Label,         //经验
        baoxiang: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        this.initManager();

    },
    start:function () {
        var self = this;
        cc.loader.loadResDir("UI/Animal", cc.SpriteFrame, function (err, sprite) {
            // self._roleAtlas = atlas;

            if(sprite){

                for(var i = 0;i<sprite.length;++i){
                    cc.allGames.animals[sprite[i].name] = sprite[i];
                 
				} 
            }
      //  });
            cc.loader.loadResDir("UI/Shop", cc.SpriteFrame, function (err3, sprite3) {
                // self._roleAtlas = atlas;

                if (sprite3) {
                    for (var i = 0; i < sprite3.length; ++i) {
                        cc.allGames.shopImages[sprite3[i].name] = sprite3[i];
                    }
                }
			});
			cc.loader.loadRes("UI/AnimalIcon/test", cc.SpriteAtlas, function (err4, sprite4) {
                // self._roleAtlas = atlas;

                if (sprite4) {
                    for (var i = 0; i < sprite4.length; ++i) {
                        cc.allGames.animalIcon[sprite4[i].name] = sprite4[i];
                        console.log("输出这个 cc.allGames.animalIcon：", cc.allGames.animalIcon[i]);
                    }
					
                }
            });
            cc.loader.loadResDir("UI/AnimalPanel", cc.SpriteFrame, function (err2, sprite2) {
                // self._roleAtlas = atlas;
                if(sprite2){
                    for(var i = 0;i<sprite2.length;++i){
                        cc.allGames.animalPanels[sprite2[i].name] = sprite2[i];
                    }
                }
                cc.allGames.utils.loadJson('Data/shop1.json',function (json) {
					cc.allGames.shop1Json = json;
					console.log("输出这个shop1Index:", cc.allGames.shop1Json);
                });
                cc.allGames.utils.loadJson('Data/shop2.json',function (json) {
                    cc.allGames.shop2Json = json;

                });

                cc.allGames.utils.loadJson('Data/game_config.json',function (json) {
                    cc.allGames.gameConfig = json;

                    self.loadFinish();
                });
            });
        });
	
        this.addTouchListener(this.touchPanel);
    },
    initManager:function () {
        cc.allGames = {};
        cc.allGames.animals = {};
        cc.allGames.animalIcon = {};
        cc.allGames.animalPanels = {};
        cc.allGames.shopImages = {};
        cc.allGames.utils = new Utils();
        cc.allGames.userData = new UserData();
        cc.allGames.userData.init();
        cc.allGames.shopData = new ShopData();
        cc.allGames.shopData.init();
       
    },





    //载入每块土地
    loadFinish:function () {
        var data = cc.allGames.userData.getData();
        this.setGoldLabel();
        var tag = 1;
        for(var i = 0;i<5;++i){
            var fence = cc.instantiate(this.fencePrefab);
            this.leftFence.addChild(fence);
            fence.getComponent("Fence").init(tag,this);
            fence.landTag = tag;
            tag +=2;
        }
        tag = 2;
        for(var i = 0;i<4;++i){
            var fence = cc.instantiate(this.fencePrefab);
            this.rightFence.addChild(fence);
            fence.getComponent("Fence").init(tag,this);
            fence.landTag = tag;
            tag +=2;
            fence.getComponent("Fence").setProgressBarLeft();
        }
        this.schedule(this.saveGameData,2);
    },

    saveGameData:function () {
        cc.allGames.userData.saveData();
        
    },

    /**
     * 点击中间房子
     */
    onBtnHouseClick:function () {
        this.upgradeLayout.active = true;
        this.upgradeLayout.getComponent("UpgradeLayout").init(this);
    },
    
    onBtnShopClick:function () {
        this.shopDialog.active = true;

        this.shopDialog.getComponent('ShopDialog').loadShopData();
    },
    
	onBtnTujianClick: function () {

        this.cardDialog.active = true;
        this.cardDialog.getComponent('CardDialog').loadCards();
    },
    onBtnbaoxiangClick: function () {

       // this.baoxiang.active = true;
      var box= cc.instantiate(this.baoxiang);

      this.node.addChild(box);
    },

    onBtnCarClick:function () {

        var dialog = cc.instantiate(this.relifeDialogPrefab);
    
        this.node.addChild(dialog);
     
      
        var btnYes = dialog.getChildByName('btn_yes');
        var btnNo = dialog.getChildByName('btn_no');
        btnYes.on("click", function(event){
            this.setExt()
            dialog.destroy();
        },this);
        btnNo.on("click", function(event){
            dialog.destroy();
        },this);

    },
    setExt:function()
    {
        var gold = cc.allGames.userData.gold;
      var exp =  cc.allGames.userData.exp;
        console.log("金比：", this.lbGold.string );
        console.log("金比1：", gold- (5*Math.pow(1.1,0)+1));
        console.log("金比：", exp );
        var self =  this;
        
        while(gold- (5*Math.pow(1.1,0)+1) > 0)
        {
            switch(exp)
            {
                case 0: 
                if( gold - (5*Math.pow(1.1,0)+1) > 0)
                { console.log("金币不足");
                exp += 1;
                self.lbExp.string = cc.allGames.utils.tranNum(exp);

                gold -= (5*Math.pow(1.1,0)+1);
                    self.lbGold.string =gold ;
                }else
                {
                    alert("金币不足");
                    return  self.lbExp.string ; 
                };
                break;
                case 1: 
                if( gold - (75*Math.pow(1.2,1)+6) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (75*Math.pow(1.2,1)+6);
                    self.lbGold.string = gold;
                }
                else
                {
                    alert("金币不足");
                    return  self.lbExp.string ; 
                    console.log("金比：", self.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
    
                case 2: 
                if( gold- (720*Math.pow(1.3,2)+57) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (720*Math.pow(1.3,2)+57);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", self.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 3: 
                if( gold- (42000*Math.pow(1.4,3)+4000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (42000*Math.pow(1.4,3)+4000);
                }else
                {
                    alert("金币不足");
                    console.log("金比：", self.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 4: 
                if( gold- (210000*Math.pow(1.5,4)+5000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (210000*Math.pow(1.5,4)+5000);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", self.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 5: 
                if( gold- (314000*Math.pow(1.6,5)+19000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (314000*Math.pow(1.6,5)+19000);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", self.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 6: 
                if( gold- (1990000*Math.pow(1.7,6)+230000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (1990000*Math.pow(1.7,6)+230000);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", this.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 7: 
                if( gold- (7000000*Math.pow(1.8,7)+770000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -= (7000000*Math.pow(1.8,7)+770000);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", this.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                case 8: 
                if( gold- (88800000*Math.pow(1.9,8)+1200000) > 0)
                {
                    exp += 1;
                    self.lbExp.string = cc.allGames.utils.tranNum(exp);
                    gold -=  (88800000*Math.pow(1.9,8)+1200000);
                    self.lbGold.string = gold;
                }else
                {
                    alert("金币不足");
                    console.log("金比：", this.lbExp.string );
                    return  self.lbExp.string ; 
                };
                break;
                default:
                return ;
            }
        }
       // self.lbExp.string += 1; 
        console.log("金比：", this.lbExp.string );
       
    },
    setGoldLabel:function () {
        var gold = cc.allGames.userData.gold;
        console.log("金比：",gold);
       
        this.lbGold.string = cc.allGames.utils.tranNum(gold);
    },

    //添加触摸事件
    addTouchListener:function (node) {
        var self = this;
        node.on(cc.Node.EventType.TOUCH_START,function(event){
            let location = event.getLocation();
            var pos = self.touchPanel.convertToNodeSpace(location);
            for(var i = 0;i<self.leftFence.childrenCount;++i){
                var child = self.leftFence.children[i];
                // if (cc.rectContainsPoint(child.getBoundingBoxToWorld(), event.getLocation())) {
                if (child.getBoundingBoxToWorld().contains(event.getLocation())) {
                    // 点击在组件内的操作
                    // console.log('ok'+child.landTag);
                    child.getComponent('Fence').clickFence();
                }
            }

            for(var i = 0;i<self.rightFence.childrenCount;++i){
                var child = self.rightFence.children[i];
                // if (cc.rectContainsPoint(child.getBoundingBoxToWorld(), event.getLocation())) {
                if (child.getBoundingBoxToWorld().contains(event.getLocation())) {
                    // 点击在组件内的操作
                    // console.log('ok'+child.landTag);
                    child.getComponent('Fence').clickFence();
                }
            }
        },this);
        node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            let location = event.getLocation();
            var pos = self.touchPanel.convertToNodeSpace(location);
            self.streak.position = pos;
            // self.btnTest
            for(var i = 0;i<self.leftFence.childrenCount;++i){
                var child = self.leftFence.children[i];
                // if (cc.rectContainsPoint(child.getBoundingBoxToWorld(), event.getLocation())) {
                if (child.getBoundingBoxToWorld().contains(event.getLocation())) {
                    // 点击在组件内的操作
                    // console.log('ok'+child.landTag);
                    child.getComponent('Fence').rewardFence();
                }
            }

            for(var i = 0;i<self.rightFence.childrenCount;++i){
                var child = self.rightFence.children[i];
                // if (cc.rectContainsPoint(child.getBoundingBoxToWorld(), event.getLocation())) {
                if (child.getBoundingBoxToWorld().contains(event.getLocation())) {
                    // 点击在组件内的操作
                    // console.log('ok'+child.landTag);
                    child.getComponent('Fence').rewardFence();
                }
            }

        },this);
        node.on(cc.Node.EventType.TOUCH_END,function(event){
        },this);
        node.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
        },this);
    },


});

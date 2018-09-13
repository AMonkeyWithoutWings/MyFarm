
cc.Class({
    extends: cc.Component,

    properties: {
        animalPanel:cc.Node,
        grassGroup:cc.Node,
        animalPrefab:cc.Prefab,
        progressBar:cc.ProgressBar,
        lbCost:cc.Label,
        lbReward:cc.Label,
        goldSprite:cc.Node,
        goldPrefab:cc.Prefab
    },

    onLoad:function () {
        this.canClick = true;

    },

    start:function () {
        var action = cc.sequence(cc.moveBy(0.3,0,20),cc.moveBy(0.3,0,-20));
        this.goldSprite.runAction(cc.repeatForever(action));
    },

    init:function (_tag,_handler) {
        this.tag = _tag;
        this.handler = _handler;
        var landConfig = cc.allGames.gameConfig.json["land"];
        this.land = landConfig[this.tag];
        this.needTime = this.land.time;
        this.currentProgress = 0;
        // this.needTime = 1;
        this.progressTime = this.needTime/20;
        this.lbCost.string = this.land.cost;
        this.totalReward = "0";
        this.reward = this.land.reward;
        var land = cc.allGames.userData.land;
        if(land[this.tag]){
            this.showAnimal();
        }
    },

    setProgressBarLeft:function () {
        this.progressBar.node.x = -this.progressBar.node.x;
    },

    onLandClick:function (event) {
        var landTag = event.target.landTag;
        console.log(landTag);
        var land = cc.allGames.userData.land;
        if(!land[landTag]){
            land[landTag] = {level:1,reward:"0"};

            this.showAnimal();
            cc.allGames.userData.saveData();
        }else{
            //收获金币
            cc.allGames.userData.saveData();
           this.rewardFence();
        }
    },

    clickFence:function () {
        var land = cc.allGames.userData.land;
        if(!land[this.tag]){
            land[this.tag] = {level:1,reward:"0"};
            this.showAnimal();
            cc.allGames.userData.saveData();
        }else{
            //收获金币
            this.rewardFence();
        }
    },
    /**
     * 土地收获
     */
    rewardFence:function () {
        var land = cc.allGames.userData.land;
        if(!land[this.tag]){
            return;
        }
        if(!this.canClick)
            return;
        this.canClick = false;

        var value = cc.allGames.utils.add(cc.allGames.userData.gold,land[this.tag].reward);
        cc.allGames.userData.gold = value;
        cc.allGames.userData.land[this.tag].reward = "0";
        cc.allGames.userData.saveData();
        this.handler.setGoldLabel();
        console.log("输出这个金币：", this.handler.setGoldLabel());
        this.totalReward = "0";
        this.lbReward.string = "0";
        this.count = 0;
        for(var i = 0;i<3;++i){
            var gold = cc.instantiate(this.goldPrefab);
            this.node.parent.parent.addChild(gold);
            var sp = this.goldSprite.convertToWorldSpaceAR(cc.Vec2.ZERO);
            gold.x = sp.x - 375 - 10 +i*10;
            gold.y = sp.y - 667;
            this.playGoldAction(gold,i);
        }
    },


    playGoldAction:function (gold,i) {
        var self = this;
        var targetP = cc.p(-265,612);
        var action = cc.sequence(cc.delayTime(0.3),cc.moveTo(0.3+0.2*i,targetP),cc.callFunc(function () {
            self.count  ++;
            if(self.count >=3){
                self.canClick = true;
            }
            gold.destroy();
        }));
        gold.runAction(action);
        console.log("这个是什么landAnimals：",gold.runAction(action));
    },

    showAnimal:function () {
        var landAnimals = cc.allGames.userData.unLockAnimal;
        console.log("这个是什么landAnimals：",landAnimals);
        if(!landAnimals[this.tag]){
            landAnimals[this.tag] = [];
            this.animal = cc.allGames.gameConfig.json.animal_level[this.tag][0];
            landAnimals[this.tag].push(this.animal);
        }
        if(Object.keys(landAnimals).length==1){
            this.animal = landAnimals[this.tag][0];
        }else{

        }
        var animal = cc.instantiate(this.animalPrefab);
        this.animalPanel.addChild(animal);
        var frames = [];
        for(var i = 1;i<3;++i){
            frames.push(cc.allGames.animals[this.animal+"_"+i]);
        }
        cc.allGames.utils.playAnim(animal,frames,this.animal,true,0.3);

        this.grassGroup.active = false;
        this.progressBar.node.active = true;
        var land = cc.allGames.userData.land;
        this.lbReward.string = cc.allGames.utils.tranNum(land[this.tag].reward);
        this.schedule(this.startReward,this.progressTime);
    },

    startReward:function () {
        if(this.currentProgress >= 1){
            this.currentProgress = 0;
            this.addReward();
        }
        this.currentProgress += 0.05;
        this.progressBar.progress = this.currentProgress;
        
    },


    //把每次的奖励加进地里
    addReward:function () {
        var value = this.getAddReward();
        this.totalReward = cc.allGames.utils.add(this.totalReward,value);
        var land = cc.allGames.userData.land;
        land[this.tag].reward = this.totalReward;
        //转换缩略格式
        this.lbReward.string = cc.allGames.utils.tranNum(this.totalReward);
    },

    //计算每次的奖励
    getAddReward:function () {
        if(!this.percentReward){
            //计算每次收益
            var index = this.land.reward.search(/[A-Z]+/);
            if(index!=-1){
                var upgradePercent = (parseFloat(this.land.reward.substring(0,index)) * this.land.time).toFixed(2);
                var goldUnit = this.land.reward.substr(index,this.land.reward.length-1);
                var zeroCount = cc.allGames.utils.checkStrZero(goldUnit);
                this.percentReward  = upgradePercent*Math.pow(10,zeroCount)+"";
            }else{
                var upgradePercent = this.land.reward * this.land.time;
                this.percentReward = upgradePercent;
            }
        }
        //每次收益x等级
        var reward = cc.allGames.utils.cheng(this.percentReward,cc.allGames.userData.land[this.tag].level+"");
     
        return reward;
    },

    getNumFormate:function (str) {
        var data = {};
        data.zeroCount = 0;
        data.lastValue = 0;
        var str="68AA";
        var index = str.search(/[A-Z]+/);
        if(index!=-1){
            console.log(str.substr(index,str.length-1));
        }
    },



});

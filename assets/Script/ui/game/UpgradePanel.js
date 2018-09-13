
cc.Class({
    extends: cc.Component,

    properties: {
        lbCost:cc.Label,
        lbLevel:cc.Label,
        progressBar:cc.ProgressBar,
        maskPanel:cc.Node,
        panelSprite:cc.Sprite
    },


    // onLoad () {},

    // start () {
    //
    // },

    // update (dt) {},

    init:function (_tag,_handler) {
        this.tag = _tag;
        this.handler = _handler;
        this.discount = 1;
        var land = cc.allGames.userData.land;
        if(land[_tag]){
            this.panelSprite.spriteFrame = cc.allGames.animalPanels[cc.allGames.userData.unLockAnimal[this.tag][0]];
            this.lbLevel.string = land[_tag].level;
            this.setCost();
            this.setProgress();
            this.addTouchListener(this.node);
        }

    },

    //添加触摸事件
    addTouchListener:function (node) {
        var self = this;
        node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.upgradeLevel();
            if(cc.allGames.userData.beishu == 1){
                self.schedule(self.upgradeLevel,0.1,1000,0.5);
            }
            // else  if(cc.allGames.userData.beishu == 2){
            //     self.schedule(self.upgradeLevel,0.1,10,0.01);
            // }else  if(cc.allGames.userData.beishu == 2){
            //     self.schedule(self.upgradeLevel,0.1,100,0.01);
            // }
        },this);
        node.on(cc.Node.EventType.TOUCH_MOVE,function(event){

        },this);
        node.on(cc.Node.EventType.TOUCH_END,function(event){
            self.unschedule(self.upgradeLevel);
        },this);
        node.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            self.unschedule(self.upgradeLevel);
        },this);
    },

    setProgress:function () {
        var land = cc.allGames.userData.land;
        if(land[this.tag]){
            this.currentProgress = 0;
            var maxProgress = 25;
            var progress = 0;
            if(land[this.tag].level<=25){
                maxProgress = 25;
                progress = land[this.tag].level/maxProgress;
            }else  if(land[this.tag].level<=50){
                maxProgress = 25;
                progress = (land[this.tag].level - 25)/maxProgress;
            }else  if(land[this.tag].level<=100){
                maxProgress = 50
                progress = (land[this.tag].level - 50)/maxProgress;
            }else{
                maxProgress = 100;
                progress = (land[this.tag].level%100)/maxProgress;
            }
            this.progressBar.progress = progress;
        }
    },

    onUpgradeClick:function () {
        this.upgradeLevel();
    },

    upgradeLevel:function () {
        var land = cc.allGames.userData.land;
        if(land[this.tag]){
            var packGold = cc.allGames.userData.gold;
            var result = cc.allGames.utils.getMax(packGold,this.cost);
            if(result.length == 3){
                //金币不足
                console.log('金币不足');
                this.maskPanel.active = true;
                this.unschedule(this.upgradeLevel);//取消循环
                return;
            }
            var lastGold = cc.allGames.utils.jian(packGold,this.cost);
            cc.allGames.userData.gold = lastGold;
            cc.allGames.userData.saveData();
            this.handler.setGoldLabel();
            console.log("输出这个金币：", this.handler.setGoldLabel());
            land[this.tag].level += this.levelUp;
            cc.allGames.userData.saveData();
            this.lbLevel.string = land[this.tag].level;
            this.setCost();
            this.setProgress();
        }
    },

    setCost:function () {
        var land = cc.allGames.userData.land;
        if(!land[this.tag]){
            return;
        }
        var land = cc.allGames.userData.land;
        var baseCost = ["5","75","720","42K","2.1M","31.4M","199M","700M","8.88B"];
        var value = "";
        var xishu = 1.1;
console.log("输出这个tag：",this.tag);
        switch (this.tag){
            case 1:
                 value = 1.1;
                xishu = 1.1;
                if(land[this.tag].level  == 1){
                    value = baseCost[0];
                }else{
                    for(var i = 1;i<land[this.tag].level ;++i){
                        value = cc.allGames.utils.cheng(value,"1.1");
                    }
                    value =cc.allGames.utils.cheng(value,baseCost[0]);
                    value = cc.allGames.utils.cheng(value,this.discount);
                }

                break;
            case 2:
                 value = 1.2;
                xishu = 1.2;
                if(land[this.tag].level == 1){
                    value = baseCost[1];
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.2");
                    }
                    value =cc.allGames.utils.cheng(value,baseCost[1]);
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 3:
                // console.log('1start'+Date.now());
                 value = 1.3;
                xishu = 1.3;
                if(land[this.tag].level == 1){
                    value = baseCost[2];
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.3");
                    }
                    // console.log('2start'+Date.now());
                    value =cc.allGames.utils.cheng(value,baseCost[2]);
                    // console.log('3start'+Date.now());
                    value = cc.allGames.utils.cheng(value,this.discount);
                    // console.log('4start'+Date.now());
                }
                break;
            case 4:
                 value = 1.4;
                xishu = 1.4;
                if(land[this.tag].level == 1){
                    value = cc.allGames.utils.tranDigtalNum(baseCost[3] );
                    var unit = cc.allGames.utils.getNumFormate(value);

                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.4");
                    }
                    value =cc.allGames.utils.cheng(value, cc.allGames.utils.tranDigtalNum(baseCost[3] ));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 5:
                 value = 1.5;
                xishu = 1.5;
                if(land[this.tag].level == 1){
                    value =  cc.allGames.utils.tranDigtalNum(baseCost[4]);
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.5");
                    }
                    value =cc.allGames.utils.cheng(value, cc.allGames.utils.tranDigtalNum(baseCost[4] ));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 6:
                 value = 1.6;
                xishu = 1.6;
                if(land[this.tag].level == 1){
                    value = cc.allGames.utils.tranDigtalNum(baseCost[5]);
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.6");
                    }
                    value =cc.allGames.utils.cheng(value,cc.allGames.utils.tranDigtalNum(baseCost[5]));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 7:
                 value = 1.7;
                xishu = 1.17;
                if(land[this.tag].level == 1){
                    value = cc.allGames.utils.tranDigtalNum(baseCost[6]);
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.7");
                    }
                    value =cc.allGames.utils.cheng(value,cc.allGames.utils.tranDigtalNum(baseCost[6]));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 8:
                 value = 1.8;
                xishu = 1.8;
                if(land[this.tag].level == 1){
                    value = cc.allGames.utils.tranDigtalNum(baseCost[7]);
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.8");
                    }
                    value =cc.allGames.utils.cheng(value,cc.allGames.utils.tranDigtalNum(baseCost[7]));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
            case 9:
                 value = 1.9;
                xishu = 1.9;
                if(land[this.tag].level == 1){
                    value = cc.allGames.utils.tranDigtalNum(baseCost[8]);
                }else{
                    for(var i = 1;i<land[this.tag].level;++i){
                        value = cc.allGames.utils.cheng(value,"1.9");
                    }
                    value =cc.allGames.utils.cheng(value,cc.allGames.utils.tranDigtalNum(baseCost[8]));
                    value = cc.allGames.utils.cheng(value,this.discount);
                }
                break;
        }

        if(cc.allGames.userData.beishu == 1){
            this.levelUp = 1;
        }else if(cc.allGames.userData.beishu == 2){
            value= cc.allGames.utils.cheng(value, (Math.pow(xishu,10) - 1)/(xishu - 1));
            this.levelUp = 10;
        }else{
            var need;
            var maxProgress;
            if(land[this.tag].level<=25){
                need = 25;
                maxProgress = need - land[this.tag].level;
            }else  if(land[this.tag].level<=50){
                need = 25;
                maxProgress = need - (land[this.tag].level - 25);
            }else  if(land[this.tag].level<=100){
                need = 50;
                maxProgress = need - (land[this.tag].level - 50);
            }else{
                need = 100;
                maxProgress = need - (land[this.tag].level%100);
            }
            value= cc.allGames.utils.cheng(value, (Math.pow(xishu,maxProgress) - 1)/(xishu - 1));
            this.levelUp = maxProgress;
        }
        console.log("输出这个",value);
        if(value)
        {
            var index = value.indexOf(".");
        }
      
        if(index != -1){
            value = value.substring(0,index);
        }
        this.cost = value;
        var packGold = cc.allGames.userData.gold;
        var result = cc.allGames.utils.getMax(packGold,this.cost);
        console.log("tag = "+this.tag);
        if(result.length == 3){
            this.maskPanel.active = true;
        }else{
            this.maskPanel.active = false;
        }
        this.lbCost.string = cc.allGames.utils.tranNum(value);
    },

});

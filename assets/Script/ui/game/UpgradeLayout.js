
cc.Class({
    extends: cc.Component,

    properties: {
        leftFence:cc.Node,
        rightFence:cc.Node,
        upgradePanelPrefab:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //
    // start () {
    //
    // },

    init:function (_handler) {
        var userData = cc.allGames.userData;
        var tag = 1;
        this.leftFence.removeAllChildren();
        for(var i = 0;i<5;++i){
            var panel = cc.instantiate(this.upgradePanelPrefab);
            this.leftFence.addChild(panel);
            panel.getComponent("UpgradePanel").init(tag,_handler);
            if(!userData.land[tag]){
                panel.getChildByName("panel").active = false;
            }else{
                panel.getChildByName("panel").active = true;
            }
            tag +=2;
        }
        tag = 2;
        this.rightFence.removeAllChildren();
        for(var i = 0;i<4;++i){
            var panel = cc.instantiate(this.upgradePanelPrefab);
            this.rightFence.addChild(panel);
            panel.getComponent("UpgradePanel").init(tag,_handler);
            if(!userData.land[tag]){
                panel.getChildByName("panel").active = false;
            }else{
                panel.getChildByName("panel").active = true;
            }
            tag +=2;
        }
    },

    onBeishu1Click:function(){
        cc.allGames.userData.beishu = 1;
        this.refreshUpgrade();
    },
    onBeishu2Click:function(){
        cc.allGames.userData.beishu = 2;
        this.refreshUpgrade();
    },
    onBeishu3Click:function(){
        cc.allGames.userData.beishu = 3;
        this.refreshUpgrade();
    },

    refreshUpgrade:function () {
        for(var i = 0;i< this.leftFence.childrenCount;++i){
            var panel = this.leftFence.children[i];
            panel.getComponent("UpgradePanel").setCost();
        }
        for(var i = 0;i< this.rightFence.childrenCount;++i){
            var panel = this.rightFence.children[i];
            panel.getComponent("UpgradePanel").setCost();
        }
    },

    onBtnClose:function () {
        this.node.active = false;
    }
});

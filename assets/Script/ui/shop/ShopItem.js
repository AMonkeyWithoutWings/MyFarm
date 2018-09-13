
cc.Class({
    extends: cc.Component,

    properties: {
        lbDes:cc.Label,
        lbNum:cc.Label,
        lbPrice:cc.Label,
        icon:cc.Sprite,
        costIcon:cc.Sprite,
        goldFrame:cc.SpriteFrame,
        expFrame:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //
    // start () {
    //
    // },

    // update (dt) {},
    init:function (itemData,handler,isLeft) {
        this.mItemData = itemData;
        this.mHandler = handler;
        this.isLeft = isLeft;
        this.icon.spriteFrame = cc.allGames.shopImages['shop_item'+itemData.type];
    console.log("这个是什么类型",itemData);
        switch (itemData.type)
        {
            case 1:
                this.lbDes.string = itemData.target+'号土地利润X'+itemData.value;
                console.log("这玩意是啥：",this.lbDes.string);
                break;
            case 2:
                this.lbDes.string = '经验增强'+itemData.value+'%';
                break;
            case 3:
                this.lbDes.string = itemData.target+'号土地价格降低'+itemData.value+'%';
                break;
            case 4:
                this.lbDes.string = itemData.target+'号土地立刻升'+itemData.value +'级';
                break;
        }
        this.lbPrice.string = itemData.price;
        
        this.lbNum.string = itemData.value;
    },
    
    onItemClick:function () {
        console.log("输出这个",this.mItemData);
        switch (this.mItemData.type)
        {
            case 1:
            console.log("输出这个 cc.allGames.shopData：", cc.allGames.shopData);
                //类型1:某个土地利润加倍
                cc.allGames.shopData.upLandReward(this.mItemData.target,this.mItemData.value,this.isLeft);
                break;
            case 2:
                //类型2:种子系数加倍
                cc.allGames.shopData.upgradeTotal(this.mItemData.value,this.isLeft);
                break;
            case 3:
                //类型3:某个土地购买折扣
                cc.allGames.shopData.upgradeSeed(this.mItemData.value,this.isLeft);
                break;
            case 4:
                //类型4:立即升级某个级数（只有经验商店有）

                break;
        }
        if(this.isLeft){
            this.mHandler.refreshLeft();
        }else{
            this.mHandler.refreshLeft();
        }
    }
});

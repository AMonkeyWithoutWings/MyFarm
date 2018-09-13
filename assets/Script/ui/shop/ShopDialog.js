cc.Class({
    extends: cc.Component,

    properties: {
        shopItemPrefab:cc.Prefab,
        leftShop:cc.Node,
        rightShop:cc.Node
    },

    close:function () {
        this.node.active = false;
    },

    loadShopData:function () {

        this.refreshLeft();
        this.refreshRight();
    },
    /**
     * 显示商品
     */
    showShop:function(value,shop,shopIndex,isLeft,isleftShop)
    {
        if(!shopIndex)
        { 
            for(var i = 0;i<value;++i){
            var shopItem = cc.instantiate(this.shopItemPrefab);
            isleftShop.addChild(shopItem);
            shopItem.getComponent('ShopItem').init(shop[i],this,isLeft);
            }
        }
       
    },
    
 

    /**
     * 刷新左边
     */
    refreshLeft:function () {
        var shop1 = cc.allGames.shop1Json.json;
        console.log("这个数是shop1Index", shop1);
		console.log("这个数是cc.allGames.shopData：", cc.allGames.shopData);
        var shop1Index = cc.allGames.shopData.index1;
        console.log("这个数是shop1Index", shop1Index);
        
        this.leftShop.removeAllChildren();
        this.showShop(5,shop1,shop1Index,true,this.leftShop);
        for(var i = shop1Index;i<shop1Index+5;++i){
            var shopItem = cc.instantiate(this.shopItemPrefab);
            this.leftShop.addChild(shopItem);
            shopItem.getComponent('ShopItem').init(shop1[i],this,true);
          
        }
    },

    /**
     * 刷新右边
     */
    refreshRight:function () {
       
        var shop2 = cc.allGames.shop2Json.json;
        var shop2Index = cc.allGames.shopData.index2;
        console.log("这个数是shop2Index", shop2);
      
        this.rightShop.removeAllChildren();
        this.showShop(4,shop2,shop2Index,false,this.rightShop);
        console.log("这个数是shop2Index：",shop2Index);
        for(var i = shop2Index;i<shop2Index+5;++i){
            var shopItem = cc.instantiate(this.shopItemPrefab);
            this.rightShop.addChild(shopItem);
            shopItem.getComponent('ShopItem').init(shop2[i],this,false);
        }
    }

});

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab:cc.Prefab,
        cardLayout:cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function () {

    },

    loadCards:function () {
        this.cardLayout.removeAllChildren();
        var animals = cc.allGames.gameConfig.json.animals;
       console.log("cc.allGames.gameConfig.json的内容是啥：",cc.allGames.gameConfig.json);
        
      
        for(var j =0 ;j<5 ;)
        {
            
            for(var i = 0;i<animals.length;++i){
         
                var card = cc.instantiate(this.cardPrefab);
                this.cardLayout.addChild(card);
            
                var lbName = card.getChildByName('lb_name').getComponent(cc.Label);
                lbName.string = animals[i];
                var lbSprite = card.getChildByName('lb_sprite').getComponent(cc.Sprite);
                cc.allGames.userData.lbNames[i][j]
                this.huantu(lbName.string,lbSprite);
                console.log("cc.allGames.gameConfig.json的内容是啥111：",lbSprite);
               
            }
        }
    },

    huantu:function(A,B)
    {
      
      var c = A.toLocaleLowerCase();
        cc.loader.loadRes("UI/AnimalIcon/test", cc.SpriteAtlas, function (err4, sprite4) {   
            if(true)
            {
                var frame = sprite4.getSpriteFrame(c+'_1');
            }   else
            {
                var frame = sprite4.getSpriteFrame(c);
            }
       
        B.spriteFrame = frame; 
       
        });
    },

    close:function () {
        this.node.active = false;
    },

});

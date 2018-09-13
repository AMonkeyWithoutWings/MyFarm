
cc.Class({
    extends: cc.Component,

    properties: {
   
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad:function () {
        this.lottrey();
     },

    click: function()
    {
       
       this.node.destroy();

       // this.node.active = false;
    },

    lottrey:function()
    {
        var self = this;
        var animals = cc.allGames.gameConfig.json.animals;
        var lbSprite;
        cc.allGames.userData.lbNames =[][5];
      
        var suijidongwu =parseInt( Math.random() * 9);
        var suijixinxin =parseInt( Math.random() * 5);
        console.log("suijishu:",suijidongwu);
         for(var i = 0;i<animals.length;++i){       
             var card = self.node.getChildByName('anima_card');       
         var lbName = card.getChildByName('lb_name').getComponent(cc.Label);
             lbName.string = animals[i];
           if(suijidongwu == i)
           {
            cc.log("lbName.string.toLocaleLowerCase()",lbName.string.toLocaleLowerCase());
               // lbNames[suijidongwu][suijixinxin] = animals[i];
               var c = lbName.string.toLocaleLowerCase();
               console.log("suijishu:",suijixinxin);
                lbSprite = card.getChildByName('lb_sprite').getComponent(cc.Sprite);     
                var stars = card.getChildByName('stars'); 
                var star = stars.getChildByName('star_'+suijixinxin).getComponent(cc.Sprite);
                cc.loader.loadRes("UI/game/star", cc.SpriteFrame, function (err, sprite) {
                star.spriteFrame = sprite;
                } ,
                cc.loader.loadRes("UI/AnimalIcon/test", cc.SpriteAtlas, function (err4, sprite4) {   
                
                lbSprite.spriteFrame  = sprite4.getSpriteFrame(c+'_1');               
                   
                    console.log("cc.allGames.gameConfig.json的内容是啥111：",lbSprite);
                })
                )  ;
           }
             
          
         }
       
    }
    // update (dt) {},
});


cc.Class({
    extends: cc.Component,

    properties: {
  
        jindutiao:cc.ProgressBar
    
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad :function() {
         this.jindutiao.progress = 0;
         this.jindutiao.node.active =false;
        console.log("输出进度条：",this.jindutiao);
     },

//    Click:function()
//    {
//        var self = this;
//        var jd = 0;
      
//         self.jindutiao.node.active =true;
      
//         self.node.getChildByName('New Button').active =false;
     
//         cc.loader.onProgress = (completedCount, totalCount, item) => { //进度回调
//             cc.log(completedCount / totalCount);
//             jd = completedCount / totalCount;
//             console.log("输出这个：",self.jindutiao.progress);
//             };
//             self.jindutiao.progress = jd;   
//             console.log("输出这个：",self.jindutiao.progress);
//             cc.director.preloadScene('game', () => {//预加载
//             cc.loader.onProgress = null;
//             cc.director.loadScene('game');
//             });
     
//    },
//假的预加载
   Click:function()
   {
       var self = this;
    self.jindutiao.node.active =true;
      
    self.node.getChildByName('New Button').active =false;
    var load = function()
    {
        self.jindutiao.progress +=0.2;
        if(self.jindutiao.progress > 0.9)
        {
            cc.director.loadScene('game');
        }
    }
    self.schedule(load,0.8);
   },

    yujiazai:function()
    {
        var self = this;
        self.jindutiao.node.active =true;
        
        self.node.getChildByName('New Button').active =false;
        cc.loader.loadResDir("UI",
        function (completedCount, totalCount, item) {
            // var percent = (completedCount - currentResCount) / (totalCount - currentResCount);
            var percent = completedCount/totalCount;
            percent = percent.toFixed(2);  
            self.jindutiao.progress = percent;
            console.log("进度条的值：",percent);
        },
        function (err, assets) {
            console.log("开始加载配置资源");
            // 存储到对象 
            // for(var i = 0; i < assets.length; i++){ 
            //     var asset = assets[i];
            //     cc.userGame.plistCache.addPlistCache(asset.name.replace(".plist",""), asset);
            // }
            //加载基础角色表
            cc.allGames.utils.loadJson('Data/roles.json',function (json) {
                cc.allGames.localConfigManager.allBaseRoles = json;
            });
            //加载战役关卡配置表
            cc.allGames.utils.loadJson('Data/mapConfig.json',function (json) {
                cc.allGames.localConfigManager.warMaps = json;
            });
            //加载道具配置表
            cc.allGames.utils.loadJson('Data/props.json',function (json) {
                cc.allGames.localConfigManager.props = json;
            });
            //加载技能配置表
            cc.allGames.utils.loadJson('Data/skills.json',function (json) {
                cc.allGames.localConfigManager.skills = json;
            });
            cc.allGames.utils.loadJson('Data/compose.json',function (json) {
                cc.allGames.localConfigManager.composeData = json;
            });
            cc.allGames.utils.loadJson('Data/signIn.json',function (json) {
                cc.allGames.localConfigManager.signInData = json;
            });
            cc.allGames.utils.loadJson('Data/biaoju.json',function (json) {
                cc.allGames.localConfigManager.biaojuJson = json;
            });
            cc.allGames.utils.loadJson('Data/guide.json',function (json) {
                cc.allGames.localConfigManager.guideJson = json;
            });
            cc.allGames.utils.loadJson('Data/dayTask.json',function (json) {
                cc.allGames.localConfigManager.dayTaskJson = json;
            });

            // cc.loader.loadResDir("Skills", cc.SpriteAtlas, function (err, atlas) {
            //     // self._roleAtlas = atlas;
            //     if(atlas){
            //         for(var i = 0;i<atlas.length;++i){
            //             cc.allGames.allSkillAtlas[atlas[i].name.replace(".plist","")] = atlas[i];
            //         }
            //     }
            // });
            cc.loader.loadResDir("RoleIcons", cc.SpriteFrame, function (err, sprite) {
                // self._roleAtlas = atlas;
                if(sprite){
                    for(var i = 0;i<sprite.length;++i){
                        cc.allGames.allRoleIcons[sprite[i].name] = sprite[i];
                    }
                }
            });
            cc.loader.loadResDir("UI/Buff", cc.SpriteFrame, function (err, sprite) {
                // self._roleAtlas = atlas;
                if(sprite){
                    for(var i = 0;i<sprite.length;++i){
                        cc.allGames.allBuffIcons[sprite[i].name] = sprite[i];
                    }
                }
            });
            cc.loader.loadResDir("UI/Item", cc.SpriteFrame, function (err, sprite) {
                // self._roleAtlas = atlas;
                if(sprite){
                    for(var i = 0;i<sprite.length;++i){
                        cc.allGames.allPropIcons[sprite[i].name] = sprite[i];
                    }
                }
            });
            cc.loader.loadResDir("UI/Icons", cc.SpriteFrame, function (err, sprite) {
                // self._roleAtlas = atlas;
                if(sprite){
                    for(var i = 0;i<sprite.length;++i){
                        cc.allGames.allOtherIcons[sprite[i].name] = sprite[i];
                    }
                }
            });
            cc.loader.loadResDir("UI/battle_add", cc.SpriteFrame, function (err, sprite) {
                // self._roleAtlas = atlas;
                if(sprite){
                    for(var i = 0;i<sprite.length;++i){
                        cc.allGames.battleAddText[sprite[i].name] = sprite[i];
                    }
                }
                self.loadingResourcesCompleted();
            });
            // cc.loader.loadResDir("Prefabs", function (err, prefab) {
            //     for (var i = 0; i < prefab.length; ++i) {
            //         var name = prefab[i].name;
            //         cc.allGames.prefabsMap[name] = prefab[i];
            //     }
            //     self.loadingResourcesCompleted();
            // });
        }
        
    ); 
    self.nextScene();
    },
    nextScene:function()
    {
    cc.director.loadScene('game');
    }
    // update (dt) {},
});

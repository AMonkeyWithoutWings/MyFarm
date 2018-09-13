cc.Class({
    extends: cc.Component,

    properties: {
    },

    addClickEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },

    RandomNumBoth: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    },

    getRad: function (d) {
        return d * Math.PI / 180.0;
    },
    isRepeat: function (arr) {
        var hash = {}; 
        for (var i in arr) { 
            if (hash[arr[i]]) 
                return true; 
            hash[arr[i]] = true; 
        } 
        return false; 
    },
    //时间
    getCurrentDate: function () {
        var dtCur = new Date();
        var yearCur = dtCur.getFullYear();
        var monCur = dtCur.getMonth() + 1;
        var dayCur = dtCur.getDate();
        var hCur = dtCur.getHours();
        var mCur = dtCur.getMinutes();
        var sCur = dtCur.getSeconds();
        var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
            + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
            + ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);
        return timeCur;
    },
    //数据格式
    dateFormat: function (time) {
        var date = new Date(time);
        var datetime = "{0}-{1}-{2} {3}:{4}:{5}";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month >= 10 ? month : ("0" + month);
        var day = date.getDate();
        day = day >= 10 ? day : ("0" + day);
        var h = date.getHours();
        h = h >= 10 ? h : ("0" + h);
        var m = date.getMinutes();
        m = m >= 10 ? m : ("0" + m);
        var s = date.getSeconds();
        s = s >= 10 ? s : ("0" + s);
        datetime = datetime.format(year, month, day, h, m, s);
        return datetime;
    },

    date: function (timestamp) {
        var date = new Date(timestamp * 1000);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },
    //字节转换
    bytesToSize:function(bytes) { 
        if (bytes === 0) return '0B'; 
        var k = 1000, // or 1024 
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]; 
    },
    //加载json
    loadJson:function(filename,callback){
        // cc.loader.load(cc.url.raw('resources/data.json'), function(err,res){  
        //     if (err) {  
        //         cc.log(err);  
        //     }else{  
        //         let list=res;  
        //         cc.log("load:");  
        //         cc.log("list:"+list.name);  
        //     }  
        // }); 
        //louadRes()方法，默认路径就是resources
        // 'Data/roles.json'
        cc.loader.loadRes(filename, function(err,res){
            if (err) {  
                cc.log(err);  
            }else{  
                var list=res;
                // cc.log("list:"+list);
                callback(res);
            }  
        });
    },

    //加载单个贴图
    loadTexture:function (path) {
        // 'resources/Roles/role3.png'
        var url = cc.url.raw(path);
        var texture = cc.textureCache.addImage(url);
        return texture;
    },

    //分割贴图
    cutTexture:function (texture,size,xNum,yNum,total) {
        var count = 0;
        var array = [];
        for(var i = 0;i<yNum;++i){
            for(var j = 0;j<xNum;++j){
                var spriteFrame = new cc.SpriteFrame(texture, cc.rect(size*j, size*i, size, size));
                array.push(spriteFrame);
                count ++;
                if(count == total){
                    return array;
                }
            }
        }
        return array;
    },

    cutTexture2:function (texture,sizeW,sizeH,xNum,yNum,total) {
        var count = 0;
        var array = [];
        for(var i = 0;i<yNum;++i){
            for(var j = 0;j<xNum;++j){
                var spriteFrame = new cc.SpriteFrame(texture, cc.rect(sizeW*j, sizeH*i, sizeW, sizeH));
                array.push(spriteFrame);
                count ++;
                if(count == total){
                    return array;
                }
            }
        }
        return array;
    },
    //播放clip动画
    playAnim:function(node,spriteFrames,animName,isLoop,time,count){
        var allClips = node.getComponent(cc.Animation).getClips();
        var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 1/time);
        clip.name = animName;

        node.getComponent(cc.Animation).addClip(clip);
        var animState = node.getComponent(cc.Animation).play(animName);

        if(isLoop)
            animState.wrapMode = cc.WrapMode.Loop;
        else{
            if(!count){
                count = 1;
            }
            animState.repeatCount = count;
        }
    },


    //冒泡排序
    swapRole: function (array, i, j) {
        var a = array[i];
        array[i] = array[j];
        array[j] = a;
    },

    //时间戳转换为年月日
    tranTimeToDate : function (time) {
        var da = new Date(time);
        var year = da.getFullYear();
        var month = da.getMonth()+1;
        if(parseInt(month)<10){
            month = '0'+month;
        }
        var date = da.getDate();
        if(parseInt(date)<10){
            date = '0'+date;
        }
        return [year,month,date].join('');
    },

    //获得跟服务器匹配的实际实际
    // getSyncTime:function () {
    //     var time =
    // },

    /**
     * 人性化时间处理 传入时间戳
     */
    timeFormate:function(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        var result;
        if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
            result="刚刚";
        return result;
    },

    //数值转换
    numFormate:function (num) {
        if(num<10000){
            return num;
        }else if(parseInt(num/1000)>=1){
            return parseInt(num/1000)+'K';

        }else if(parseInt(num/1000/1000)>=10){
            return parseInt(num/1000/1000)+'M';
        }
    },

    //正则验证
    checkAccount:function (str) {
        var re = /^[a-zA-z]\w{3,15}$/;
        if(re.test(str)){
            return true;
        }else{
            return false;
        }
    },

    //大整数相加
    add:function jia(a, b) {
        //把a,b放进zong数组
        var zong = [String(a), String(b)];
        //创建fen数组
        var fen = [];
        //把a,b较大的放在前面
        zong = this.getMax(zong[0], zong[1]);
        //把zong数组里面的元素分成单个数字
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        //创建加0变量
        var jialing;
        //判断两个参数是否相同长度
        if(!(zong[0].length == zong[1].length)) {
            //创建0
            jialing = new Array(zong[0].length-zong[1].length+1).join('0');
            //把0放进zong[1]前面
            zong[1] = jialing.split('').concat(zong[1]);
        }
        //创建补充上一位的数字
        var next = 0;
        //从个位数起对应单个计算
        for(var i=(zong[0].length-1); i>=0; i--) {
            //求和
            var he = Number(zong[0][i]) + Number(zong[1][i]) + next;
            //把求和的个位数先放进数组
            fen.unshift(he%10);
            //把求和的十位数放进补充上一位的数字，留在下一次循环使用
            next = Math.floor(he/10);
            //判断最后一次如果求和的结果为两位数则把求和的十位数加在最前面
            if(i == 0 && !(next==0)) {
                fen.unshift(next);
            }
        }
        //把最后的结果转化成字符串
        var result = fen.join('');
        //返回字符串
        return result;
    },
    // //大整数相乘
    // multi:function (a,b){
    //     var str1,str2,len1,len2,maxlen,result = [];
    //     str1 = a.split("").reverse();
    //     str2 = b.split("").reverse();
    //     len1 = str1.length;
    //     len2 = str2.length;
    // //因为要在下一步做累加，如果不初始化为0，result[]中的值会变为NaN
    // //因为未初始化的数组中的值为undefined
    //     for(var i = 0;i < len1;i++)
    //         for(var j = 0;j < len2;j++)
    //             result[i + j] = 0;
    //     for(var i = 0;i < len1;i++)
    //         for(var j = 0;j < len2;j++)
    //             //根据乘法的手动计算方式，在上下相同位上会有相加
    //             result[i + j] += parseInt(str1[i]) * parseInt(str2[j]);
    //     var n = result.length;
    //     for(var k = 0;k < n;k++)
    //     {
    //         var temp = result[k];
    //         if(temp >= 10)
    //         {
    //             result[k] = temp % 10;
    //             //JS中的"/"不是除法取整，会取得小数，所以要用Math.floor()
    //             result[k + 1] +=  Math.floor(temp / 10);
    //         }
    //     }
    //     return result.reverse().join("");
    // },
//减法
    jian:function (a, b) {
        var zong = [String(a), String(b)];
        var fen = [];
        zong = this.getMax(zong[0], zong[1]);
        if(zong.length == 3) {
            alert("金币不足");
            return false;
        }
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        var jialing;
        if(!(zong[0].length == zong[1].length)) {
            jialing = new Array(zong[0].length-zong[1].length+1).join('0');
            zong[1] = jialing.split('').concat(zong[1]);
        }
        var next = 0;
        for(var i=(zong[0].length-1); i>=0; i--) {
            var cha = Number(zong[0][i]) - Number(zong[1][i]) - next;
            next = 0;
            if(cha<0) {
                cha = cha + 10;
                next = 1;
            }
            fen.unshift(cha%10);
        }
        var result = fen.join('');
        if(result[0] == 0) {
            result = this.shanchuling(result).join('');
        }
        return result;
    },

    //乘法
    cheng:function (a, b) {
        var zong = [String(a), String(b)];
        var fen = [];
        zong = this.getMax(zong[0], zong[1]);
        //去除小数点
        var xsd1Len = 0;
        if(zong[0].indexOf(".")!=-1){
            xsd1Len = zong[0].length - zong[0].indexOf(".")-1;
        }
        var xsd2Len = 0;
        if(zong[1].indexOf(".")!=-1){
            xsd2Len = zong[1].length - zong[1].indexOf(".")-1;
        }
        zong[0] = zong[0].replace(".",'');
        zong[1] = zong[1].replace(".",'');
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        //获取b的长度,处理乘法分配率的乘法
        for(var j=(zong[1].length-1); j>=0; j--) {
            var next = 0;
            var fentemp = [];
            var jialing = '';
            //获取a的长度处理乘法
            for(var i=(zong[0].length-1); i>=0; i--) {
                var ji = Number(zong[0][i]) * Number(zong[1][j]) + next;
                fentemp.unshift(ji%10);
                next = Math.floor(ji/10);
                if(i == 0 && !(next==0)) {
                    fentemp.unshift(next);
                }
            }
            //后面添加0
            jialing = new Array((zong[1].length-(j+1))+1).join('0');
            fentemp.push(jialing);
            fen[j] = fentemp.join('');
        }
        //处理乘法后的求和
        var cishu = fen.length;
        for(var k=1; k<cishu; k++) {
            var hebing = this.add(fen[0], fen[1]);
            fen.splice(0,2,hebing);
        }

        var result = fen.join('');
        if(result[0] == 0) {
            result = this.shanchuling(result);
        }
        if(xsd1Len>0 || xsd2Len>0){
            var sn = result.length-xsd1Len-xsd2Len;
            if(sn>3){
                result = result.substring(0,sn);
            }else{
                var needXs = 2;
                if(result.length - sn<2){
                    needXs = result.length - sn;
                }
                result = result.substring(0,sn)+"." + result.substring(sn,sn+needXs);
            }
        }
        return result;
    },


//获取最大值
    getMax:function (a, b) {
        var result = [a, b];
        // if(a.indexOf(".")< b.indexOf(".")){
        //     result[0] = b;
        //     result[1] = a;
        //     //返回result长度为3，为了减法的不够减而准备
        //     result[2] = 'not';
        //     //返回最终数组
        //     return result;
        // }
        //如果a长度小于b长度
        if(a.length<b.length)
        {
            //b放前面
            result[0] = b;
            result[1] = a;
            //返回result长度为3，为了减法的不够减而准备
            result[2] = 'not';
            //返回最终数组
            return result;
        }
        //如果a长度等于b长度
        if(a.length == b.length) {
            //循环对比a,b里面的单个元素
            for(var i=0; i<a.length; i++) {
                if(result[0][i]>result[1][i]) {
                    result[0] = a;
                    result[1] = b;
                    return result;
                }
                if(result[0][i]<result[1][i]) {
                    result[0] = b;
                    result[1] = a;
                    result[2] = 'not';
                    return result;
                }
                //假如全部相等，当最后一个元素，以上条件都不执行，则执行默认的返回结果
                if(i == a.length-1) {
                    return result;
                }
            }
        }
        if(a.length>b.length) {
            return result;
        }
    },


    //删除字符串前面多余的0
    shanchuling:function (result) {
        //首先判断是否全部都是0，是的话直接返回一个0
        if(result == 0) {
            result = 0;
            //返回最终字符串
            return result;
        }
        //把字符串分割成数组
        result = result.split('');
        //获取数组长度
        var hebing = result.length;
        for(var j=0; j<hebing; j++) {
            //判断数组首位是否为0
            if(result[0] == 0) {
                //把数组首位删掉
                result.splice(0,1);
            }
            else {
                //删除完了就跳出循环
                break;
            }
        }
        //返回最终字符串
        return result;
    },


//将数字转换成缩略
    tranNum:function (str) {
        if( str.indexOf(".") != -1){
            return str;
        }
        var zeroCount = str.length - 1;
        var index = parseInt(zeroCount/3);
        var finalValue = "";
        if(index<=0){
            return str;
        }
        switch (index)
        {
            case 1:
                var s1 = str.substring(0,str.length - index*3);
                finalValue += s1;
                var needFix = 3 - s1.length;
                if(needFix>0){
                    var s2 = str.substring(str.length - index*3,str.length - index*3+needFix);
                    finalValue += ("."+s2);
                }
                finalValue += "K";
                break;
            case 2:
                var s1 = str.substring(0,str.length - index*3);
                finalValue += s1;
                var needFix = 3 - s1.length;
                if(needFix>0){
                    var s2 = str.substring(str.length - index*3,str.length - index*3+needFix);
                    finalValue += ("."+s2);
                }
                finalValue += "M";
                break;
            case 3:
                var s1 = str.substring(0,str.length - index*3);
                finalValue += s1;
                var needFix = 3 - s1.length;
                if(needFix>0){
                    var s2 = str.substring(str.length - index*3,str.length - index*3+needFix);
                    finalValue += ("."+s2);
                }
                finalValue += "B";
                break;
            case 4:
                var s1 = str.substring(0,str.length - index*3);
                finalValue += s1;
                var needFix = 3 - s1.length;
                if(needFix>0){
                    var s2 = str.substring(str.length - index*3,str.length - index*3+needFix);
                    finalValue += ("."+s2);
                }
                finalValue += "T";
                break;
            default:
                var s1 = str.substring(0,str.length - index*3);
                finalValue += s1;
                var needFix = 3 - s1.length;
                if(needFix>0){
                    var s2 = str.substring(str.length - index*3,str.length - index*3+needFix);
                    finalValue += ("."+s2);
                }
                var t1 = Math.floor((index-4)/26);
                finalValue += String.fromCharCode(t1+65);
                var t2 = (index - 4)%26+1;
                var ascalMa = t2  +64;
                finalValue += String.fromCharCode(ascalMa);
                break;
        }
        return finalValue;
    },

    //判断有几个0
    checkStrZero:function (str) {
        // var index = str.search(/[A-Z]+/);
        // if(index!=-1){
        //     console.log(str.substr(index,str.length-1));
        //     str = str.substr(index,str.length-1);
        // }
        if(str == ""){
            return 0;
        }
        var zeroCount = 0;
        if(str.length == 1){
            switch (str)
            {
                case "K":
                    zeroCount = 3;
                    break;
                case "M":
                    zeroCount = 6;
                    break;
                case "B":
                    zeroCount = 9;
                    break;
                case "T":
                    zeroCount = 12;
                    break;
            }
        }else{
            var count = 15;
            for(var i = str.length-1;i>=0;--i){
                var code = str[i].charCodeAt();
                if(i == str.length-1){
                    count += (code-65)*3;
                }else{
                    var n = str.length-1-i;
                    var p = Math.pow(26,n)*(code-65);
                    count += p*3;
                }
            }
            zeroCount = count;
        }
        return zeroCount;
    },

    getNumFormate:function (str) {
        var data = {};
        data.zeroCount = 0;
        data.lastValue = 0;
        // var str="68AA";
        var index = str.search(/[A-Z]+/);
        if(index!=-1){
            return str.substr(index,str.length-1);
        }else{
            return str;
        }
    },

    //转化成具体数字
    tranDigtalNum:function (str) {
        var index = str.search(/[A-Z]+/);
        var unit = "";
        if(index!=-1){
            unit = str.substr(index,str.length-1);
        }
        var zeroCount = 0;
        var digtal;
        if(unit!=""){
            zeroCount = this.checkStrZero(unit);
            digtal = str.substr(0,index);
        }else{
            return str;
        }
        //检查是否包含小数点
        var index = digtal.indexOf(".");
        var lastIndex = 0;
        if(index!=-1){
            lastIndex = digtal.length - index - 1;
            digtal = digtal.replace(".",'');
        }
        for(var i = 0;i<zeroCount - lastIndex;++i){
            digtal += "0";
        }

        return digtal;
    }

});

(function($) {
	$.fn.jparent=function(expr,i){
		if(i==undefined){
			i=0;
		}
		if(i>=50) return $();
    	if($(this).is(expr))return $(this);
    	if($(this).parent().is(expr))return $(this).parent();
    	if($(this).is('body')==true)return $();
    	return $(this).parent().jparent(expr,i+1);
    };
    String.prototype.toDate = function(){
    	return new Date(this.replace(/-/g,"/"));
    };
    Date.prototype.format = function(format){ 
    	var o = { 
	    	"M+" : this.getMonth()+1, //month 
	    	"d+" : this.getDate(), //day 
	    	"h+" : this.getHours(), //hour 
	    	"m+" : this.getMinutes(), //minute 
	    	"s+" : this.getSeconds(), //second 
	    	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	    	"S" : this.getMilliseconds() //millisecond 
    	}
    	if(/(y+)/.test(format)) { 
    		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 

		for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) { 
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
			} 
		} 
		return format; 
	};
	window.tone = {
		sys : {
			cachejs : {},
			cachecss:{},
			loadjs : function(url,callback) {
				var async = true;
				if (url == undefined)
					return false;
				if (this.cachejs[url]!=undefined){
					if ($.isFunction(callback) == true) {
						callback();
					}
					return true;
				}
				this.cachejs[url]=1;
				if (arguments.length >= 2 && arguments[1] === false)
					async = false;
				var result = false;
				$.ajax({url : url,dataType : 'script',async : async}).done(function() {
					result = true;
					if ($.isFunction(arguments[1]) == true) {
						arguments[1]();
					}
					if ($.isFunction(callback) == true) {
						callback();
					}
				}).fail(function() {
					result = false;
				});
				return (async == false) ? result : false;
			/*loadjs*/
			},
			loadcss:function(url){
				if(this.cachecss[url]!=undefined){
					return;
				}
				this.cachecss[url]=1;
				$('head').append($('<link rel="stylesheet" href="'+url+'" type="text/css"/>'));				
			},
			jsontostr : function(obj) {
				var THIS = this;
				switch (typeof (obj)) {
				case 'boolean':
					return obj.toString();
				case 'string':
					return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
				case 'array':
					return '[' + obj.map(THIS.jsontostr).join(',') + ']';
				case 'object':
					if (obj instanceof Array) {
						var strArr = [];
						var len = obj.length;
						for ( var i = 0; i < len; i++) {
							strArr.push(THIS.jsontostr(obj[i]));
						}
						return '[' + strArr.join(',') + ']';
					} else if (obj == null) {
						return 'null';

					} else {
						var string = [];
						for ( var property in obj)
							string.push(THIS.jsontostr(property) + ':'
									+ THIS.jsontostr(obj[property]));
						return '{' + string.join(',') + '}';
					}
				case 'number':
					return obj;
				case false:
					return obj;
				}
			},
			tojson : function(data) {
				return eval('(' + data + ')');
			},
			guid : function() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
                (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			},
			uuid:function(length){
				if(isNaN(length)||length==undefiend){
					length = 24
				}
				var len=length;
			   var radix=16;//16进制
			   var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
			   var str = uuid.join('');
			   return str.toLowerCase();
			},
			machineId:(((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1),
			pid:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
			objectIdCounter:0,
			objectId:function(){
				b=[];
				var t = Date.parse(new Date())/1000;
				b[0]=(t>>24&0xFF);
				b[1]=(t>>16&0xFF);
				b[2]=(t>>8&0xFF);
				b[3]=(t&0xFF);
				var result = '';
				$.each(b,function(i,item){
					var tmp = item.toString(16).substring(0,2);
					if(tmp.length==0){
						tmp='00';
					}else if(tmp.length==1){
						tmp='0'+tmp;
					}
					result+=tmp;
				});
				result += tone.sys.machineId;
				result += tone.sys.pid;
				var c = ++tone.sys.objectIdCounter;
				b=[];
				b[0]=(c>>16&0xFF);
				b[1]=(c>>8&0xFF);
				b[2]=(c&0xFF);
				$.each(b,function(i,item){
					var tmp = item.toString(16).substring(0,2);
					if(tmp.length==0){
						tmp='00';
					}else if(tmp.length==1){
						tmp='0'+tmp;
					}
					result+=tmp;
				});
				return result;
			},
			strlen : function(data) {
				var charset = document.characterSet;
				var length = 0;
				if(charset =='UTF-8'){
					for(var i = 0 ;i<data.length;i++){
						var unicode  = parseInt(data.charCodeAt(i));
						if(unicode<=parseInt('007f',16)){length+=1;}
						else if(unicode <=parseInt('07ff',16)){length+=2;}
						else if(unicode <=parseInt('ffff'),16){length+=3;}
						else length+=4;
					}
				}
				else if(charset =='x-gbk'||charset =='GB2312'){
					for(var i = 0;i<data.length;i++){
						var unicode = parseInt(data.charCodeAt(i));
						if(unicode<127) {length+=1;}
						else {length+=2;}
					}
				}
				else if(charset =='UTF-16'){
					length = data.length*2;
				}
				return length;
			},
			filesize : function(dom){
				if(dom.html !=undefined) dom=dom.get(0);
				else if(dom.nodeType ==undefined) return -1;
				if(dom.files==undefined) return -1;
				var file = dom.files[0];
				return (file.size/1024).toFixed(2);
			},
			img_inflate:function(obj,func,max_size){
				if(func!=undefined && $.isFunction(func)==true){
					var data;
					$.when((function(obj,max_size){
						var dom ;
						var def = $.Deferred();
						if(obj.html!=undefined) dom = obj.get(0);
						else  if(obj.nodeType!=undefined)dom = obj;
						if(dom.files==undefined){data ='';def.reject();}
						else if(dom.value=="") {data = '';def.reject();}
						else{
							var file = dom.files[0];
							var filereader = new FileReader();
							var str;
							if(max_size ==undefined)max_size =300; //默认为300K大小
							filereader.onload = function(e){
								var img = $('<img>').get(0);
								str = e.target.result;
								img.src = str;	
								img.onload = function(){
									var persent = 1024*max_size/file.size;
									if(persent>1){
										persent=1;
									}
									pic = img_context(img,100*persent,file.type);
									data = pic.src;
									console.log(str.length,data.length);
									def.resolve();
								};
							};		
							filereader.readAsDataURL(file);
						}
						return def;
					})(obj,max_size)).always(function(){func(data);});
				};
				function img_context(img,p,type){
					if(p==undefined) p = 100;
					if (p<1){
						p=1;
					}
					p=p*10/Math.sqrt(p);
					var canvas_tmp = $('<canvas ></canvas>').get(0);
					var width = img.width,height = img.height;
					canvas_tmp.width = width*(p/100);canvas_tmp.height = height*(p/100);
					var ctx = canvas_tmp.getContext('2d');
					ctx.drawImage(img,0,0,width*(p/100),height*(p/100));
					var str = canvas_tmp.toDataURL(type||'image/png');
					var size = ((atob(str.split(',')[1])).length)/1024;
					return {src:str,size:size};
				}
			},
				/*data:{data:'base64',code:0开始/1成功/2格式不正确/3,name:filename}*/
			img_inflate1:function(file,func,max_size){
				if(func!=undefined && $.isFunction(func)==true){
					var data={code:0,data:'',name:file.name};
					$.when((function(obj,max_size){
						var def = $.Deferred();
						var filereader = new FileReader();
						var str;
						if(max_size ==undefined)max_size =300; //默认为300K大小
						filereader.onerror=function(e){
							data.code=2;
							def.reject();
							console.log('图片出错',e);
						}
						filereader.onload = function(e){
							str = e.target.result;
							if(str=='data:image/jpeg;base64,ew0KICAic3VjY2VzcyI6IGZhbHNlLA0KICAiZXJyY29kZSAiOiAxMDAzLA0KICAiZXJyb3IiOiAi5pyq5bCG5a+56LGh5byV55So6K6+572u5Yiw5a+56LGh55qE5a6e5L6L44CCIg0KfQ=='){
								data.code=2;
								def.reject();
								console.log('图片出错',e);
								return;
							}
							var img = $('<img>').get(0);
							img.src = str;	
							img.onload = function(){
								var persent = 1024*max_size/file.size;
								if(persent>1){
									persent=1;
								}
								pic = img_context(img,100*persent,file.type);
								data.data = pic.src;
								data.code=1;
								console.log(str.length,data.data.length);
								def.resolve();
								delete img;
							};
						};		
						filereader.readAsDataURL(file);
						return def;
					})(file,max_size)).always(function(){func(data);});
				};
				function img_context(img,p,type){
					if(p==undefined) p = 100;
					p=p*10/Math.sqrt(p);
					var canvas_tmp = $('<canvas ></canvas>').get(0);
					var width = img.width,height = img.height;
					canvas_tmp.width = width*(p/100);canvas_tmp.height = height*(p/100);
					var ctx = canvas_tmp.getContext('2d');
					ctx.drawImage(img,0,0,width*(p/100),height*(p/100));
					var str = canvas_tmp.toDataURL(type||'image/png');
					var size = ((atob(str.split(',')[1])).length)/1024;
					return {src:str,size:size};
				};
			},
			img_resize:function(img,w,h,type){
				var pw,ph;
				if(w==undefined&&h==undefined){
					pw=1;
					ph=1;
				}else if(w==undefined){
					ph=h/img.height;
					pw=ph;
				}else if(h==undefined){
					pw=w/img.width;
					ph=pw;
				}else{
					pw=w/img.width;
					ph=h/img.height;
				}
				var canvas_tmp = $('<canvas ></canvas>').get(0);
				var width = img.width,height = img.height;
				canvas_tmp.width = width*pw;
				canvas_tmp.height = height*ph;
				
				var ctx = canvas_tmp.getContext('2d');
				ctx.drawImage(img,0,0,width*pw,height*ph);
				var str = canvas_tmp.toDataURL(type||'image/png');
				return str;
			},
			canvas_support:function(){
				var canvas = $('<canvas></canvas>').get(0);
				return canvas.getContext?true:false;
			},
			bug : function(obj) {
				var str = '';
				for ( var item in obj) {
					str = str + ' >> ' + item;
				}
				return str;
			},
			mstime:function(){
				return (new Date()).valueOf();
			},
			formattime : function(time) {
				if (typeof time == 'number') {
					time = new Date(time);
				}
				if (typeof time == 'string') {
					time = new Date(Date.parse(time.replace(/-/g, "/")));
				}
				if (typeof time == 'object') {
					var months = time.getMonth() + 1;
					if (months < 10) {
						months = '0' + months;
					}
					var days = time.getDate();
					if (days < 10) {
						days = '0' + days;
					}
					var hours = time.getHours();
					if (hours < 10) {
						hours = '0' + hours;
					}
					var minutes = time.getMinutes();
					if (minutes < 10) {
						minutes = '0' + minutes;
					}
					var sec = time.getSeconds();
					if (sec < 10) {
						sec = '0' + sec;
					}
					var data = time.getFullYear() + "-" + months + "-" + days
							+ " " + hours + ":" + minutes + ":" +sec;
					return data;
				}
			},
			/**
			 * @see 判断用户是不是具有要求的权限
			 * @param possess 用户具有的权限[int,int,int]
			 * @param need 要求的权限[int,int,int]，不定参数，可以有多个，用户只要具有其中一个的权限即可
			 * @returns Boolean
			 */
			auth_valid:function(possess,need){
				var n = arguments.length;
				if(n<2)return false;
				if($.isArray(possess)==false || $.isArray(need)==false)return false;
				if(possess.length!=3)return false;
				
				var args=Array.prototype.slice.call(arguments);
				var temp_data=args.slice(1);	
				
				var vdata=false;
				$.each(temp_data,function(index,item){
					if(item.length!=3)return true;						
					var result=[];
					for (var i=0;i<3;i++){
						var temp1=possess[i];
						var temp2=item[i];							
						if(isNaN(temp1) || isNaN(temp2))return true; 
						result.push(temp1 & temp2);
					}					
					if(result.length!=3)return true;
					if(result[0]>0 && result[1]>0 && result[2]>0){
						vdata=true;
						return false;
					}					
				});				
				return vdata;
			},
			isvideo:function(data){				
				var re=/^\s*((<(iframe|video)\s[\s\S]*src=([\"\'])[\w -:\.\/\?%&=\*]*\4(>|\s[\s\S]*>)\s*<\/\3>)|(<embed\s[\s\S]*src=([\"\'])[\w- :\.\/\?%&=\*]+\7[\s\S]*((\/>)|(>[\s\S]*<\/embed>)))|(<object[\s\S]*>[\s\S]*<\/object>))\s*$/i;				
				if(re.test(data)){					
					return true;
				}else{
					return false;
				}
				
			}
			
		/*sys*/
		},
		/*tool add by yzy at 2016.01.20 V:1.0*/
		tool:{
			/**
			 * @see 正则检查用户输入合法性
			 * @param value 值 
			 * @param cons 约束 由 'H'(汉字) | 'S'(数字) | 'Z'(字母) | 'T'(特殊字符) 拼接组成
			 * @param callback 可选参，true/false 回调
			 * @returns int 0成功 2参数错误 string 处理后的result
			 */
			CheckInput:function(value,cons,callback){
				var err = 0;
				if(value==undefined||cons==undefined){
					err = 2
					return err
				}
				var reg;//其他等待补充
				var dic = new Array();
				dic["HSZ"] = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
				dic["SZ"] = /[^\a-\z\A-\Z0-9]/g;
				dic["S"] =  /[^\Z0-9\-]/g;
				try{
					var ok = dic[cons].test(value);
					var result = 0;
					if(ok){
						value = value.replace(dic[cons],'')
						result = value;
					}
					if(callback!=undefined && typeof callback=="function"){
						callback(result);
					}
					return result
				}catch(e){
					err = 2;
					return err
				}
			}
		}
		
	};
})(jQuery);

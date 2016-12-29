(function($) {
	window.tone.ui={
			overlayid:'ui-eb1884b5-8584-2985-9109-3f8b233a88f8',
			layoutindex:90001,dialoglist:[],
			dialog:function(element,option){
				var layid=tone.ui.overlayid;
				if($(element).length<1)return false;
				if (typeof option == 'string') {
					if(option=='close'&&$(element).data('tecul-ui')!=null){ 
    					var id=$(element).data('tecul-ui');
    					var layctrl=$('#'+layid);
    					layctrl.css('z-index',layctrl.css('z-index')-2);
    					layctrl.hide();
    					$('#'+$(element).data('tecul-ui')).hide();  
    					//@see ares:2013/1113
    					//$('body').css({overflow:'auto',height:'100%'});
    				}
					return;
				}
				option=$.extend({},{close:function(){},width:500,height:350,css:'',ismax:false,full:false},option);
				if($(element).data('tecul-ui')!=undefined){
					var vctrl=$('#'+$(element).data('tecul-ui'));
					$('#'+layid).show();	
					$('#'+layid).css('z-index',vctrl.css('z-index')-1).show();
					vctrl.show();
					if(option.ismax==true){
						vctrl.css({'left':'2px','top':'2px',width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
						$(element).css({width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
					}
					if(option.full==true){
						vctrl.width($(window).width());
						vctrl.height($(window).height());
						vctrl.css('overflow','auto');
					}
					//@see ares:2013/1113
					//$('body').css({overflow:'hidden',height:$(window).height()+'px'});
					return vctrl;
				}
				
				var uuid='ui-'+tone.sys.guid();
				$(element).data('tecul-ui',uuid);
				$(element).wrapAll('<div id="'+uuid+'" style="" ></div>');
				$(element).css('display','').show();
				var ctrl=$('#'+uuid);
				
				//overflow:auto;
				option.width=$(element).width()+5;option.height=$(element).height()+5;
				ctrl.addClass(option.css);
				tone.ui.layoutindex=tone.ui.layoutindex+2;
				ctrl.css({width:option.width,height:option.height,'z-index':tone.ui.layoutindex,position:'absolute'});
				
				if(option.full==true){
					ctrl.width($(window).width());
					ctrl.height($(window).height());
					ctrl.css('overflow','auto');
				}
				/*
				if($('#'+layid).length<1){					
					$("<div>", { id:layid,'class':'ui-widget-overlay',
							style:'z-index:90000;width:100%;height:100%;'}).appendTo($('body'));					
					$('#'+layid).hide();
				}*/
				var tmp_left=(($(window).width()-ctrl.width())/2);
				if(tmp_left<0)tmp_left=0;
				var tmp_top=(($(window).height()-ctrl.height())/2);
				if(tmp_top<0)tmp_top=0;
				
				ctrl.css({'left':tmp_left+'px','top':tmp_top+'px'});
				//alert(tone.sys.jsontostr({'left':(($(window).width()-ctrl.width())/2)+'px','top':(($(window).height()-ctrl.height())/2)+'px'}));
				
				//$('#'+layid).css('z-index',ctrl.css('z-index')-1).show();
				
				//@see ares:2013/1113
				//$('body').css({overflow:'hidden',height:$(window).height()+'px'});
				
				if($('[ui=handle]',ctrl).length>0){
					ctrl.draggable({handle:$('[ui=handle]',ctrl)});
				}
				$('[ui=close]',ctrl).live('click',function(){
					$('#'+layid).hide();
					ctrl.hide();
					tone.ui.dialog($(element),'close');	
					if($.isFunction(option.close))option.close();
				});
				$('[ui=max]',ctrl).toggle(function(){
					$(this).data('left',ctrl.css('left'));
					$(this).data('top',ctrl.css('top'));
					$(this).data('height',ctrl.css('height'));
					$(this).data('width',ctrl.css('width'));
					ctrl.css({'left':'2px','top':'2px',width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
					$(element).css({width:'100%',height:'100%'});
				},function(){
					ctrl.css({'left':$(this).data('left'),'top':$(this).data('top'),width:$(this).data('width'),height:$(this).data('height')});
				});	
				if(option.ismax==true){
					ctrl.css({'left':'2px','top':'2px',width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
					$(element).css({width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
				}
				ctrl.css('position','fixed');
				
				ctrl.show();
				return ctrl;
			},form:function(option){
				var layid=tone.ui.overlayid;
				if (typeof option == 'string') {
					if(option=='close'&&tone.ui.dialoglist.length>0){ 
						var id=tone.ui.dialoglist.pop();
						var layctrl=$('#'+layid);
						var option=$('#'+id).data('form');						
						if(option!=undefined&&option.close!=undefined){
							if($.isFunction(option.close))option.close();
						}
						$('#'+id).removeData('form');
						layctrl.css('z-index',layctrl.css('z-index')-2);
    					layctrl.hide();
						$('#'+id).remove();
    				}
					return;
				}
				option=$.extend({},{close:function(){},width:500,height:350,css:'',html:'',full:false,init:function(){}},option);
				if(option.html.length<1)return false;
				
				
				var uuid='ui-'+tone.sys.guid();
				tone.ui.dialoglist.push(uuid);
				$("<div>", { id:uuid}).appendTo($('body'));
			
				var ctrl=$('#'+uuid);ctrl.html(option.html);
				tone.ui.layoutindex=tone.ui.layoutindex+2;
				ctrl.data('form',option);
				if($.isFunction(option.init)){
					try{
						option.init(ctrl);
					}catch(e){}
				}

				ctrl.css('position','fixed');
				ctrl.css({'z-index':tone.ui.layoutindex}).hide();
				ctrl.addClass(option.css);				
				ctrl.css({width:option.width,height:option.height});
				vh=ctrl.find('div[ui-height]');
				vw=ctrl.find('div[ui-width]');
				if(vh.length>0){
					ctrl.css({height:vh.attr('ui-height')});
				}
				if(vw.length>0){
					ctrl.css({width:vw.attr('ui-width')});
				}
				/*
				if($('#'+layid).length<1){					
					$("<div>", { id:tone.ui.overlayid,'class':'ui-widget-overlay',
							style:'z-index:90000;width:'+$(window).width()+'px;height:'+$(window).height()+'px'}).appendTo($('body'));
					//$('#'+layid).css('z-index',ctrl.css('z-index')-1).hide();
					$('#'+layid).hide();
				}*/
				if(option.full==true){
					ctrl.width($(window).width());
					ctrl.height($(window).height());
					ctrl.css('overflow','auto');
				}
				ctrl.css({'left':(($(window).width()-ctrl.width())/2)+'px','top':(($(window).height()-ctrl.height())/2)+'px'});
				$('#'+layid).css('z-index',ctrl.css('z-index')-1).show();
				if($('[ui=handle]',ctrl).length>0){
					ctrl.draggable({handle:$('[ui=handle]',ctrl)});
				}
				$('[ui=close]',ctrl).live('click',function(){
					tone.ui.form('close');
				});
				$('[ui=max]',ctrl).toggle(function(){
					$(this).data('left',ctrl.css('left'));
					$(this).data('top',ctrl.css('top'));
					$(this).data('height',ctrl.css('height'));
					$(this).data('width',ctrl.css('width'));
					ctrl.css({'left':'2px','top':'2px',width:($(window).width()-5)+'px',height:($(window).height()-5)+'px'});
					$(element).css({width:'100%',height:'100%'});
				},function(){
					ctrl.css({'left':$(this).data('left'),'top':$(this).data('top'),width:$(this).data('width'),height:$(this).data('height')});
				});	
				ctrl.css('position','fixed');
				ctrl.show();
				return ctrl;
			}
		//ui
		};
})(jQuery);

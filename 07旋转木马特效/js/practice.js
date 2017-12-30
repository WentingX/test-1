window.onload=function(){
	var wrap=document.getElementById("wrap");
	var slide=document.getElementById("slide");
	var arrow=document.getElementById("arrow");
	var arrLeft=document.getElementById("arrLeft");
	var arrRight=document.getElementById("arrRight");
	var ul=slide.children[0]
	var lis=ul.children;
	//鼠标经过轮播图 让箭头渐渐地显示 鼠标离开轮播图让箭头渐渐地消失
	wrap.onmouseover=function(){
		animate(arrow,{"opacity":1})
	};
	wrap.onmouseout=function(){
		animate(arrow,{"opacity":0})
	};

/*function animate(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;
		for(var k in json){
			if(k==="opacity"){
				var leader=getStyle(obj,k)*100;
				var target=json[k]*100;
				var step=(target-leader)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				leader+=step;
				obj.style[k]=leader/100;
			}else if(k==="zIndex"){
				obj.style.zIndex=json[k];
			}else{
				var leader=parseInt(getStyle(obj,k))||0;
				var target=json[k];
				var step=(target-leader)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				leader+=step;
				obj.style[k]=leader+"px";
			}
			if(leader!==target){
				flag=false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fu();
			}
		}
	},15)
}
function getStyle=function(obj,sttr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}*/
	var config = [
	        {
	            "width": 400,
	            "top": 20,
	            "left": 50,
	            "opacity": 0.2,
	            "zIndex": 2
	        },//0
	        {
	            "width": 600,
	            "top": 70,
	            "left": 0,
	            "opacity": 0.8,
	            "zIndex": 3
	        },//1
	        {
	            "width": 800,
	            "top": 100,
	            "left": 200,
	            "opacity": 1,
	            "zIndex": 4
	        },//2
	        {
	            width: 600,
	            top: 70,
	            left: 600,
	            opacity: 0.8,
	            zIndex: 3
	        },//3
	        {
	            "width": 400,
	            "top": 20,
	            "left": 750,
	            "opacity": 0.2,
	            "zIndex": 2
	        }//4
	    ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度
	function assign(){
		for(var i=0;i<lis.length;i++){
		animate(lis[i],config[i])
		}
	}
	assign();
	arrRight.oncilck=function(){
		config.push(config.shift());
		assign();
	}
	arrLeft.oncilck=function(){
		config.unshift(config.pop());
		assign();
	}
}
	window.onload=function(){
		search();
		countdown();
		banner();
	};
	//1.给搜索栏设置在banner内的背景透明度变换效果
	function search(){
		var banner=document.querySelector(".jd-banner");
		var bannerHeight=banner.offsetHeight;
		var search=document.querySelector(".jd-search");
		window.onscroll=function(){
			var offsetTop=document.body.scrollTop||document.documentElement.scrollTop;
			var opacity=offsetTop/bannerHeight;
			if(offsetTop<bannerHeight){
				search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
			}
		}
	}
	//2.倒计时
	function countdown(){
		var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
		var totalTime=3700;
		
		var timeId=setInterval(function(){
			if(totalTime==0){
				clearInterval();
				return
			}
			totalTime--;
			var hour=Math.floor(totalTime/3600);
			var minute=Math.floor(totalTime%3600/60);
			var second=Math.floor(totalTime%60);
			spans[0].innerHTML=Math.floor(hour/10);
			spans[1].innerHTML=Math.floor(hour%10);
			spans[3].innerHTML=Math.floor(minute/10);
			spans[4].innerHTML=Math.floor(minute%10);
			spans[6].innerHTML=Math.floor(second/10);
			spans[7].innerHTML=Math.floor(second%10);
		},1000)
	}
	//3.轮播图
	function banner(){
		var banner=document.querySelector(".jd-banner");
		var bannerWidth=banner.offsetWidth;
		//修改轮播图的结构：第一张前面增加最后一张，最后一张后面增加第一张
		//获取轮播图结构
		var imgBox=banner.querySelector("ul:first-of-type");
		var first=imgBox.querySelector("li:first-child");
		var last=imgBox.querySelector("li:last-child");
		imgBox.appendChild(first.cloneNode(true));
		imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
		//获取图片容器
		//获取到原始的第一张和原始的最后一张
		//设置对应的样式
		var lis=imgBox.querySelectorAll("li");
		var count=lis.length;
		//获取所有li元素及其数量
		//获取banner的宽度并据此设置修改图片容器的宽度及每一个li的宽度
		var index=1;
		imgBox.style.width=count*bannerWidth+"px";
		for(var i=0;i<count;i++){
			lis[i].style.width=bannerWidth+"px";
		}
		//设置初始偏移值。ps：屏幕尺寸改变时也需要初始偏移值
		imgBox.style.left=-bannerWidth+"px";
		//重置屏幕宽度
		window.onresize=function(){
		 	bannerWidth=banner.offsetWidth;
		 	imgBox.style.width=count*bannerWidth+"px";
			for(var i=0;i<count;i++){
				lis[i].style.width=bannerWidth+"px";
			}
			//设置初始偏移值。ps：屏幕尺寸改变时也需要初始偏移值
			imgBox.style.left=-index*bannerWidth+"px";
		};
		var setIndicator=function (index) {
            var indicayors=banner.querySelector("ul:last-of-type").querySelectorAll("li");
            for(var i=0;i<indicayors.length;i++){
                indicayors[i].classList.remove("point");
            }
            indicayors[index-1].classList.add("point");
        };
		//实现自动轮播
		var timeId;
		var startTime=function (){
			timeId=setInterval(function(){
			  index++;
			  imgBox.style.transition="left 0.5s ease-in-out";
			  imgBox.style.left=(-index*bannerWidth)+"px";
			},1000)
		};
		startTime();
		//手动轮播
		//触摸开始时
		var isEnd=true;
		var startX,moveX,distanceX;
		imgBox.addEventListener("touchstart",function(e){
			clearInterval(timeId);
			startX=e.targetTouches[0].clientX;
		});
		//滑过时
		imgBox.addEventListener("touchmove",function(e){
			if(isEnd){
				moveX=e.targetTouches[0].clientX;
				distanceX=moveX-startX;
				imgBox.style.transition="none";
				imgBox.style.left=(-index*bannerWidth+distanceX)+"px";
			}
		});
		//触摸结束时:对移动的距离进行判断，向左滑动超过100，distance产生负值li下标加一，向右滑相反；
		//当滑动小于100且大于0，表示滑动了，但是距离小于100，此种操作并不会发生当前li的改变，所以回弹
		imgBox.addEventListener("touchend",function(){
			isEnd=false;
			if(Math.abs(distanceX)>100){
				if(distanceX>0){
					index--;
				}else{
					index++;
				}
				imgBox.style.transition="left 0.5s ease-in-out";
			 	imgBox.style.left=(-index*bannerWidth)+"px";
			}else if(Math.abs(distanceX)>0){
				imgBox.style.transition="left 0.5s ease-in-out";
			 	imgBox.style.left=(-index*bannerWidth)+"px";
			}
			moveX=0;
			startX=0;
			distanceX=0;
		});
		//过渡结束时:滑到左右尽头的时候出现空白，webkitTransitionEnd可以监听到过渡是否结束，并在结束时发生的事件
		//判断滑到左尽头的时候li下标瞬间跳到原始的最后一张，
		//滑到右尽头的时候li下标瞬间跳到原始的第一张
		imgBox.addEventListener("webkitTransitionEnd",function(){
			if(index==count-1){
				index=1;
				imgBox.style.transition="none";
			 	imgBox.style.left=(-index*bannerWidth)+"px";
			}else if(index==0){
				index=count-2;
				imgBox.style.transition="none";
			 	imgBox.style.left=(-index*bannerWidth)+"px";
			}
            setIndicator(index);
			setTimeout(function(){
				isEnd=true;
				clearInterval(timeId);
				startTime();
			},100)
		});
		document.addEventListener("webkitvisibilitychange",function(){
	    //浏览器的可见状态
		    if(document.visibilityState === "hidden"){
		        clearInterval(timeId);
		    } else {
		        startTime();
		    }
		})
	}

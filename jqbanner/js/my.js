$(function() {
	var num = 0;
	var timer = null;
	// 1.0 根据图片数量 动态生成ol li的个数
	for (var i = 0; i < $("#container").find("img").length; i++) {
		var olLi = document.createElement("li");
		$(olLi).text(i + 1);
		$("ol").append($(olLi))
	}
	$("ol > li:eq(0)").addClass("current");

	// 2.0 按钮控制图片显示和隐藏
	$("ol > li").mouseover(function() {
		var index = $(this).index()
		$(this).addClass("current").siblings().removeAttr("class");

		$("#container > ul li").eq(index).fadeIn(500).siblings().fadeOut(500);

		num = index
	})

	// 3.0 点击左右箭头 实现轮播
	$("#container").hover(function() {
		clearInterval(timer)
		$("#arr").css("opacity" , 1)
	}, function() {
		$("#arr").css("opacity" , 0)
		timer = setInterval(autoPlay, 2000)
	})


	$("#arrRight").click(function() {
		autoPlay()
	})
	$("#arrLeft").click(function() {
		num--;
		if(num < 0) {
			num = $("#container > ul li").length - 1;
		}
		$("#container > ul li").eq(num).fadeIn(500).siblings().fadeOut(500);
		$("ol > li").eq(num).addClass("current").siblings().removeAttr("class");

	})

	function autoPlay() {
		num++;
		if(num >= $("#container > ul li").length) {
			num = 0
		}
		$("#container > ul li").eq(num).fadeIn(500).siblings().fadeOut(500);
		$("ol > li").eq(num).addClass("current").siblings().removeAttr("class");
	}

	timer = setInterval(autoPlay, 2000)
})
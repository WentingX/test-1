$(function() {
	// 1.0 完成选项卡切换
	$("#top_nav").find("a").click(function() {
		var index = $(this).parent().index();
		$(this).addClass("current").parent().siblings().find("a").removeAttr("class");
		console.log($("#list_item").children(0).children().eq(index))
		$("#list_item").children(0).children().eq(index).addClass("cur").siblings().removeAttr("class");
	})


	// 2.0 完成店铺的全选反选操作
	// 2.1 完成全选反选  上面控制下面的
	$(".list-info-top").find(":checkbox").click(function() {
		var checkedAll = $(this).prop("checked")
		$(this).parent().siblings().find(":checkbox").prop("checked", checkedAll)
	})
	// 2.2 完成底下的 操作上面的功能
	$(".list-info-buttom").find(":checkbox").click(function() {
		var dd = $(this).parent().parent().parent().parent();
		var geshu = dd.find(".list-info-buttom").find(":checkbox").length;
		var checkedGeshu = dd.find(".list-info-buttom").find(":checked").length;
		if(geshu === checkedGeshu) {
			dd.children().eq(0).find(":checkbox").prop("checked", true)
		}else {
			dd.children().eq(0).find(":checkbox").prop("checked", false)
		}
	})

	// 3.0 完成总页面的全选反选
	// 2.1 完成全选反选  上面控制下面的
	$("#checkedThis").click(function() {
		var checked = $(this).prop("checked")
		$("#list_item > ul > li dd").find(":checkbox").prop("checked", checked)
	})

	// 2.2 完成底下的 操作上面的功能
	$("#list_item > ul > li dd").find(":checkbox").click(function() {
		var geshu = $("#list_item > ul > li dd").find(":checkbox").length;
		var checkedGeshu = $("#list_item > ul > li dd").find(":checked").length;
		if(geshu === checkedGeshu) {
			$("#checkedThis").prop("checked", true)
		}else {
			$("#checkedThis").prop("checked", false)
		}
	})



})
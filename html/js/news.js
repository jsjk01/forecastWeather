init();
// 初始化历史上的今天
function init() {
	$(".col-md-8")
	$.ajax({
		type: "get",
		//后端处理数据的cgi脚本
		url: "/cgi-bin/news.cgi",
		//加在url后面的城市名字，?cityName=北京
		//后端返回的数据格式
		dataType: "json",
		success: function (data) {
			console.log(data)
			var newData = ``
			for (var i = 0; i < data.result.data.length; i++) {
				newData += `
				<div class="post">
					<h2 class="entry-title">${data.result.data[i].title}</h2>
					<div class="featured-image"><img src="${data.result.data[i].thumbnail_pic_s}" alt=""></div>
					<p>${data.result.data[i].date + "&nbsp;&nbsp;&nbsp;" + data.result.data[i].author_name}</p>
					<a href="${data.result.data[i].url}" class="button">阅读原文</a>
				</div>
				`
			}
			$(".news-container").html(newData)

		},
		error: function (err) {
			console.log(err)
		}

	});
}


// 邮箱验证 - 正则表达式
$(".subscribe").click(function () {
	var re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
	if (re.test($(".subscribe-input").val())) {
		alert($(".subscribe-input").val() + "已订阅！");
		$(".subscribe-input").val("");
	} else {
		alert("请输入正确的邮箱！")
	}

})



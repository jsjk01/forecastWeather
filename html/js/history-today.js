init();
// 初始化历史上的今天
function init() {
	var forecastContainer = $(".forecast-container");
	$.ajax({
		type: "get",
		//后端处理数据的cgi脚本
		url: "/cgi-bin/historyToday.cgi",
		//加在url后面的城市名字，?cityName=北京
		//后端返回的数据格式
		dataType: "json",
		success: function (data) {
			console.log(data)
			var historyTodayDatas = ``
			var historyTodayData = `<div class="row">`
			var flag = 1
			for(var i = 0; i < data.result.length; i ++){
				var imagesData = data.result[i].pic ? data.result[i].pic : "images/live-camera-2.jpg" 
				var monthDate = (data.result[i].month < 9) ? "0" +  data.result[i].month : data.result[i].month 
				var dateData = (data.result[i].day < 9) ? "0" + data.result[i].day : data.result[i].day
				var Date = data.result[i].year + "年" + monthDate + "月" + dateData + "日"
				console.log(Date)
				historyTodayData += `
				<div class="col-md-3 col-sm-6">
							<div class="live-camera">
								<figure class="live-camera-cover"><img src="${imagesData}" alt=""></figure>
								<h3 class="location">${data.result[i].title}</h3>
								<small class="date">${Date}</small>
							</div>
						</div>
				`
				if(flag == 4){
					historyTodayData += `</div>`
					historyTodayDatas += historyTodayData
					historyTodayData = `<div class="row">`
					flag = 1
				}else{
					flag ++
				}
				
			}
			
			$(".fullwidth-block>.container").html(historyTodayDatas)
					
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



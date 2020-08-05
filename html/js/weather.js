init();
// 初始化天气，根据本机IP获取位置以获取当地天气
function init() {
	var forecastContainer = $(".forecast-container");
	$.ajax({
		type: "get",
		//后端处理数据的cgi脚本
		url: "/cgi-bin/localWeather.cgi",
		//加在url后面的城市名字，?cityName=北京
		//后端返回的数据格式
		dataType: "json",
		success: function (data) {
			var forecastData = `
	                	 <div class="today forecast">
							<div class="forecast-header">
								<div class="day">${getweekday(data.result.future[0].date)}</div>
								<div class="date">${getDayFormat(data.result.future[0].date)}</div>
							</div> 
							<div class="forecast-content">
								<div class="location">${data.result.city}</div>
								<div class="degree">
									<div class="num">${data.result.future[0].temperature}</div>
									<div class="forecast-icon">
										<img src=${weatherIcon(data.result.future[0].weather)} alt="" width=90>
									</div>	
								</div>
								<span><img src="images/icon-umberella.png" alt="">${data.result.realtime.humidity}%</span>
								<span><img src="images/icon-wind.png" alt="">${data.result.realtime.power}</span>
								<span><img src="images/icon-compass.png" alt="">${data.result.future[0].direct}</span>
							</div>
						</div>
	`

			for (var i = 1; i < 5; i++) {
				var _forecastData = `
						<div class="forecast">
							<div class="forecast-header">
								<div class="day">${getweekday(data.result.future[i].date)}</div>
							</div>
							<div class="forecast-content">
								<div class="forecast-icon">
									<img src=${weatherIcon(data.result.future[i].weather)} alt="" width=48>
								</div>
								<div class="degree">${data.result.future[i].temperature}</div>
							</div>
						</div>
				`
				forecastData += _forecastData
			}
			forecastContainer.html(forecastData);
			$(".site-title").text(data.result.city);
		},
		error: function (err) {

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

// 获取特定位置的天气预报
$(".find").click(function () {
	var locationInput = $(".location-input").val();
	var forecastContainer = $(".forecast-container");
	$.ajax({
		type: "get",
		//后端处理数据的cgi脚本
		url: "/cgi-bin/weather.cgi",
		//后端返回的数据格式
		data: { cityName: locationInput },
		dataType: "json",
		success: function (data) {
			if (data.error_code == 0) {
				var forecastData = `
	                	 <div class="today forecast">
							<div class="forecast-header">
								<div class="day">${getweekday(data.result.future[0].date)}</div>
								<div class="date">${getDayFormat(data.result.future[0].date)}</div>
							</div> 
							<div class="forecast-content">
								<div class="location">${data.result.city}</div>
								<div class="degree">
									<div class="num">${data.result.future[0].temperature}</div>
									<div class="forecast-icon">
										<img src=${weatherIcon(data.result.future[0].weather)} alt="" width=90>
									</div>	
								</div>
								<span><img src="images/icon-umberella.png" alt="">${data.result.realtime.humidity}%</span>
								<span><img src="images/icon-wind.png" alt="">${data.result.realtime.power}</span>
								<span><img src="images/icon-compass.png" alt="">${data.result.future[0].direct}</span>
							</div>
						</div>
	`

				for (var i = 1; i < 5; i++) {
					var _forecastData = `
						<div class="forecast">
							<div class="forecast-header">
								<div class="day">${getweekday(data.result.future[i].date)}</div>
							</div>
							<div class="forecast-content">
								<div class="forecast-icon">
									<img src=${weatherIcon(data.result.future[i].weather)} alt="" width=48>
								</div>
								<div class="degree">${data.result.future[i].temperature}</div>
							</div>
						</div>
				`
				$(".site-title").text(locationInput);
				forecastData += _forecastData
				}
				forecastContainer.html(forecastData);
			}else{
				alert("暂不支持该城市");
			}
		},
		error: function (err) {
			alert("请输入具体城市！");
		}

	});
	$(".location-input").val("");



})

// 获取周几
function getweekday(date) {

	var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	var _ = new Date(date).getDay();
	var week = weekArray[_];//注意此处必须是先new一个Date

	return week;

}
// 获取特殊格式日期
function getDayFormat(date) {
	var monthArray = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");
	var _month = new Date(date).getMonth();
	var _day = new Date(date).getDate();
	var format = _day + "&nbsp;&nbsp;&nbsp;" + monthArray[_month];
	return format;
}
// 根据天气选择显示的图标
function weatherIcon(statu) {
	var iconPath, _statu
	if (statu.search("晴") != -1 && statu.search("雨") != -1) {
		_statu = "晴雨"
		iconPath = "images/icons/icon-4.svg"
	} else if (statu.search("晴") != -1 && statu.search("云") != -1) {
		_statu = "晴云"
		iconPath = "images/icons/icon-3.svg"
	} else if (statu.search("云") != -1 && statu.search("雨") != -1) {
		_statu = "云雨"
		iconPath = "images/icons/icon-9.svg"
	} else if (statu.search("云") != -1 && statu.search("霾") != -1) {
		_statu = "云霾"
		iconPath = "images/icons/icon-7.svg"
	} else if (statu.search("雨") != -1 && statu.search("雷") != -1) {
		_statu = "雨雷"
		iconPath = "images/icons/icon-11.svg"
	} else if (statu.search("晴") != -1) {
		_statu = "晴"
		iconPath = "images/icons/icon-2.svg"
	} else if (statu.search("云") != -1) {
		_statu = "云"
		iconPath = "images/icons/icon-6.svg"
	} else if (statu.search("雷") != -1) {
		_statu = "雷"
		iconPath = "images/icons/icon-12.svg"
	} else if (statu.search("雨") != -1) {
		_statu = "雨"
		iconPath = "images/icons/icon-9.svg"
	} else if (statu.search("霾") != -1) {
		_statu = "霾"
		iconPath = "images/icons/icon-8.svg"
	} else if (statu.search("雪") != -1) {
		_statu = "雪"
		iconPath = "images/icons/icon-13.svg"
	}
	return iconPath
}

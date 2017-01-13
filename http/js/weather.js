function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var weatherIconNameMapping={
	Cloud:"cloudy",
	Drizzle:"drizzle",
	FewShowers:"few-showers",
	Fine:"fine",
	Fog:"fog",
	Hail:"hail",
	PartlyCloudy:"partly-cloudy",
	Rain:"rain",
	Showers:"showers",
	Snow:"snow",
	Thunder:"thunder",
	Wind:"wind"
};

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function date_word(number) {
	var out;
	switch (number) {
		case 1:
		case 21:
		case 31:
			out = "st";
			break;

		case 2:
		case 22:
		case 32:
			out = "nd";
			break;

		case 3:
		case 23:
		case 33:
			out = "rd";
			break;

		default:
			out = "th";
			break;
	}
	return out;
}

function get_iconName(forecastWord) {
	return weatherIconNameMapping[toTitleCase(forecastWord).replace(" ", "")];
}

// Load the weather
function loadWeather(data) {
	var d = new Date();
	// out = "<h4>Tauranga</h4>";
	// out += '<div style="padding-bottom: 50px">';
	// img_class = get_iconName(data.LOCAL_FORECAST.days[0].forecastWord);
	// out += '<div class="icon lrg '+img_class+'" style="position: relative; top: -15px"></div>';
	// out += '<h3 style="text-align: left; margin: 0">' + data.LOCAL_FORECAST.days[0].forecastWord + "</h3>";
	// out += '<div style="text-align: left; margin: 0; padding: 0">' + data.LOCAL_FORECAST.days[0].forecast + "</div>";
	// out += '<div style="text-align: left; width: auto; display: inline-block">';
	// out += '	<span class="weather_blue" style="font-weight: 700; font-size: 2em; margin-right: 30px">'
	// out += '	<span style="font-size: 12pt">MIN:</span>'+data.LOCAL_FORECAST.days[0].min+'</span>';
	// out += '	<span class="weather_red" style="font-weight: 700; font-size: 2em">';
	// out += '	<span style="font-size: 12pt">MAX:</span>'+data.LOCAL_FORECAST.days[0].max+'</span>';
	// out += '</div>';
	// out += '<div style="padding: 50px 20px"><span style="font-size: 0.9em">Today&rsquo;s Rainfall (mm during period)</span><canvas id="myChart" height="80"></canvas></div>';
	// $("#weather").html(out);


	// out += '<div style="width: auto; min-height: 90px; text-align: left; margin: 20px; position: relative; display: block">';
	$("#weather_card1 .mdl-card__title").addClass(get_iconName(data.LOCAL_FORECAST.days[0].forecastWord));
	$("#weather_card1 .mdl-card__supporting-text .desc").html(data.LOCAL_FORECAST.days[0].forecast);
	$("#weather_card1 .mdl-card__supporting-text .high").html(data.LOCAL_FORECAST.days[0].max);
	$("#weather_card1 .mdl-card__supporting-text .low").html(data.LOCAL_FORECAST.days[0].min);

	$("#weather_card2 .mdl-card__title").addClass(get_iconName(data.LOCAL_FORECAST.days[1].forecastWord));
	$("#weather_card2 .mdl-card__supporting-text .desc").html(data.LOCAL_FORECAST.days[1].forecast.substr(0,data.LOCAL_FORECAST.days[1].forecast.indexOf('.')));
	$("#weather_card2 .mdl-card__supporting-text .high").html(data.LOCAL_FORECAST.days[1].max);
	$("#weather_card2 .mdl-card__supporting-text .low").html(data.LOCAL_FORECAST.days[1].min);

	$("#weather_card3 .mdl-card__title").addClass(get_iconName(data.LOCAL_FORECAST.days[2].forecastWord));
	$("#weather_card3 .mdl-card__title-text").html(data.LOCAL_FORECAST.days[2].dow);
	$("#weather_card3 .mdl-card__supporting-text .desc").html(data.LOCAL_FORECAST.days[2].forecast.substr(0,data.LOCAL_FORECAST.days[2].forecast.indexOf('.')));
	$("#weather_card3 .mdl-card__supporting-text .high").html(data.LOCAL_FORECAST.days[2].max);
	$("#weather_card3 .mdl-card__supporting-text .low").html(data.LOCAL_FORECAST.days[2].min);

	$("#weather_card4 .mdl-card__title").addClass(get_iconName(data.LOCAL_FORECAST.days[3].forecastWord));
	$("#weather_card4 .mdl-card__title-text").html(data.LOCAL_FORECAST.days[3].dow);
	$("#weather_card4 .mdl-card__supporting-text .desc").html(data.LOCAL_FORECAST.days[3].forecast.substr(0,data.LOCAL_FORECAST.days[3].forecast.indexOf('.')));
	$("#weather_card4 .mdl-card__supporting-text .high").html(data.LOCAL_FORECAST.days[3].max);
	$("#weather_card4 .mdl-card__supporting-text .low").html(data.LOCAL_FORECAST.days[3].min);



	// img_class = get_iconName(data.LOCAL_FORECAST.days[1].forecastWord);
	// out =  '<div class="mdl-card__supporting-text mdl-grid">'
	// out += '<div style="margin: 0 15px 0 0; position: relative; top: -5px" class="icon sm '+img_class+'"></div>';
	// out += '<h4 class="mdl-cell mdl-cell--12-col">Tomorrow</h4>'
	// out += '<span class="weather_red" style="font-weight: 700; font-size: 12pt; margin-right: 30px">' + data.LOCAL_FORECAST.days[1].max + '</span><br>'
	// out += '<span style="font-size: 11pt">' + data.LOCAL_FORECAST.days[1].forecast.substr(0,data.LOCAL_FORECAST.days[1].forecast.indexOf('.')) + '.</span>';
	// out += '</div>';
	// $("#weather_1").html(out);

	// img_class = get_iconName(data.LOCAL_FORECAST.days[2].forecastWord);
	// out =  '<div class="mdl-card__supporting-text mdl-grid">'
	// out += '<div style="margin: 0 15px 0 0; position: relative; top: -5px" class="icon sm '+img_class+'"></div>';
	// out += '<h4 class="mdl-cell mdl-cell--12-col">' + data.LOCAL_FORECAST.days[2].dowTLA + '</h4>'
	// out += '<span class="weather_red" style="font-weight: 700; font-size: 12pt; margin-right: 30px">' + data.LOCAL_FORECAST.days[2].max + '</span><br>'
	// out += '<span style="font-size: 11pt">' + data.LOCAL_FORECAST.days[2].forecast.substr(0,data.LOCAL_FORECAST.days[2].forecast.indexOf('.')) + '.</span>';
	// out += '</div>';
	// $("#weather_2").html(out);

	// img_class = get_iconName(data.LOCAL_FORECAST.days[3].forecastWord);
	// out =  '<div class="mdl-card__supporting-text mdl-grid">'
	// out += '<div style="margin: 0 15px 0 0; position: relative; top: -5px" class="icon sm '+img_class+'"></div>';
	// out += '<h4 class="mdl-cell mdl-cell--12-col">' + data.LOCAL_FORECAST.days[3].dowTLA + '</h4>'
	// out += '<span class="weather_red" style="font-weight: 700; font-size: 12pt; margin-right: 30px">' + data.LOCAL_FORECAST.days[3].max + '</span><br>'
	// out += '<span style="font-size: 11pt">' + data.LOCAL_FORECAST.days[3].forecast.substr(0,data.LOCAL_FORECAST.days[3].forecast.indexOf('.')) + '.</span>';
	// out += '</div>';
	// $("#weather_3").html(out);
	// out += '</div>';
	// out += '<div style="width: auto; min-height: 90px; text-align: left; margin: 20px; position: relative; display: block">';
	// img_class = get_iconName(data.LOCAL_FORECAST.days[2].forecastWord);
	// out += '	<div style="margin: 0 15px 0 0; position: relative; top: -5px" class="icon sm '+img_class+'"></div>';
	// out += '	<h3 style="margin: 0; display: inline-block">' + data.LOCAL_FORECAST.days[2].dowTLA + '</h3> - ';
	// out += '	<span class="weather_red" style="font-weight: 700; font-size: 12pt; margin-right: 30px">' + data.LOCAL_FORECAST.days[2].max + '</span><br>'
	// out += '	<span style="font-size: 11pt">' + data.LOCAL_FORECAST.days[2].forecast.substr(0,data.LOCAL_FORECAST.days[2].forecast.indexOf('.')) + '.</span>';
	// out += '</div>';
	// out += '<div style="width: auto; min-height: 90px; text-align: left; margin: 20px; position: relative; display: block">';
	// img_class = get_iconName(data.LOCAL_FORECAST.days[3].forecastWord);
	// out += '	<div style="margin: 0 15px 0 0; position: relative; top: -5px" class="icon sm '+img_class+'"></div>';
	// out += '	<h3 style="margin: 0; display: inline-block">' + data.LOCAL_FORECAST.days[3].dowTLA + '</h3> - ';
	// out += '	<span class="weather_red" style="font-weight: 700; font-size: 12pt; margin-right: 30px">' + data.LOCAL_FORECAST.days[3].max + '</span><br>'
	// out += '	<span style="font-size: 11pt">' + data.LOCAL_FORECAST.days[3].forecast.substr(0,data.LOCAL_FORECAST.days[3].forecast.indexOf('.')) + '.</span>';
	// out += '</div>';


	var ctx = $("#myChart");

	var options = {
		showLines: true,
		spanGaps: false,
		legend: false,
		animation: {
			duration: 0
		},
		scales: {
	        yAxes: [{
	        	display: false,
				gridLines: {
					display: false
				},
	        	stacked: true,
	            ticks: {

	                fontColor: "#fff",
	                fontSize: 14,
	                // stepSize: 1,
	                beginAtZero:true
	            }
	        }],
	        xAxes: [{
				gridLines: {
					display: false
				},
	        	stacked: true,
	        	categoryPercentage: 1,
	        	barPercentage: 1,
	            ticks: {
	                fontColor: "#fff",
	                fontSize: 14,
	                stepSize: 1,
	                beginAtZero:true
	            }
	        }],
    	}
	};

	var graph_data = {
		labels: [
		"2am",
		"4am",
		"6am",
		"8am",
		"10am",
		"12pm",
		"2pm",
		"4pm",
		"6pm",
		"8pm",
		"10pm",
		"12am"
		],
		datasets: [{
			label: "Expected Rainfall (mm)",
			fill: false,
			lineTension: 0.1,
			borderColor: "#fff",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#fff",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(255,255,255,1)",
			pointHoverBorderColor: "rgba(255,255,255,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [],
			spanGaps: false,
		}]
	};

	for (var i=0; i<data.HOURLY_OBS_AND_FORCAST.actualData.length; i++) {
		graph_data.datasets[0].data.push(parseFloat(data.HOURLY_OBS_AND_FORCAST.actualData[i].rainFall))
		// console.log(i);
	}
	for (var i=0; i<data.HOURLY_OBS_AND_FORCAST.forecastData.length; i++) {
		if (data.HOURLY_OBS_AND_FORCAST.forecastData[i].offset < 13) {
			graph_data.datasets[0].data.push(parseFloat(data.HOURLY_OBS_AND_FORCAST.forecastData[i].rainFall))
		}
		// console.log(i);
	}
	console.log(graph_data);

	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: graph_data,
	    options: options
	});
}

function trigger_weather() {
	$.ajax({
		url: "get_weather?rand="+Math.random(),
		// url: "get_weather,
		datatype: "json"
	}).done(function(data) {
		loadWeather(data);
		setTimeout(trigger_weather, 60000);
	});
}

trigger_weather();

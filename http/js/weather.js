function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var weatherIconNameMapping={Cloud:"cloudy",Drizzle:"drizzle",FewShowers:"few-showers",Fine:"fine",Fog:"fog",Hail:"hail",PartlyCloudy:"partly-cloudy",Rain:"rain",Showers:"showers",Snow:"snow",Thunder:"thunder",Wind:"wind"};
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

// Load the weather
function loadWeather(data) {

	var d = new Date();
	// out = "<h1>" + days[d.getDay()] + " " + d.getDate() + "<sup>" + date_word(d.getDate()) + "</sup> " + months[d.getMonth()] + "</h1>";
	out = "<h2>Tauranga</h2>";
	// out += '<div style="width: 30%; display: inline-block; vertical-align: top">';
	out += '<div style="padding-bottom: 50px">';
	console.log(data);
	console.log(toTitleCase(data.LOCAL_FORECAST.days[0].forecastWord).replace(" ", ""));
	img_class = weatherIconNameMapping[toTitleCase(data.LOCAL_FORECAST.days[0].forecastWord).replace(" ", "")];
	out += '<div class="icon '+img_class+'"></div>';
	out += '<h3 style="text-align: left; margin: 0">' + data.LOCAL_FORECAST.days[0].forecastWord + "</h3>";
	out += '<div style="text-align: left; margin: 0; padding: 0">' + data.LOCAL_FORECAST.days[0].forecast + "</div>";
	out += "</div>"
	out += '<div style="padding: 20px"><canvas id="myChart" height="80"></canvas></div>';

	$("#weather").html(out);
	var ctx = $("#myChart");

	var options = {
		showLines: true,
		spanGaps: false,
		legend: false,
		scales: {
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 14,
                // stepSize: 1,
                beginAtZero:true
            }
        }],
        xAxes: [{
            ticks: {
                fontColor: "white",
                fontSize: 14,
                stepSize: 1,
                beginAtZero:true
            }
        }]
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
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
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
	    type: 'line',
	    data: graph_data,
	    options: options
	});


}

$.ajax({
	url: "get_weather",
	datatype: "json"
}).done(function(data) {
	loadWeather(data);
});
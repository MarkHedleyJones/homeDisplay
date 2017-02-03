(function(){
var to;

	function pieceHeights(){
		to = setTimeout(function(){
			$(".pure-g-r").each(function(i,el){
				var contentPieces = $(el).find(".dashboard-piece");
				var max = 0;
				contentPieces.css("min-height","");
				$.grep(contentPieces, function(el,i){
					max = Math.max($(el).outerHeight(),max);
				});
				contentPieces.css("min-height", max);
			});
		}, 400);
	}

	$(window).on("resize", function(){
		clearTimeout(to);
		pieceHeights();
	}).trigger("resize");

}());



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

function renderDate() {
	var d = new Date();
	hours = d.getHours()
	pm = false;
	if (hours >= 12) {
		pm = true;
		if (hours > 12) hours -= 12;
	}
	ext = "AM";
	if (pm) ext = "PM";
	mins = d.getMinutes();
	if (d.getMinutes() < 10) {
		mins = "0" + mins
	}
	$("#date").html(days[d.getDay()] + " " + d.getDate() + "<sup>" + date_word(d.getDate()) + "</sup> " + months[d.getMonth()]);
	$("#time").html(hours + ':' + mins + ' <span>' + ext + '</span>');

	setTimeout(renderDate, 1000);
}

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getHours() > hours ||
       (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
}

function date_obj_to_str(d) {
	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

function renderCalendar() {
	$("#calendar").html('');
	console.log("Loading the calendar");
	event_list = {
		"monthly": []
	}
	var now = new Date();
	console.log(now);
	console.log(now.getDate());
	var vege_week = false;
	var anniversaries = {
		"11-16": "Dave",
		"4-30": "Jason",
		"2-4": "Rob",
		"10-25": "Mark",
		"10-28": "Matthew",
		"6-23": "Sarah",
		"1-12": "Jayden",
		"12-16": "Caleb",
		"9-5": "Sally",
		"1-6": "Benji",
		"1-12": "Gina",
		"8-18": "Issac",
		"7-30": "Shae",
		"9-12": "Alistair",
		"5-4": "Jonathan",
		"3-3": "Florian",
		"1-23": "Lachlan",
		"2-21": "Anthony",
		"9-28": "Claire",
		"10-1": "Callum",
		"10-7": "Morag",
		"8-26": "Rosalie",
		"3-15": "Wedding",
		"1-1": "New Year",
		"12-25": "Christmas",
		"12-26": "Boxing",
		"2-6": "Waitangi",
		"4-25": "Anzac",
	}
	var events = {
		"2017-4-2": "DST",
		"2018-4-1": "DST",
		"2019-4-7": "DST",
		"2020-4-5": "DST",
		"2017-4-14": "Good Fri",
		"2018-4-30": "Good Fri",
		"2019-4-19": "Good Fri",
		"2020-4-10": "Good Fri",
		"2017-4-17": "Easter Mon",
		"2018-4-2": "Easter Mon",
		"2019-4-22": "Easter Mon",
		"2020-4-13": "Easter Mon",
		"2020-4-27": "Anzac Hol",
		"2017-6-5": "Queen",
		"2018-6-4": "Queen",
		"2019-6-3": "Queen",
		"2020-6-1": "Queen",
		"2017-9-24": "DST",
		"2018-9-30": "DST",
		"2019-9-29": "DST",
		"2020-9-27": "DST",
		"2017-10-23": "Labor Day",
		"2018-10-22": "Labor Day",
		"2019-10-28": "Labor Day",
		"2020-10-26": "Labor Day",
		"2017-1-30": "Auckland",
		"2018-1-29": "Auckland",
		"2019-1-28": "Auckland",
		"2020-1-27": "Auckland",
	}
	for (var d = new Date(now.getFullYear(), now.getMonth(), 1); d < new Date(now.getFullYear(), now.getMonth() + 1, 1); d.setDate(d.getDate() + 1)) {
		if (d.getDay() == 0 && vege_week == false) {
			tmp = new Date(d);
			tmp.setDate(tmp.getDate() + 6);
			event_list["monthly"].push({
				"name": "Vege week",
				"startdate": date_obj_to_str(d),
				"enddate": date_obj_to_str(tmp),
				"color": "#9C9C9C"
			});
			vege_week = true;
		}
		if (d.getDay() == 3) {
			if(getWeekNumber(d) % 2 == 0) {
				event_list["monthly"].push({
					"name": "Recycling",
					"startdate": date_obj_to_str(d),
					"color": "#C9B583"
				});
			}
			else {
				event_list["monthly"].push({
					"name": "Rubbish",
					"startdate": date_obj_to_str(d),
					"color": "#83C9C2"
				});
			}
		}
		else if (d.getDay() == 2) {
			event_list["monthly"].push({
				"name": "Japaneese",
				"startdate": date_obj_to_str(d),
				"color": "#FF9999"
			});
		}
		for (var anni in anniversaries) {
			if (date_obj_to_str(d).substr(5) == anni) {
				event_list["monthly"].push({
					"name": anniversaries[anni],
					"startdate": date_obj_to_str(d),
					"color": "#8394C9"
				});
			}
		}
	}
	$('#calendar').monthly({
	    mode: 'event',
	    dataType: 'json',
	    events: event_list
	});
    setTimeout(renderCalendar, 1000*60*5);
}

renderCalendar();
renderDate();
refreshAt(0, 0, 0);

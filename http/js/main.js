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
	out = '<h1 style="width: auto; text-align: left; float: left; margin-left: 50px">';
	out += days[d.getDay()] + " " + d.getDate()
	out += "<sup>" + date_word(d.getDate()) + "</sup> "
	out += months[d.getMonth()]
	out += "</h1>"
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
	out += '<h2 style="float: right; font-family: \'Liberation Sans\'; margin: 0 50px 0 0; padding-top: 15px; font-size: 3.0em">' + hours + ':' + mins + ' ' + ext + '</h2>'
	$("#banner").html(out);
	setTimeout(renderDate, 1000);
}

renderDate();

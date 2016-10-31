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
	$("#banner").html("<h1>" + days[d.getDay()] + " " + d.getDate() + "<sup>" + date_word(d.getDate()) + "</sup> " + months[d.getMonth()] + "</h1>");
}

renderDate();

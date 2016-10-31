days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function displayShopping(data) {
	$("#shopping").html("");
	console.log(data);
	// out = "<h1>" + days[d.getDay()] + " " + d.getDate() + "<sup>" + date_word(d.getDate()) + "</sup> " + months[d.getMonth()] + "</h1>";
	out = '<ul>';
	for (i = 0; i< data.length; i++) {
		out += '<li>' + data[i] + '</li>';
	}
	out += '</ul>';
	$("#shopping").html(out);
	document.getElementById('codefield').focus();
}

function updateList(item) {
	$.ajax({
		url: "/update_shopping",
		type: "post",
		data: "item="+item,
		datatype: "json"
	}).done(function(tmp_data) {
		console.log('posted, loading')
		displayShopping(tmp_data);
	});
}

function lookupCode(code) {
	
	$.ajax({
		url: "https://raw.githubusercontent.com/markjones112358/Household-Barcode-Database/master/barcodes.json",
		datatype: "json"
	}).done(function(tmp_data) {
		code = $("#codefield").val();
		if (code == "000000000017") {
			updateList("remove 1");
		}
		else if (code == "000000000024") {
			updateList("remove 5");	
		}
		else if (code == "000000000031") {
			updateList("reset");	
		}
		else {
			data = $.parseJSON(tmp_data);
			if (code in data) {
				console.log("Code found");
				console.log(data[code]);
				updateList(data[code]);
			}
		}
		$("#codefield").val('');
		document.getElementById('codefield').focus();
	});	
}

function loadShopping() {
	console.log('loading shopping')
	$.ajax({
		url: "/get_shopping",
		datatype: "json"
	}).done(function(tmp_data) {
		console.log('displayShopping')
		displayShopping(tmp_data);
	});	
}


$("html").keyup(function(event){
	if(event.keyCode == 13) {
		lookupCode($("#codefield").val());
	}
})

loadShopping()

document.getElementById('codefield').focus();
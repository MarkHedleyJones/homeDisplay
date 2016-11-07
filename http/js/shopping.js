days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

shopping_list = []
shopping_list_ids = []

function displayShopping() {
	data = shopping_list;
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

function add_item_to_list(item) {
	var myList = "581fafe836e0ef68e2777f67";
	var newCard = {
	  name: item, 
	  idList: myList,
	  pos: 'top'
	};
	Trello.post('/cards/', newCard, loadShopping);
}

function close_card(name) {
	index = -1;
	for (key in shopping_list) {
		if (name == shopping_list[key]) {
			index = key;
			break;
		}
	}
	if (index != -1) {
		console.log(name + ' has index ' + index + ' and id ' + shopping_list_ids[key]);
		Trello.put('/cards/'+shopping_list_ids[key], {closed: true}, loadShopping);
	}
}

function archive_all() {
	Trello.post('/lists/581fafe836e0ef68e2777f67/archiveAllCards', loadShopping);
}

function updateList(item) {
	// $.ajax({
	// 	url: "/update_shopping",
	// 	type: "post",
	// 	data: "item="+item,
	// 	datatype: "json"
	// }).done(function(tmp_data) {
	// 	console.log('posted, loading')
	// 	displayShopping(tmp_data);
	// });
}

var counter = 0;

function lookupCode(code) {
	
	$.ajax({
		url: "https://raw.githubusercontent.com/markjones112358/Household-Barcode-Database/master/barcodes.json",
		datatype: "json"
	}).done(function(tmp_data) {
		code = $("#codefield").val();
		console.log(code);
		if (code == "000000000017") {
			// updateList("remove 1");
			console.log("Cant remove");
		}
		else if (code == "000000000024") {
			// updateList("remove 5");	
			console.log("Cant remove");
		}
		else if (code == "000000000031") {
			// updateList("reset");	
			// console.log("Cant remove");
			archive_all();
		}
		else {
			data = $.parseJSON(tmp_data);
			if (code in data) {
				console.log("Barcode resolves to " + data[code]);
				if (shopping_list.indexOf(data[code]) >= 0) {
					console.log("Item already in shopping list, removing");
					close_card(data[code]);
				}
				else {
					console.log("Adding item to shopping list");
					add_item_to_list(data[code]);
				}
				
				// updateList(data[code]);
			}
		}
		$("#codefield").val('');
		document.getElementById('codefield').focus();
	});	
}


function loadShopping() {
	Trello.get('/lists/581fafe836e0ef68e2777f67/cards', parseShopping, error)
}

function parseShopping(data) {
	shopping_list = []
	shopping_list_ids = []
	for (key in data) {
		console.log(data[key])
		shopping_list.push(data[key]['name'])
		shopping_list_ids.push(data[key]['id'])
	}
	displayShopping();
	setTimeout(loadShopping, 1000 * 60 * 5);
}

$("html").keyup(function(event){
	if(event.keyCode == 13) {
		lookupCode($("#codefield").val());
	}
})

// loadShopping();

var success = function(successMsg) {
  console.log(successMsg);
};

var error = function(errorMsg) {
  console.log(errorMsg);
};

var authenticationSuccess = function() { 
	loadShopping();
};

var authenticationFailure = function() { console.log("Failed authentication"); };

Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});



document.getElementById('codefield').focus();
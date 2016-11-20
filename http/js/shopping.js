days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var shopping_list = [[], []];
var shopping_list_ids = [[],[]];
var shopping_queued = [false, false];
var shopping_urls = [
   '581fafe836e0ef68e2777f67',
   '582fdea3aeeca26b9064c5c6'
];

current_list = 0;

function displayShopping() {
    for (list_id = 0; list_id < 2; list_id++) {
    	data = shopping_list[list_id];
    	$("#shopping_"+list_id).html("");
    	out = '<ul>';
        if (data.length > 0) {
        	for (i = 0; i< data.length; i++) {
        		out += '<li>' + data[i] + '</li>';
        	}
        }
        else {
            out += '<li>No items</li>';
        }
    	out += '</ul>';
    	$("#shopping_"+list_id).html(out);
    }
    highlight_list();
}

function highlight_list() {
    $("#list_"+current_list).addClass("list_selected");
    $("#list_"+((current_list + 1) % 2)).removeClass("list_selected");
}

function add_item_to_list(item) {
	var newCard = {
	  name: item, 
	  idList: shopping_urls[current_list],
	  pos: 'top'
	};
    console.log(shopping_urls[current_list]);
    console.log(shopping_urls);
    console.log(current_list);
	Trello.post('/cards/', newCard, load_lists);
}

function close_card(name) {
	index = -1;
	for (key in shopping_list[current_list]) {
		if (name == shopping_list[current_list][key]) {
			index = key;
			break;
		}
	}
    console.log(key);
	if (index != -1) {
		console.log(name + ' has index ' + index + ' and id ' + shopping_list_ids[current_list][key]);
		Trello.put('/cards/'+shopping_list_ids[current_list][key], {closed: true}, load_lists);
	}
}

function archive_all() {
    url = '/lists/' + shopping_urls[current_list] + '/archiveAllCards';
	Trello.post(url, loadShopping);
}

var counter = 0;

function lookupCode(code) {
	
	$.ajax({
		url: "https://raw.githubusercontent.com/markjones112358/Household-Barcode-Database/master/barcodes.json",
		datatype: "json"
	}).done(function(tmp_data) {
		code = $("#codefield").val();
		if (code == "000000000017") {
			// updateList("remove 1");
   			// console.log("Cant remove");
            console.log("Switching lists");
            current_list = (++current_list) % 2;
            highlight_list();
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
				if (shopping_list[current_list].indexOf(data[code]) >= 0) {
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
		//document.getElementById('codefield').focus();
	});	
}


function loadShopping(list_id) {
    url = '/lists/' + shopping_urls[list_id] + '/cards';
	Trello.get(url, parseShopping, error)
}

function load_lists() { 
    shopping_list = [[], []];
    shopping_list_ids = [[], []];
    loadShopping(0);
    loadShopping(1);
    displayShopping();
	document.getElementById('codefield').focus();
}

function start_list_loader() {
    load_lists()
	setTimeout(start_list_loader, 1000 * 60 * 5);
	document.getElementById('codefield').focus();
}

function parseShopping(data) {
    list_id = -1;
    if (data.length > 0) {
        list_id = shopping_urls.indexOf(data[0]['idList']);
    }
    if (list_id == -1) {
        console.log("Couldnt get the list id");
        return;
    }
    else {
    	for (key in data) {
    		shopping_list[list_id].push(data[key]['name'])
    		shopping_list_ids[list_id].push(data[key]['id'])
    	}
        shopping_queued[list_id] = true;
    }
	displayShopping();
}

$("html").keyup(function(event){
	if(event.keyCode == 13) {
		lookupCode($("#codefield").val());
	}
})

var success = function(successMsg) {
  console.log(successMsg);
};

var error = function(errorMsg) {
  console.log(errorMsg);
};

var authenticationSuccess = function() {
    load_lists();
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

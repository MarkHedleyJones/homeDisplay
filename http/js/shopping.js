days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var shopping_list = [[], []];
var shopping_list_ids = [[],[]];
var shopping_queued = 0;
var shopping_urls = [
   '581fafe836e0ef68e2777f67',
   '582fdea3aeeca26b9064c5c6'
];

current_list = 0;

function displayShopping() {
	console.log("Displaying lists");
    for (list_id = 0; list_id < 2; list_id++) {
    	data = shopping_list[list_id];
    	$("#shopping_"+list_id + ' .mdl-card__supporting-text').html("");

        if (data.length > 0) {
            out = '<ul class="demo-list-item mdl-list">';
            $("#shopping_"+list_id).removeClass('empty-list');
        	for (i = 0; i< data.length; i++) {
        		out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
        	}
            out += '</ul>';
        }
        else {
            $("#shopping_"+list_id).addClass('empty-list');
			out = 'Nothing to buy';
        }

    	$("#shopping_"+list_id + ' .mdl-card__supporting-text').html(out);
    }
    highlight_list();
	//displayShopping();
	document.getElementById('codefield').focus();
	console.log("Setting load list timer");
	setTimeout(load_lists, 1000 * 60 * 5);
}

function highlight_list() {
    $("#shopping_"+current_list).addClass("list-selected");
    $("#shopping_"+current_list).addClass("mdl-shadow--4dp");
    $("#shopping_"+current_list).removeClass("mdl-shadow--1dp");
    $("#shopping_"+current_list + " .mdl-card__title i").html("radio_button_checked");
    $("#shopping_"+((current_list + 1) % 2)).removeClass("list-selected");
    $("#shopping_"+((current_list + 1) % 2)).removeClass("mdl-shadow--4dp");
    $("#shopping_"+((current_list + 1) % 2)).addClass("mdl-shadow--1dp");
    console.log("#shopping_"+((current_list + 1) % 2)+ " .mdl-card__title i");
    $("#shopping_"+((current_list + 1) % 2)+ " .mdl-card__title i").html("radio_button_unchecked");

}

function add_item_to_list(item) {
	var newCard = {
	  name: item,
	  idList: shopping_urls[current_list],
	  pos: 'top'
	};
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
	Trello.post(url, load_lists);
}

var counter = 0;

function add_remove_item(item) {
    if (shopping_list[current_list].indexOf(item) >= 0) {
    	console.log("Item already in shopping list, removing");
    	close_card(item);
    }
    else {
    	console.log("Adding item to shopping list");
    	add_item_to_list(item);
    }
}

function lookupCode(code) {
	$.ajax({
		url: "https://raw.githubusercontent.com/markjones112358/Household-Barcode-Database/master/barcodes.json",
		datatype: "json"
	}).done(function(tmp_data) {
		code = $("#codefield").val();
		if (code == "9410000000015") {
            console.log("Switching lists");
            current_list = (++current_list) % 2;
            highlight_list();
		}
		//else if (code == "9410000000022") {
		//	console.log("Cant remove");
		//}
		else if (code == "9410000000022") {
			archive_all();
		}
        else if (code == "4935850351001") {
            add_remove_item("Bananas");
        }
        else if (code == "9410000000114") {
            add_remove_item("Avocado");
        }
        else if (code == "9415077094332") {
            add_remove_item("Tin foil");
        }
        else if (code == "9410000000138") {
            add_remove_item("Baby mayo");
        }
        else if (code == "9410000000121") {
            add_remove_item("Toothpaste");
        }
        else if (code == "9414812091988") {
            add_remove_item("Toilet paper");
        }
		else {
			data = $.parseJSON(tmp_data);
			if (code in data) {
				console.log("Barcode resolves to " + data[code]);
			    add_remove_item(data[code]);
			}
		}
		$("#codefield").val('');
		document.getElementById('codefield').focus();
	});
}


function loadShopping(list_id) {
    url = '/lists/' + shopping_urls[list_id] + '/cards';
	Trello.get(url, parseShopping, error)
}

function load_lists() {
	console.log("Resetting cache and loading lists");
    shopping_list = [[], []];
    shopping_list_ids = [[], []];
    loadShopping(0);
    loadShopping(1);
    //Parse shopping takes care of displaying once both calls are done
}

function parseShopping(data, other, more) {
	console.log("Parsing returned list data...");
	console.log(data);
	console.log(other);
	console.log(more);
    list_id = -1;
    if (data.length > 0) {
        list_id = shopping_urls.indexOf(data[0]['idList']);
    }
    if (list_id == -1) {
        console.log("Couldnt get the list id - possibly the list is empty");
        shopping_queued++;
    }
    else {
    	for (key in data) {
    		shopping_list[list_id].push(data[key]['name'])
    		shopping_list_ids[list_id].push(data[key]['id'])
    	}
        shopping_queued++;
    }
    if (shopping_queued == 2) {
		displayShopping();
		shopping_queued = 0;
	}
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
    console.log("Starting the lost loader");
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



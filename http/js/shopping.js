days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var shopping_list = [];
var shopping_list_ids = [];
// var shopping_queued = 0;
var shopping_url = '581fafe836e0ef68e2777f67';

var tasks_list = [];
var tasks_url = '56948570275ef393558a2ef6';
var timer;

function displayTasks() {
    data = tasks_list;
    $("#tasks .mdl-card__supporting-text").html("");
    if (data.length > 0) {
        if (data.length > 7) {
            out = '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
            $("#tasks").removeClass('empty-list');
            for (i = 0; i < 7; i++) {
                out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
            }
            out += '</ul>';

            if (data.length > 14) {
                out += '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
                $("#tasks").removeClass('empty-list');
                for (i = 7; i < 13; i++) {
                    out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                }
                out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>+' + (data.length - 13) + ' more</span></li>';
                out += '</ul>';
            }
            else {
                out += '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
                $("#tasks").removeClass('empty-list');
                for (i = 7; i < data.length; i++) {
                    out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                }
                out += '</ul>';
            }

        }
        else {
            out = '<ul class="demo-list-item mdl-list">';
            $("#tasks").removeClass('empty-list');
            for (i = 0; i< data.length; i++) {
                out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
            }
            out += '</ul>';
        }
    }
    else {
        $("#tasks").addClass('empty-list');
        out = '<span><i class="material-icons mdl-list__item-icon" style="position: relative; bottom: -5px; margin-right: 5px !important">done</i>Everything&rsquo;s been done</span>';
    }

    $("#tasks .mdl-card__supporting-text").html(out);
}

function displayShopping() {
    barcodes_queue = []
	data = shopping_list;
	$("#shopping .mdl-card__supporting-text").html("");

    if (data.length > 0) {
        if (data.length > 7) {
            out = '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
            $("#shopping").removeClass('empty-list');
            for (i = 0; i < 7; i++) {
                if (data[i].indexOf(" = ") != -1) {
                    if (data[i].length - 3 == data[i].indexOf(" = ")) {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">help_outline</i>Unknown item (...'+data[i].substr(-5, 2) +')</span></li>';
                    }
                    else {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">watch_later</i>' + data[i].substr(data[i].indexOf(" = ")+3) + '</span></li>';
                        // Send an update to the server on this item
                        item_desc = data[i].substr(data[i].indexOf(" = ")+3)
                        item_barcode = data[i].substr(0, data[i].length - item_desc.length - 3);
                        barcodes_queue.push({'code': item_barcode, 'desc': item_desc});
                    }
                }
                else {
                    out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                }

            }
            out += '</ul>';

            if (data.length > 14) {
                out += '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
                for (i = 7; i < 13; i++) {
                    if (data[i].indexOf(" = ") != -1) {
                        if (data[i].length - 3 == data[i].indexOf(" = ")) {
                            out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">help_outline</i>Unknown item (...'+data[i].substr(-5, 2) +')</span></li>';
                        }
                        else {
                            out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">watch_later</i>' + data[i].substr(data[i].indexOf(" = ")+3) + '</span></li>';
                            // Send an update to the server on this item
                            item_desc = data[i].substr(data[i].indexOf(" = ")+3)
                            item_barcode = data[i].substr(0, data[i].length - item_desc.length - 3);
                            barcodes_queue.push({'code': item_barcode, 'desc': item_desc});
                        }
                    }
                    else {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                    }
                }
                out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>+' + (data.length - 13) + ' more</span></li>';
                out += '</ul>';
            }
            else {
                out += '<ul class="demo-list-item mdl-list" style="display: inline-block; vertical-align: top">';
                for (i = 7; i < data.length; i++) {
                    if (data[i].indexOf(" = ") != -1) {
                        if (data[i].length - 3 == data[i].indexOf(" = ")) {
                            out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">help_outline</i>Unknown item (...'+data[i].substr(-5, 2) +')</span></li>';
                        }
                        else {
                            out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">watch_later</i>' + data[i].substr(data[i].indexOf(" = ")+3) + '</span></li>';
                            // Send an update to the server on this item
                            item_desc = data[i].substr(data[i].indexOf(" = ")+3)
                            item_barcode = data[i].substr(0, data[i].length - item_desc.length - 3);
                            barcodes_queue.push({'code': item_barcode, 'desc': item_desc});
                        }
                    }
                    else {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                    }

                }
                out += '</ul>';
            }
        }
        else {
            out = '<ul class="demo-list-item mdl-list">';
            $("#shopping").removeClass('empty-list');
            for (i = 0; i< data.length; i++) {
                if (data[i].indexOf(" = ") != -1) {
                    if (data[i].length - 3 == data[i].indexOf(" = ")) {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">help_outline</i>Unknown item (...'+data[i].substr(-5, 2) +')</span></li>';
                    }
                    else {
                        out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">watch_later</i>' + data[i].substr(data[i].indexOf(" = ")+3) + '</span></li>';
                        // Send an update to the server on this item
                        item_desc = data[i].substr(data[i].indexOf(" = ")+3)
                        item_barcode = data[i].substr(0, data[i].length - item_desc.length - 3);
                        barcodes_queue.push({'code': item_barcode, 'desc': item_desc});
                    }
                }
                else {
                    out += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">fiber_manual_record</i>' + data[i] + '</span></li>';
                }

            }
            out += '</ul>';
        }
    }
    else {
        $("#shopping").addClass('empty-list');
		out = '<span><i class="material-icons mdl-list__item-icon" style="position: relative; bottom: -5px; margin-right: 5px !important">done</i>Everything&rsquo;s been bought</span>';
    }

	$("#shopping .mdl-card__supporting-text").html(out);


	//displayShopping();
	document.getElementById('codefield').focus();
	console.log("Setting load list timer");
    console.log(barcodes_queue);
    if (barcodes_queue.length == 0) {
        console.log("No barcodes to save");
        clearTimeout(timer);
        timer = setTimeout(load_lists, 1000 * 10);
    }
    else {
        console.log("Barcodes to save");
        for (i=0; i<barcodes_queue.length; i++) {
            console.log(barcodes_queue[i]['code'] + ' = ' + barcodes_queue[i]['desc']);
            save_barcode(barcodes_queue[i]['code'], barcodes_queue[i]['desc']);
        }
        clearTimeout(timer);
        timer = setTimeout(load_lists, 1000 * 10);
    }
}

function save_barcode(code, desc) {
    console.log("Saving barcode to server");
    $.ajax({
        url: "/set_barcode",
        datatype: "json",
        data: {'barcode': code, 'description': desc}
    }).done(function(response) {
        resp = response.split(";");
        if (resp[0] == "Barcode saved") {
            console.log("Updating trello");
            add_remove_item(resp[2] + " = " + resp[1], refresh=false);
            add_remove_item(resp[1], refresh=false);
        }
        else {
            console.log("Barcode save failed. Wont update trello");
        }
    });
}

function add_item_to_list(item, refresh=true) {
	var newCard = {
	  name: item,
	  idList: shopping_url,
	  pos: 'top'
	};
    if (refresh) Trello.post('/cards/', newCard, load_lists);
    else Trello.post('/cards/', newCard);
}

function close_card(name, refresh=true) {
	index = -1;
	for (key in shopping_list) {
		if (name == shopping_list[key]) {
			index = key;
			break;
		}
	}
	if (index != -1) {
		if (refresh) Trello.put('/cards/'+shopping_list_ids[key], {closed: true}, load_lists);
        else Trello.put('/cards/'+shopping_list_ids[key], {closed: true});
	}
}

function archive_all() {
    url = '/lists/' + shopping_url + '/archiveAllCards';
	Trello.post(url, load_lists);
}

var counter = 0;

function add_remove_item(item, refresh=true) {
    if (shopping_list.indexOf(item) >= 0) {
    	console.log("Item already in shopping list, removing");
    	close_card(item, refresh);
    }
    else {
    	console.log("Adding item to shopping list");
    	add_item_to_list(item, refresh);
    }
}

function lookupCode(code) {
	$.ajax({
		url: "https://raw.githubusercontent.com/markjones112358/Household-Barcode-Database/master/barcodes.json?rand="+Math.random(),
		datatype: "json"
	}).done(function(tmp_data) {
		code = $("#codefield").val();
        console.log("lookupCode with " + code);
		if (code == "9410000000022") {
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
        else if (code == "") {
            display_toast_msg("Error reading barcode");
        }
		else {
			data = $.parseJSON(tmp_data);
			if (code in data) {
				console.log("Barcode resolves to " + data[code]);
			    add_remove_item(data[code]);
			}
            else {
                console.log("Unknown barcode, add to Trello")
                console.log(code);
                add_remove_item(code + " = ");
            }
		}
		$("#codefield").val('');
		document.getElementById('codefield').focus();
	});
}


function loadShopping() {
    url = '/lists/' + shopping_url + '/cards';
	Trello.get(url, run_parseShopping(), error)
}

function loadTasks() {
    url = '/lists/' + tasks_url + '/cards';
    Trello.get(url, run_parseTasks(), error)
}

function load_lists() {
	console.log("Resetting cache and loading lists");
    shopping_list = [];
    shopping_list_ids = [];
    tasks_list = [];
    loadShopping();
    loadTasks();
}

var run_parseTasks = function() {
    return function parseTasks(data, other, more) {
        for (key in data) {
            tasks_list.push(data[key]['name'])
        }
        displayTasks();
    }
}

var run_parseShopping = function() {
    return function parseShopping(data, other, more) {
        for (key in data) {
            shopping_list.push(data[key]['name'])
            shopping_list_ids.push(data[key]['id'])
        }
        displayShopping();
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
};

var authenticationFailure = function() { console.log("Failed authentication"); };

Trello.authorize({
  type: 'popup',
  name: 'homeDisplay',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});


document.getElementById('codefield').focus();



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
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(d - tzoffset)).toISOString().slice(0,-1);
  return localISOTime.substr(0,10);
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

function getCalendar() {
  console.log("Requesting calendar");
  $.ajax({
    url: "/get_calendar",
    datatype: "json"
    }).done(function(response) {
      console.log("Calendar responded");
      renderCalendar(response);
    });
}

function renderCalendar(calendarData) {
  $("#calendar").html('');
  console.log("Rendering calendar");
  // event_list = {
  //   "monthly": []
  // }
  event_list = []
  var now = new Date();

  var anniversaries = {
    "11-16": "Dave",
    "04-30": "Jason",
    "02-04": "Rob",
    "10-25": "Mark",
    "10-28": "Matthew",
    "06-23": "Sarah",
    "01-12": "Jayden",
    "12-16": "Caleb",
    "09-05": "Sally",
    "01-06": "Benji",
    "01-12": "Gina",
    "08-18": "Issac",
    "07-30": "Shae",
    "09-12": "Alistair",
    "05-04": "Jonathan",
    "07-03": "Florian",
    "01-23": "Lachlan",
    "02-21": "Anthony",
    "09-28": "Claire",
    "10-01": "Callum",
    "10-07": "Morag",
    "08-26": "Rosalie",
    "04-15": "Wedding",
    // "01-01": "New Year",
    // "12-25": "Christmas",
    // "12-26": "Boxing",
    // "02-06": "Waitangi",
    // "04-25": "Anzac",
  }
  var events = {
    "2017-04-02": "DST",
    "2018-04-01": "DST",
    "2019-04-07": "DST",
    "2020-04-05": "DST",
    "2017-04-14": "Good Fri",
    "2018-04-30": "Good Fri",
    "2019-04-19": "Good Fri",
    "2020-04-10": "Good Fri",
    "2017-04-17": "Easter Mon",
    "2018-04-02": "Easter Mon",
    "2019-04-22": "Easter Mon",
    "2020-04-13": "Easter Mon",
    "2020-04-27": "Anzac Hol",
    "2017-06-05": "Queen",
    "2018-06-04": "Queen",
    "2019-06-03": "Queen",
    "2020-06-01": "Queen",
    "2017-09-24": "DST",
    "2018-09-30": "DST",
    "2019-09-29": "DST",
    "2020-09-27": "DST",
    "2017-10-23": "Labor Day",
    "2018-10-22": "Labor Day",
    "2019-10-28": "Labor Day",
    "2020-10-26": "Labor Day",
    "2017-01-30": "Auckland",
    "2018-01-29": "Auckland",
    "2019-01-28": "Auckland",
    "2020-01-27": "Auckland",
  }
  for (var d = new Date(now.getFullYear(), now.getMonth() - 1, 1); d < new Date(now.getFullYear(), now.getMonth() + 2, 1); d.setDate(d.getDate() + 1)) {
    for (item in calendarData) {
      // console.log(calendarData[item][0], date_obj_to_str(d));
      if (calendarData[item][0] == date_obj_to_str(d)) {
        event_list.push({
          "name": calendarData[item][1],
          "startdate": date_obj_to_str(d),
          "color": "#8394C9"
        });
      }
    }
    if (d.getDay() == 3) {
      console.log(d);
      if(getWeekNumber(d) % 2 == 0) {
        event_list.push({
          "name": "Recycling",
          "startdate": date_obj_to_str(d),
          "color": "#C9B583"
        });
      }
      else {
        event_list.push({
          "name": "Rubbish",
          "startdate": date_obj_to_str(d),
          "color": "#83C9C2"
        });
      }
    }
    for (var anni in anniversaries) {
      if (date_obj_to_str(d).substr(5) == anni) {
        event_list.push({
          "name": anniversaries[anni],
          "startdate": date_obj_to_str(d),
          "color": "#8394C9"
        });
      }
    }
  }
  // $('#calendar').monthly({
  //     mode: 'event',
  //     dataType: 'json',
  //     events: event_list
  // });
  generateCalendar(event_list);
  setTimeout(getCalendar, 1000*60*5);
}

function generateCalendar(event_list) {
  var master = $('#calendar');
  today = new Date();
  today.setHours(0, 0, 0);
  startdate = new Date();
  startdate.setHours(0, 0, 0);
  out = "";
  // console.log(now.getDay());
  startdate.setDate(startdate.getDate() - 6 - startdate.getDay());


  // Make Sunday the last day of the week
  dayOrder = [1, 2, 3, 4, 5, 6, 0];


  out += '<div class="head">';
  for (daynum in dayOrder) {
    out += '<div class="day">' + days[dayOrder[daynum]].substr(0,3) + '</div>';
  }
  out += '</div>';


  for (var i=0; i<7*5; i++) {
    if (i % 7 == 0) out += '<div class="row">';
    style = "";
    if (date_obj_to_str(startdate) == date_obj_to_str(today)) {
      style = "background-color: #606060; color: #FFF;";
    }
    if (startdate.getDate() == 1) {
      style = "border-width: 0 0 1px 2px";
    }
    out += '<div class="day"';
    if (style != "") out += ' style="' + style + '"';
    out += '><span style="display: inline-block; margin: 2px 0 0 2px">' + startdate.getDate() + '</span>';
    for (event in event_list) {
      if (event_list[event]["startdate"] == date_obj_to_str(startdate)) {
        out += '<div class="event" style="background-color: '+event_list[event]["color"]+'">';
        out += event_list[event]["name"];
        out += '</div>';
      }
    }
    out += '</div>';
    if (i % 7 == 6) out += '</div>';
    startdate.setDate(startdate.getDate() + 1);
  }

  master.html(out);
}

getCalendar();
renderDate();
refreshAt(0, 0, 0);

var today = new Date();

//var from = getParameterByName('from');
//var to = getParameterByName('to');

var config = {
    format: 'yyyy-mm-dd',
    weekStartDay: 1,
    calendarWeeks: true,
    uiLibrary: 'bootstrap',
    iconsLibrary: 'fontawesome'
};

function configureHistoric () {
    config.maxDate = today;
    $('#datepickerFrom').datepicker(config);
    $('#datepickerTo').datepicker(config);

    $('#intervalsDropdown').append('<li><a onclick="thisWeek();$(\'#chartContainer\').empty();getData()" href="#">This week</a></li>');
    $('#intervalsDropdown').append('<li><a onclick="last7Days();$(\'#chartContainer\').empty();getData()" href="#">Last 7 days</a></li>');
    $('#intervalsDropdown').append('<li><a onclick="last14Days();$(\'#chartContainer\').empty();getData()" href="#">Last 14 days</a></li>');
    $('#intervalsDropdown').append('<li><a onclick="thisMonth();$(\'#chartContainer\').empty();getData()" href="#">This month</a></li>');
    $('#intervalsDropdown').append('<li><a onclick="thisYear();$(\'#chartContainer\').empty();getData()" href="#">This year</a></li>');

    if (from.length == 0)
        last14Days();
    else $('#datepickerFrom').datepicker().value(from);

    if (to.length == 0)
        to = parseDate(today);
    $('#datepickerTo').datepicker().value(to);
}

function thisWeek() {
    var monday = getPreviousMonday();
    var textDate = parseDate(monday);
    $('#datepickerFrom').datepicker().value(textDate);
}

function getPreviousMonday() {
    var day = today.getDay();
    var prevMonday;
    if(today.getDay() === 1){
        prevMonday = today;
    }
    else{
        prevMonday = new Date().setDate(today.getDate() - day + 1);
    }
    return prevMonday;
}

function parseDate(date) {
    var date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd < 10) {
        dd = '0' + dd;
    }
    if(mm < 10) {
        mm = '0' + mm;
    }

    var stringDate = yyyy + '-' + mm + '-' + dd;
    return stringDate
}

function getToday() {
    return parseDate(today);
}
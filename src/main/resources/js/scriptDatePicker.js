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

function getConfig(){
    return config;
}
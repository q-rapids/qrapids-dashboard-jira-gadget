var today = new Date();

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

function isValidDate(date) {
    var temp = date.split('-');
    var d = new Date(temp);
    var year = (d.getFullYear() == temp[0]);
    var month =  ((d.getMonth() + 1) == Number(temp[1]));
    var day = (d.getDate() == Number(temp[2]));
    return (d && year && month && day);
}

function isFromLesserEqualThanTo(from, to) {
    return from <= to;
}
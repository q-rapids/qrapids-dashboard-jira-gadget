var dataSI = [];
var dataDSI = [];
var dataQF = [];
var dataM = [];

function printCurrentTabChart(data) {
    if (data != null && dataSI == "") dataSI = data;
    console.log("**********************print_Chart***************************");
    $("#si").empty();
    drawChart(dataSI, 'si', 150, 150, false, true);
}

function printCurrentTabTable(data) {
    console.log("**********************print_Table***************************");

    $("#si").empty();

    //body reference
    var body = document.getElementById('si');

    // create elements <table> and a <tbody>
    var tbl = document.createElement("table");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Strategic Indicator");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Current Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Target Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Lower Threshold");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Upper Threshold");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");


    // cells creation
    for (var i = 0; i < dataSI.length; ++i) {
        // table row creation
        var row = document.createElement("tr");

        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataSI[i].strategicIndicatorName);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].evaluationValue);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpitarget);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpilowerThreshold);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpiupperThreshold);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
    // tbl border attribute to
    tbl.setAttribute("border", "2");
}
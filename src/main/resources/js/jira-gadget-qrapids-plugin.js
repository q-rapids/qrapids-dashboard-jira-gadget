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
    var tblBody = document.createElement("tbody");

    // cells creation
    for (var j = 0; j <= 2; j++) {
    // table row creation
    var row = document.createElement("tr");

    for (var i = 0; i < 2; i++) {
      // create element <td> and text node
      //Make text node the contents of <td> element
      // put <td> at end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode("cell is row " + j + ", column " + i);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }

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
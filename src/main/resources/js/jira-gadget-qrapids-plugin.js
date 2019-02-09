
function printCurrentChartSI(dataSI) {

    console.log("**********************print_Chart_SI***************************");
    console.log(dataSI);
    $("#si").empty();
    drawGaugeChart(dataSI, 'si', 215, 215, false, true);
}

function printCurrentTableSI(dataSI) {
    console.log("#######################print_Table_SI#######################");

    $("#si").empty();

    //body reference
    var body = document.getElementById('si');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

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
        row.setAttribute("class","th-name-si");

        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataSI[i].strategicIndicatorName);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].evaluationValue.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpitarget.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpilowerThreshold.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].kpiupperThreshold.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);
}

function printCurrentChartDSI(dataDSI) {
    console.log("**********************print_Chart_DSI***************************");
    $("#dsi").empty();

    //initialize data vectors
    var titles = [];
    var ids = [];
    var labels = [];
    var values = [];
    for (i = 0; i < dataDSI.length; ++i) {
        //for each dsi save name to titles vector and id to ids vector
        titles.push(dataDSI[i].strategicIndicatorName);
        ids.push(dataDSI[i].strategicIndicator_ID);
        labels.push([]);
        values.push([]);
        for (j = 0; j < dataDSI[i].factors.length; ++j) {
            //for each factor save name to labels vector and value to values vector
            if (dataDSI[i].factors[j].factorName.length < 27)
                labels[i].push(dataDSI[i].factors[j].factorName);
            else
                labels[i].push(dataDSI[i].factors[j].factorName.slice(0, 23) + "...");
            values[i].push(dataDSI[i].factors[j].evaluationValue);
        }
    }
    //console.log(titles);
    //console.log(ids);
    //console.log(labels);
    //console.log(values);
    drawRadarChart(titles, ids, labels, values, "dsi", true);

}

function printCurrentTableDSI(dataDSI) {

    console.log("#######################3print_Table_DSI#######################");
    console.log(dataDSI);

    $("#dsi").empty();

    //body reference
    var body = document.getElementById('dsi');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Strategic Indicator");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Factor");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Current Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");

    // cells creation
    for (var i = 0; i < dataDSI.length; ++i) {
        for (var j = 0; j < dataDSI[i].factors.length; ++j) {

            // table row creation
            var row = document.createElement("tr");
            row.setAttribute("class","th-name-si");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataDSI[i].strategicIndicatorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataDSI[i].factors[j].factorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataDSI[i].factors[j].evaluationValue.toFixed(2));
            cell.appendChild(cellText);
            row.appendChild(cell);

            //row added to end of table body
            tblBody.appendChild(row);

        }
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);

    // put <table> in the <body>
    body.appendChild(tbl);
}

function printCurrentChartQF(dataQF) {
    console.log("**********************print_Chart_QF***************************");
    $("#qf").empty();
    var titles = [];
    var ids = [];
    var labels = [];
    var values = [];
    for (i = 0; i < dataQF.length; ++i) {
        //for each dsi save name to titles vector and id to ids vector
        titles.push(dataQF[i].factorName);
        ids.push(dataQF[i].factor_ID);
        labels.push([]);
        values.push([]);
        for (j = 0; j < dataQF[i].metrics.length; ++j) {
            //for each factor save name to labels vector and value to values vector
            if (dataQF[i].metrics[j].metricName.length < 27)
                labels[i].push(dataQF[i].metrics[j].metricName);
            else
                labels[i].push(dataQF[i].metrics[j].metricName.slice(0, 23) + "...");
            values[i].push(dataQF[i].metrics[j].evaluationValue);
        }
    }
    //console.log(titles);
    //console.log(ids);
    //console.log(labels);
    //console.log(values);
    drawRadarChart(titles, ids, labels, values, "qf", false);
}

function printCurrentTableQF(dataQF) {

    console.log("#######################print_Table_QF#######################");

    $("#qf").empty();

     //body reference
    var body = document.getElementById('qf');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Factor");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Metric");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Current Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");

    // cells creation
    for (var i = 0; i < dataQF.length; ++i) {
        for (var j = 0; j < dataQF[i].metrics.length; ++j) {

            // table row creation
            var row = document.createElement("tr");
            row.setAttribute("class","th-name-si");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataQF[i].factorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataQF[i].metrics[j].metricName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataQF[i].metrics[j].evaluationValue.toFixed(2));
            cell.appendChild(cellText);
            row.appendChild(cell);

            //row added to end of table body
            tblBody.appendChild(row);

        }
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);

    // put <table> in the <body>
    body.appendChild(tbl);

}
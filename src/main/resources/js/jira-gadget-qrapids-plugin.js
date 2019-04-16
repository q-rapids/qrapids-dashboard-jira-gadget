
// SI
function printCurrentChartSI(dataSI) {
    console.log("<<<<<<< print_Current_Chart_SI");
    console.log(" ");
    $("#si").empty();
    drawGaugeChartSI(dataSI, 'si', 175, 175);
}

function printHistoricalChartSI(dataHSI, from, to){
    console.log(">>>>>>> print_Historical_Chart_SI");
    $("#si").empty();

    printDatePicker("si", from, to);

    var text = [];
    var dades = [];
    var ids = [];
    i = 0;
    var line = [];
    if (dataHSI[i]) {
        last = dataHSI[i].id;
        text.push(dataHSI[i].name);
        ids.push(dataHSI[i].id);
    }
    while (dataHSI[i]) {
        //check if we are still on the same Strategic Indicator
        if (dataHSI[i].id != last) {
            dades.push(line);
            line = [];
            last = dataHSI[i].id;
            text.push(dataHSI[i].name);
            ids.push(dataHSI[i].id);
        }
        //push date and value to line vector
        if (!isNaN(dataHSI[i].value.first)) {
            line.push({
                x: dataHSI[i].date.year + "-" + dataHSI[i].date.monthValue + "-" + dataHSI[i].date.dayOfMonth,
                y: dataHSI[i].value.first
            });
        }
        ++i;
    }
    //push line vector to values vector for the last metric
    if (dataHSI[i - 1])
        dades.push(line);

    drawLineChartM(text, ids, dades, "si");

}

function printCurrentTableSI(dataSI) {
    console.log("<<<<<<< print_Current_Table_SI") ;
    console.log(" ");
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
    cellText = document.createTextNode("Description");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Current Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Category");
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

        //Strategic Indicator
        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataSI[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Description
        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].description);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Current Value
        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].value.first.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Category
        cell = document.createElement("td");
        cellText = document.createTextNode(dataSI[i].value.second);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //row added to end of table body
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

function printHistoricalTableSI(dataHSI, from, to) {
    console.log(">>>>>>> print_Historical_Table_SI");
    $("#si").empty();


    printDatePicker('si', from, to);

    //body reference
    var body = document.getElementById('si');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Date");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Strategic Indicator");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Description");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Category");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");


    // cells creation
    for (var i = 0; i < dataHSI.length; ++i) {
        // table row creation
        var row = document.createElement("tr");
        row.setAttribute("class","th-name-si");

        //Date
        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataHSI[i].date.year + "-" + dataHSI[i].date.monthValue + "-" + dataHSI[i].date.dayOfMonth);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Strategic Indicator
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Description
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].description);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Value
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].value.first.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Category
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].value.second);
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


// DSI
function printCurrentChartDSI(dataDSI) {
    console.log("<<<<<<< print_Current_Chart_DSI");
    console.log(" ");
    $("#dsi").empty();

    //initialize data vectors
    var titles = [];
    var ids = [];
    var labels = [];
    var values = [];
    for (i = 0; i < dataDSI.length; ++i) {
        //for each dsi save name to titles vector and id to ids vector
        titles.push(dataDSI[i].name);
        ids.push(dataDSI[i].id);
        labels.push([]);
        values.push([]);
        for (j = 0; j < dataDSI[i].factors.length; ++j) {
            //for each factor save name to labels vector and value to values vector
            if (dataDSI[i].factors[j].name.length < 27)
                labels[i].push(dataDSI[i].factors[j].name);
            else
                labels[i].push(dataDSI[i].factors[j].name.slice(0, 23) + "...");
            values[i].push(dataDSI[i].factors[j].value);
        }
    }
    drawRadarChart(titles, ids, labels, values, "dsi", true);

}

function printHistoricalChartDSI(dataHDSI, from, to) {
    console.log(">>>>>>> print_Historical_Chart_DSI");
    $("#dsi").empty();

    printDatePicker('dsi', from, to);

    //initialize data vectors
    var texts = [];
    var ids = [];
    var labels = [];
    var value = [];

    for (i = 0; i < dataHDSI.length; ++i) {
        //for each dsi save name to texts vector and id to ids vector
        if (dataHDSI[i].factors.length > 0) {
            texts.push(dataHDSI[i].name);
            ids.push(dataHDSI[i].id);

            value.push([[]]);
            last = dataHDSI[i].factors[0].id;
            labels.push([dataHDSI[i].factors[0].name]);
            k = 0;
            for (j = 0; j < dataHDSI[i].factors.length; ++j) {
                //check if we are still on the same factor
                if (last != dataHDSI[i].factors[j].id) {
                    labels[i].push(dataHDSI[i].factors[j].name);
                    last = dataHDSI[i].factors[j].id;
                    ++k;
                    value[i].push([]);
                }
                //push date and value to values vector
                if (!isNaN(dataHDSI[i].factors[j].value))
                {
                    value[i][k].push(
                        {
                            x: dataHDSI[i].factors[j].formattedDate,
                            y: dataHDSI[i].factors[j].value
                        }
                    );
                }
            }
        } else {
            dataHDSI.splice(i, 1);
            --i;
        }
    }

    drawStackedLineChart(texts, ids, labels, value, "dsi");
}

function printCurrentTableDSI(dataDSI) {
    console.log("<<<<<<< print_Current_Table_DSI");
    console.log(" ");
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
            row.setAttribute("class","th-name-dsi");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataDSI[i].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataDSI[i].factors[j].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataDSI[i].factors[j].value.toFixed(2));
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

function printHistoricalTableDSI(dataHDSI, from, to) {
    console.log(">>>>>>> print_Historical_Table_DSI");
    $("#dsi").empty();

    printDatePicker('dsi', from, to);

    //body reference
    var body = document.getElementById('dsi');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Evaluation Date");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Strategic Indicator");
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
    for (var i = 0; i < dataHDSI.length; ++i) {
        for (var j = 0; j < dataHDSI[i].factors.length; ++j) {
            // table row creation
            var row = document.createElement("tr");
            row.setAttribute("class","th-name-dsi");

            //Evaluation Date
            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataHDSI[i].factors[j].formattedDate);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Strategic Indicators
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Factor
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].factors[j].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Value
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].factors[j].value.toFixed(2));
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


// QF
function printCurrentChartQF(dataQF) {
    console.log("<<<<<<< print_Current_Chart_QF");
    console.log(" ");
    $("#qf").empty();
    var titles = [];
    var ids = [];
    var labels = [];
    var values = [];
    for (i = 0; i < dataQF.length; ++i) {
        //for each dsi save name to titles vector and id to ids vector
        titles.push(dataQF[i].name);
        ids.push(dataQF[i].id);
        labels.push([]);
        values.push([]);
        for (j = 0; j < dataQF[i].metrics.length; ++j) {
            //for each factor save name to labels vector and value to values vector
            if (dataQF[i].metrics[j].name.length < 27)
                labels[i].push(dataQF[i].metrics[j].name);
            else
                labels[i].push(dataQF[i].metrics[j].name.slice(0, 23) + "...");
            values[i].push(dataQF[i].metrics[j].value);
        }
    }
    drawRadarChart(titles, ids, labels, values, "qf", false);
}

function printHistoricalChartQF(dataHQF, from, to) {
    console.log(">>>>>>> print_Historical_Chart_QF");
    $("#qf").empty();

    printDatePicker('qf', from, to);

    //initialize data vectors
    var texts = [];
    var ids = [];
    var labels = [];
    var value = [];

    for (i = 0; i < dataHQF.length; ++i) {
        //for each qf save name to texts vector and id to ids vector
        if (dataHQF[i].metrics.length > 0) {
            texts.push(dataHQF[i].name);
            ids.push(dataHQF[i].id);

            value.push([[]]);
            last = dataHQF[i].metrics[0].id;
            labels.push([dataHQF[i].metrics[0].name]);
            k = 0;
            for (j = 0; j < dataHQF[i].metrics.length; ++j) {
                //check if we are still on the same metric
                if (last != dataHQF[i].metrics[j].id) {
                    labels[i].push(dataHQF[i].metrics[j].name);
                    last = dataHQF[i].metrics[j].id;
                    ++k;
                    value[i].push([]);
                }
                //push date and value to values vector
                if (!isNaN(dataHQF[i].metrics[j].value)){
                    value[i][k].push(
                        {
                            x: dataHQF[i].metrics[j].date.year + "-" + dataHQF[i].metrics[j].date.monthValue + "-" + dataHQF[i].metrics[j].date.dayOfMonth,
                            y: dataHQF[i].metrics[j].value
                        }
                    );
                }
            }
        } else {
            dataHQF.splice(i, 1);
            --i;
        }
    }

    drawStackedLineChart(texts, ids, labels, value, "qf");
}

function printCurrentTableQF(dataQF) {
    console.log("<<<<<<< print_Current_Table_QF");
    console.log(" ");
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
    cellText = document.createTextNode("Description");
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
            row.setAttribute("class","th-name-qf");

            //Factor
            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataQF[i].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Metric
            cell = document.createElement("td");
            cellText = document.createTextNode(dataQF[i].metrics[j].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Description
            cell = document.createElement("td");
            cellText = document.createTextNode(dataQF[i].metrics[j].description);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Current Value
            cell = document.createElement("td");
            cellText = document.createTextNode(dataQF[i].metrics[j].value.toFixed(2));
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

function printHistoricalTableQF(dataHQF, from, to) {
    console.log(">>>>>>> print_Historical_Table_QF");
    $("#qf").empty();

    printDatePicker('qf', from, to);

    //body reference
    var body = document.getElementById('qf');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Date");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Factor");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Metric");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");


    // cells creation
    for (var i = 0; i < dataHQF.length; ++i) {
        for (var j = 0; j < dataHQF[i].metrics.length; ++j) {
            // table row creation
            var row = document.createElement("tr");
            row.setAttribute("class","th-name-qf");

            //Date
            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataHQF[i].metrics[j].date.year + "-" + dataHQF[i].metrics[j].date.monthValue + "-" + dataHQF[i].metrics[j].date.dayOfMonth);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Factor
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Metric
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].metrics[j].name);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //Value
            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].metrics[j].value_description);
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


// M
function printCurrentChartM(dataM) {
    console.log("<<<<<<< print_Current_Chart_M");
    console.log(" ");
    $("#m").empty();
    drawGaugeChartM(dataM, 'm', 175, 175);
}

function printHistoricalChartM(dataHM, from, to) {
    console.log(">>>>>>> print_Historical_Chart_M");
    $("#m").empty();

    printDatePicker('m', from, to);

    var lowerThres = [];
    var upperThres = [];
    var target = [];
    var text = [];
    var dades = [];
    var ids = [];
    i = 0;
    var line = [];
    if (dataHM[i]) {
        last = dataHM[i].id;
        text.push(dataHM[i].name);
    }
    while (dataHM[i]) {
        //check if we are still on the same metric
        if (dataHM[i].id != last) {
            dades.push(line);
            line = [];
            last = dataHM[i].id;
            text.push(dataHM[i].name);
        }
        //push date and value to line vector
        if (!isNaN(dataHM[i].value))
        {
            line.push({
                x: dataHM[i].date.year + "-" + dataHM[i].date.monthValue + "-" + dataHM[i].date.dayOfMonth,
                y: dataHM[i].value
            });

        }
        ++i;
    }
    //push line vector to values vector for the last metric
    if (dataHM[i - 1])
        dades.push(line);

    drawLineChartM(text, ids, dades, "m");
}

function printCurrentTableM(dataM) {
    console.log("<<<<<<< print_Current_Table_M");
    console.log(" ");
    $("#m").empty();

    //body reference
    var body = document.getElementById('m');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Metric");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Description");
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
    for (var i = 0; i < dataM.length; ++i) {
        // table row creation
        var row = document.createElement("tr");
        row.setAttribute("class","th-name-m");

        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataM[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataM[i].description);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataM[i].value.toFixed(2));
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

function printHistoricalTableM(dataHM, from, to) {
    console.log(">>>>>>> print_Historical_Table_M");
    $("#m").empty();

    printDatePicker('m', from, to);

    //body reference
    var body = document.getElementById('m');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Date");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Metric");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Description");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);


    var tblBody = document.createElement("tbody");


    // cells creation
    for (var i = 0; i < dataHM.length; ++i) {
        // table row creation
        var row = document.createElement("tr");
        row.setAttribute("class","th-name-m");

        //Date
        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataHM[i].date.year + "-" + dataHM[i].date.monthValue + "-" + dataHM[i].date.dayOfMonth);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Metric
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHM[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Description
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHM[i].description);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Value
        cell = document.createElement("td");
        cellText = document.createTextNode(dataHM[i].value_description);
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


//QR
function printTableQR(dataQR, dataIssues, atlassianBaseUrl) {
    console.log("<<<<<<< print_Table_QR >>>>>>>");
    $("#qr").empty();

     //body reference
    var body = document.getElementById('qr');

    // create elements <table> and a <tbody>
    var tbl = document.createElement('table');
    tbl.setAttribute("class","table table-hover");

    var tblhead = document.createElement("thead");
    var rowHead = document.createElement("tr");

    var cell = document.createElement("th");
    var cellText = document.createTextNode("Date");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Name");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Value");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Type");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Issue");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Summary");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Status");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    cell = document.createElement("th");
    cellText = document.createTextNode("Priority");
    cell.appendChild(cellText);
    rowHead.appendChild(cell);

    tblhead.appendChild(rowHead);
    tbl.appendChild(tblhead);

    var tblBody = document.createElement("tbody");

    // cells creation
    for (var i = 0; i < dataQR.length; ++i) {
        // table row creation
        var row = document.createElement("tr");
        row.setAttribute("class","th-name-si");

        //Date
        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataQR[i].date);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Name
        cell = document.createElement("td");
        cellText = document.createTextNode(dataQR[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Value
        cell = document.createElement("td");
        cellText = document.createTextNode(dataQR[i].value.toFixed(2));
        cell.appendChild(cellText);
        row.appendChild(cell);

        //Type
        cell = document.createElement("td");
        cellText = document.createTextNode(dataQR[i].type);
        cell.appendChild(cellText);
        row.appendChild(cell);

        // Data Issues Information
        if (i < dataIssues.length) {
            cell = document.createElement("td");
            var p = document.createElement('p');
            var a = document.createElement('a');
            a.setAttribute("class","issue-link");
            a.setAttribute("data-issue-key",dataIssues[i].key);
            a.setAttribute("href","/jira/browse/" + dataIssues[i].key);
            a.setAttribute("target","_blank");
            cellText = document.createTextNode(dataIssues[i].key);
            a.appendChild(cellText);
            p.appendChild(a);
            cell.appendChild(p);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataIssues[i].summary);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataIssues[i].status);
            cell.appendChild(cellText);
            row.appendChild(cell);

             cell = document.createElement("td");
             var img = document.createElement('img');
             img.setAttribute("src",atlassianBaseUrl + dataIssues[i].priorityIconUrl);
             img.setAttribute("height","16");
             img.setAttribute("width","16");
             img.setAttribute("border","0");
             img.setAttribute("align","absmiddle");
             cell.appendChild(img);
             row.appendChild(cell);
        }
        else {
            for (var j = 0; j < 4; ++j) {
                cell = document.createElement("td");
                cellText = document.createTextNode("-");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }

        //row added to end of table body
        tblBody.appendChild(row);
    }

    // append the <tbody> inside the <table>
    tbl.appendChild(tblBody);
    // put <table> in the <body>
    body.appendChild(tbl);

}

function printDatePicker(idDIV, from, to){
    console.log("<<<<<<< printDatePicker >>>>>>>");
    console.log(" ");
    var body = document.getElementById(idDIV);

    var divDate = document.createElement('div');
    divDate.setAttribute("class","pull-right");
    divDate.setAttribute("style","width: 100%; padding-right: 1em; padding-left: 1em;");

    var formInline = document.createElement('form');
    formInline.setAttribute("class", "form-inline well");
    formInline.setAttribute("style", "float: right");

    // 1 (Date From)
    // FORM
    var divFrom = document.createElement('div');
    divFrom.setAttribute("class","form-group");
    // LABEL
    var labelFrom = document.createElement('label');
    labelFrom.setAttribute("class","control-label");
    labelFrom.setAttribute("style","font-size: 12px");
    var fromText = document.createTextNode("From: ");
    labelFrom.appendChild(fromText);
    // DIV WRAPPER
    var divWrapperFrom = document.createElement('div');
    divWrapperFrom.setAttribute("role","wrapper");
    divWrapperFrom.setAttribute("class","gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group");
    divWrapperFrom.setAttribute("style","width: 140px; padding: 5px");
    // INPUT
    var inputFrom = document.createElement('input');
    inputFrom.setAttribute("class","form-control");
    inputFrom.setAttribute("id","id_DatePickerFrom-" + idDIV);
    inputFrom.setAttribute("placeholder","yyyy-mm-dd");
    inputFrom.setAttribute("type","text");
    inputFrom.setAttribute("style","font-size: 12px; z-index: auto; background: white");
    // SPAN
    var spanFrom = document.createElement('span');
    spanFrom.setAttribute("id","id_spanFrom");
    spanFrom.setAttribute("class","input-group-addon");
    spanFrom.setAttribute("role","right-icon");
    spanFrom.setAttribute("style","cursor: pointer; width: auto");
    // I
    var iFrom = document.createElement('i');
    iFrom.setAttribute("class", "fa fa-calendar");
    iFrom.setAttribute("aria-hidden", "true");

    spanFrom.appendChild(iFrom);

    divWrapperFrom.appendChild(inputFrom);
    divWrapperFrom.appendChild(spanFrom);

    divFrom.appendChild(labelFrom);
    divFrom.appendChild(divWrapperFrom);

    // 2 (Date To)
    // FORM
    var divTo = document.createElement('div');
    divTo.setAttribute("class","form-group");
    // LABEL
    var labelTo = document.createElement('label');
    labelTo.setAttribute("class","control-label");
    labelTo.setAttribute("style","font-size: 12px");
    var toText = document.createTextNode("To: ");
    labelTo.appendChild(toText);
    // DIV WRAPPER
    var divWrapperTo = document.createElement('div');
    divWrapperTo.setAttribute("role","wrapper");
    divWrapperTo.setAttribute("class","gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group");
    divWrapperTo.setAttribute("style","width: 140px; padding: 5px");
    // INPUT
    var inputTo = document.createElement('input');
    inputTo.setAttribute("class","form-control");
    inputTo.setAttribute("id","id_DatePickerTo-" + idDIV);
    inputTo.setAttribute("placeholder","yyyy-mm-dd");
    inputTo.setAttribute("type","text");
    inputTo.setAttribute("style","font-size: 12px; z-index: auto; background: white");
    // SPAN
    var spanTo = document.createElement('span');
    spanTo.setAttribute("id","id_spanTo");
    spanTo.setAttribute("class","input-group-addon");
    spanTo.setAttribute("role","right-icon");
    spanTo.setAttribute("style","cursor: pointer; width: auto");
    // I
    var iTo = document.createElement('i');
    iTo.setAttribute("class", "fa fa-calendar");
    iTo.setAttribute("aria-hidden", "true");

    spanTo.appendChild(iTo);

    divWrapperTo.appendChild(inputTo);
    divWrapperTo.appendChild(spanTo);

    divTo.appendChild(labelTo);
    divTo.appendChild(divWrapperTo);

    // 3
    var applyButton = document.createElement('button');
    applyButton.setAttribute("type","button");
    applyButton.setAttribute("class","btn btn-default");
    applyButton.setAttribute("id","id_applyDates");
    applyButton.setAttribute("ng-click","");
    applyButton.setAttribute("ng-init","");
    applyButton.setAttribute("style","font-size: 12px");
    var applyText = document.createTextNode("Apply");
    applyButton.appendChild(applyText);


    formInline.appendChild(divFrom);
    formInline.appendChild(divTo);

    formInline.appendChild(applyButton);

    divDate.appendChild(formInline);

    body.appendChild(divDate);

    var idActiveFrom = "id_DatePickerFrom-" + idDIV;
    var idActiveTo = "id_DatePickerTo-" + idDIV;
    document.getElementById(idActiveFrom).value = from;
    document.getElementById(idActiveTo).value = to;
}
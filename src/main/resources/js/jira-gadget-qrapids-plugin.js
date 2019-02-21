// SI
function printCurrentChartSI(dataSI) {

    console.log("**********************print_Current_Chart_SI***************************");
    console.log(dataSI);
    $("#si").empty();
    drawGaugeChart(dataSI, 'si', 175, 175, false, true);
}

function printHistoricalChartSI(dataHSI){
    console.log("**********************print_Historical_Chart_SI***************************");
    console.log(dataHSI);
    $("#si").empty();

    addDatePickerDiv("si");

    var isSI = true;
    var lowerThres = [];
    var upperThres = [];
    var target = [];
    var text = [];
    var dades = [];
    var ids = [];
    i = 0;
    var line = [];
    if (dataHSI[i]) {
        last = dataHSI[i].strategicIndicatorName;
        text.push(dataHSI[i].strategicIndicatorName);
        lowerThres.push(dataHSI[i].kpilowerThreshold);
        upperThres.push(dataHSI[i].kpiupperThreshold);
        target.push(dataHSI[i].kpitarget);
        ids.push(dataHSI[i].strategicIndicator_ID);
    }
    while (dataHSI[i]) {
        //check if we are still on the same Strategic Indicator
        if (dataHSI[i].strategicIndicatorName != last) {
            dades.push(line);
            line = [];
            last = dataHSI[i].strategicIndicatorName;
            text.push(last);
            lowerThres.push(dataHSI[i].kpilowerThreshold);
            upperThres.push(dataHSI[i].kpiupperThreshold);
            target.push(dataHSI[i].kpitarget);
            ids.push(dataHSI[i].strategicIndicator_ID);
        }
        //push date and value to line vector
        if (!isNaN(dataHSI[i].evaluationValue)) {
            line.push({
                x: dataHSI[i].evaluationDate,
                y: dataHSI[i].evaluationValue
            });
        }
        ++i;
    }
    //push line vector to values vector for the last metric
    if (dataHSI[i - 1])
        dades.push(line);

    drawLineChart(text, ids, dades, lowerThres, upperThres, target, isSI, "si");

}

function printCurrentTableSI(dataSI) {
    console.log("#######################print_Current_Table_SI#######################") ;

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

function printHistoricalTableSI(dataHSI) {
    console.log("#######################print_Historical_Table_SI#######################");
    $("#si").empty();
    //document.getElementById("si").innerHTML = "HISTORICAL TABLE SI";

    addDatePickerDiv('si');

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
    cellText = document.createTextNode("Value");
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

        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataHSI[i].evaluationDate);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].strategicIndicatorName);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataHSI[i].evaluationValue.toFixed(2));
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
    console.log("**********************print_Current_Chart_DSI***************************");
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

function printHistoricalChartDSI(dataHDSI) {
    console.log("**********************print_Historical_Chart_DSI***************************");
    $("#dsi").empty();

    addDatePickerDiv('dsi');

    //initialize data vectors
    var texts = [];
    var ids = [];
    var labels = [];
    var value = [];
    var isDSI = true;

    for (i = 0; i < dataHDSI.length; ++i) {
        //for each dsi save name to texts vector and id to ids vector
        if (dataHDSI[i].factors.length > 0) {
            texts.push(dataHDSI[i].strategicIndicatorName);
            ids.push(dataHDSI[i].strategicIndicator_ID);

            value.push([[]]);
            last = dataHDSI[i].factors[0].factorName;
            labels.push([dataHDSI[i].factors[0].factorName]);
            k = 0;
            for (j = 0; j < dataHDSI[i].factors.length; ++j) {
                //check if we are still on the same factor
                if (last != dataHDSI[i].factors[j].factorName) {
                    labels[i].push(dataHDSI[i].factors[j].factorName);
                    last = dataHDSI[i].factors[j].factorName;
                    ++k;
                    value[i].push([]);
                }
                //push date and value to values vector
                if (!isNaN(dataHDSI[i].factors[j].evaluationValue))
                {
                    value[i][k].push(
                        {
                            x: dataHDSI[i].factors[j].evaluationDate,
                            y: dataHDSI[i].factors[j].evaluationValue
                        }
                    );
                }
            }
        } else {
            dataHDSI.splice(i, 1);
            --i;
        }
    }

    drawStackedLineChart(texts, ids, labels, value, isDSI, "dsi");
}

function printCurrentTableDSI(dataDSI) {

    console.log("#######################print_Current_Table_DSI#######################");

    //console.log(dataDSI);

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

function printHistoricalTableDSI(dataHDSI) {
    console.log("#######################print_Historical_Table_DSI#######################");
    $("#dsi").empty();
    //document.getElementById("dsi").innerHTML = "HISTORICAL TABLE DSI";

    addDatePickerDiv('dsi');

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
    cellText = document.createTextNode("Value");
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
            row.setAttribute("class","th-name-si");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataHDSI[i].factors[j].evaluationDate);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].strategicIndicatorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].factors[j].factorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHDSI[i].factors[j].evaluationValue.toFixed(2));
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
    console.log("**********************print_Current_Chart_QF***************************");
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

function printHistoricalChartQF(dataHQF) {
    console.log("**********************print_Historical_Chart_QF***************************");
    $("#qf").empty();

    addDatePickerDiv('qf');

    //initialize data vectors
    var texts = [];
    var ids = [];
    var labels = [];
    var value = [];
    var isDSI = false;

    for (i = 0; i < dataHQF.length; ++i) {
        //for each qf save name to texts vector and id to ids vector
        if (dataHQF[i].metrics.length > 0) {
            texts.push(dataHQF[i].factorName);
            ids.push(dataHQF[i].factor_ID);

            value.push([[]]);
            last = dataHQF[i].metrics[0].metricName;
            labels.push([dataHQF[i].metrics[0].metricName]);
            k = 0;
            for (j = 0; j < dataHQF[i].metrics.length; ++j) {
                //check if we are still on the same metric
                if (last != dataHQF[i].metrics[j].metricName) {
                    labels[i].push(dataHQF[i].metrics[j].metricName);
                    last = dataHQF[i].metrics[j].metricName;
                    ++k;
                    value[i].push([]);
                }
                //push date and value to values vector
                if (!isNaN(dataHQF[i].metrics[j].evaluationValue)){
                    value[i][k].push(
                        {
                            x: dataHQF[i].metrics[j].evaluationDate,
                            y: dataHQF[i].metrics[j].evaluationValue
                        }
                    );
                }
            }
        } else {
            dataHQF.splice(i, 1);
            --i;
        }
    }

    drawStackedLineChart(texts, ids, labels, value, isDSI, "qf");
}

function printCurrentTableQF(dataQF) {

    console.log("#######################print_Current_Table_QF#######################");

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

function printHistoricalTableQF(dataHQF) {
    console.log("#######################print_Historical_Table_QF#######################");
    $("#qf").empty();
    //document.getElementById("qf").innerHTML = "HISTORICAL TABLE QF";

    addDatePickerDiv('qf');

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
            row.setAttribute("class","th-name-si");

            var cell = document.createElement("td");
            var cellText = document.createTextNode(dataHQF[i].metrics[j].evaluationDate);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].factorName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].metrics[j].metricName);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            cellText = document.createTextNode(dataHQF[i].metrics[j].evaluationValue.toFixed(2));
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
    console.log("**********************print_Current_Chart_M***************************");
    $("#m").empty();
    document.getElementById("m").innerHTML = "CURRENT CHART M";
}

function printHistoricalChartM(dataHM) {
    console.log("**********************print_Historical_Chart_M***************************");
    $("#m").empty();

    addDatePickerDiv('m');

    var isSI = false;
    var lowerThres = [];
    var upperThres = [];
    var target = [];
    var text = [];
    var dades = [];
    var ids = [];
    i = 0;
    var line = [];
    if (dataHM[i]) {
        last = dataHM[i].metricName;
        text.push(last);
    }
    while (dataHM[i]) {
        //check if we are still on the same metric
        if (dataHM[i].metricName != last) {
            dades.push(line);
            line = [];
            last = dataHM[i].metricName;
            text.push(last);
        }
        //push date and value to line vector
        if (!isNaN(dataHM[i].evaluationValue))
        {
            line.push({
                x: dataHM[i].evaluationDate,
                y: dataHM[i].evaluationValue
            });

        }
        ++i;
    }
    //push line vector to values vector for the last metric
    if (dataHM[i - 1])
        dades.push(line);

    drawLineChart(text, ids, dades, lowerThres, upperThres, target, isSI, "m");
}

function printCurrentTableM(dataM) {
    console.log("#######################print_Current_Table_M#######################");
    $("#m").empty();
    document.getElementById("m").innerHTML = "CURRENT TABLE M";
}

function printHistoricalTableM(dataHM) {
    console.log("#######################print_Historical_Table_M#######################");
    $("#m").empty();
    //document.getElementById("m").innerHTML = "HISTORICAL TABLE M";

    addDatePickerDiv('m');

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
        row.setAttribute("class","th-name-si");

        var cell = document.createElement("td");
        var cellText = document.createTextNode(dataHM[i].evaluationDate);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataHM[i].metricName);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(dataHM[i].evaluationValue.toFixed(2));
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


// Date picker
function addDatePickerDiv(idDIV){

    var body = document.getElementById(idDIV);

    var divDate = document.createElement('div');
    divDate.setAttribute("class","pull-right date-picker-right-position center");

    var formInline = document.createElement('form');
    formInline.setAttribute("class", "form-inline well");

    // 1
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
    inputFrom.setAttribute("id","datepickerFrom");
    inputFrom.setAttribute("width","250");
    inputFrom.setAttribute("data-type","datepicker");
    inputFrom.setAttribute("data-datepicker","true");
    inputFrom.setAttribute("role","input");
    inputFrom.setAttribute("style","font-size: 12px; z-index: auto");
    // SPAN
    var spanFrom = document.createElement('span');
    spanFrom.setAttribute("class","input-group-addon");
    spanFrom.setAttribute("role","right-icon");
    // I
    var iFrom = document.createElement('i');
    iFrom.setAttribute("class", "fa fa-calendar");
    iFrom.setAttribute("aria-hidden", "true");

    spanFrom.appendChild(iFrom);

    divWrapperFrom.appendChild(inputFrom);
    divWrapperFrom.appendChild(spanFrom);

    divFrom.appendChild(labelFrom);
    divFrom.appendChild(divWrapperFrom);

    // 2
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
    inputTo.setAttribute("id","datepickerTo");
    inputTo.setAttribute("width","250");
    inputTo.setAttribute("data-type","datepicker");
    inputTo.setAttribute("data-datepicker","true");
    inputTo.setAttribute("role","input");
    inputTo.setAttribute("style","font-size: 12px; z-index: auto");
    // SPAN
    var spanTo = document.createElement('span');
    spanTo.setAttribute("class","input-group-addon");
    spanTo.setAttribute("role","right-icon");
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
}

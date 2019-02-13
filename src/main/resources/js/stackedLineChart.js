var timeFormat = 'YYYY-MM-DD';
var config = [];

var colors = ['rgb(1, 119, 166)', 'rgb(255, 153, 51)', 'rgb(51, 204, 51)', 'rgb(255, 80, 80)', 'rgb(204, 201, 53)', 'rgb(192, 96, 201)'];

function drawStackedLineChart(texts, ids, labels, value, isDSI, idDIV) {
    config = [];
    for (var i = 0; i < texts.length; ++i) {    //create config for each chart
        var c = {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                title: {
                    display: false,
                    fontSize: 16,
                    text: texts[i]
                },
                responsive: false,
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            unit: 'day',
                            format: timeFormat,
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        },
                        ticks: {
                            max: 1,
                            min: 0
                        }
                    }]
                }
            }
        };
        for (j = 0; j < value[i].length; ++j) { //add datasets to each the config
            c.data.datasets.push({
                label: labels[i][j],
                backgroundColor: colors[j % colors.length],
                borderColor: colors[j % colors.length],
                fill: false,
                data: value[i][j],
            });
        }
        config.push(c);
    }

    for (i = 0; i < texts.length; ++i) {
        var a = document.createElement('a');
        /*
        var currentURL = window.location.href;
        if (isDSI)  //if it is a Stacked Line Chart for Detailed Strategic Indicators
            if (currentURL.match("/PredictionChart")) urlLink = "../QualityFactors/PredictionChart?id=" + ids[i] + "&name=" + texts[i];
            else urlLink = "../QualityFactors/HistoricChart?id=" + ids[i] + "&name=" + texts[i];
        else { //if it is a Stacked Line Chart for Quality Factors
            var name = getParameterByName('name');
            var id = getParameterByName('id');
            if (name.length != 0) {//if we know from which Detailed Strategic Indicator we are coming
                if (currentURL.match("/PredictionChart")) urlLink = "../Metrics/PredictionChart?id=" + ids[i] + "&si=" + name + "&siid=" + id + "&name=" + texts[i];
                else urlLink = "../Metrics/HistoricChart?id=" + ids[i] + "&si=" + name + "&siid=" + id + "&name=" + texts[i];
            }
            else {
                if (currentURL.match("/PredictionChart")) urlLink = "../Metrics/PredictionChart?id=" + ids[i] + "&name=" + texts[i];
                else urlLink = "../Metrics/HistoricChart?id=" + ids[i] + "&name=" + texts[i];
            }
        }

        var from = getParameterByName('from');
        var to = getParameterByName('to');
        if ($('#datepickerFrom').length || (from.length != 0 && to.length != 0)) {
            if ($('#datepickerFrom').length)
                urlLink = urlLink + "&from=" + $('#datepickerFrom').val() + "&to=" + $('#datepickerTo').val();
            else
                urlLink = urlLink + "&from=" + from + "&to=" + to;
        }
        */
        a.setAttribute("href", urlLink);
        a.innerHTML = texts[i];
        a.style.fontSize = "12px";
        a.style.fontWeight = "bold";
        a.style.color = "#333";
        var div = document.createElement('div');
        div.style.display = "inline-block";
        var p = document.createElement('p');
        var ctx = document.createElement('canvas');
        ctx.id = 'canvas' + i;
        ctx.width = 300;
        ctx.height = 300;
        ctx.style.display = "inline";
        ctx.style.paddingBottom = "15px";
        div.appendChild(p).appendChild(a);
        document.getElementById(idDIV).appendChild(div).appendChild(ctx);
        ctx.getContext("2d");

        window.myLine = new Chart(ctx, config[i]);  //draw chart
    }
}


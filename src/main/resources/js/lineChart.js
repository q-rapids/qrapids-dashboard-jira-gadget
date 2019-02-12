var timeFormat = 'YYYY-MM-DD';

function drawLineChart(text, ids, dades, lowerThres, upperThres, target, isSI, idDiv) {

    console.log("**********************lineChart.js:drawLineChart()***************************");

    for (i = 0; i < dades.length; ++i) {
        var a = document.createElement('a');
        /*if (isSI) {
            //if its a SI chart make it a hyperlink
            var currentURL = window.location.href;
            if (currentURL.match("/PredictionChart")) urlLink = "../DetailedStrategicIndicators/PredictionChart?id=" + ids[i] + "&name=" + text[i];
            else urlLink = "../DetailedStrategicIndicators/HistoricChart?id=" + ids[i] + "&name=" + text[i];

            //add from + to to link
            var from = getParameterByName('from');
            var to = getParameterByName('to');
            if ($('#datepickerFrom').length) {
                urlLink = urlLink + "&from=" + $('#datepickerFrom').val() + "&to=" + $('#datepickerTo').val();
            }
            a.setAttribute("href", urlLink);
        }*/
        a.innerHTML = text[i];
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
        document.getElementById(idDiv).appendChild(div).appendChild(ctx);
        ctx.getContext("2d");
        //set chart config
        var config = {
            type: 'line',
            data: {
                datasets: [{
                    label: text[i],
                    backgroundColor: 'rgb(1, 119, 166)',
                    borderColor: 'rgb(1, 119, 166)',
                    data: dades[i],
                    fill: false
                }]
            },
            options: {
                title: {
                    display: false,
                    fontSize: 16,
                    text: text[i]
                },
                responsive: false,
                legend: {
                    display: false
                },
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
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        },
                        ticks: {    //make y axis scale 0 to 1
                            max: 1.0,
                            min: 0
                        }
                    }]
                }
            }
        };

        if (isSI) {
            config.options.horizontalLine = [{
                    y: lowerThres[i],
                    style: "rgba(255, 0, 0, .4)"
                }, {
                    y: target[i],
                    style: "rgba(1, 119, 166, .4)"
                }, {
                    y: upperThres[i],
                    style: "rgba(0, 255, 0, .4)"
                }];
        }

        //draw chart
        window.myLine = new Chart(ctx, config);
    }
}


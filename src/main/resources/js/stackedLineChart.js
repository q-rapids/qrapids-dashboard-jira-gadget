var timeFormat = 'YYYY-MM-DD';
var config = [];

var colors = ['rgb(1, 119, 166)', 'rgb(255, 153, 51)', 'rgb(51, 204, 51)', 'rgb(255, 80, 80)', 'rgb(204, 201, 53)', 'rgb(192, 96, 201)'];

function drawStackedLineChart(texts, ids, labels, value, idDIV) {
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
        var div = document.createElement('div');
        div.style.display = "inline-block";
        var p = document.createElement('p');
        p.innerHTML = texts[i];
        p.style.fontSize = "12px";
        p.style.fontWeight = "bold";
        p.style.color = "#333";
        var ctx = document.createElement('canvas');
        ctx.id = 'canvas' + i;
        ctx.width = 300;
        ctx.height = 300;
        ctx.style.display = "inline";
        ctx.style.paddingBottom = "15px";
        div.appendChild(p);
        document.getElementById(idDIV).appendChild(div).appendChild(ctx);
        ctx.getContext("2d");

        window.myLine = new Chart(ctx, config[i]);  //draw chart
    }
}


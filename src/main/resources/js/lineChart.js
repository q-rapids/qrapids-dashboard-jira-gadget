var timeFormat = 'MMM-DD';

function drawLineChartSI(text, ids, dades, idDiv) {
    for (i = 0; i < dades.length; ++i) {
        var div = document.createElement('div');
        div.style.display = "inline-block";
        var p = document.createElement('p');
        p.innerHTML = text[i];
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

        //draw chart
        window.myLine = new Chart(ctx, config);
    }
}

function drawLineChartM(text, ids, dades, idDiv) {
    for (i = 0; i < dades.length; ++i) {
        if (text[i] != null) {
            var div = document.createElement('div');
            div.style.display = "inline-block";
            var p = document.createElement('p');
            p.innerHTML = text[i];
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

            //draw chart
            window.myLine = new Chart(ctx, config);
        }
    }
}
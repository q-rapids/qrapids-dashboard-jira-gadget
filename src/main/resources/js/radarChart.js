function drawRadarChart(titles, ids, labels, values, idDiv, isDSI) {
    for (i = 0; i < titles.length; ++i) {
        var div = document.createElement('div');
        div.style.display = "inline-block";
        div.style.margin = "0px 5px 15px 5px";
        var p = document.createElement('p');
        p.innerHTML = titles[i];
        p.style.fontSize = "12px";
        p.style.fontWeight = "bold";
        p.style.color = "#333";
        var ctx = document.createElement('canvas');
        ctx.id = 'canvas' + i;
        ctx.width = 300;
        ctx.height = 300;
        ctx.style.display = "inline";
        div.appendChild(p);
        document.getElementById(idDiv).appendChild(div).appendChild(ctx);
        ctx.getContext("2d");
        window.myLine = new Chart(ctx, {    //draw chart with the following config
            type: 'radar',
            data: {
                labels: labels[i],
                datasets: [{
                    label: titles[i],
                    backgroundColor: 'rgba(1, 119, 166, 0.2)',
                    borderColor: 'rgb(1, 119, 166)',
                    data: values[i],
                    fill: true
                }]
            },
            options: {
                title: {
                    display: false,
                    fontSize: 16,
                    text: titles[i]
                },
                responsive: false,
                legend: {
                    display: false
                },
                scale: {    //make y axis scale 0 to 1 and set maximum number of axis lines
                    ticks: {
                        min: 0,
                        max: 1,
                        maxTicksLimit: 5
                    }
                }
            }
        });
    }
}

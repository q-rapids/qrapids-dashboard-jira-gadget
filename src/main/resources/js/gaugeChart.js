//get data from API
var feed;

var lowThresh;
var upperThresh;
var angle;
var target;
var tau = Math.PI / 2;
var urlLink;

function drawGaugeChart(data, container, width, height) {

    //sortDataAlphabetically(data);
    var someSIhasBN = false;
    for (i = 0; i < data.length; ++i) {
        var div = document.createElement('div');
        div.id = container + "DivChart" + i;
        div.style.display = "inline-block";
        div.style.margin = "10px";
        document.getElementById(container).appendChild(div);

        //0 to 1 values to angular values
        if (data[0].hasOwnProperty("probabilities")) {
            angle = data[i].value.first * 180 + 90;
            upperThresh = 0.66 * Math.PI - Math.PI / 2;
            lowThresh = 0.33 * Math.PI - Math.PI / 2;
        }
        else{
            angle = data[i].evaluationValue * 180 + 90;
            upperThresh = data[i].kpiupperThreshold * Math.PI - Math.PI / 2;
            lowThresh = data[i].kpilowerThreshold * Math.PI - Math.PI / 2;
            target = data[i].kpitarget * Math.PI - Math.PI / 2;
        }

        //create arc starting at -90 degreees
        var arc = d3.arc()
            .innerRadius(70*width/250)
            .outerRadius(110*width/250)
            .startAngle(-tau);

        //create chart svg with hyperlink inide the "container"

        var svg = d3.select('#'+div.id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin", 5)
            .attr("class", "chart")
            .append("g")
            .attr("transform",
                "translate(" + width / 2 + "," + height / 2 + ")");

        if (data[0].hasOwnProperty("probabilities")) {
            for (j = data[i].probabilities.length - 1; j > -1; --j) {
                //draw arc from -90 to upper threshold degrees in orange
                svg.append("path")
                    .datum({endAngle: (j+1)/(data[i].probabilities.length) * Math.PI - Math.PI / 2})
                    .style("fill", data[i].probabilities[data[i].probabilities.length -1 - j].color)
                    .attr("d", arc);
            }

            //create needle
            var arc2 = d3.arc()
                .innerRadius(0)
                .outerRadius(100*width/250)
                .startAngle(-0.05)
                .endAngle(0.05);

            //draw the black needle in correct position depending on it's angle
            svg.append("path")
                .style("fill", "#000")
                .attr("d", arc2)
                .attr("transform", "translate(" + -100*width/250 * Math.cos((angle - 90) / 180 * Math.PI) + "," + -100*width/250 * Math.sin((angle - 90) / 180 * Math.PI) + ") rotate(" + angle + ")");

            //add text under the gauge with the name of the element (strategic indicator)
            svg.append("text")
                .attr("x", 0)
                .attr("y", 50*width/250)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .style("color","rgb(51, 51, 51)")
                .text(data[i].name);

            //add label under the name with the value description
            svg.append("text")
                .attr("x", 0)
                .attr("y", 50*width/250 + 30)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .style("color","rgb(51, 51, 51)")
                .text(data[i].value_description);
        }

        else {

            //create arc starting at target degreees
            var arc2 = d3.arc()
                .innerRadius(90*width/250)
                .outerRadius(110*width/250)
                .startAngle(target)
                .endAngle(target + 0.07);

            // Add target
            svg.append("path")
                .datum({endAngle: Math.PI / 2})
                .style("fill", "#000")
                .attr("d", arc2);

            //draw arc from -90 to 90 degrees in green
            svg.append("path")
                .datum({endAngle: Math.PI / 2})
                .style("fill", "#0c0")
                .attr("d", arc);

            //draw arc from -90 to upper threshold degrees in orange
            svg.append("path")
                .datum({endAngle: upperThresh})
                .style("fill", "#e90")
                .attr("d", arc);

            //draw arc from -90 to lower threshold degrees in red
            svg.append("path")
                .datum({endAngle: lowThresh})
                .style("fill", "#c00")
                .attr("d", arc);


            //create needle
            var arc2 = d3.arc()
                .innerRadius(0)
                .outerRadius(100*width/250)
                .startAngle(-0.05)
                .endAngle(0.05);

            //draw the black needle in correct position depending on it's angle
            svg.append("path")
                .style("fill", "#000")
                .attr("d", arc2)
                .attr("transform", "translate(" + -100*width/250 * Math.cos((angle - 90) / 180 * Math.PI) + "," + -100*width/250 * Math.sin((angle - 90) / 180 * Math.PI) + ") rotate(" + angle + ")");

            //create small circle at needle base
            var arc3 = d3.arc()
                .innerRadius(0)
                .outerRadius(10*width/250)
                .startAngle(0)
                .endAngle(Math.PI * 2);

            //draw the black needle base
            svg.append("path")
                .style("fill", "#000")
                .attr("d", arc3);

            //add text under the gauge with the name of the element (strategic indicator)
            svg.append("text")
                .attr("x", 0)
                .attr("y", 50*width/250)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("fill", "#000")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .style("color","rgb(1, 119, 166)")
                .text(data[i].strategicIndicatorName);

            //add label under the name with the value description
            svg.append("text")
                .attr("x", 0)
                .attr("y", 50*width/250 + 30)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("fill", "#0177a6")
                .style("font-size", "14px");
        }
    }


}
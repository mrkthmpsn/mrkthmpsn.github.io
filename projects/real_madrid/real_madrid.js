// Lemme think about what I'm going to need

// Let's start with the segmented bar chart, which seems simpler
// I'm going to need to define an svg image for each 'call' of this
// Then it'll just be a 'simple' dynamic bar chart?

async function squad_age_bar() {
    const width = 600
    const height = 400

    let svg = d3
        .select(`#graph`)
        .append(`svg`)
        .attr(`class`, `graph-svg`)
        .attr(`width`, width)
        .attr(`height`, height);

    let tooltip = d3.select("#graph")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "black");

    const showTooltip = function (pointerEvent, d) {
        console.log(pointerEvent);
        tooltip
            .transition()
            .duration(100)
        tooltip
            .style("opacity", 1)
            .html(barHoverText(d))
            .style('position', 'absolute')
            .style("left", (pointerEvent[0] + 40) + "px")
            .style("top", (pointerEvent[1] + 40) + "px")
    }
    const moveTooltip = function (pointerEvent) {
        tooltip
            .style("left", (pointerEvent[0] + 40) + "px")
            .style("top", (pointerEvent[1] + 40) + "px")
    }
    const hideTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    const margin = { top: 50, right: 20, bottom: 50, left: 20 };

    const barAreaWidth = width - margin.left - margin.right
    const barAreaHeight = height - margin.top - margin.bottom

    let barArea = svg
        .append('svg')
        .attr('class', 'bar-area-svg')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', barAreaWidth)
        .attr('height', barAreaHeight);

    // get the data
    const request = new Request("./dummy_data.json");

    const response = await fetch(request);
    const data = await response.json();

    // Ideally I'd add some kind of type-checking to the data, because this type of JSON should only ever have a length of three (pre-peak, peak, and post-peak)

    const ageColours = ["#8e8e8e", "#eb4755", "#1e1e1e"];

    // I'm definitely going to have to change the bars coordinates, because I'm going to want to leave room around the outside of the bar itself for the text to hover?

    const highlightRects = function (selection) {
        if (selection.classed("age-rect")) {
            selection.attr("class", "highlighted");
        } else {
            selection.attr("class", "age-rect");
        }

        let highlightedNumber = svg.selectAll(".highlighted").size();

        if (highlightedNumber === 0) {
            svg.selectAll(".age-rect").style("opacity", 1);
        } else {
            svg.selectAll(".age-rect").style("opacity", 0.5);

            svg.selectAll(".highlighted").style("opacity", 1);
        }
    };

    const barHoverText = function (d) {
        // What do I want this to do?

        // Order players by minutes played
        const playersObj = d["players"].sort((a, b) => parseFloat(b.minutes) - parseFloat(a.minutes));

        // So I think what this will look like will be creating an initial empty list; adding formatted html strings to that list while cycling through the `players`; then combining that list into an html string, essentially just joining them up with line breaks?

        let playersString = "";

        for (let i = 0; i < playersObj.length; i++) {
            let tempString = `<b>${playersObj[i].name} (${playersObj[i].age})</b> - ${playersObj[i].minutes} mins`
            console.log(tempString);

            playersString += "<p>" + tempString + "</p>"
        }

        // (Is that the best way of formatting this? How many players are you going to be able to list at a reasonable text size?)

        // Maybe I can write the top 5 players out and then combine the rest into a "+ X others, YYYY minutes"

        return playersString

    };

    let rectStarts = [0];

    barArea.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'age-rect')
        // Remember, x and y being 0 is relative to `barArea`, not `svg`
        .attr('x', function (d, i) {
            rectStarts.push((d["percentage"] * barAreaWidth) + rectStarts[i]);

            return rectStarts[i]
        })
        .attr('y', 0)
        .attr('width', (d) => d["percentage"] * barAreaWidth)
        .attr('height', barAreaHeight)
        // The fill should change according to the type - the easiest way of doing this might be to create a list and then cycle through that using the index of the piece of data
        .attr('fill', (d, i) => ageColours[i])
        .attr('stroke', 'black')
        .on("mouseover", function (event, d) {
            d3.select(this).call(highlightRects);

            let pointerEvent = d3.pointer(event);
            showTooltip(pointerEvent, d);
        })
        .on("mousemove", function (event, d) {
            let pointerEvent = d3.pointer(event);
            moveTooltip(pointerEvent);
        })
        .on('mouseleave', function () {
            d3.select(this).call(highlightRects);

            hideTooltip();
        });

}

squad_age_bar();
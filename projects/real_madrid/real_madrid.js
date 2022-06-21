// Lemme think about what I'm going to need

// Let's start with the segmented bar chart, which seems simpler
// I'm going to need to define an svg image for each 'call' of this
// Then it'll just be a 'simple' dynamic bar chart?

// This function needs to have some kind of way of denoting the season and attaching to a specific html div, so that it can be used multiple times in one place.
async function squad_age_bar(graphId, seasonId) {
    const width = 600;
    const height = 100;
    console.log(`#${graphId}`);
    let svg = d3
        .select(`#${graphId}`)
        .append(`svg`)
        .attr(`class`, `graph-svg`)
        .attr(`width`, width)
        .attr(`height`, height)
        .style('display', 'block')
        .style('margin', 'auto');

    let tooltip = d3.select(`#${graphId}`)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border-radius", "5px")
        .style("padding", "0px")
        .style("color", "black");

    const showTooltip = function (pointerX, pointerY, d) {
        // console.log(pointerEvent);
        

        tooltip
            .transition()
            .duration(100)
        tooltip
            .style("opacity", 1)
            .html(barHoverText(d))
            .style('position', 'absolute')
            .style("left", (pointerX + 20) + "px")
            .style("top", (pointerY - 40) + "px")
            .style("padding", "10px")
    }
    const moveTooltip = function (pointerX, pointerY) {
        tooltip
            .style('position', 'absolute')
            .style("left", (pointerX + 20) + "px")
            .style("top", (pointerY - 40) + "px")
    }
    const hideTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
            .style("padding", "0px")
    }

    const margin = { top: 25, right: 20, bottom: 25, left: 20 };

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
    const request = new Request("./dummy_data2.json");

    const response = await fetch(request);
    
    const totalData = await response.json();
    
    let dataList = []
    totalData.map(function (dataObj) {if (dataObj["season"] === seasonId) dataList.push(dataObj["data"])});
    let data = dataList[0]
    

    // Ideally I'd add some kind of type-checking to the data, because this type of JSON should only ever have a length of three (pre-peak, peak, and post-peak)

    const ageColours = ["#8e8e8e", "#eb4755", "#1e1e1e"];

    // I'm definitely going to have to change the bars coordinates, because I'm going to want to leave room around the outside of the bar itself for the text to hover?

    const highlightRects = function (selection) {
        console.log(selection);
        // let selectedObj = selection._groups[0];
        // console.log(selectedObj.parentNode.name);
        if (selection.classed("age-group")) {
            selection.attr("class", "highlighted");
        } else {
            selection.attr("class", "age-group");
        }

        let highlightedNumber = svg.selectAll(".highlighted").size();

        if (highlightedNumber === 0) {
            svg.selectAll(".age-group").style("opacity", 1);
        } else {
            svg.selectAll(".age-group").style("opacity", 0.5);

            svg.selectAll(".highlighted").style("opacity", 1);
        }
    };

    const barHoverText = function (d) {
        // Order players by minutes played
        console.log(d);
        const playersObj = d["players"].sort((a, b) => parseFloat(b.minutes) - parseFloat(a.minutes));

        let playersString = "<ul>";
        let bitPartPlayers = 0;

        // Need to make this only for players over X minutes, then count the players with fewer than that and add a "+ Y players on <X mins"
        for (let i = 0; i < playersObj.length; i++) {
            if (playersObj[i].minutes < 900) {
                bitPartPlayers += 1
            } else {
                let tempString = `<b>${playersObj[i].name} (${playersObj[i].age})</b> - ${playersObj[i].minutes} mins`
            
                playersString += `<li>${tempString}</li>`}
        }

        playersString += "</ul>"
        
        if (bitPartPlayers > 0) {playersString += `(Plus ${bitPartPlayers} on < 900 mins)`}

        return playersString

    };

    let rectStarts = [0];
    let rectWidths = [];

    // Want to add a number that sits in the middle of each bar with the percentage

    let barGroups = barArea.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'age-group');

    barGroups
        .append('rect')
        // .attr('class', 'age-rect')
        // Remember, x and y being 0 is relative to `barArea`, not `svg`
        .attr('x', function (d, i) {
            let rectWidth = (d["percentage"] * barAreaWidth);
            rectStarts.push(rectWidth + rectStarts[i]);
            rectWidths.push(rectWidth);
            return rectStarts[i]
        })
        .attr('y', 0)
        .attr('width', (d) => d["percentage"] * barAreaWidth)
        .attr('height', barAreaHeight)
        // The fill should change according to the type - the easiest way of doing this might be to create a list and then cycle through that using the index of the piece of data
        .attr('fill', (d, i) => ageColours[i])
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .on("mouseover", function (event, d) {
            d3.select(this.parentNode).call(highlightRects);

            let pointerX = event.pageX
            let pointerY = event.pageY;
            showTooltip(pointerX, pointerY, d);
        })
        .on("mousemove", function (event, d) {
            let pointerX = event.pageX
            let pointerY = event.pageY;
            moveTooltip(pointerX, pointerY);
        })
        .on('mouseleave', function () {
            d3.select(this.parentNode).call(highlightRects);

            hideTooltip();
        });

    barGroups
        .append('text')
        .attr('x', (d, i) => (rectWidths[i] / 2) + rectStarts[i])
        .attr('y', barAreaHeight / 2)
        .attr('font-weight', 700)
        .attr('font-family', 'arial')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('dy', '.1em')
        .style("stroke", "black")
        .style('fill', 'white')
        .style('stroke-width', 1.5)
        .style('font-size', '40px')
        .text((d) => `${Math.round(d["percentage"] * 100)}%`)
        .on("mouseover", function (event, d) {
            d3.select(this.parentNode).call(highlightRects);

            let pointerX = event.pageX
            let pointerY = event.pageY;
            showTooltip(pointerX, pointerY, d);
        })
        .on("mousemove", function (event, d) {
            let pointerX = event.pageX
            let pointerY = event.pageY;
            moveTooltip(pointerX, pointerY);
        })
        .on('mouseleave', function () {
            d3.select(this.parentNode).call(highlightRects);

            hideTooltip();
        });
    

}

squad_age_bar("graph-2021", 2021);
squad_age_bar("graph-2019", 2019);
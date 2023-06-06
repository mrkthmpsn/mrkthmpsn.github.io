// Chart that returns a squad age bar, divided into pre-peak/peak/post-peak
// minutes

// graphId should be the id of the div the chart will be put in
// seasonId should be an int, the key of the season
// dataPath will point to the data file
// coloursDict
// fontsDict

import * as d3 from "d3";

export async function squad_age_bar(
  graphId,
  seasonId,
  dataPath,
  coloursDict,
  fontsDict
) {
  const width = 600;
  const height = 100;

  let svg = d3
    .select(`#${graphId}`)
    .append(`svg`)
    .attr(`class`, `graph-svg`)
    // .attr(`width`, width)
    // .attr(`height`, height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("display", "block")
    .style("margin", "auto");

  // Add title and footer?
  svg
    .append("text")
    .attr("x", 5)
    .attr("y", 15)
    .style("font-family", fontsDict["header"])
    .style("color", coloursDict["text_axes"])
    .style("font-size", "16pt")
    .attr("text-anchor", "start")
    .text(`${seasonId}/${seasonId + 1}`);

  svg
    .append("text")
    .attr("x", 7)
    .attr("y", 32)
    .attr("text-anchor", "start")
    .style("font-family", fontsDict["body"])
    .style("color", coloursDict["text_axes"])
    .style("font-size", "11pt")
    .text("Hover over/tap on sections for more information");

  svg
    .append("text")
    .attr("x", width - 5)
    .attr("y", height - 2)
    .attr("text-anchor", "end")
    .style("font-family", fontsDict["body"])
    .style("color", coloursDict["text_axes"])
    .style("font-size", "8pt")
    .style("font-style", "italic")
    .text("Data from FBref.com");

  let tooltip = d3
    .select(`#${graphId}`)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "0px")
    .style("color", "black");

  const showTooltip = function (pointerX, pointerY, d) {
    // console.log(pointerEvent);
    tooltip.transition().duration(100);
    tooltip
      .style("opacity", 1)
      .html(barHoverText(d))
      .style("font-family", fontsDict["body"])
      .style("position", "absolute")
      .style("left", pointerX + 20 + "px")
      .style("top", pointerY - 40 + "px")
      .style("padding", "10px")
      .style("visibility", "visible");
  };
  const moveTooltip = function (pointerX, pointerY) {
    tooltip
      .style("position", "absolute")
      .style("left", pointerX + 20 + "px")
      .style("top", pointerY - 40 + "px")
      .style("visibility", "visible");
  };
  const hideTooltip = function (d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
      .style("padding", "0px")
      .style("visibility", "hidden");
  };

  const margin = { top: 40, right: 20, bottom: 15, left: 20 };

  const barAreaWidth = width - margin.left - margin.right;
  const barAreaHeight = height - margin.top - margin.bottom;

  let barArea = svg
    .append("svg")
    .attr("class", "bar-area-svg")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", barAreaWidth)
    .attr("height", barAreaHeight);

  // get the data
  //   const request = new Request(dataPath);
  //   const response = await fetch(dataPath);
  //   console.log("the data! the data!", response);
  const totalData = dataPath;

  let dataList = [];
  totalData.map(function (dataObj) {
    if (dataObj["season"] === seasonId) dataList.push(dataObj["data"]);
  });
  let data = dataList[0];

  // Ideally I'd add some kind of type-checking to the data, because this type of JSON should only ever have a length of three (pre-peak, peak, and post-peak)

  const ageColours = [
    coloursDict["muted_text"],
    coloursDict["highlight"],
    coloursDict["text_axes"],
  ];

  const highlightRects = function (selection) {
    // console.log(selection);
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
    // console.log(d);
    const playersObj = d["players"].sort(
      (a, b) => parseFloat(b.minutes) - parseFloat(a.minutes)
    );

    let playersString = "<ul class='in-vis'>";
    let bitPartPlayers = 0;

    // Need to make this only for players over X minutes, then count the players with fewer than that and add a "+ Y players on <X mins"
    for (let i = 0; i < playersObj.length; i++) {
      if (playersObj[i].minutes < 900) {
        bitPartPlayers += 1;
      } else {
        let tempString = `<b>${playersObj[i].name} (${playersObj[i].age})</b> - ${playersObj[i].minutes} mins`;

        playersString += `<li>${tempString}</li>`;
      }
    }

    playersString += "</ul>";

    if (bitPartPlayers > 0) {
      playersString += `(Plus ${bitPartPlayers} on < 900 mins)`;
    }

    return playersString;
  };

  let rectStarts = [0];
  let rectWidths = [];

  let barGroups = barArea
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "age-group");

  barGroups
    .append("rect")
    // Remember, x and y being 0 is relative to `barArea`, not `svg`
    .attr("x", function (d, i) {
      let rectWidth = d["percentage"] * barAreaWidth;
      rectStarts.push(rectWidth + rectStarts[i]);
      rectWidths.push(rectWidth);
      return rectStarts[i];
    })
    .attr("y", 0)
    .attr("width", (d) => d["percentage"] * barAreaWidth)
    .attr("height", barAreaHeight)
    // The fill should change according to the type - the easiest way of doing this might be to create a list and then cycle through that using the index of the piece of data
    .attr("fill", (d, i) => ageColours[i])
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .on("mouseover", function (event, d) {
      d3.select(this.parentNode).call(highlightRects);

      let pointerX = event.pageX;
      let pointerY = event.pageY;
      showTooltip(pointerX, pointerY, d);
    })
    .on("mousemove", function (event, d) {
      let pointerX = event.pageX;
      let pointerY = event.pageY;
      moveTooltip(pointerX, pointerY);
    })
    .on("mouseleave", function () {
      d3.select(this.parentNode).call(highlightRects);

      hideTooltip();
    });

  barGroups
    .append("text")
    .attr("x", (d, i) => rectWidths[i] / 2 + rectStarts[i])
    .attr("y", barAreaHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("dy", ".1em")
    .style("font-family", fontsDict["body"])
    // Not quite sure why I can't get font-weight to work but oh well
    .style("fill", "white")
    .style("stroke", "black")
    .style("stroke-width", 0.7)
    .html((d) => `${Math.round(d["percentage"] * 100)}%`)
    .style("font-size", "40px")
    .on("mouseover", function (event, d) {
      d3.select(this.parentNode).call(highlightRects);

      let pointerX = event.pageX;
      let pointerY = event.pageY;
      showTooltip(pointerX, pointerY, d);
    })
    .on("mousemove", function (event, d) {
      let pointerX = event.pageX;
      let pointerY = event.pageY;
      moveTooltip(pointerX, pointerY);
    })
    .on("mouseleave", function () {
      d3.select(this.parentNode).call(highlightRects);

      hideTooltip();
    });
}

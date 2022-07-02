// DESCRIBE WHAT THE CHART IS HERE

// graphId should be the id of the div the chart will be put in
// playersList a list of player names to be taken from the data and plotted
// dataPath will point to the data file
// coloursDict
// fontsDict

export async function playerAgeMinutes(
  graphId,
  playersList,
  dataPath,
  coloursDict,
  fontsDict
) {
  // initially draws a lot on https://observablehq.com/@d3/line-chart?collection=@d3/charts

  // get the data
  const request = new Request(dataPath);
  const response = await fetch(request);
  const totalData = await response.json();

  const selectData = totalData.filter((d) => playersList.includes(d["name"]));

  const width = 500;
  const height = 350;

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  let svg = d3
    .select(`#${graphId}`)
    .append(`svg`)
    .attr(`class`, `graph-svg`)
    .attr(`width`, width)
    .attr(`height`, height)
    .style("display", "block")
    .style("margin", "auto");

  let tooltip = d3
    .select(`#${graphId}`)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "0px")
    .style("color", coloursDict["text_axes"]);

  const showTooltip = function (pointerX, pointerY, d) {
    // console.log(pointerEvent);
    tooltip.transition().duration(100);
    tooltip
      .style("opacity", 1)
      .html(tooltipText(d))
      .style("font-family", fontsDict["body"])
      .style("position", "absolute")
      .style("left", pointerX + 20 + "px")
      .style("top", pointerY - 40 + "px")
      .style("padding", "10px");
  };
  const moveTooltip = function (pointerX, pointerY) {
    tooltip
      .style("position", "absolute")
      .style("left", pointerX + 20 + "px")
      .style("top", pointerY - 40 + "px");
  };
  const hideTooltip = function (d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
      .style("padding", "0px");
  };

  const tooltipText = function (d) {
    return `<style='font-family:${fontsDict["body"]}'>${d["season"]}<br><b>Age:</b> ${d["age"]}<br><b>Mins:</b> ${d["mins"]}</p>`;
  };

  // For X in list...
  // What do I do with these things, if there are multiple players being selected?
  // What should the behaviour be when something is selected?
  // Let's plot them each in grey to start with

  const highlightCircles = function (selection) {
    // let parentGroup = selection._groups[0][0].parentNode;

    // console.log(i);

    if (selection.classed("season-circle")) {
      selection.attr("class", "highlighted");
    } else {
      selection.attr("class", "season-circle");
    }

    let highlightedNumber = svg.selectAll(".highlighted").size();

    if (highlightedNumber === 0) {
      svg
        .selectAll(".season-circle[id='end-data']")
        .attr("r", 5)
        .attr("stroke-width", 0);

      svg
        .selectAll(".season-circle[id='data']")
        .attr("r", 3)
        .attr("stroke-width", 0);
    } else {
      svg
        .selectAll(".season-circle[id='end-data']")
        .attr("r", 5)
        .attr("stroke-width", 0);

      svg
        .selectAll(".season-circle[id='data']")
        .attr("r", 3)
        .attr("stroke-width", 0);

      svg
        .selectAll(".highlighted[id='end-data']")
        .attr("r", 6)
        .attr("stroke", coloursDict["text_axes"])
        .attr("stroke-width", 1);

      svg
        .selectAll(".highlighted[id='data']")
        .attr("r", 4)
        .attr("stroke", coloursDict["text_axes"])
        .attr("stroke-width", 1);
    }
  };

  const highlightGroups = function (selection) {
    let parentGroup = selection._groups[0][0].parentNode;

    if (parentGroup.classList.contains("player-group")) {
      parentGroup.setAttribute("class", "highlight-group");
    } else {
      parentGroup.setAttribute("class", "player-group");
    }

    let highlightedNumber = svg.selectAll(".highlight-group").size();

    if (highlightedNumber === 0) {
      svg
        .selectAll(".player-group")
        .select("path")
        .attr("stroke", coloursDict["muted_text"]);

      svg
        .selectAll(".player-group")
        .selectAll("circle")
        .attr("fill", coloursDict["muted_text"]);
    } else {
      svg
        .selectAll(".highlight-group")
        .select("path")
        .attr("stroke", coloursDict["highlight"]);

      svg
        .selectAll(".highlight-group")
        .selectAll("circle")
        .attr("fill", coloursDict["highlight"]);

      svg
        .selectAll(".player-group")
        .select("path")
        .attr("stroke", coloursDict["muted_text"]);

      svg
        .selectAll(".player-group")
        .selectAll("circle")
        .attr("fill", coloursDict["muted_text"]);
    }
  };

  // Compute values.
  // Construct scales and axes.
  const yScale = d3
    .scaleLinear()
    .domain([18, 36])
    .range([height - margin.bottom, 0 + margin.top]);

  const xScale = d3
    .scaleLinear()
    .domain([900, 4800])
    .range([0 + margin.left, width - margin.right]);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40);

  // Tick marks
  svg
    .append("g")
    .style("font-family", fontsDict["header"])
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  svg
    .append("g")
    .style("font-family", fontsDict["header"])
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - margin.left - margin.right)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
    );
  //   .text(yLabel));

  for (let playerIndex of d3.range(selectData.length)) {
    // console.log(playerData);
    let seasonsData = selectData[playerIndex]["seasons"];

    let X = d3.map(seasonsData, (d) => d["mins"]);
    let Y = d3.map(seasonsData, (d) => d["age"]);
    let I = d3.range(X.length);

    // Line generator and line
    const lineGenerator = d3
      .line()
      .curve(d3.curveLinear)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    let playerGroup = svg
      .append("g")
      .attr("class", "player-group")
      .attr("id", `group-${playerIndex}`);

    playerGroup
      .append("text")
      .attr("x", xScale(seasonsData[X.length - 1]["mins"]))
      .attr("y", yScale(seasonsData[X.length - 1]["age"]))
      .style("font-family", fontsDict["header"])
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("opacity", 0.3)
      .attr("color", coloursDict["text_axes"])
      .text(selectData[playerIndex]["name"]);

    playerGroup
      .append("path")
      .attr("fill", "none")
      .attr("stroke", coloursDict["muted_text"])
      .attr("stroke-width", 2)
      .attr("d", lineGenerator(I))
      .on("mouseover", function (event, i) {
        d3.select(this).call(highlightGroups);
      })
      .on("mouseleave", function (event, i) {
        d3.select(this).call(highlightGroups);
      });

    playerGroup
      .selectAll(`circle-${playerIndex}`)
      .data(I)
      .enter()
      .append("circle")
      .attr("class", "season-circle")
      .attr("id", (i) => (i === X.length - 1 ? "end-data" : "data"))
      .attr("cx", (i) => xScale(seasonsData[i]["mins"]))
      .attr("cy", (i) => yScale(seasonsData[i]["age"]))
      .attr("r", (i) => (i === X.length - 1 ? 5 : 3))
      .attr("fill", coloursDict["muted_text"])
      .on("mouseover", function (event, i) {
        d3.select(this).call(highlightCircles);
        d3.select(this).call(highlightGroups);

        let pointerX = event.pageX;
        let pointerY = event.pageY;
        showTooltip(pointerX, pointerY, seasonsData[i]);
      })
      .on("mousemove", function (event, d) {
        let pointerX = event.pageX;
        let pointerY = event.pageY;
        moveTooltip(pointerX, pointerY);
      })
      .on("mouseleave", function (event, i) {
        d3.select(this).call(highlightCircles);
        d3.select(this).call(highlightGroups);

        hideTooltip();
      })
      .exit()
      .remove();
  }
}

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type playerAgeMinsChartType = {
    graphId: string
    playersList: Array<string>
    receivedData: JSON
    coloursDict: Record< string, string >
    fontsDict: Record< string, string >
}

const PlayerAgeMinsChart: React.FC<playerAgeMinsChartType> = ({
    graphId,
    playersList,
    receivedData,
    coloursDict,
    fontsDict
}) => {
    
    const svgRef = useRef(null);
    
    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

    const width = 600;
    const height = 350;
    console.log('receivedata', receivedData);

    const selectData = receivedData.filter((d) => playersList.includes(d["name"]));

    const svg = svgElement
    .append(`svg`)
    .attr(`class`, `graph-svg`)
    // .attr(`width`, width)
    // .attr(`height`, height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("display", "block")
    .style("margin", "auto");

    svg
    .append("text")
    .attr("x", 5)
    .attr("y", 15)
    .style("font-family", fontsDict["header"])
    .style("color", coloursDict["text_axes"])
    .style("font-size", "16pt")
    .attr("text-anchor", "start")
    .text("Player ages vs minutes played, 2017/18-present");

  svg
    .append("text")
    .attr("x", 7)
    .attr("y", 32)
    .attr("text-anchor", "start")
    .style("font-family", fontsDict["body"])
    .style("color", coloursDict["text_axes"])
    .style("font-size", "11pt")
    .text("Hover over/tap on circles for more information");

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

  const margin = { top: 40, right: 50, bottom: 15, left: 50 };

  const chartAreaWidth = width - margin.left - margin.right;
  const chartAreaHeight = height - margin.top - margin.bottom;

  const chartArea = svg
    .append("svg")
    .attr("class", "bar-area-svg")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", chartAreaWidth)
    .attr("height", chartAreaHeight);

  const tooltip = d3
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

  const tooltipText = function (d) {
    return `<style='font-family:${fontsDict["body"]}'>${d["name"]}<br>(${
      d["season"]
    }/${d["season"] + 1})<br><b>Age:</b> ${d["age"]}<br><b>Mins:</b> ${
      d["mins"]
    }`;
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

    const highlightedNumber = svg.selectAll(".highlighted").size();

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
    const parentGroup = selection._groups[0][0].parentNode;

    if (parentGroup.classList.contains("player-group")) {
      parentGroup.setAttribute("class", "highlight-group");
    } else {
      parentGroup.setAttribute("class", "player-group");
    }

    const highlightedNumber = svg.selectAll(".highlight-group").size();

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
  const chartMargin = { top: 20, right: 20, bottom: 20, left: 20 };

  const yScale = d3
    .scaleLinear()
    .domain([18, 36])
    .range([chartAreaHeight - chartMargin.bottom, 0 + chartMargin.top]);
  // .range([chartAreaHeight, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([900, 4800])
    .range([0 + chartMargin.left, chartAreaWidth - chartMargin.right]);
  // .range([0 + margin.left, chartAreaWidth - margin.right]);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(chartAreaWidth / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(chartAreaHeight / 40);

  // Tick marks
  chartArea
    .append("g")
    .style("font-family", fontsDict["header"])
    .attr("transform", `translate(0,${chartAreaHeight - chartMargin.bottom})`)
    .call(xAxis);

  chartArea
    .append("g")
    .style("font-family", fontsDict["header"])
    .attr("transform", `translate(${chartMargin.left},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", chartAreaWidth - chartMargin.left - chartMargin.right)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -chartMargin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
    );
  //   .text(yLabel));

  for (const playerIndex of d3.range(selectData.length)) {
    // console.log(playerData);
    const seasonsData = selectData[playerIndex]["seasons"];

    const X = d3.map(seasonsData, (d) => d["mins"]);
    const Y = d3.map(seasonsData, (d) => d["age"]);
    const I = d3.range(X.length);

    // Line generator and line
    const lineGenerator = d3
      .line()
      .curve(d3.curveLinear)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    const playerGroup = chartArea
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

        const pointerX = event.pageX;
        const pointerY = event.pageY;
        showTooltip(pointerX, pointerY, seasonsData[i]);
      })
      .on("mousemove", function (event, d) {
        const pointerX = event.pageX;
        const pointerY = event.pageY;
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
    }, []);
    return (
      <div id={graphId}>
      <div ref={svgRef}></div>
      </div>
    )
}

export default PlayerAgeMinsChart
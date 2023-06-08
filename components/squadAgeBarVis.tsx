import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type SquadAgeBarVisType = {
    graphId: string
    seasonId: number
    // This shouldn't be any but I don't yet have my head around types that well
    receivedData: any
    coloursDict: Record< string, string >
    fontsDict: Record< string, string >
}

const SquadAgeBarVis: React.FC<SquadAgeBarVisType> = ({
    graphId,
  seasonId,
  receivedData,
  coloursDict,
  fontsDict}) => {


    const svgRef = useRef(null);

    useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    const width = 600;
    const height = 100;

    const svg = svgElement
    .append('svg')
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

  const tooltip = d3
    .select(`#${graphId}`)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "0px")
    .style("color", "black");

  const showTooltip = function (pointerX: number, pointerY: number, d: Record<string, any>) {
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
  const moveTooltip = function (pointerX: number, pointerY: number) {
    tooltip
      .style("position", "absolute")
      .style("left", pointerX + 20 + "px")
      .style("top", pointerY - 40 + "px")
      .style("visibility", "visible");
  };
  const hideTooltip = function () {
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

  const barArea = svg
    .append("svg")
    .attr("class", "bar-area-svg")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", barAreaWidth)
    .attr("height", barAreaHeight);

  const totalData = receivedData;
//   console.log('it be the data', totalData);
  const dataList: any[] = [];
  totalData.map(function (dataObj: Record<string, any>) {
    if (dataObj["season"] === seasonId) dataList.push(dataObj["data"]);
  });
  const data = dataList[0];
  console.log(data);
  // Ideally I'd add some kind of type-checking to the data, because this type of JSON should only ever have a length of three (pre-peak, peak, and post-peak)

  const ageColours = [
    coloursDict["muted_text"],
    coloursDict["highlight"],
    coloursDict["text_axes"],
  ];

  const highlightRects = function (selection: any) {
    // console.log(selection);
    if (selection.classed("age-group")) {
      selection.attr("class", "highlighted");
    } else {
      selection.attr("class", "age-group");
    }

    const highlightedNumber = svg.selectAll(".highlighted").size();

    if (highlightedNumber === 0) {
      svg.selectAll(".age-group").style("opacity", 1);
    } else {
      svg.selectAll(".age-group").style("opacity", 0.5);

      svg.selectAll(".highlighted").style("opacity", 1);
    }
  };

  const barHoverText = function (d: Record<string, any>) {
    // Order players by minutes played
    // console.log(d);
    const playersObj = d["players"].sort(
      (a: any, b: any) => parseFloat(b.minutes) - parseFloat(a.minutes)
    );

    let playersString = "<ul class='in-vis'>";
    let bitPartPlayers = 0;

    // Need to make this only for players over X minutes, then count the players with fewer than that and add a "+ Y players on <X mins"
    for (let i = 0; i < playersObj.length; i++) {
      if (playersObj[i].minutes < 900) {
        bitPartPlayers += 1;
      } else {
        const tempString = `<b>${playersObj[i].name} (${playersObj[i].age})</b> - ${playersObj[i].minutes} mins`;

        playersString += `<li>${tempString}</li>`;
      }
    }

    playersString += "</ul>";

    if (bitPartPlayers > 0) {
      playersString += `(Plus ${bitPartPlayers} on < 900 mins)`;
    }

    return playersString;
  };

  const rectStarts = [0];
  const rectWidths: number[] = [];

  const barGroups = barArea
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "age-group");

  barGroups
    .append("rect")
    // Remember, x and y being 0 is relative to `barArea`, not `svg`
    .attr("x", function (d: any, i) {
      const rectWidth = d["percentage"] * barAreaWidth;
      rectStarts.push(rectWidth + rectStarts[i]);
      rectWidths.push(rectWidth);
      return rectStarts[i];
    })
    .attr("y", 0)
    .attr("width", (d: any) => d["percentage"] * barAreaWidth)
    .attr("height", barAreaHeight)
    // The fill should change according to the type - the easiest way of doing this might be to create a list and then cycle through that using the index of the piece of data
    .attr("fill", (d, i) => ageColours[i])
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .on("mouseover", function (event: any, d: any) {
      d3.select(event.target.parentNode).call(highlightRects);

      const pointerX = event.pageX;
      const pointerY = event.pageY;
      showTooltip(pointerX, pointerY, d);
    })
    .on("mousemove", function (event, d) {
      const pointerX = event.pageX;
      const pointerY = event.pageY;
      moveTooltip(pointerX, pointerY);
    })
    .on("mouseleave", function (event) {
      d3.select(event.target.parentNode).call(highlightRects);

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
    .html((d: any) => `${Math.round(d["percentage"] * 100)}%`)
    .style("font-size", "40px")
    .on("mouseover", function (event: any, d: any) {
      d3.select(event.target.parentNode).call(highlightRects);

      const pointerX = event.pageX;
      const pointerY = event.pageY;
      showTooltip(pointerX, pointerY, d);
    })
    .on("mousemove", function (event, d) {
      const pointerX = event.pageX;
      const pointerY = event.pageY;
      moveTooltip(pointerX, pointerY);
    })
    .on("mouseleave", function (event:any) {
      d3.select(event.target.parentNode).call(highlightRects);

      hideTooltip();
    });

    // return () => {
    //   <div>
    //   <div ref={svgRef}></div>
    //   </div>
    // };
  }, []);


  return (
      <div id={graphId}>
      <div ref={svgRef}></div>
      </div>
    )
}

export default SquadAgeBarVis;
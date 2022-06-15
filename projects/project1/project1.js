import { get_pitch, lineColor, lineWidth, convertPitchOrientation, convertD3Coords } from "/src/pitch_utils.js"
const successfulPassColor = "#eb4755";

async function pass_map() {
    // TODO: This can be a util
    // get the data
    const request = new Request("./data.json");

    const response = await fetch(request);
    const data = await response.json();

    // marker heads variables
    const markerBoxWidth = 20;
    const markerBoxHeight = 20;
    const refX = markerBoxWidth / 2;
    const refY = markerBoxHeight / 2;
    const markerWidth = markerBoxWidth / 2;
    const markerHeight = markerBoxHeight / 2;
    const successfulPassArrowPoints = [
        [0, 0],
        [0, 20],
        [20, 10]
    ];
    const failedPassArrowPoints = [
        [10, 0],
        [10, 20],
        [15, 20],
        [15, 0]
    ];

    const orientation = "landscape"
    const [svg, pitch, orientedPitchHeight] = get_pitch("opta", orientation);

    // Create arrow marker heads (variables defined in cells below)
    svg
        .append("defs")
        .append("marker")
        .attr("id", "successful-pass")
        .attr("viewBox", [0, 0, markerBoxWidth, markerBoxHeight])
        .attr("refX", refX)
        .attr("refY", refY)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", d3.line()(successfulPassArrowPoints))
        .attr("stroke", successfulPassColor)
        .attr("fill", successfulPassColor);

    svg
        .append("defs")
        .append("marker")
        .attr("id", "failed-pass")
        .attr("viewBox", [0, 0, markerBoxWidth, markerBoxHeight])
        .attr("refX", refX)
        .attr("refY", refY)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", d3.line()(failedPassArrowPoints))
        .attr("stroke", lineColor)
        .attr("fill", lineColor);

    // Function to highlight the arrows when they're clicked
    const highlightArrows = function () {
        if (d3.select(this).classed("pass-arrow")) {
            d3.select(this).attr("class", "highlighted");
        } else {
            d3.select(this).attr("class", "pass-arrow");
        }

        let highlightedNumber = pitch.selectAll(".highlighted").size();

        if (highlightedNumber === 0) {
            pitch.selectAll(".pass-arrow").style("opacity", 1);
        } else {
            pitch.selectAll(".pass-arrow").style("opacity", 0.5);

            pitch.selectAll(".highlighted").style("opacity", 1);
        }
    };

    // Plot passes
    const pitchPassData = data
        .map(function (x) { return convertPitchOrientation(x, orientation) })
        .map(function (x) { return convertD3Coords(x, orientedPitchHeight) });

    pitch
        .append("g")
        .selectAll(".passData")
        .data(pitchPassData)
        .enter()
        .append("g")
        .attr("class", "pass-group")
        .append("path")
        .attr("class", "pass-arrow")
        .attr("d", (d) =>
            d3.line()([
                [d.start_xn, d.start_yn],
                [d.end_xn, d.end_yn]
            ])
        )
        .attr("marker-end", (d) =>
            d.outcome ? "url(#successful-pass)" : "url(#failed-pass)"
        )
        .style("stroke-width", lineWidth)
        .style("stroke", (d) => (d.outcome ? successfulPassColor : lineColor))
        .on("click", highlightArrows);
}

pass_map();

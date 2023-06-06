import * as d3 from "d3";

const pitchLength = 105;
const pitchWidth = 68;
const pitchMultiplier = 7;

export const pitchColor = "#ffffff";
export const lineColor = "#1e1e1e";

export const lineWidth = 1;

const optaPitch = {
  outside_border: {
    top_left_corner: { x: 0, y: 100 },
    top_right_corner: { x: 100, y: 100 },
    bottom_left_corner: { x: 0, y: 0 },
    bottom_right_corner: { x: 100, y: 0 },
  },
  def_18y_box: {
    top_left_corner: { x: 0, y: 78.9 },
    top_right_corner: { x: 17, y: 78.9 },
    bottom_left_corner: { x: 0, y: 21.1 },
    bottom_right_corner: { x: 17, y: 21.1 },
  },
  def_6y_box: {
    top_left_corner: { x: 0, y: 63.2 },
    top_right_corner: { x: 5.8, y: 63.2 },
    bottom_left_corner: { x: 0, y: 36.8 },
    bottom_right_corner: { x: 5.8, y: 36.8 },
  },
  att_18y_box: {
    top_left_corner: { x: 83, y: 78.9 },
    top_right_corner: { x: 100, y: 78.9 },
    bottom_left_corner: { x: 83, y: 21.1 },
    bottom_right_corner: { x: 100, y: 21.1 },
  },
  att_6y_box: {
    top_left_corner: { x: 94.2, y: 63.2 },
    top_right_corner: { x: 100, y: 63.2 },
    bottom_left_corner: { x: 94.2, y: 36.8 },
    bottom_right_corner: { x: 100, y: 36.8 },
  },

  centre_circle: { x: 50, y: 50 },
  def_pen_spot: { x: 11.5, y: 50 },
  att_pen_spot: { x: 88.5, y: 50 },
};
const wyscoutPitch = {
  outside_border: {
    top_left_corner: { x: 0, y: 100 },
    top_right_corner: { x: 100, y: 100 },
    bottom_left_corner: { x: 0, y: 0 },
    bottom_right_corner: { x: 100, y: 0 },
  },
  def_18y_box: {
    top_left_corner: { x: 0, y: 81 },
    top_right_corner: { x: 16, y: 81 },
    bottom_left_corner: { x: 0, y: 19 },
    bottom_right_corner: { x: 16, y: 19 },
  },
  def_6y_box: {
    top_left_corner: { x: 0, y: 63 },
    top_right_corner: { x: 6, y: 63 },
    bottom_left_corner: { x: 0, y: 37 },
    bottom_right_corner: { x: 6, y: 37 },
  },
  att_18y_box: {
    top_left_corner: { x: 84, y: 81 },
    top_right_corner: { x: 100, y: 81 },
    bottom_left_corner: { x: 84, y: 19 },
    bottom_right_corner: { x: 100, y: 19 },
  },
  att_6y_box: {
    top_left_corner: { x: 94, y: 63 },
    top_right_corner: { x: 100, y: 63 },
    bottom_left_corner: { x: 94, y: 37 },
    bottom_right_corner: { x: 100, y: 37 },
  },

  centre_circle: { x: 50, y: 50 },
  def_pen_spot: { x: 10, y: 50 },
  att_pen_spot: { x: 90, y: 50 },
};

export function convertPitchProportions(d) {
  let newCoords = {};
  // Anything `x` needs to be multiplied by `pitchLength`

  if ("x" in d) {
    newCoords["x"] = d["x"] * (pitchLength / 100);
  }
  if ("cx" in d) {
    newCoords["cx"] = d["cx"] * (pitchLength / 100);
  }
  if ("width" in d) {
    newCoords["width"] = d["width"] * (pitchLength / 100);
  }

  // Anything `y` needs to be multiplied by `pitchWidth`
  if ("y" in d) {
    newCoords["y"] = d["y"] * (pitchWidth / 100);
  }
  if ("cy" in d) {
    newCoords["cy"] = d["cy"] * (pitchWidth / 100);
  }
  if ("height" in d) {
    newCoords["height"] = d["height"] * (pitchWidth / 100);
  }

  // Some things should just be passed along without any changes
  if ("r" in d) {
    newCoords["r"] = d["r"];
  }
  if ("arc" in d) {
    newCoords["arc"] = d["arc"];
  }

  newCoords["color"] = d["color"];

  return newCoords;
}
export function convertPitchOrientation(d, spec_orientation) {
  let newCoords = Object.assign({}, d);

  if (spec_orientation === "portrait") {
    // Arcs have `x` and `y` attributes but no `width`
    // Because rectangles work on width and height, they have to be flipped differently to other x/y attributes(??)
    newCoords["x"] = "width" in d ? d["y"] : pitchWidth - d["y"];
    // Arcs have a `y` attribute but no `width`
    newCoords["y"] =
      "width" in d ? pitchLength - (d["x"] + d["width"]) : d["x"];
    newCoords["start_xn"] = pitchWidth - d["start_yn"];
    newCoords["start_yn"] = d["start_xn"];
    newCoords["end_xn"] = pitchWidth - d["end_yn"];
    newCoords["end_yn"] = d["end_xn"];

    newCoords["width"] = d["height"];
    newCoords["height"] = d["width"];

    newCoords["cx"] = pitchWidth - d["cy"];
    newCoords["cy"] = d["cx"];

    if ("arc" in d) {
      newCoords["arc"]["startAngle"] = d["arc"]["startAngle"] - 1.5708;
      newCoords["arc"]["endAngle"] = d["arc"]["endAngle"] - 1.5708;
    }
  }

  return newCoords;
}
export function convertD3Coords(d, orientedPitchHeight) {
  let newCoords = Object.assign({}, d);

  // All `x` needs multiplying by the `pitchMultiplier`
  if ("x" in d) {
    newCoords["x"] = d["x"] * pitchMultiplier;
  }
  if ("cx" in d) {
    newCoords["cx"] = d["cx"] * pitchMultiplier;
  }
  if ("width" in d) {
    newCoords["width"] = d["width"] * pitchMultiplier;
  }
  if ("start_xn" in d) {
    newCoords["start_xn"] = d["start_xn"] * pitchMultiplier;
  }
  if ("end_xn" in d) {
    newCoords["end_xn"] = d["end_xn"] * pitchMultiplier;
  }

  // `y` coordinates need to be taken away from the `pitchWidth` and then multiplied by `pitchMultiplier`
  if ("y" in d) {
    newCoords["y"] = (orientedPitchHeight - d["y"]) * pitchMultiplier;
  }
  if ("cy" in d) {
    newCoords["cy"] = (orientedPitchHeight - d["cy"]) * pitchMultiplier;
  }
  if ("start_yn" in d) {
    newCoords["start_yn"] =
      (orientedPitchHeight - d["start_yn"]) * pitchMultiplier;
  }
  if ("end_yn" in d) {
    newCoords["end_yn"] = (orientedPitchHeight - d["end_yn"]) * pitchMultiplier;
  }

  // SVG doesn't allow for negative height/width values. In drawing the d3 rectangles am going to have to address this
  if ("height" in d) {
    newCoords["height"] = d["height"] * pitchMultiplier;
  }

  if ("r" in d) {
    newCoords["r"] = d["r"] * pitchMultiplier;
  }
  if ("arc" in d) {
    newCoords["arc"] = {};
    newCoords["arc"]["innerRadius"] = d["arc"]["innerRadius"] * pitchMultiplier;
    newCoords["arc"]["outerRadius"] =
      d["arc"]["outerRadius"] * pitchMultiplier + lineWidth;
    newCoords["arc"]["startAngle"] = d["arc"]["startAngle"];
    newCoords["arc"]["endAngle"] = d["arc"]["endAngle"];
  }

  // Some styling should be passed along without any changes
  // newCoords["color"] = d["color"]

  return newCoords;
}

export function get_pitch(data_provider, spec_orientation) {
  // some variables and stuff

  const provider = data_provider;
  const orientation = spec_orientation;

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const orientedPitchHeight =
    orientation === "landscape" ? pitchWidth : pitchLength;
  const orientedPitchWidth =
    orientation === "landscape" ? pitchLength : pitchWidth;

  const d3Width = orientedPitchWidth * pitchMultiplier;
  const d3Height = orientedPitchHeight * pitchMultiplier;

  const pitchObj = provider === "opta" ? optaPitch : wyscoutPitch;

  function getPitchRects() {
    const rects = [];

    // outside borders
    rects.push({
      x: pitchObj.outside_border.bottom_left_corner.x,
      y: pitchObj.outside_border.bottom_left_corner.y,
      width: pitchObj.outside_border.bottom_right_corner.x,
      height: pitchObj.outside_border.top_left_corner.y,
    });
    rects.push({
      x: pitchObj.outside_border.bottom_left_corner.x,
      y: pitchObj.outside_border.bottom_left_corner.y,
      width: pitchObj.outside_border.bottom_right_corner.x / 2,
      height: pitchObj.outside_border.top_left_corner.y,
    });

    // Left-hand penalty area
    rects.push({
      x: pitchObj.def_18y_box.bottom_left_corner.x,
      y: pitchObj.def_18y_box.bottom_left_corner.y,
      width:
        pitchObj.def_18y_box.bottom_right_corner.x -
        pitchObj.def_18y_box.bottom_left_corner.x,
      height:
        pitchObj.def_18y_box.top_left_corner.y -
        pitchObj.def_18y_box.bottom_left_corner.y,
    });

    // Left-hand six-yard box
    rects.push({
      x: pitchObj.def_6y_box.bottom_left_corner.x,
      y: pitchObj.def_6y_box.bottom_left_corner.y,
      width:
        pitchObj.def_6y_box.bottom_right_corner.x -
        pitchObj.def_6y_box.bottom_left_corner.x,
      height:
        pitchObj.def_6y_box.top_left_corner.y -
        pitchObj.def_6y_box.bottom_left_corner.y,
    });

    // Right-hand penalty area
    rects.push({
      x: pitchObj.att_18y_box.bottom_left_corner.x,
      y: pitchObj.att_18y_box.bottom_left_corner.y,
      width:
        pitchObj.att_18y_box.bottom_right_corner.x -
        pitchObj.att_18y_box.bottom_left_corner.x,
      height:
        pitchObj.att_18y_box.top_left_corner.y -
        pitchObj.att_18y_box.bottom_left_corner.y,
    });

    // Right-hand six-yard box
    rects.push({
      x: pitchObj.att_6y_box.bottom_left_corner.x,
      y: pitchObj.att_6y_box.bottom_left_corner.y,
      width:
        pitchObj.att_6y_box.bottom_right_corner.x -
        pitchObj.att_6y_box.bottom_left_corner.x,
      height:
        pitchObj.att_6y_box.top_left_corner.y -
        pitchObj.att_6y_box.bottom_left_corner.y,
    });

    return rects;
  }
  function getPitchCircles() {
    const circles = [];

    // center circle
    circles.push({
      cx: pitchObj.centre_circle.x,
      cy: pitchObj.centre_circle.y,
      r: 9.15,
      color: "none",
    });
    // kick-off circle
    circles.push({
      cx: pitchObj.centre_circle.x,
      cy: pitchObj.centre_circle.y,
      r: 0.3,
      color: lineColor,
    });
    // left penalty spot
    circles.push({
      cx: pitchObj.def_pen_spot.x,
      cy: pitchObj.def_pen_spot.y,
      r: 0.3,
      color: lineColor,
    });
    // right penalty spot
    circles.push({
      cx: pitchObj.att_pen_spot.x,
      cy: pitchObj.att_pen_spot.y,
      r: 0.3,
      color: lineColor,
    });

    return circles;
  }
  function getPitchArcs() {
    const arcs = [];
    const cornerRadius = 1;
    const penaltyRadius = 9.15;
    // left top corner
    arcs.push({
      arc: {
        innerRadius: cornerRadius,
        outerRadius: cornerRadius,
        startAngle: (1 / 2) * Math.PI,
        endAngle: Math.PI,
      },
      x: pitchObj.outside_border.top_left_corner.x,
      y: pitchObj.outside_border.top_left_corner.y,
    });
    // left bottom corner
    arcs.push({
      arc: {
        innerRadius: cornerRadius,
        outerRadius: cornerRadius,
        startAngle: (1 / 2) * Math.PI,
        endAngle: 0,
      },
      x: pitchObj.outside_border.bottom_left_corner.x,
      y: pitchObj.outside_border.bottom_left_corner.y,
    });
    // right top corner
    arcs.push({
      arc: {
        innerRadius: cornerRadius,
        outerRadius: cornerRadius,
        startAngle: (3 / 2) * Math.PI,
        endAngle: Math.PI,
      },
      x: pitchObj.outside_border.top_right_corner.x,
      y: pitchObj.outside_border.top_right_corner.y,
    });
    // right bottom corner
    arcs.push({
      arc: {
        innerRadius: cornerRadius,
        outerRadius: cornerRadius,
        startAngle: 2 * Math.PI,
        endAngle: (3 / 2) * Math.PI,
      },
      x: pitchObj.outside_border.bottom_right_corner.x,
      y: pitchObj.outside_border.bottom_right_corner.y,
    });

    // left penalty arc
    arcs.push({
      arc: {
        innerRadius: penaltyRadius,
        outerRadius: penaltyRadius,
        startAngle: provider === "opta" ? 0.68 : 0.76,
        endAngle: provider === "opta" ? Math.PI - 0.68 : Math.PI - 0.76,
      },
      x: pitchObj.def_pen_spot.x,
      y: pitchObj.def_pen_spot.y,
    });
    // right penalty arc
    arcs.push({
      arc: {
        innerRadius: penaltyRadius,
        outerRadius: penaltyRadius,
        startAngle: provider === "opta" ? -0.68 : -0.76,
        endAngle: provider === "opta" ? -(Math.PI - 0.68) : -(Math.PI - 0.76),
      },
      x: pitchObj.att_pen_spot.x,
      y: pitchObj.att_pen_spot.y,
    });
    return arcs;
  }

  const currentPitchRects = getPitchRects();
  const currentPitchCircles = getPitchCircles();
  const currentPitchArcs = getPitchArcs();

  // d3 attempt
  const svg = d3
    .select(`#graph`)
    .append(`svg`)
    .attr(`class`, `graph-svg`)
    .attr(`width`, d3Width + margin.left + margin.right)
    .attr(`height`, d3Height + margin.top + margin.bottom);

  const pitch = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.right})`);

  pitch
    .append("rect")
    .attr("x", -margin.left)
    .attr("y", -margin.top)
    .attr("width", d3Width + margin.left + margin.right)
    .attr("height", d3Height + margin.top + margin.bottom)
    .style("fill", pitchColor);

  // Adding all of the basic pitch shapes
  const pitchRectsData = currentPitchRects
    .map(function (x) {
      return convertPitchProportions(x);
    })
    .map(function (x) {
      return convertPitchOrientation(x, orientation);
    })
    .map(function (x) {
      return convertD3Coords(x, orientedPitchHeight);
    });
  pitch
    .selectAll(".pitchRects")
    .data(pitchRectsData)
    .enter()
    .append("rect")
    .attr("x", (d) => d["x"])
    // Because SVG rects don't allow negative width so need to flip the pitch rectangles here
    .attr("y", (d) => orientedPitchHeight * pitchMultiplier - d["y"])
    .attr("width", (d) => d["width"])
    .attr("height", (d) => d["height"])
    .style("stroke-width", lineWidth)
    .style("stroke", lineColor)
    .style("fill", "None");

  const pitchCircleData = currentPitchCircles
    .map(function (x) {
      return convertPitchProportions(x);
    })
    .map(function (x) {
      return convertPitchOrientation(x, orientation);
    })
    .map(function (x) {
      return convertD3Coords(x, orientedPitchHeight);
    });
  pitch
    .selectAll(".pitchCircles")
    .data(pitchCircleData)
    .enter()
    .append("circle")
    .attr("cx", (d) => d["cx"])
    .attr("cy", (d) => d["cy"])
    .attr("r", (d) => d["r"])
    .style("stroke-width", lineWidth)
    .style("stroke", lineColor)
    .style("fill", (d) => d["color"]);

  const pitchArcData = currentPitchArcs
    .map(function (x) {
      return convertPitchProportions(x);
    })
    .map(function (x) {
      return convertPitchOrientation(x, orientation);
    })
    .map(function (x) {
      return convertD3Coords(x, orientedPitchHeight);
    });
  const arc = d3.arc();
  pitch
    .selectAll(".pitchCorners")
    .data(pitchArcData)
    .enter()
    .append("path")
    .attr("d", (d) => arc(d["arc"]))
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .style("fill", lineColor);

  return [svg, pitch, orientedPitchHeight];
}

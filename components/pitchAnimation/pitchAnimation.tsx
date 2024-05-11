import React, { RefObject, useEffect } from "react";
import * as d3 from "d3";
import { ObjectPosition, DefensiveBlock, teamPlayersType } from "@/data/types";
import * as d3_soccer from "d3-soccer";

// Should the pitch control info all be part of the same frame data, or supplied as separate objects?
interface PitchControlAnimationProps {
  teamAData: teamPlayersType;
  teamBData: teamPlayersType;
  rootRef: RefObject<HTMLDivElement | null>;
  index: number;
  ballData: Array<ObjectPosition | null> | null;
  defensiveBlockData: Array<DefensiveBlock | null> | null;
  possessionPhase: string | null;
}

const PitchControlAnimation: React.FC<PitchControlAnimationProps> = ({
  teamAData,
  teamBData,
  ballData,
  defensiveBlockData,
  rootRef,
  index,
  possessionPhase,
}) => {
  useEffect(() => {
    if (rootRef?.current) {
      const svgRef = d3.select(rootRef.current);
      svgRef.selectAll("*").remove();

      const containerWidth = rootRef.current.clientWidth;
      const containerHeight = containerWidth * 0.55;

      const pitch = d3_soccer.pitch().height(containerHeight);
      svgRef.call(pitch);

      if (defensiveBlockData && defensiveBlockData[index]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const defensiveBlock: DefensiveBlock = defensiveBlockData[index]!;
        svgRef
          .selectAll("#above")
          .append("rect")
          .attr("x", defensiveBlock.left)
          .attr("y", defensiveBlock.top)
          .attr("width", defensiveBlock.right - defensiveBlock.left)
          .attr("height", defensiveBlock.bottom - defensiveBlock.top)
          .style("fill", possessionPhase === "FIFATMA" ? "#bfa660" : "#899dcb")
          .style("fill-opacity", 0.3);
      }

      Object.values(teamAData).map((player) => {
        svgRef
          .select("#above")
          .append("circle")
          .attr("cx", player.positions[index].x)
          .attr("cy", player.positions[index].y)
          .attr("fill", "#5f6ca3")
          .attr("r", 1)
          .attr("id", player.id);
      });

      Object.values(teamBData).map((player) => {
        svgRef
          .select("#above")
          .append("circle")
          .attr("cx", player.positions[index].x)
          .attr("cy", player.positions[index].y)
          .attr("fill", "#bfa660")
          .attr("r", 1)
          .attr("id", player.id);
      });
      if (ballData && ballData[index]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ball: ObjectPosition = ballData[index]!;
        svgRef
          .select("#above")
          .append("circle")
          .attr("cx", ball.x)
          .attr("cy", ball.y)
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 0.5)
          .attr("r", 0.7);
      }
    }
  }, [rootRef, index, ballData]);

  return null;
};

export default PitchControlAnimation;

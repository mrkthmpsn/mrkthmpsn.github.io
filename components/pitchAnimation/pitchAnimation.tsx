import React, { useEffect } from "react";
import * as d3 from "d3";
import {
  Coordinate,
  DefensiveBlockData,
  InBlockOpportunityList,
  PlayerAnimationData,
} from "../../types/pitchControl";
import { BallPosition, DefensiveBlock } from "../../types/api";
import * as d3_soccer from "d3-soccer";

// Should the pitch control info all be part of the same frame data, or supplied as separate objects?
interface PitchControlAnimationProps {
  teamAData: PlayerAnimationData[];
  teamBData: PlayerAnimationData[];
  rootRef;
  index: number;
  ballData: Array<BallPosition | null> | null;
  defensiveBlockData: Array<DefensiveBlock | null> | null;
  inBlockOpportunitiesData: InBlockOpportunityList[];
  possessionPhase: string | null;
}

const PitchControlAnimation: React.FC<PitchControlAnimationProps> = ({
  teamAData,
  teamBData,
  ballData,
  defensiveBlockData,
  inBlockOpportunitiesData,
  rootRef,
  index,
  possessionPhase,
}) => {
  useEffect(() => {
    if (rootRef.current) {
      const svgRef = d3.select(rootRef.current);
      svgRef.selectAll("*").remove();

      const containerWidth = rootRef.current.clientWidth;
      const containerHeight = containerWidth * 0.6;

      const pitch = d3_soccer.pitch().height(containerHeight);
      svgRef.call(pitch);

      if (defensiveBlockData && defensiveBlockData[index]) {
        svgRef
          .selectAll("#above")
          .append("rect")
          .attr("x", defensiveBlockData[index].left)
          .attr("y", defensiveBlockData[index].top)
          .attr(
            "width",
            defensiveBlockData[index].right - defensiveBlockData[index].left
          )
          .attr(
            "height",
            defensiveBlockData[index].bottom - defensiveBlockData[index].top
          )
          .style("fill", possessionPhase === "FIFATMA" ? "#bfa660" : "#899dcb")
          .style("fill-opacity", 0.3);
      }

      if (inBlockOpportunitiesData[index]) {
        inBlockOpportunitiesData[index].forEach((oppData) => {
          svgRef
            .select("#above")
            .append("polygon")
            .attr("points", oppData)
            .attr("fill", "yellow")
            .attr("fill-opacity", 0.5);
        });
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
        svgRef
          .select("#above")
          .append("circle")
          .attr("cx", ballData[index].x)
          .attr("cy", ballData[index].y)
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

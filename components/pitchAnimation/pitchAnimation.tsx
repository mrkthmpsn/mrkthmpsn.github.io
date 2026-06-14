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
  const initialiseOrResize = () => {
    const svgRef = d3.select(rootRef.current);
    svgRef.selectAll("*").remove();

    if (!rootRef?.current) return;
    
    const containerWidth = rootRef.current.clientWidth;
    const containerHeight = rootRef.current.clientHeight;
    
    // Screen orientation detection
    const screenIsLandscape = containerWidth > containerHeight;
    
    let pitchHeight: number;
    
    if (screenIsLandscape) {
      // Landscape screen: pitch renders natively in landscape (no rotation)
      // Pitch length runs along containerWidth
      const maxByWidth = (containerWidth * 0.95) / 1.6;
      const maxByHeight = containerHeight * 0.95;
      pitchHeight = Math.min(maxByWidth, maxByHeight);
    } else {
      // Portrait screen: pitch rotated 90° to fit vertically
      // Pitch length runs along containerHeight
      const maxByHeight = (containerHeight * 0.95) / 1.6;
      const maxByWidth = containerWidth * 0.95;
      pitchHeight = Math.min(maxByHeight, maxByWidth);
    }

    const pitch = d3_soccer.pitch()
      .height(pitchHeight)
      .rotate(screenIsLandscape ? 0 : 90);

    svgRef.call(pitch);

    // Size SVG properly with percentage-based approach but constrain aspect ratio
    const svg = svgRef.select("svg");
    if (!svg.empty()) {
      if (screenIsLandscape) {
        // Landscape screen: no rotation, standard landscape viewBox
        svg.attr("viewBox", "-2 -2 109 72");
      } else {
        // Portrait screen: rotated 90°, swap viewBox dimensions
        svg.attr("viewBox", "-2 -2 72 109");
      }
      
      // Use percentage sizing but with strict containment
      svg
        .style("width", "100%")
        .style("height", "100%")
        .style("max-width", "100%")
        .style("max-height", "100%")
        .style("display", "block")
        .style("margin", "auto")
        .style("object-fit", "contain")
        .style("object-position", "center");
    }
  };

  useEffect(() => {
    if (rootRef?.current) {
      // Small delay to ensure container is fully rendered and sized
      const timer = setTimeout(() => {
        initialiseOrResize();
      }, 50);

      const handleResize = () => {
        setTimeout(initialiseOrResize, 10);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (rootRef?.current) {
      const svgRef = d3.select(rootRef.current);
      svgRef.select("#above").selectAll("*").remove();

      // const containerWidth = rootRef.current.clientWidth;
      // const containerHeight = containerWidth * 0.55;

      // const pitch = d3_soccer.pitch().height(containerHeight);
      // svgRef.call(pitch);

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

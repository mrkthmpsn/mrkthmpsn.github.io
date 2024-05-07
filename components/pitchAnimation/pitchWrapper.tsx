import React, { useRef } from "react";
import {
  Coordinate,
  DefensiveBlockData,
  InBlockOpportunityList,
  PitchControlFrameData,
  PlayerAnimationData,
} from "../../types/pitchControl";
import PitchControlAnimation from "./pitchAnimation";
import { BallPosition, DefensiveBlock } from "../../types/api";

interface PitchAnimationWrapperProps {
  pitchControlData: PitchControlFrameData[] | null;
  teamAData: PlayerAnimationData[];
  teamBData: PlayerAnimationData[];
  ballData: Array<BallPosition | null> | null;
  index: number;
  defensiveBlockData: Array<DefensiveBlock | null> | null;
  inBlockOpportunitiesData: InBlockOpportunityList[];
  possessionPhase: string | null;
}
const PitchWrapper: React.FC<PitchAnimationWrapperProps> = ({
  teamAData,
  teamBData,
  ballData,
  defensiveBlockData,
  inBlockOpportunitiesData,
  index,
  possessionPhase,
}) => {
  const rootRef = useRef<SVGSVGElement | null>(null);

  return (
    <>
      <div style={{ position: "relative", height: "100%" }}>
        <div
          id="animation-container"
          className="grid grid-cols-1 justify-items-center"
          ref={rootRef}
        >
          <PitchControlAnimation
            teamAData={teamAData}
            teamBData={teamBData}
            ballData={ballData}
            defensiveBlockData={defensiveBlockData}
            inBlockOpportunitiesData={inBlockOpportunitiesData}
            rootRef={rootRef}
            index={index}
            possessionPhase={possessionPhase}
          />
        </div>
      </div>
    </>
  );
};

export default PitchWrapper;

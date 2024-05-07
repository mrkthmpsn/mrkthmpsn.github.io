import React, { useRef } from "react";

import PitchControlAnimation from "./pitchAnimation";
import { ObjectPosition, DefensiveBlock, teamPlayersType } from "@/data/types";

interface PitchAnimationWrapperProps {
  teamAData: teamPlayersType;
  teamBData: teamPlayersType;
  ballData: Array<ObjectPosition | null> | null;
  index: number;
  defensiveBlockData: Array<DefensiveBlock | null> | null;
  possessionPhase: string | null;
}
const PitchWrapper: React.FC<PitchAnimationWrapperProps> = ({
  teamAData,
  teamBData,
  ballData,
  defensiveBlockData,
  index,
  possessionPhase,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

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

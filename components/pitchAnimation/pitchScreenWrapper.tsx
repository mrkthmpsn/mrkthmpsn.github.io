import { useEffect, useState } from "react";
import PitchWrapper from "./pitchWrapper";
import React from "react";
import VideoScrubber from "./basicScrubber";
import {
  ObjectPosition,
  DefensiveBlock,
  teamPlayersType,
  FramesDataType,
} from "@/data/types";
import { framesData } from "@/data/framesData";
import "@/app/pages-styles.css";

const PitchScreenWrapper = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);

  const totalFrames = 120;

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setFrameIndex((currentIndex) => (currentIndex + 1) % totalFrames);
      }, (1 / (25 / 12)) * 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const convertPlayersData = (framesData: FramesDataType, teamName: string) => {
    const teamPlayersResult: teamPlayersType = {};

    // Iterate over each key in the main data object
    for (const key in framesData) {
      const playersObject = framesData[key].players;

      const teamPlayers = playersObject.filter(
        (player) => player.team === teamName
      );
      // Iterate over each player in the players object
      for (const playerID in teamPlayers) {
        const playerData = teamPlayers[playerID];

        if (!teamPlayersResult[playerID]) {
          teamPlayersResult[playerID] = {
            id: playerID,
            shirtNumber: playerData.shirt_number,
            positions: [],
          };
        }
        // Add the position to the array of positions
        teamPlayersResult[playerID].positions.push({
          x: playerData.x,
          y: playerData.y,
        });
      }
    }
    return teamPlayersResult;
  };

  const [wrapperPitchControl, setWrapperPitchControl] = useState(null);
  const [wrapperTeamA, setWrapperTeamA] = useState({});
  const [wrapperTeamB, setWrapperTeamB] = useState({});
  const [wrapperBallPosition, setWrapperBallPosition] =
    useState<Array<ObjectPosition | null> | null>(null);
  const [wrapperDefensiveBlock, setWrapperDefensiveBlock] =
    useState<Array<DefensiveBlock | null> | null>(null);

  useEffect(() => {
    const wrapperTeamA = framesData
      ? convertPlayersData(framesData, "FIFATMA")
      : {};
    const wrapperTeamB = framesData
      ? convertPlayersData(framesData, "FIFATMB")
      : {};
    const wrapperBallPosition = framesData
      ? Object.values(framesData).map((frame) => {
          return frame.ball_position;
        })
      : null;
    const wrapperDefensiveBlock = framesData
      ? Object.values(framesData).map((frame) => {
          return frame.defensive_block;
        })
      : null;

    setWrapperPitchControl(wrapperPitchControl);
    setWrapperTeamA(wrapperTeamA);
    setWrapperTeamB(wrapperTeamB);
    setWrapperBallPosition(wrapperBallPosition);
    setWrapperDefensiveBlock(wrapperDefensiveBlock);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col h-full">
        {/* <div className="flex items-center justify-center space-x-4 mb-4 flex-shrink-0">
          <button 
            onClick={togglePlayPause}
            className="px-4 py-2 bg-brandLightBlue-200 rounded text-sm md:text-base"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <VideoScrubber
            min={0}
            max={totalFrames}
            onChange={setFrameIndex}
            currentIndex={frameIndex}
          />
        </div> */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <PitchWrapper
            teamAData={wrapperTeamA}
            teamBData={wrapperTeamB}
            ballData={wrapperBallPosition}
            defensiveBlockData={wrapperDefensiveBlock}
            index={frameIndex}
            possessionPhase={
              framesData
                ? Object.values(framesData)[frameIndex].possession_phase
                : null
            }
          />
        </div>
        <p className="text-[10px] text-right italic mt-1 flex-shrink-0 text-gray-400">
          Animation using{" "}
          <a href="https://github.com/metrica-sports/sample-data">
            Metrica Sports data
          </a>{" "}
          &{" "}
          <a href="https://github.com/probberechts/d3-soccer">
            d3-soccer
          </a>
        </p>
      </div>
    </>
  );
};

export default PitchScreenWrapper;

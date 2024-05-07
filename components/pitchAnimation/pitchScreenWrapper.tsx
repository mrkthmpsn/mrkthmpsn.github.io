import { useEffect, useState, Dispatch, SetStateAction } from "react";
import PitchWrapper from "./pitchWrapper";
import React from "react";
import VideoScrubber from "./basicScrubber";
import { BallPosition, DefensiveBlock } from "@/data/types";
import { framesData } from "@/data/framesData";
import "@/app/pages-styles.css";

const PitchScreenWrapper = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);

  const totalFrames = 120;

  useEffect(() => {
    let intervalId;
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

  const convertPlayersData = (framesData, teamName) => {
    let teamPlayersResult = {};

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
    useState<Array<BallPosition | null> | null>(null);
  const [wrapperDefensiveBlock, setWrapperDefensiveBlock] =
    useState<Array<DefensiveBlock | null> | null>(null);
  const [wrapperInBlockOpportunities, setWrapperInBlockOpportunities] =
    useState([]);
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
    const wrapperInBlockOpportunities = framesData
      ? Object.values(framesData).map((frame) => {
          return frame.in_block_opportunities;
        })
      : [];
    setWrapperPitchControl(wrapperPitchControl);
    setWrapperTeamA(wrapperTeamA);
    setWrapperTeamB(wrapperTeamB);
    setWrapperBallPosition(wrapperBallPosition);
    setWrapperDefensiveBlock(wrapperDefensiveBlock);
    setWrapperInBlockOpportunities(wrapperInBlockOpportunities);
  }, [framesData]);

  return (
    <>
      <div className="col-span-2">
        <div className="grid grid-cols-3 space-x-4 items-center">
          <div className="col-span-1 justify-self-end rounded-full text-xs md:text-sm lg:text-base">
            <button onClick={togglePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
          <VideoScrubber
            min={0}
            max={totalFrames}
            onChange={setFrameIndex}
            currentIndex={frameIndex}
          />
        </div>
        <PitchWrapper
          teamAData={wrapperTeamA}
          teamBData={wrapperTeamB}
          ballData={wrapperBallPosition}
          defensiveBlockData={wrapperDefensiveBlock}
          inBlockOpportunitiesData={wrapperInBlockOpportunities}
          index={frameIndex}
          possessionPhase={
            framesData
              ? Object.values(framesData)[frameIndex].possession_phase
              : null
          }
        />
        <p className="text-xs text-right italic">
          Animation using{" "}
          <a href="https://github.com/metrica-sports/sample-data">
            Metrica Sports data
          </a>{" "}
          and{" "}
          <a href="https://github.com/probberechts/d3-soccer">
            d3-soccer package
          </a>
        </p>
      </div>
    </>
  );
};

export default PitchScreenWrapper;

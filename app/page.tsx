"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "@/components/navbar";
import PitchScreenWrapper from "@/components/pitchAnimation/pitchScreenWrapper";
import { TimingTowerSystem } from "@/components/timingTower";
import "./globals.css";

const HomePage = () => {
  return (
    <>
      <CustomNavbar transparent />
      <div className="w-full h-screen relative">
        {/* Pitch layer */}
        <div className="absolute inset-0 px-[1rem] pb-[1rem] pt-[4.5rem] md:pt-20 pointer-events-none">
          <div className="w-full h-full max-w-6xl mx-auto saturate-50 opacity-80">
            <PitchScreenWrapper />
          </div>
        </div>

        {/* Overlay: timing tower with drop shadow */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start px-[1rem] pt-[4.5rem] md:pt-20 md:pl-8 lg:pl-16 z-10 pointer-events-none">
          <div className="flex flex-col items-start drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
            <TimingTowerSystem />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "@/components/navbar";
import PitchScreenWrapper from "@/components/pitchAnimation/pitchScreenWrapper";
import HomePageMenuSystem from "@/components/homePageMenuSystem";
import "./globals.css";

const HomePage = () => {
  return (
    <>
      <CustomNavbar />
      <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="flex-1 flex items-center justify-center p-4 min-h-0 relative">
          <div className="w-full max-w-6xl mx-auto h-full">
            <PitchScreenWrapper />
          </div>

          {/* Subtle dimming overlay to soften pitch animation */}
          <div className="absolute inset-0 bg-white bg-opacity-10 z-[5] pointer-events-none" />

          {/* Overlay menu with name and container */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-start">
              <span className="text-sm md:text-base font-['Roboto_Slab'] text-brandLightBlue-700 tracking-wide uppercase ml-3 mb-1">
                THE <span className="font-bold">MARK THOMPSON</span> PORTFOLIO
              </span>
              <div className="bg-[rgba(255,255,255,0.3)] rounded-2xl shadow-lg px-6 py-3 md:px-8 md:py-4">
                <HomePageMenuSystem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

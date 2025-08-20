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
      <div className="w-full flex flex-col style={{ height: 'calc(100vh - 120px)' }}">
        <div className="flex-1 flex items-center justify-center p-4 min-h-0 relative">
          <div className="w-full max-w-6xl mx-auto h-full">
            <PitchScreenWrapper />
          </div>
          
          {/* Overlay menu buttons */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <HomePageMenuSystem />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

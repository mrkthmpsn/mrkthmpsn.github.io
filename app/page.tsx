"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "@/components/navbar";
import PitchScreenWrapper from "@/components/pitchAnimation/pitchScreenWrapper";
import "./globals.css";
import { BeakerIcon } from "@heroicons/react/24/solid";
import {
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <>
      <CustomNavbar />
      <div className="w-10/12 m-auto space-y-8 md:space-y-16">
        <div className="w-3/5 md:w-3/5 mx-auto mt-4 md:mt-8 text-left md:text-center text-4xl md:text-5xl lg:text-6xl font-['Roboto_Slab'] relative">
          <span className="inline-block"></span>
          <span className="bg-brandStraw-200 w-full h-full absolute left-0 top-0 z-0 origin-center -rotate-2"></span>
          <span className="z-10 relative">
            Mark
            <span className="font-bold tracking-wide"> Thompson</span>
          </span>
        </div>
        <div className="grid grid-cols-6 grid-rows-2 mt-16 md:mt-2">
          <div className="col-span-2 md:col-span-3 row-span-1 md:mt-4">
            <div className="flex flex-wrap items-center justify-start md:gap-x-8 md:justify-around font-normal text-sm md:text-base lg:text-lg">
              <p className="mb-2 leading-tight">
                <span className="text-gray-500">Python </span>
                developer
              </p>
              <p className="mb-2 leading-tight">
                <span className="text-gray-500">Product </span>
                developer
              </p>
              <p className="mb-2 leading-tight">
                <span className="text-gray-500">Data </span>
                unlocker
              </p>
            </div>
            <div className="flex md:w-3/5 mx-auto lg:mt-2 pt-2 md:pt-8 flex-wrap md:grow gap-x-4 md:gap-x-8 md:gap-y-2 md:text-center justify-center text-xs md:text-base italic md:not-italic text-brandStraw-500">
              <p>Python</p>
              <p>Django</p>
              <p>SQL</p>
              <p>Docker</p>
              <p>AWS</p>
              <p>React</p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 row-span-1 md:row-span-2">
            <PitchScreenWrapper />
          </div>
          <div className="col-span-6 md:col-span-3 row-span-1 mt-8 space-y-4 lg:space-y-6 uppercase text-base md:text-lg lg:text-xl">
            <div className="flex space-x-2 justify-center items-center">
              <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
              <p className="m-0">
                <a href="/about"> About </a>
              </p>
              <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
            </div>
            <div className="flex space-x-2 justify-center items-center">
              <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
              <p className="m-0">
                <a href="/projects"> Projects </a>
              </p>
              <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
            </div>
            <div className="flex space-x-2 justify-center items-center">
              <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
              <p className="m-0">
                <a href="/contact"> Contact </a>
              </p>
              <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

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
      <div className="w-10/12 mx-auto md:my-4">
        <div className="w-3/5 md:w-3/5 mx-auto mt-4 md:!mt-8 text-left md:text-center text-4xl md:text-5xl lg:text-6xl font-['Roboto_Slab'] relative">
          <span className="inline-block"></span>
          <span className="bg-brandStraw-200 w-full h-full absolute left-0 top-0 z-0 origin-center -rotate-2"></span>
          <span className="z-10 relative">
            Mark
            <span className="font-bold tracking-wide"> Thompson</span>
          </span>
        </div>
        <div className="grid grid-cols-6 grid-rows-6 mt-8 md:mt-8">
          <div className="col-span-6 row-span-1 md:row-span-1 content-center px-2">
            <div className="flex flex-wrap items-center gap-x-8 justify-around font-normal text-sm md:text-base lg:text-lg md:w-4/5 lg:w-3/4 mx-auto">
              <p className="mb-2 leading-tight text-gray-700">
                <span className="text-brandStraw-600">Python </span>
                developer
              </p>
              <p className="mb-2 leading-tight text-gray-700">
                <span className="text-brandStraw-600">Product </span>
                developer
              </p>
              <p className="mb-2 leading-tight text-gray-700">
                <span className="text-brandStraw-600">Data </span>
                unlocker
              </p>
            </div>
            <div className="flex md:w-3/4 mx-auto lg:mt-2 pt-2 md:pt-8 flex-wrap md:grow gap-x-4 md:gap-x-8 md:gap-y-2 md:text-center justify-center text-xs md:text-sm lg:text-base italic md:not-italic text-gray-500">
              <p>Python</p>
              <p>Django</p>
              <p>SQL</p>
              <p>Docker</p>
              <p>AWS</p>
              <p>React</p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 row-span-3 md:col-start-3 md:row-span-5 mt-4 md:mt-0">
            <PitchScreenWrapper />
          </div>
          <div
            id="homepage-links"
            className="col-span-6 md:col-span-2 row-span-2 md:row-span-4 md:row-start-2 mt-8 md:mt-4 md:flex md:flex-wrap md:grow space-y-4 md:gap-x-8 md:space-y-0 md:gap-y-4 md:justify-center text-base md:text-lg lg:text-xl bg-white md:bg-white content-center  md:sticky md:top-40 lg:top-48"
          >
            <div className="flex justify-center items-center">
              <a href="/about" className="space-x-2">
                <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">About</p>
                <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="/projects" className="space-x-2">
                <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">Projects</p>
                <BeakerIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
            <div className="flex justify-center items-center">
              <a href="/contact" className="space-x-2">
                <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
                <p className="mb-0">Contact</p>
                <PaperAirplaneIcon className="h-4 w-4 md:h-6 md:w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

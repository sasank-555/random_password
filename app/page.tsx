"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import React, { use, useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import { HoverBorderGradient } from "@/components/ui/hover-border-grad";
import { FlipWords } from "@/components/ui/flip-words";
import { Input } from "@/components/ui/Input";
import { generate } from "../logic.js";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(false);
  const [pass, setPass] = useState("password will be here..");
  const [copy, setCopy] = useState(true);
  const [formData, setFormData] = useState({
    length: 10,
    includeLower: false,
    includeUpper: false,
    includeNumber: false,
    includeSymbol: false,
  });

  function mainHandler() {
    setPass(
      generate(
        formData.length,
        formData.includeLower,
        formData.includeUpper,
        formData.includeSymbol,
        formData.includeNumber
      )
    );
  }

  function clickHandler(e: any) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type == "checkbox" ? e.target.checked : e.target.value,
    });
  }
  return (
    <Vortex
      rangeY={800}
      backgroundColor="black"
      particleCount={700}
      baseHue={180}
      baseSpeed={0.0}
      className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-[100vh]"
    >
      {!table && (
        <div className="size-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
              Random Password Generator
            </h2>
            <div className="text-white text-sm  max-w-xl my-6 text-center">
              Built with
              <FlipWords words={["NextJs", "FramerMotion", "Tailwind"]} />
            </div>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              onClick={() => setTable(true)}
            >
              <span className="font-semibold text-sm">Check Out {`>`}</span>
            </HoverBorderGradient>
          </div>
        </div>
      )}

      {table && (
        <div className="flex items-center justify-center w-full">
          <div className="rounded-xl flex flex-col backdrop-filter backdrop-blur-lg p-20 border items-start w-7/12 mx-auto">
            <h2 className="text-white text-lgfont-bold text-center">
              {loading ? "Generating" : "Choose Ur Config"}
            </h2>
            <div className="flex gap-4 w-full justify-between items-center mt-6">
              <div
                className="w-full  flex border-none bg-gray-50 dark:bg-zinc-900  dark:text-white shadow-input rounded-md  gap-4 text-xl px-6  py-2 opacity-50
          "
              >
                {pass}
              </div>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                onClick={async () => {
                  setLoading(true);
                  setCopy(false);
                  setTimeout(() => setCopy(true), 2000);
                  await navigator.clipboard.writeText(pass);
                  setLoading(false);
                }}
              >
                {copy ? "Copy" : "Copied!"}
              </HoverBorderGradient>
            </div>
            <div>
              <div className="flex flex-col items-start mt-6 w-full">
                <p>Password Length {formData.length}</p>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={formData.length}
                  onChange={clickHandler}
                  name="length"
                  className="w-full accent-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="uppercase"
                    name="includeUpper"
                    onChange={clickHandler}
                    className="mr-2  accent-white"
                  />
                  <label htmlFor="uppercase" className="text-gray-600">
                    Includes Uppercase letters
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lowercase"
                    name="includeLower"
                    onChange={clickHandler}
                    className="mr-2 accent-white"
                  />
                  <label htmlFor="lowercase" className="text-gray-600">
                    Includes Lowercase letters
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="numbers"
                    name="includeNumber"
                    onChange={clickHandler}
                    className="mr-2  accent-white"
                  />
                  <label htmlFor="numbers" className="text-gray-600">
                    Includes Numbers
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="symbols"
                    name="includeSymbol"
                    onChange={clickHandler}
                    className="mr-2  accent-white"
                  />
                  <label htmlFor="symbols" className="text-gray-600">
                    Includes Symbols
                  </label>
                </div>
              </div>
            </div>
            <button
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border mt-6 border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={() => {
                mainHandler();
              }}
            >
              Generate
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-sm mt-6 tracking-widest flex gap-1">
        Check My
        <a
          href="https://github.com/sasank-555"
          className=" mr-1 underline underline-offset-1 tracking-widest"
        >
          Github
        </a>
      </p>
    </Vortex>
  );
};

export default page;

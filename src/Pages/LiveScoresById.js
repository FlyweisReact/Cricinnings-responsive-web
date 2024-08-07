import React, { useEffect, useState } from "react";
import videoframe from "../Assets/Homepage/videoframe.svg";
import camp from "../Assets/Homepage/campioins.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import premier from "../Assets/Homepage/premier.svg";

import { IoCaretForwardOutline } from "react-icons/io5";
import indiaflag from "../Assets/Homepage/indiaflag.svg";
import usaflag from "../Assets/Homepage/usaflag.svg";
import { useParams } from "react-router";
const LivescroreById = () => {
  const [selectedDiv, setSelectedDiv] = useState("Current Matches");
  const params=useParams();
  // 
 
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div className="font-semibold">Live Cricket Score</div>
        <div className="flex  gap-5 mt-2">
          <div
            className={`cursor-pointer ${
              selectedDiv === "Current Matches"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Current Matches")}
          >
            Current Matches
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Current & Future Series"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Current & Future Series")}
          >
            Current & Future Series
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Match Day By Day"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Match Day By Day")}
          >
            Match Day By Day
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Teams"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Teams")}
          >
            Teams
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Series Archive"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Series Archive")}
          >
            Series Archive
          </div>
        </div>
        <hr className="mt-2" />
        <div className="flex gap-5 mt-2">
          <div className="bg-[#0F19AF] w-[150px] h-[40px] text-white rounded-3xl flex justify-center items-center">
            International
          </div>
          <div className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center">
            League
          </div>
          <div className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center">
            Domestic
          </div>
          <div className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center">
            Women
          </div>
        </div>
        {selectedDiv && (
          <div>
            {selectedDiv === "Current Matches" && (
              <>
                <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                  AFGHANISTAN V IRELAND IN UAE, 2024
                </div>

                <div className="flex mt-5 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                        MEN AFRICAN GAMES , 2024
                      </div>
                      <div className="flex flex-col gap-5 mt-5">
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                        INDIA vs PAKISTAN TOUR , 2024
                      </div>
                      <div className="flex flex-col gap-5 mt-5">
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                        <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                          <div className="flex">
                            <span className="font-semibold">
                              Afghanistan vs Ireland,
                            </span>
                            <span className="text-slate-400">3rd T20I </span>
                          </div>
                          <div className="text-slate-400">
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                          </div>
                          <div className="bg-[#E6E6E6] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                            <div className="flex items-center gap-[6rem] ">
                              <div>
                                <div className="flex gap-5 text-white">
                                  <span>AFG</span>
                                  <span>155-7(20 Ovs)</span>
                                </div>
                                <div className="flex gap-7 text-white">
                                  <span>IRE</span>
                                  <span>98-10(17.2 Ovs)</span>
                                </div>
                                <div className="text-slate-300">
                                  Afghanistan won by 57 runs
                                </div>
                              </div>
                              <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                <IoCaretForwardOutline />
                              </div>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center">
                              Live Score
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Scorecard
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              Full Commentary
                            </div>
                            <div className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center">
                              News
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[250px] flex flex-col gap-5 ">
                      <div className="bg-[white] h-[400px] rounded-lg">
                        <span className="text-sm ml-5 font-semibold">
                          CURRENT SERIES
                        </span>
                        <div className="flex flex-col mt-4 gap-3 items-center">
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                            Indian Premier L
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                            Sri Lanka tour o Bangaladesh
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                            Amritsar Premier League T20
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                            Australia Women Tour to India
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                            ICC Men’s T20 World Cup
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white]  rounded-lg shadow-2xl ">
                        <div className="text-sm p-3 font-semibold">
                          FEATURE VIDEOS !!
                        </div>
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <div className="flex justify-center pb-5">
                          <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                            More Videos
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] rounded-lg  pb-5 border">
                        <div className="p-1">
                          <span className="font-semibold text-sm ml-4">
                            SPECIALS
                          </span>
                          <img src={camp} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            Mumbai Indians Champions
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={ipl} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={premier} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedDiv === "Current & Future Series" && (
              <>
                <div className="bg-[#E7E7E7] h-[70px] flex items-center mt-5  ">
                  <div className="w-[700px] flex items-center gap-[13.5rem] pl-5 ">
                    <div className="font-semibold">Month</div>
                    <div className="font-semibold">Series Name</div>
                  </div>
                </div>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                        <div className="flex gap-[10rem]">
                          <div className="font-semibold">February 2024</div>
                          <div className="text-slate-400">
                            ICC Circket World Cup Leauge Two 2024-28
                            <br />
                            Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                            Stadium
                            <hr className="mt-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[250px] flex flex-col gap-5 ">
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white]  rounded-lg shadow-2xl ">
                        <div className="text-sm p-3 font-semibold">
                          FEATURE VIDEOS !!
                        </div>
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <div className="flex justify-center pb-5">
                          <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                            More Videos
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] rounded-lg  pb-5 border">
                        <div className="p-1">
                          <span className="font-semibold text-sm ml-4">
                            SPECIALS
                          </span>
                          <img src={camp} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            Mumbai Indians Champions
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={ipl} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={premier} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedDiv === "Match Day By Day" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-[200px]  flex flex-col gap-5">
                          <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                            SAT,MAR 30 2024
                          </div>
                          <div className="flex   justify-between">
                            <div className="w-[150px] font-semibold">
                              Sri Lanka tour of Bangladesh,2024
                            </div>
                            <div className="w-[325px]">
                              <span className="text-slate-400">
                                Bangladesh vs Srilanka,2nd Test , Day 01
                              </span>
                              <br />
                              <span className="text-slate-300">
                                Mar 18  •  9:30 PM at Sharjah, Sharjah Cricket
                                Stadium
                              </span>
                            </div>
                            <div className="w-[150px]">
                              <span className="text-slate-400">
                                {" "}
                                Mar 18  •  9:30 PM
                              </span>
                              <span className="text-slate-300">
                                {" "}
                                9:30 PM GMT/Local
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[250px] flex flex-col gap-5 ">
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white]  rounded-lg shadow-2xl ">
                        <div className="text-sm p-3 font-semibold">
                          FEATURE VIDEOS !!
                        </div>
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <div className="flex justify-center pb-5">
                          <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                            More Videos
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] rounded-lg  pb-5 border">
                        <div className="p-1">
                          <span className="font-semibold text-sm ml-4">
                            SPECIALS
                          </span>
                          <img src={camp} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            Mumbai Indians Champions
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={ipl} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={premier} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedDiv === "Teams" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col">
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t pt-5 pb-5">
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={indiaflag} alt="" />
                            </div>
                            <div>india</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <img src={usaflag} alt="" />
                            </div>
                            <div>USA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[250px] flex flex-col gap-5 ">
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white]  rounded-lg shadow-2xl ">
                        <div className="text-sm p-3 font-semibold">
                          FEATURE VIDEOS !!
                        </div>
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <img src={videoframe} alt="" />
                        <div className="flex justify-center pb-5">
                          <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                            More Videos
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg ">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] rounded-lg  pb-5 border">
                        <div className="p-1">
                          <span className="font-semibold text-sm ml-4">
                            SPECIALS
                          </span>
                          <img src={camp} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            Mumbai Indians Champions
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={ipl} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                          <img src={premier} alt="" />
                          <span className="font-semibold text-sm ml-4">
                            1st Match . IPL 2024
                          </span>
                          <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                            Lorem ipsum dolor sit amet consectetur. Amet mus
                            aliquam vivamus tincidunt. Odio rhoncus pretium eu
                            vivamus.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedDiv === "Series Archive" && (
              <>
                <div className="mt-2 ml-5 w-[800px] flex justify-between">
                  <div className="font-semibold">
                    Cricket Match Archives <br /> 2024
                  </div>
                  <div className="font-semibold">All Seasons</div>
                </div>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px] border-t">
                      <div className="w-[650px] flex justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>

                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                      <div className="w-[650px] flex border-t justify-between h-[90px] items-center">
                        <div className="font-semibold">International</div>
                        <div className="text-slate-400">
                          Mens African Games, 2024 Mar 17 - Mar 23
                        </div>
                      </div>
                    </div>

                    <div className="w-[250px] flex flex-col gap-5  shadow-2xl ">
                      <div className="m-2">
                        <div className="text-[#757575]">2021-2024</div>
                        <div className="flex gap-2 ">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                      </div>
                      <div className="m-2">
                        <div className="text-[#757575]">2021-2024</div>
                        <div className="flex gap-2 ">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                      </div>
                      <div className="m-2">
                        <div className="text-[#757575]">2021-2024</div>
                        <div className="flex gap-2 ">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                      </div>
                      <div className="m-2">
                        <div className="text-[#757575]">2021-2024</div>
                        <div className="flex gap-2 ">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                      </div>
                      <div className="m-2">
                        <div className="text-[#757575]">2021-2024</div>
                        <div className="flex gap-2 ">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] border bg-[#E3E2E2] flex justify-center items-center">
                            2021
                          </div>
                          <div className="w-[70px] h-[36px] text-white border bg-[#757575] flex justify-center items-center">
                            2021
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivescroreById;

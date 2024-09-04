import React, { useState } from "react";
import camp from "../Assets/Homepage/campioins.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import premier from "../Assets/Homepage/premier.svg";
import indianpremier from "../Assets/Homepage/indianpremier.svg";
import { IoCaretForwardOutline } from "react-icons/io5";
import channie from "../Assets/Homepage/chennia.svg";
import mumbai from "../Assets/Homepage/mumbai.svg";
import playerpic from "../Assets/Homepage/playerpic.svg";
import { IoCaretDownSharp } from "react-icons/io5";
import chennai from "../Assets/Homepage/chennia.svg";

const Iccseriesschedule = () => {
  const [selectedDiv, setSelectedDiv] = useState("Schedule");
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div className="font-semibold">Indian Premier League 2024</div>
        <div className="text-slate-400">74 T20s . Mar 22 - May 26 </div>

        <div className="flex gap-5 mt-2">
          <div
            className={`cursor-pointer ${
              selectedDiv === "Schedule"
                ? "bg-[#0F19AF] w-[100px] h-[40px] text-white rounded flex justify-center items-center"
                : "w-[100px] h-[40px]  flex  justify-center items-center rounded "
            }`}
            onClick={() => setSelectedDiv("Schedule")}
          >
            Schedule
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Squads"
                ? "bg-[#0F19AF] w-[100px] h-[40px] text-white rounded flex justify-center items-center"
                : "w-[100px] h-[40px] flex  justify-center items-center rounded "
            }`}
            onClick={() => setSelectedDiv("Squads")}
          >
            Squads
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Point Table"
                ? "bg-[#0F19AF] w-[100px] h-[40px] text-white rounded flex justify-center items-center"
                : "w-[100px] h-[40px] flex  justify-center items-center rounded "
            }`}
            onClick={() => setSelectedDiv("Point Table")}
          >
            Point Table
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Stats"
                ? "bg-[#0F19AF] w-[100px] h-[40px] text-white rounded flex justify-center items-center"
                : "w-[100px] h-[40px] flex  justify-center items-center rounded "
            }`}
            onClick={() => setSelectedDiv("Stats")}
          >
            Stats
          </div>
          <div
            className={`cursor-pointer ${
              selectedDiv === "Venue"
                ? "bg-[#0F19AF] w-[100px] h-[40px] text-white rounded flex justify-center items-center"
                : "w-[100px] h-[40px] flex  justify-center items-center rounded "
            }`}
            onClick={() => setSelectedDiv("Venue")}
          >
            Venue
          </div>
        </div>
        <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-center items-center pl-5 mt-4">
          RESPONSIVE AD’s
        </div>
        {selectedDiv && (
          <>
            {selectedDiv === "Schedule" && (
              <>
                <div className="flex mt-5 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  flex flex-col ">
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
                    <div className="w-[250px] ">
                      <div className="bg-[white] h-[400px] rounded-lg shadow-2xl">
                        <span className="text-sm ml-5 font-semibold">
                          CURRENT SERIES
                        </span>
                        <div className="flex flex-col mt-4 gap-3 items-center">
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2 items-center">
                            Indian Premier L
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                            Sri Lanka tour o Bangaladesh
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2 items-center">
                            Amritsar Premier League T20
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2 items-center">
                            Australia Women Tour to India
                          </div>
                          <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                            ICC Men’s T20 World Cup
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>

                      <div className="bg-[white] h-[350px] shadow-2xl rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div className="text-sm font-semibold">RANKING’s</div>
                          <div>
                            <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                              Viewall
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                            Test
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            ODI
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            T201
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div>Teams</div>
                          <div>Batting</div>
                          <div>Bowling</div>
                          <div>ALR</div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">2.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">3.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">4.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">5.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">6.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">7.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On 30 Mar 2024,13:30 IST
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] shadow-2xl rounded-lg mt-2">
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
                          <img src={indianpremier} alt="" />
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
            {selectedDiv === "Squads" && (
              <>
                <div className="bg-white pb-5  ">
                  <div className="flex justify-center pt-2 gap-5">
                    <div>
                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex  items-center shadow-2xl justify-between  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2 flex items-center gap-2">
                            {" "}
                            <img src={channie} alt="" />
                            Chennai Super Kings
                          </div>
                          <div className="mr-2 flex items-center gap-2">
                            {" "}
                            <img src={mumbai} alt="" />
                            Mumbai Indians
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-center mt-5 text-xl">
                            Playing XI
                          </div>
                          <div className="flex justify-center">
                            <div className="w-[300px]">
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                            </div>

                            <div className="w-[300px]">
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-center mt-10 text-xl">
                            Bench
                          </div>
                          <div className="flex justify-center">
                            <div className="w-[300px]">
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                              </div>
                            </div>

                            <div className="w-[300px]">
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    Yasir Khan
                                  </span>
                                  <span className="text-slate-400">Batter</span>
                                </div>
                                <div>
                                  <img
                                    src={playerpic}
                                    alt=""
                                    className="w-[50px] h-[50px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[250px] ">
                      <div className="bg-[white] h-[400px] shadow-2xl rounded-lg">
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

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>

                      <div className="bg-[white] h-[350px] shadow-2xl rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div className="text-sm font-semibold">RANKING’s</div>
                          <div>
                            <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                              Viewall
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                            Test
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            ODI
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            T201
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div>Teams</div>
                          <div>Batting</div>
                          <div>Bowling</div>
                          <div>ALR</div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">2.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">3.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">4.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">5.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">6.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">7.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On 30 Mar 2024,13:30 IST
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] shadow-2xl rounded-lg mt-2">
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
                          <img src={indianpremier} alt="" />
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
            {selectedDiv === "Point Table" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px] h-[700px] shadow-2xl">
                      <div className="font-semibold m-5">
                        Indian Premier League 2024 - Points Table
                      </div>
                      <table className="ml-2 table-auto">
                        <thead>
                          <tr>
                            <th className="w-[300px] text-left">Team</th>
                            <th className="w-[50px] text-center">Mat</th>
                            <th className="w-[50px] text-center">Won</th>
                            <th className="w-[50px] text-text-center">Lost</th>
                            <th className="w-[50px] text-center">Tied</th>
                            <th className="w-[50px] text-center">NR</th>
                            <th className="w-[50px] text-center">Pts</th>
                            <th className="w-[50px] text-center">NRR</th>
                            <th className="w-[50px] text-center"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="tr-margin h-[50px] ">
                            <td className="flex items-center gap-1">
                              <img src={chennai} alt="" />{" "}
                              <span className="font-semibold">
                                Chennai Super Kings
                              </span>
                            </td>
                            <td className="text-center text-slate-400">7</td>
                            <td className="text-center text-slate-400">6</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">
                              +1.109{" "}
                            </td>
                            <td className="text-center">
                              <IoCaretDownSharp />
                            </td>
                          </tr>
                          <tr className="tr-margin h-[50px] ">
                            <td className="flex items-center gap-1">
                              <img src={chennai} alt="" />{" "}
                              <span className="font-semibold">
                                Chennai Super Kings
                              </span>
                            </td>
                            <td className="text-center text-slate-400">7</td>
                            <td className="text-center text-slate-400">6</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">
                              +1.109{" "}
                            </td>
                            <td className="text-center">
                              <IoCaretDownSharp />
                            </td>
                          </tr>
                          <tr className="tr-margin h-[50px] ">
                            <td className="flex items-center gap-1">
                              <img src={chennai} alt="" />{" "}
                              <span className="font-semibold">
                                Chennai Super Kings
                              </span>
                            </td>
                            <td className="text-center text-slate-400">7</td>
                            <td className="text-center text-slate-400">6</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">
                              +1.109{" "}
                            </td>
                            <td className="text-center">
                              <IoCaretDownSharp />
                            </td>
                          </tr>
                          <tr className="tr-margin h-[50px] ">
                            <td className="flex items-center gap-1">
                              <img src={chennai} alt="" />{" "}
                              <span className="font-semibold">
                                Chennai Super Kings
                              </span>
                            </td>
                            <td className="text-center text-slate-400">7</td>
                            <td className="text-center text-slate-400">6</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">
                              +1.109{" "}
                            </td>
                            <td className="text-center">
                              <IoCaretDownSharp />
                            </td>
                          </tr>
                          <tr className="tr-margin h-[50px] ">
                            <td className="flex items-center gap-1">
                              <img src={chennai} alt="" />{" "}
                              <span className="font-semibold">
                                Chennai Super Kings
                              </span>
                            </td>
                            <td className="text-center text-slate-400">7</td>
                            <td className="text-center text-slate-400">6</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">2</td>
                            <td className="text-center text-slate-400">
                              +1.109{" "}
                            </td>
                            <td className="text-center">
                              <IoCaretDownSharp />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="w-[250px] ">
                      <div className="bg-[white] h-[400px] shadow-2xl rounded-lg">
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

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>

                      <div className="bg-[white] h-[350px] shadow-2xl rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div className="text-sm font-semibold">RANKING’s</div>
                          <div>
                            <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                              Viewall
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                            Test
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            ODI
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            T201
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div>Teams</div>
                          <div>Batting</div>
                          <div>Bowling</div>
                          <div>ALR</div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">2.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">3.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">4.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">5.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">6.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">7.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On 30 Mar 2024,13:30 IST
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] shadow-2xl rounded-lg mt-2">
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
                          <img src={indianpremier} alt="" />
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
            {selectedDiv === "Stats" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px]  pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="flex flex-col ">
                      <div className="left w-[700px] h-[700px] shadow-2xl"></div>
                    </div>

                    <div className="w-[250px] ">
                      <div className="bg-[white] h-[400px] shadow-2xl rounded-lg">
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

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>

                      <div className="bg-[white] h-[350px] shadow-2xl rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div className="text-sm font-semibold">RANKING’s</div>
                          <div>
                            <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                              Viewall
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                            Test
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            ODI
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            T201
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div>Teams</div>
                          <div>Batting</div>
                          <div>Bowling</div>
                          <div>ALR</div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">2.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">3.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">4.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">5.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">6.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">7.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On 30 Mar 2024,13:30 IST
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] shadow-2xl rounded-lg mt-2">
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
                          <img src={indianpremier} alt="" />
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
            {selectedDiv === "Venue" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px] h-[1100px] shadow-2xl">
                      <div className=" mt-5 ml-4">
                        <div className="text-[#0F19AF] font-semibold underline">
                          Match Info
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold">Match:</span>
                          <div className="">
                            DCW vs RCBW, Final, Womens Premier League 2024
                          </div>
                          <span className="font-semibold">Toss:</span>
                          <div className="">
                            Delhi Capitals Women won the toss and opt to bat
                          </div>
                          <span className="font-semibold">Time:</span>
                          <div className=""> 7:30 PM</div>
                          <span className="font-semibold">Venue:</span>
                          <div className=""> Arun Jaitley Stadium, Delhi</div>
                          <span className="font-semibold">Umpires:</span>
                          <div className=""> Parashar Joshi Match</div>
                          <span className="font-semibold"> Third Umpires:</span>
                          <div className=""> GS Lakshmi Mumbai Indians</div>
                          <span className="font-semibold"> Match Referee:</span>
                          <div className=""> GS Lakshmi Mumbai Indians</div>
                          <span className="font-semibold">
                            Mumbai Indians Squad:
                          </span>
                          <span>Playing</span>
                          <div className="">
                            {" "}
                            Meg Lanning (c), Shafali Verma, Alice
                            Capsey, Jemimah Rodrigues, Marizanne Kapp, Jess
                            Jonassen, Radha Yadav, Arundhati Reddy, Taniya
                            Bhatia (wk), Shikha Pandey, Minnu Mani Bench: Meg
                            Lanning (c), Shafali Verma, Alice Capsey, Jemimah
                            Rodrigues, Annabel Sutherland, Laura Harris
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 ml-4">
                        <div className="text-[#0F19AF] underline font-semibold">
                          Venue Guide
                        </div>
                        <div className="mt-5">
                          <span className="font-semibold">Stadium:</span>
                          <div className="">new delhi</div>
                          <span className="font-semibold">City:</span>
                          <div className="">delhi</div>
                          <span className="font-semibold">Capacity:</span>
                          <div className="">480000</div>
                          <span className="font-semibold">End:</span>
                          <div className="">End dsfdsklfms</div>
                          <span className="font-semibold">Hosts to:</span>
                          <div className="">Delhi</div>
                        </div>
                      </div>
                      <div className="mt-10 ml-4">
                        <div className="text-[#0F19AF] underline font-semibold">
                          Broadcast Guide
                        </div>
                        <div className="mt-5">
                          <span className="font-semibold"> Streaming:</span>
                          <div className="">Jio Cinema</div>
                          <span className="font-semibold">Tv:</span>
                          <div className="">Sports 18 Network</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[250px] ">
                      <div className="bg-[white] h-[400px] shadow-2xl rounded-lg">
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

                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>

                      <div className="bg-[white] h-[350px] shadow-2xl rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div className="text-sm font-semibold">RANKING’s</div>
                          <div>
                            <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                              Viewall
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                            Test
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            ODI
                          </button>
                          <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                            T201
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div>Teams</div>
                          <div>Batting</div>
                          <div>Bowling</div>
                          <div>ALR</div>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Rank</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">2.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">3.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">4.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">5.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">6.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                            <tr>
                              <td className="text-center">7.</td>
                              <td className="text-center">India</td>
                              <td className="text-center">122</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On 30 Mar 2024,13:30 IST
                        </div>
                      </div>
                      <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                        RESPONSIVE AD’s
                      </div>
                      <div className="bg-[white] shadow-2xl rounded-lg mt-2">
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
                          <img src={indianpremier} alt="" />
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
          </>
        )}
      </div>
    </div>
  );
};

export default Iccseriesschedule;

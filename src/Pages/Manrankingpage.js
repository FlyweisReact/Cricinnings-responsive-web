import React from "react";

import topnews from "../Assets/Homepage/topnews.svg";
import videoframe from "../Assets/Homepage/videoframe.svg";

import men from "../Assets/Homepage/men.svg";
const Manrankingpage = () => {
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <div className="font-semibold">ICC Cricket Rankings-Men’s Batsmen</div>
        <div className="flex gap-5 mt-3">
          <div>Batting</div>
          <div>Bowling</div>
          <div>All-rounders</div>
          <div>Teams</div>
        </div>
        <hr className="mt-2" />
        <div className="mt-2 flex gap-5">
          <div className="text-white w-[80px] h-[40px] flex justify-center items-center rounded bg-[#0F19AF]">
            Test
          </div>
          <div className=" w-[80px] h-[40px] flex justify-center items-center rounded border">
            ODI
          </div>
          <div className="w-[80px] h-[40px] flex justify-center items-center rounded border">
            T20
          </div>
        </div>
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5">
          <div>
            <div className="w-[680px] pb-5 mt-2 bg-white rounded-lg  shadow-lg ">
              <div className="h-[70px] bg-[#E7E7E7] flex justify-between items-center pl-5 pr-5">
                <div className="font-semibold">Position</div>
                <div className="font-semibold">Player</div>
                <div className="font-semibold">Ranking</div>
              </div>
              <div className="mt-5 flex flex-col gap-5">
                <div className="flex items-center justify-between ml-10 mr-10">
                  <div>1</div>
                  <div>-</div>
                  <div className="flex items-center gap-4">
                    <img src={men} alt="" className="w-[50px] h-[50px]" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Kane Williamson</span>
                      <span className="text-[12px]">NEW ZEALAND</span>
                    </div>
                  </div>
                  <div>650</div>
                </div>
                <div className="flex items-center justify-between ml-10 mr-10">
                  <div>1</div>
                  <div>-</div>
                  <div className="flex items-center gap-4">
                    <img src={men} alt="" className="w-[50px] h-[50px]" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Kane Williamson</span>
                      <span className="text-[12px]">NEW ZEALAND</span>
                    </div>
                  </div>
                  <div>650</div>
                </div>
                <div className="flex items-center justify-between ml-10 mr-10">
                  <div>1</div>
                  <div>-</div>
                  <div className="flex items-center gap-4">
                    <img src={men} alt="" className="w-[50px] h-[50px]" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Kane Williamson</span>
                      <span className="text-[12px]">NEW ZEALAND</span>
                    </div>
                  </div>
                  <div>650</div>
                </div>
                <div className="flex items-center justify-between ml-10 mr-10">
                  <div>1</div>
                  <div>-</div>
                  <div className="flex items-center gap-4">
                    <img src={men} alt="" className="w-[50px] h-[50px]" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Kane Williamson</span>
                      <span className="text-[12px]">NEW ZEALAND</span>
                    </div>
                  </div>
                  <div>650</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[250px] ">
            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>
            <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
              <div className="text-sm p-3 font-semibold">FEATURE VIDEOS !!</div>
              <img src={videoframe} alt="" />
              <img src={videoframe} alt="" />
              <img src={videoframe} alt="" />
              <div className="flex justify-center pb-5">
                <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                  More Videos
                </button>
              </div>
            </div>

            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>
            <div className="bg-[white] rounded-lg mt-2 shadow-2xl">
              <div className="p-1">
                <span className="font-semibold text-sm ml-4">TOP NEWS</span>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      Wankhade Stadium likely to host Ranji Final
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      I found a 2007 study on effects of hand sanitizers
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      The study was repeated with three brands of hand
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manrankingpage;

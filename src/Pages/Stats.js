import React from "react";
import { Link } from "react-router-dom";
import videoframe from "../Assets/Homepage/videoframe.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import camp from "../Assets/Homepage/campioins.svg";
import premier from "../Assets/Homepage/premier.svg";
import newsimg from "../Assets/Homepage/newsimg.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
const Stats = () => {
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar/>
        
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
        RESPONSIVE AD’s

        </div>
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px]  pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="flex flex-col ">
              {/* <div className="left w-[700px] h-[700px] shadow-2xl">
                <div className="ml-5 mr-5">
                  <div className="font-semibold mt-5 mb-5">IPL 2024 Stats</div>
                  <div className="text-slate-400">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>
                  <div className="text-slate-400 mt-2">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>

                  <div className="text-slate-400 mt-2">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>
                  <div className="mt-2 text-slate-400">
                    Calm' has been the buzzword right through RCB's
                    title-winning campaign and their captain was its perfect
                    personification on the red-letter day
                  </div>
                  <div className="mt-2 text-slate-400">
                    Calm' has been the buzzword right through RCB's
                    title-winning campaign and their captain was its perfect
                    personification on the red-letter day
                  </div>
                  <div className="text-slate-400 mt-2">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>
                  <div className="text-slate-400 mt-2">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>
                  <div className="text-slate-400 mt-2">
                    Arguably the world’s greatest franchise cricket league, the
                    Indian Premier League (IPL) is all set to make its return in
                    2024. This will be the 17th edition of the marquee
                    tournament and it could be interesting to see which side
                    comes out on top after the season.
                  </div>
                </div>
              </div> */}
              <div className="mt-10 flex gap-5">
                <div className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Batting Stats
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Runs
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Fours
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Sixes
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Centuries
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Fiftes
                    </div>
                  </div>
                </div>
                <div className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Bowling Stats
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Top Wicket Taker
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Fours Wickets
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Five Wickets
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Best Averages
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Best Bowling Figures
                    </div>
                  </div>
                </div>
                <div className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Team Stats
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Total Runs
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Total Wickets
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Fiftes
                    </div>
                    <div className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center">
                      Most Centuries
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[250px] ">
              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>
              <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
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

              <div className="bg-[white] rounded-lg mt-2 pb-5 border">
                <div className="p-1">
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
                  <img src={camp} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    Mumbai Indians Champions
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={ipl} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={premier} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

import React from "react";
import { Link } from "react-router-dom";
import videoframe from "../Assets/Homepage/videoframe.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import camp from "../Assets/Homepage/campioins.svg";
import premier from "../Assets/Homepage/premier.svg";

import chennai from "../Assets/Homepage/chennia.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
const Matchinfo = () => {
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
       <Commentarynavbar/>
       <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
        RESPONSIVE AD’s

        </div>
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
                  <span className="font-semibold">Mumbai Indians Squad:</span>
                  <span>Playing</span>
                  <div className="">
                    {" "}
                    Meg Lanning (c), Shafali Verma, Alice Capsey, Jemimah
                    Rodrigues, Marizanne Kapp, Jess Jonassen, Radha
                    Yadav, Arundhati Reddy, Taniya Bhatia (wk), Shikha
                    Pandey, Minnu Mani Bench: Meg Lanning (c), Shafali
                    Verma, Alice Capsey, Jemimah Rodrigues, Annabel
                    Sutherland, Laura Harris
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

export default Matchinfo;

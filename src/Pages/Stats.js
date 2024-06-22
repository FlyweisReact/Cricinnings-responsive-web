import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
const Stats = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"))
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"))
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"))
      console.log(banner)
    })
  }

  useEffect(() => {
    getAllBanner()
  }, [])
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          
          <img style={{ height: "96px" ,width:"100%"}} src={banner1?.image} alt="" />
        </div>
        <div className="flex mt-2 justify-center pb-5">
          <div
            style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
          >
            <p>Comming Soon ...</p>
          </div>
          {/* <div className="w-[950px]  pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="flex flex-col ">
          
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Stats;

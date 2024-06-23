import videoframe from "../Assets/Homepage/videoframe.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import camp from "../Assets/Homepage/campioins.svg";
import premier from "../Assets/Homepage/premier.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
const Matchinfo = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState();
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
  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      setSquadData(res?.data?.scorecard);
    });
  };

  useEffect(() => {
    getSquadData();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          
          <img style={{ height: "96px" ,width:"100%"}} src={banner1?.image} alt="" />
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
                    {squadData?.innings?.[0]?.name} {squadData?.innings?.[0]?.name && squadData?.innings?.[1]?.name && " Vs"}
                    {squadData?.innings?.[1]?.name}
                  </div>
                  <span className="font-semibold">Toss:</span>
                  <div className="">{squadData?.toss?.text}</div>
                  <span className="font-semibold">Time:</span>
                  <div className="">
                    {" "}
                    {squadData?.date_start?.split(" ")[1]}
                  </div>
                  <span className="font-semibold">Venue:</span>
                  <div className=""> {squadData?.venue?.name}</div>
                  <span className="font-semibold">Umpires:</span>
                  <div className=""> {squadData?.umpires}</div>
                  <span className="font-semibold"> Third Umpires:</span>
                  <div className=""> {squadData?.umpires?.split(",")[2]}</div>
                  <span className="font-semibold"> Match Referee:</span>
                  {/* <div className=""> {squadData?.referee}</div>
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
                  </div> */}
                </div>
              </div>
              <div className="mt-10 ml-4">
                <div className="text-[#0F19AF] underline font-semibold">
                  Venue Guide
                </div>
                <div className="mt-5">
                  <span className="font-semibold">Stadium:</span>
                  <div className=""> {squadData?.venue?.name}</div>
                  <span className="font-semibold">City:</span>
                  <div className=""> {squadData?.venue?.country}</div>
                  <span className="font-semibold">Capacity:</span>
                  <div className="">480000</div>
                  <span className="font-semibold">End:</span>
                  <div className="">
                    {" "}
                    {squadData?.date_end_ist
                      ?.split(" ")[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join("-")}
                  </div>
                  <span className="font-semibold">Hosts to:</span>
                  <div className="">{squadData?.venue?.country}</div>
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
            {banner1 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner1?.image} style={{ width: "100%",height:"100%",borderRadius:"10px"   }} alt="" />
            </div>}
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
            {banner2 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner2?.image} style={{ width: "100%",height:"100%"  ,borderRadius:"10px" }} alt="" />
            </div>}
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchinfo;

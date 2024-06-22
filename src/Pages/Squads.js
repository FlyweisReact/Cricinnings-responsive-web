import topnews from "../Assets/Homepage/topnews.svg";
import videoframe from "../Assets/Homepage/videoframe.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import { useEffect, useState } from "react";
const Squads = () => {
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
    axios.get(baseUrl + "user/matchSquad/" + matchId).then((res) => {
      setSquadData(res?.data);
      console.log(res?.data);
    });
  };

  useEffect(() => {
    getSquadData();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          
          <img style={{ height: "96px" ,width:"100%"}} src={banner1?.image} alt="" />
        </div>
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5">
          <div>
            <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <div className="bg-[#0F19AF] flex  items-center shadow-2xl justify-between  rounded-t-lg w-full h-[45px] text-white">
                <div className="ml-2 flex items-center gap-2">
                  {" "}
                  <img
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                    src={
                      squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                        ? squadData?.teams?.[1]?.thumb_url
                        : squadData?.teams?.[0]?.thumb_url
                    }
                    alt=""
                  />
                  {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                    ? squadData?.teams?.[1]?.alt_name
                    : squadData?.teams?.[0]?.alt_name}
                </div>
                <div className="mr-2 flex items-center gap-2">
                  {" "}
                  <img
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                    src={
                      squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                        ? squadData?.teams?.[0]?.thumb_url
                        : squadData?.teams?.[1]?.thumb_url
                    }
                    alt=""
                  />
                  {squadData?.teama?.team_id === squadData?.teams?.[1]?.tid
                    ? squadData?.teams?.[0]?.alt_name
                    : squadData?.teams?.[1]?.alt_name}
                </div>
              </div>
              <div>
                <div className="font-semibold text-center mt-5 text-xl">
                  Playing XI
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px]">
                    {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                      ? squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>

                  <div className="w-[300px]">
                    {/* <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasir Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    </div> */}
                    {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-center mt-5 text-xl">
                  Bench
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px]">
                    {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                      ? squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>

                  <div className="w-[300px]">
                    {/* <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasir Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    </div> */}
                    {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>
                </div>
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
            {banner3 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner3?.image} style={{ width: "100%",height:"100%",borderRadius:"10px"   }} alt="" />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Squads;

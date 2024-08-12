import videoframe from "../Assets/Homepage/videoframe.svg";
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
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      // 
    });
  };

  useEffect(() => {
    // getAllBanner();
  }, []);

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDateTime = `${formattedHours}:${formattedMinutes} ${period} (${month} ${day})`;

    return formattedDateTime;
  }
  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      setSquadData(res?.data?.scorecard);
    });
  };
  function formatDate11(dateString) {
    const date = new Date(dateString);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

    return formattedDate;
  }

  useEffect(() => {
    getSquadData();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          <img
            style={{ height: "96px", width: "100%" }}
            src={banner1?.image}
            alt=""
          />
        </div>
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="mt-1 shadow-2xl w-[700px] ml-3">
              <div
                style={{ borderRadius: "10px 10px 0 0" }}
                className="bg-[#0F19AF] h-[45px] flex items-center text-white pl-2"
              >
                Match Info
              </div>

              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Match
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.short_title}
                  {","} {squadData?.subtitle}
                  {","} {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Series
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Stadium
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.venue?.location}
                  {","} {squadData?.venue?.country}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Date
                </div>
                <div className="text-slate-400 mr-2">
                  {formatDate11(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Time
                </div>
                <div className="text-slate-400 mr-2">
                  {formatDateTime(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Toss
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.toss?.text}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Venue
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.venue?.name}
                  {","} {squadData?.venue?.location}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Umpires
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.umpires?.split(",")[0]}
                  {","}
                  {squadData?.umpires?.split(",")[1]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  3rd Umpire
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.umpires?.split(",")[2]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Referee
                </div>
                <div className="text-slate-400 mr-2">{squadData?.referee}</div>
              </div>
            </div>
            <div className="w-[250px] ">
              {banner1 && (
                <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                  <img
                    src={banner1?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    alt=""
                  />
                </div>
              )}
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
              {banner2 && (
                <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                  <img
                    src={banner2?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchinfo;

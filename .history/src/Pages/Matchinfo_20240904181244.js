/** @format */

import Commentarynavbar from "../Components/Commentarynavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import { TopBanner } from "../Components/HelpingComponent";
import RankingSeries from "../Components/RankingSeries";
import CurrentSeries from "../Components/CurrentSeries";

const Matchinfo = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
  const [mainCategory, setMainCategory] = useState("teams");
  const [teamSelector, setTeamSelector] = useState("test");
  const [odiBestman, setOdiBestman] = useState([]);
  const [t20Bestman, setT20Bestman] = useState([]);
  const [testBestman, setTestBestman] = useState([]);
  const [odiBolling, setOdiBolling] = useState([]);
  const [t20Bolling, setT20Bolling] = useState([]);
  const [testBolling, setTestBolling] = useState([]);
  const [odiAlr, setOdiAlr] = useState([]);
  const [testAlr, setTestAlr] = useState([]);

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
    });
  };

  useEffect(() => {
    getAllBanner();
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

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
    setOdiBestman(res?.data?.rankingData?.ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.ranks?.bowlers?.tests);
    setOdiAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.odis || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <TopBanner img={banner1?.image} className="mt-2" />

        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 full-width column-flex zero-padding">
            <div className="mt-1 box-shadow-container w-[700px] ml-3 full-width zero-margin">
              <div
                style={{ borderRadius: "10px 10px 0 0" }}
                className="bg-[#0F19AF] h-[45px] flex items-center text-white pl-2 small-text"
              >
                Match Info
              </div>

              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Match
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.short_title}
                  {","} {squadData?.subtitle}
                  {","} {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Series
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Stadium
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.venue?.location}
                  {","} {squadData?.venue?.country}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Date
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {formatDate11(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Time
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {formatDateTime(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Toss
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.toss?.text}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Venue
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.venue?.name}
                  {","} {squadData?.venue?.location}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Umpires
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.umpires?.split(",")[0]}
                  {","}
                  {squadData?.umpires?.split(",")[1]}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  3rd Umpire
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.umpires?.split(",")[2]}
                </div>
              </div>
              <div className="flex justify-between border-b small-padding">
                <div
                  className="text-slate-400 ml-2 xs-small-text"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Referee
                </div>
                <div className="text-slate-400 mr-2 xs-small-text">
                  {squadData?.referee}
                </div>
              </div>
            </div>
            <div className="w-[250px] mt-10 full-width zero-margin">
              <CurrentSeries />
              <RankingSeries />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchinfo;

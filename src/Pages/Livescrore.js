import { useEffect, useState } from "react";
import videoframe from "../Assets/Homepage/videoframe.svg";
import camp from "../Assets/Homepage/campioins.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import premier from "../Assets/Homepage/premier.svg";
import { IoCaretForwardOutline } from "react-icons/io5";
import indiaflag from "../Assets/Homepage/indiaflag.svg";
import usaflag from "../Assets/Homepage/usaflag.svg";
import {
  GetData,
  GetDataWithToken,
  baseUrl,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
const Livescrore = () => {
  const [selectedDiv, setSelectedDiv] = useState("Current Matches");
  const [currentSeries, setCurrentSeries] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [category, setCategory] = useState("international");
  const [specialBanner, setSpecialBanner] = useState([]);
  const [competationsType, setCompetationsType] = useState([]);
  const getWinningTeamName = (match) => {
    const winningTeamId = match.winning_team_id;
    if (!winningTeamId) return "No winner yet";

    if (match.teama.team_id === winningTeamId) {
      return match.teama.name;
    } else if (match.teamb.team_id === winningTeamId) {
      return match.teamb.name;
    } else {
      return "Unknown";
    }
  };

  const [newMatchData, setNewMatchData] = useState([]);
  function convertDateTime(dateTimeStr) {
    const dateObj = new Date(dateTimeStr);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${month} ${day}  •  ${hours}:${minutes}`;
  }
  function convertToOrdinal(day) {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = day % 100;

    const suffix =
      suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];

    return `${day}${suffix}`;
  }
  function convertDate1(dateStr) {
    const dateObj = new Date(dateStr);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dayOfWeek = days[dateObj.getUTCDay()];
    const month = months[dateObj.getUTCMonth()];
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${dayOfWeek}, ${month} ${day} ${year}`;
  }
  const getAllNewMatches = async () => {
    const res = await axios
      .get(
        `${baseUrl}user/getCompetitionsAndMatches?token=7971ecfda0c915c1573e11d0d8032c9a&per_page=10&paged=1&include_matches=true&category=${category}`
      )
      .then((res) => {
        console.log(res?.data?.competitions);
        setNewMatchData(res?.data?.competitions);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllNewMatches();
  }, [category]);
  const getAllCompetationsType = async () => {
    const current_year = new Date().getFullYear();
    const res = await axios
      .get(
        `${baseUrl}user/getCompetitionsAndMatches?status=live&per_page=10&paged=1&include_matches=true&category=${category}`
      )
      .then((res) => {
        setCompetationsType(res?.data?.competitions);
      })
      .catch((err) => {});
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" }; // Full month name and year

    return date.toLocaleDateString(undefined, options);
  };
  const getMatchesForCompetition = async (competitionId) => {
    const res = await axios
      .get(`${baseUrl}user/competitions/${competitionId}/matches`)
      .then((res) => {
        const liveMatches = res?.data?.matches.filter(
          (match) => match.status === 3
        );
        setCompetationsType((prevCompetitions) => {
          const updatedCompetitions = prevCompetitions.map((competition) => {
            if (competition.cid === competitionId) {
              return {
                ...competition,
                matches: liveMatches,
              };
            }
            return competition;
          });
          const hasLiveMatches = liveMatches.length > 0;
          if (!hasLiveMatches) {
            return updatedCompetitions.filter(
              (competition) => competition.cid !== competitionId
            );
          }
          return updatedCompetitions;
        });
      })
      .catch((err) => {
        console.error(
          `Error fetching matches for competition ${competitionId}:`,
          err
        );
      });
  };

  useEffect(() => {
    getAllCompetationsType();
  }, [category]);

  const getAllCurrentMatches = () => {
    GetDataWithToken({
      path: "matches",
      category: category,
    })
      .then((res) => {
        setCurrentMatches(res?.response?.items);
      })
      .catch((err) => {});
  };

  useEffect(() => {}, []);

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  const getAllCurrentSeries = () => {
    GetDataWithToken({
      path: "competitions",
      status: "live",
    })
      .then((res) => {
        setCurrentSeries(res?.response?.items);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllSpecialBanners();
  }, []);
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
          {/* <div
            className={`cursor-pointer ${
              selectedDiv === "Series Archive"
                ? "underline text-[#0F19AF] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Series Archive")}
          >
            Series Archive
          </div> */}
        </div>
        <hr className="mt-2" />
        <div className="flex gap-5 mt-2">
          <div
            onClick={() => setCategory("international")}
            style={{
              backgroundColor:
                category === "international" ? "#0F19AF" : "white",
              color: category === "international" ? "white" : "black",
              cursor: "pointer",
            }}
            className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center"
          >
            International
          </div>
          <div
            style={{
              backgroundColor: category === "youth" ? "#0F19AF" : "white",
              color: category === "youth" ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setCategory("youth")}
            className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center"
          >
            League
          </div>
          <div
            style={{
              backgroundColor: category === "domestic" ? "#0F19AF" : "white",
              color: category === "domestic" ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setCategory("domestic")}
            className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center"
          >
            Domestic
          </div>
          <div
            style={{
              backgroundColor: category === "women" ? "#0F19AF" : "white",
              color: category === "women" ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={() => setCategory("women")}
            className="w-[150px] h-[40px] border rounded-3xl flex justify-center items-center"
          >
            Women
          </div>
        </div>
        {selectedDiv && (
          <div>
            {selectedDiv === "Current Matches" && (
              <>
                {competationsType?.length === 0 && (
                  <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                    {" "}
                    There are no matches at the moment. Please check back later.{" "}
                  </div>
                )}
                {competationsType?.[0] && (
                  <>
                    <div className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                      {competationsType?.[0]?.title}
                    </div>
                  </>
                )}

                <div className="flex mt-5 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        {competationsType[0]?.matches?.map((item, index) => {
                          return (
                            <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                              <div className="flex">
                                <span className="font-semibold"></span>
                                <span className="text-slate-400">
                                  {convertToOrdinal(
                                    item?.subtitle?.split(" ")?.[1]
                                  )}{" "}
                                  {item?.format_str}
                                  {/* 3rd T20I{" "} */}
                                </span>
                              </div>
                              <div className="text-slate-400">
                                {item?.date_start
                                  ?.split("T")?.[0]
                                  ?.split("-")
                                  ?.reverse()
                                  ?.join("-")}
                                 at {item?.venue?.name}
                                {" ,"}
                                {item?.venue?.location}
                              </div>
                              <div className="bg-[#848484] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                                <div className="flex items-center gap-[6rem] ">
                                  <div>
                                    <div className="flex gap-5 text-white">
                                      <span>{item?.teama?.name}</span>
                                      <span>{item?.teama?.scores_full}</span>
                                    </div>
                                    <div className="flex gap-7 text-white">
                                      <span>{item?.teamb?.name}</span>
                                      <span>{item?.teamb?.scores_full}</span>
                                    </div>
                                    <div className="text-slate-300">
                                      {getWinningTeamName(item)} won by{" "}
                                      {item?.win_margin}
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
                          );
                        })}
                      </div>
                      {competationsType?.map((item, index) => {
                        if (index === 0) {
                          return null;
                        }
                        return (
                          <>
                            <div
                              key={index}
                              className="bg-[#E7E7E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4"
                            >
                              {}
                              {item?.title}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                              {item?.matches?.map((item, index) => {
                                return (
                                  <div className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2">
                                    <div className="flex">
                                      <span className="font-semibold"></span>
                                      <span className="text-slate-400">{}</span>
                                    </div>
                                    <div className="text-slate-400">
                                      {item?.date_start
                                        ?.split("T")?.[0]
                                        ?.split("-")
                                        ?.reverse()
                                        ?.join("-")}
                                       at {item?.venue?.name}
                                      {" ,"}
                                      {item?.venue?.location}
                                    </div>
                                    <div className="bg-[#848484] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                                      <div className="flex items-center gap-[6rem] ">
                                        <div>
                                          <div className="flex gap-5 text-white">
                                            <span>{item?.teama?.name}</span>
                                            <span>
                                              {item?.teama?.scores_full}
                                            </span>
                                          </div>
                                          <div className="flex gap-7 text-white">
                                            <span>{item?.teamb?.name}</span>
                                            <span>
                                              {item?.teamb?.scores_full}
                                            </span>
                                          </div>
                                          <div className="text-slate-300">
                                            {getWinningTeamName(item)} won by{" "}
                                            {item?.win_margin}
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
                                );
                              })}
                              {}
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="w-[250px] flex flex-col gap-5 ">
                      <div className="bg-[white] pt-3 pb-3 rounded-lg">
                        {currentSeries?.length > 0 && (
                          <div className="bg-[white] pb-3 pt-3 rounded-lg">
                            <span className="text-sm ml-5 font-semibold">
                              CURRENT SERIES
                            </span>
                            <div className="flex flex-col mt-4 gap-3 items-center">
                              {currentSeries?.map((item) => {
                                return (
                                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center p-2">
                                    {item?.title}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
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
                          {specialBanner?.map((item, index) => (
                            <>
                              <img src={item?.image} alt="" />
                              <span className="font-semibold text-sm ml-4">
                                {item?.subtitle}
                              </span>
                              <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                                {item?.description}
                              </p>
                            </>
                          ))}
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
                        {console.log("currentSeries", competationsType)}
                        {competationsType?.map((item) => (
                          <div className="flex gap-[10rem]">
                            <div className="font-semibold">
                              {formatDate(item?.datestart)?.split(" ")?.[0]}{" "}
                              {item?.datestart?.slice(0, 4)}
                            </div>
                            <div className="text-slate-400">
                              {item?.title}
                              <br />
                              {convertDate1(item?.datestart)}
                              <hr className="mt-2" />
                            </div>
                          </div>
                        ))}
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
                        {newMatchData?.map((item) => (
                          <div className="  flex flex-col gap-5">
                            <div className="bg-[#E7E7E7] h-[70px] font-semibold flex justify-start items-center pl-2">
                              {convertDate1(item?.datestart)}
                            </div>
                            <div className="flex   justify-between">
                              <div className="w-[150px] font-semibold">
                                {item?.title}
                              </div>
                              <div className="w-[325px]">
                                {item?.matches &&
                                  item?.matches
                                    ?.filter((m) => m?.status === 2)
                                    ?.map((item) => (
                                      <div className="mb-3">
                                        <span className="text-slate-400">
                                          {item?.title}
                                        </span>
                                        <br />
                                        <span className="text-slate-300">
                                          {convertDateTime(item?.date_start)}{" "}
                                           at {item?.venue?.name}
                                        </span>
                                      </div>
                                    ))}
                              </div>
                              {/* <div className="w-[150px]">
                                <span className="text-slate-400">
                                  {" "}
                                  Mar 18  •  9:30 PM
                                </span>
                                <span className="text-slate-300">
                                  {" "}
                                  9:30 PM GMT/Local
                                </span>
                              </div> */}
                            </div>
                          </div>
                        ))}
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

export default Livescrore;

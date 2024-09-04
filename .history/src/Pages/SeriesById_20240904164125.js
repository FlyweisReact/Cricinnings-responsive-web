/** @format */

import { useEffect, useState } from "react";
import {
  GetData,
  baseUrl,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SeriesSquad from "./SeriesSquad";
import SeriesPoints from "./SeriesPoints";
import SeriesStats from "./SeriesStats";
import Venu from "./Venu";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";

const SeriesById = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const initialLocation =
    location.pathname === "/live-cricket-scores/Schedule"
      ? "Match Day By Day"
      : location.pathname === "/live-cricket-scores/Allseries"
      ? "Current & Future Series"
      : "Current Matches";
  const [selectedDiv] = useState(initialLocation);
  const [category] = useState("international");
  const [specialBanner, setSpecialBanner] = useState([]);
  const [competationsType, setCompetationsType] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
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
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [hompageBanner2, setHompageBanner2] = useState("");
  const [hompageBanner3, setHompageBanner3] = useState("");
  const [newMatchData, setNewMatchData] = useState([]);
  const [seriesMatches, setSeriesMatches] = useState([]);
  const [selectedButton, setSelectedButton] = useState("");
  const [seriesDetails, setSeriesDetails] = useState({});

  const formatDateToTimer = (dateString) => {
    const date = new Date(dateString.replace(" ", "T"));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  function formatDateBoss(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  }

  const getAllSeriesData = async () => {
    try {
      const res = await axios.get(
        baseUrl + "user/getCompetitionsList?status=live&per_page=30&paged=1"
      );
      setAllSeries(res?.data?.competitions);
    } catch (error) {}
  };

  const getAllHomePageBanners = async () => {
    try {
      const res1 = await GetData("userAuth/getPostsByPosition");
      const middleBanner = res1?.data?.filter(
        (item) => item?.title === "middle"
      );
      const bottomBanner = res1?.data?.filter(
        (item) => item?.title === "bottom"
      );
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);
      setHompageBanner2(
        res2?.data?.data?.find((item) => item.title === "scorePageBanner1")
          ?.image
      );
      setHompageBanner3(
        res2?.data?.data?.find((item) => item.title === "scorePageBanner2")
          ?.image
      );
    } catch (error) {
      console.error("Error fetching homepage banners:", error);
    }
  };

  useEffect(() => {
    getAllHomePageBanners();
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

  const getMiddleBanner = () => {};

  useEffect(() => {
    getAllSeriesData();
    getAllTeamRankingsData();
    getMiddleBanner();
    getAllSpecialBanners();
  }, []);

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
        `${baseUrl}user/getCompetitionsAndMatches?&per_page=10&paged=1&include_matches=true&category=${category}`
      )
      .then((res) => {
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
        `${baseUrl}user/getCompetitionsAndMatchesDashboard?status=live&per_page=10&paged=1&include_matches=true&type=mixed&category=${category}`
      )
      .then((res) => {
        setCompetationsType(res?.data?.competitions);
      })
      .catch((err) => {});
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDate22 = (dateString) => {
    const date = new Date(dateString);

    const options = { month: "short", day: "numeric" };

    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getAllCompetationsType();
  }, [category]);

  const getAllCurrentMatches = () => {
    const newId = params?.seriesId;
    try {
      const res = axios
        .get(
          `${baseUrl}user/competitions/${newId}/matches?status=mixed&per_page=15&paged=1`
        )
        .then((res) => {
          setSeriesMatches(res?.data?.matches);
        });
    } catch (error) {}
  };

  const getSeriesDetails = async () => {
    const newId = params?.seriesId;
    try {
      const res = axios
        .get(`${baseUrl}user/competitionOverview/${newId}`)
        .then((res) => {
          setSeriesDetails(res?.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getSeriesDetails();
  }, [params?.seriesId]);

  useEffect(() => {
    getAllCurrentMatches();
  }, [params?.seriesId]);

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllSpecialBanners();
  }, []);

  useEffect(() => {
    if (pathname.includes("/matches")) {
      setSelectedButton("Current Matches");
    } else if (pathname.includes("/squads")) {
      setSelectedButton("squad");
    } else if (pathname.includes("/stats")) {
      setSelectedButton("State Venu");
    } else if (pathname.includes("/points-table")) {
      setSelectedButton("Point Table");
    } else {
      setSelectedButton("Venu");
    }
  }, [pathname]);

  return (
    <div className="">
      {selectedButton === "Current Matches" ? (
        <Helmet>
          <title>
            {`${seriesDetails?.title}, ${seriesDetails?.datestart?.slice(
              0,
              4
            )} - ${seriesDetails?.dateend?.slice(
              2,
              4
            )} schedule, live scores and commentary`}
          </title>
          <meta
            name="description"
            content={`${seriesDetails?.title}, ${
              seriesDetails?.season
            } ${formatDate22(seriesDetails?.datestart)} - ${formatDate22(
              seriesDetails?.dateend
            )} schedule, live scores and commentary`}
          />
        </Helmet>
      ) : selectedButton === "squad" ? (
        <Helmet>
          <title>
            {`${seriesDetails?.title}, ${seriesDetails?.datestart?.slice(
              0,
              4
            )} - ${seriesDetails?.dateend?.slice(
              2,
              4
            )} Team Caption and Players`}
          </title>
          <meta
            name="description"
            content={`${seriesDetails?.title}, ${
              seriesDetails?.season
            } ${formatDate22(seriesDetails?.datestart)} - ${formatDate22(
              seriesDetails?.dateend
            )}  Team Caption and Players`}
          />
        </Helmet>
      ) : selectedButton === "Point Table" ? (
        <Helmet>
          <title>
            {`${seriesDetails?.title}, ${seriesDetails?.datestart?.slice(
              0,
              4
            )} - ${seriesDetails?.dateend?.slice(
              2,
              4
            )} Points Table | Cricinnings.com`}
          </title>
          <meta
            name="description"
            content={`${seriesDetails?.title}, ${
              seriesDetails?.season
            } ${formatDate22(seriesDetails?.datestart)} - ${formatDate22(
              seriesDetails?.dateend
            )} Points Table | Cricinnings.com`}
          />
        </Helmet>
      ) : selectedButton === "Venu" ? (
        <Helmet>
          <title>
            {`${seriesDetails?.title}, ${seriesDetails?.datestart?.slice(
              0,
              4
            )} - ${seriesDetails?.dateend?.slice(2, 4)} Venues and Grounds`}
          </title>
          <meta
            name="description"
            content={`${seriesDetails?.title}, ${
              seriesDetails?.season
            } ${formatDate22(seriesDetails?.datestart)} - ${formatDate22(
              seriesDetails?.dateend
            )}  Venues and Grounds`}
          />
        </Helmet>
      ) : selectedButton === "State Venu" ? (
        <Helmet>
          <title>
            {`${seriesDetails?.title}, ${seriesDetails?.datestart?.slice(
              0,
              4
            )} - ${seriesDetails?.dateend?.slice(
              2,
              4
            )} Statics | Cricinnings.com`}
          </title>
          <meta
            name="description"
            content={`${seriesDetails?.title}, ${
              seriesDetails?.season
            } ${formatDate22(seriesDetails?.datestart)} - ${formatDate22(
              seriesDetails?.dateend
            )} Statics | Cricinnings.com`}
          />
        </Helmet>
      ) : (
        ""
      )}

      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <span>
              <h1 className="text-lg medium-text large-text">
                {seriesDetails?.title}
                {", "}
                {seriesDetails?.season}
              </h1>
            </span>
            <span style={{ color: "#676766" }} className="medium-text">
              {formatDate22(seriesDetails?.datestart)}-
              {formatDate22(seriesDetails?.dateend)}
            </span>
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              paddingLeft: "10px",
              alignItems: "center",
              borderBottom: "2px solid gray",
            }}
          >
            <p
              style={{
                padding: "5px 5px 5px 5px",
                borderBottom:
                  selectedButton === "Current Matches"
                    ? " 2px solid #028062"
                    : "white",
                fontWeight: "bold",
                color:
                  selectedButton === "Current Matches" ? "#028062" : "black",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/cricket-series/${seriesDetails?.cid}/${formatTitle(
                    seriesDetails?.title
                  )}-${seriesDetails?.season}/matches`
                )
              }
              className="xs-small-text"
            >
              Schedule & Results
            </p>
            <p
              style={{
                padding: "5px 5px 5px 5px",
                borderBottom:
                  selectedButton === "squad" ? " 2px solid #028062" : "white",
                fontWeight: "bold",
                color: selectedButton === "squad" ? "#028062" : "black",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/cricket-series/${seriesDetails?.cid}/${formatTitle(
                    seriesDetails?.title
                  )}-${seriesDetails?.season}/squads`
                )
              }
              className="xs-small-text"
            >
              Squads
            </p>
            <p
              style={{
                padding: "5px 5px 5px 5px",
                borderBottom:
                  selectedButton === "Point Table"
                    ? "2px solid #028062"
                    : "white",
                fontWeight: "bold",
                color: selectedButton === "Point Table" ? "#028062" : "black",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/cricket-series/${seriesDetails?.cid}/${formatTitle(
                    seriesDetails?.title
                  )}-${seriesDetails?.season}/points-table`
                )
              }
              className="xs-small-text"
            >
              Points Table
            </p>
            <p
              style={{
                padding: "5px 5px 5px 5px",
                borderBottom:
                  selectedButton === "State Venu"
                    ? " 2px solid #028062"
                    : "white",
                fontWeight: "bold",
                color: selectedButton === "State Venu" ? "#028062" : "black",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/cricket-series/${seriesDetails?.cid}/${formatTitle(
                    seriesDetails?.title
                  )}-${seriesDetails?.season}/stats`
                )
              }
              className="xs-small-text"
            >
              Stats
            </p>
            <p
              style={{
                padding: "5px 5px 5px 5px",
                borderBottom:
                  selectedButton === "Venu" ? " 2px solid #028062" : "white",
                fontWeight: "bold",
                color: selectedButton === "Venu" ? "#028062" : "black",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/cricket-series/${seriesDetails?.cid}/${formatTitle(
                    seriesDetails?.title
                  )}-${seriesDetails?.season}/venues`
                )
              }
              className="xs-small-text"
            >
              Venues
            </p>
          </div>
        </div>

        {selectedDiv && (
          <div>
            {selectedButton === "Current Matches" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 full-width">
                    <div className="left w-[950px]  ">
                      <Table style={{ border: "none", fontSize: "14px" }}>
                        <thead style={{ textAlign: "left" }}>
                          <tr>
                            <th
                              style={{ backgroundColor: "#EDEAEA" }}
                              className="w-[100px] "
                            >
                              Date
                            </th>
                            <th
                              style={{ backgroundColor: "#EDEAEA" }}
                              className="w-[100px]"
                            >
                              Match Details
                            </th>
                            <th
                              style={{ backgroundColor: "#EDEAEA" }}
                              className="w-[100px]"
                            >
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "left" }}>
                          {seriesMatches?.map((item, index) => {
                            return (
                              <tr
                                style={{ borderBottom: "1px solid #b3b3b3" }}
                                key={index}
                              >
                                <td
                                  style={{
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  {formatDateBoss(item?.date_start_ist)}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/live-cricket-scores/${
                                        item?.match_id
                                      }/${formatTitle(
                                        item?.short_title
                                      )}-${formatTitle(
                                        item?.subtitle
                                      )}-${formatTitle(
                                        item?.competition?.title
                                      )}-${item?.competition?.season?.toLowerCase()}`
                                    )
                                  }
                                >
                                  <p
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "2px",
                                    }}
                                  >
                                    <span className="hover:underline">
                                      <h1 className="text-base">
                                        {item?.title +
                                          "," +
                                          formatTitle(item?.subtitle)}
                                      </h1>
                                    </span>

                                    <span style={{ color: "gray" }}>
                                      {item?.venue?.name +
                                        " - " +
                                        item?.venue?.location}
                                    </span>
                                    <span
                                      style={{
                                        color:
                                          item?.status === 1
                                            ? "#D39400"
                                            : "#2e8ae8",
                                      }}
                                    >
                                      {(item?.status === 1 &&
                                        `Match Starts at ${formatDateBoss(
                                          item?.date_start_ist
                                        )} ${item?.date_start?.slice(
                                          11,
                                          16
                                        )} `) ||
                                        item?.result}
                                    </span>
                                  </p>
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    border: "none",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <span>
                                    {formatDateToTimer(item?.date_start_ist)}
                                  </span>
                                  <span style={{ color: "gray" }}>
                                    {formatDateToTimer(item?.date_start)} GMT /{" "}
                                    {formatDateToTimer(item?.date_start_ist)}{" "}
                                    LOCAL
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedButton === "squad" && <SeriesSquad />}
            {selectedButton === "Point Table" && <SeriesPoints />}
            {selectedButton === "State Venu" && <SeriesStats />}
            {selectedButton === "Venu" && <Venu />}
            {selectedDiv === "Current & Future Series" && (
              <>
                <div className="bg-[#E6E6E7] h-[70px] flex items-center mt-5  ">
                  <div className="w-[700px] flex items-center gap-[13.5rem] pl-5 ">
                    <div className="font-semibold">Month</div>
                    <div className="font-semibold">Series Name</div>
                  </div>
                </div>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
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
                    <div className="w-[250px]">
                      {allSeries?.length > 0 && (
                        <div
                          style={{
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          }}
                          className="bg-[white] pb-3 rounded-lg mb-3"
                        >
                          <span
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "12px",
                              paddingLeft: "10px",
                              paddingTop: "10px",
                            }}
                          >
                            CURRENT SERIES
                          </span>
                          <div className="flex flex-col mt-4 gap-3 items-center text-center">
                            {allSeries?.map((item, index) => {
                              if (index >= 4) return null;
                              return (
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${formatTitle(
                                        item?.title
                                      )}/${item?.cid}`
                                    )
                                  }
                                  key={item?._id}
                                  style={{
                                    display: "grid",
                                    placeItems: "center",
                                    justifyContent: "center",
                                    width: "90%",
                                    margin: "auto",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    textAlign: "center",
                                    paddingTop: "0.5rem",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <p>{item?.title}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {middleBanner2 && (
                        <img
                          style={{
                            width: "100%",
                            height: "550px",
                            borderRadius: "10px",
                          }}
                          className="mb-3"
                          src={middleBanner2}
                          alt="middleBanner"
                        />
                      )}

                      <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
                        <div
                          style={{
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            padding: "10px",
                          }}
                          className="flex justify-between p-2"
                        >
                          <div
                            className="text-sm font-semibold"
                            style={{ fontSize: "12px" }}
                          >
                            RANKING’s
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                navigate("/icc-rankings/men/batting")
                              }
                              className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            >
                              View all
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button
                            onClick={() => setTeamSelector("test")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "test" ? "#0F19AF" : "black",
                              color:
                                teamSelector === "test" ? "white" : "black",
                              fontWeight:
                                teamSelector === "test" ? "bold" : "normal",
                            }}
                          >
                            Test
                          </button>
                          <button
                            onClick={() => setTeamSelector("odi")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "odi" ? "#0F19AF" : null,
                              color: teamSelector === "odi" ? "white" : "black",
                              fontWeight:
                                teamSelector === "odi" ? "bold" : "normal",
                            }}
                          >
                            ODI
                          </button>
                          <button
                            onClick={() => setTeamSelector("t20")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "t20" ? "#0F19AF" : null,
                              color: teamSelector === "t20" ? "white" : "black",
                              fontWeight:
                                teamSelector === "t20" ? "bold" : "normal",
                            }}
                          >
                            T20
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "teams" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "teams" ? "bold" : "normal",
                              color: "black",
                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("teams")}
                            className="text-[#0F19AF]"
                          >
                            Teams
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "batting"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "batting" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("batting")}
                          >
                            Batting
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "bowling"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "bowling" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("bowling")}
                          >
                            Bowling
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "alr" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "alr" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("alr")}
                          >
                            ALR
                          </div>
                        </div>
                        <table>
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Team</th>
                              <th className="w-[100px]">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mainCategory === "teams" && (
                              <>
                                {teamSelector === "test" &&
                                  test?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  t20s?.slice(0, 6).map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}

                                {teamSelector === "odi" &&
                                  odis?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                            {mainCategory === "batting" && (
                              <>
                                {teamSelector === "test" &&
                                  testBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "bowling" && (
                              <>
                                {teamSelector === "test" &&
                                  testBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "alr" && (
                              <>
                                {teamSelector === "test" &&
                                  testAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "odi" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On {new Date().toLocaleDateString()}
                        </div>
                      </div>

                      {bottomBanner1 && (
                        <img
                          src={bottomBanner1}
                          style={{
                            height: "550px",
                            borderRadius: "10px",
                            marginTop: "2rem",
                          }}
                          alt="images"
                        />
                      )}
                      <div
                        style={{
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                        className="bg-[white] rounded-lg mt-2 mb-3"
                      >
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
            {selectedDiv === "Match Day By Day" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        {newMatchData?.map((item) => (
                          <div className="  flex flex-col gap-5">
                            <div className="bg-[#E6E6E7] h-[70px] font-semibold flex justify-start items-center pl-2">
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
                                        <span
                                          onClick={() =>
                                            navigate(
                                              `/live-cricket-scores/${formatTitle(
                                                item?.title
                                              )}-${formatTitle(
                                                item?.competition?.title
                                              )}/commentry/${item?.match_id}`
                                            )
                                          }
                                          className="text-slate-400"
                                        >
                                          {}
                                          {item?.title}
                                        </span>
                                        <br />
                                        <span className="text-slate-300">
                                          {convertDateTime(item?.date_start)} at{" "}
                                          {item?.venue?.name}
                                        </span>
                                      </div>
                                    ))}
                              </div>
                              {}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-[250px]">
                      {allSeries?.length > 0 && (
                        <div
                          style={{
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          }}
                          className="bg-[white] pb-3 rounded-lg mb-3"
                        >
                          <span
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "12px",
                              paddingLeft: "10px",
                              paddingTop: "10px",
                            }}
                          >
                            CURRENT SERIES
                          </span>
                          <div className="flex flex-col mt-4 gap-3 items-center text-center">
                            {allSeries?.map((item, index) => {
                              if (index >= 4) return null;
                              return (
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${formatTitle(
                                        item?.title
                                      )}/${item?.cid}`
                                    )
                                  }
                                  key={item?._id}
                                  style={{
                                    display: "grid",
                                    placeItems: "center",
                                    justifyContent: "center",
                                    width: "90%",
                                    margin: "auto",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    textAlign: "center",
                                    paddingTop: "0.5rem",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <p>{item?.title}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {middleBanner2 && (
                        <img
                          style={{
                            width: "100%",
                            height: "550px",
                            borderRadius: "10px",
                          }}
                          className="mb-3"
                          src={middleBanner2}
                          alt="middleBanner"
                        />
                      )}

                      <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
                        <div
                          style={{
                            boxShadow:
                              "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            padding: "10px",
                          }}
                          className="flex justify-between p-2"
                        >
                          <div
                            className="text-sm font-semibold"
                            style={{ fontSize: "12px" }}
                          >
                            RANKING’s
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                navigate("/icc-rankings/men/batting")
                              }
                              className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            >
                              View all
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button
                            onClick={() => setTeamSelector("test")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "test" ? "#0F19AF" : "black",
                              color:
                                teamSelector === "test" ? "white" : "black",
                              fontWeight:
                                teamSelector === "test" ? "bold" : "normal",
                            }}
                          >
                            Test
                          </button>
                          <button
                            onClick={() => setTeamSelector("odi")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "odi" ? "#0F19AF" : null,
                              color: teamSelector === "odi" ? "white" : "black",
                              fontWeight:
                                teamSelector === "odi" ? "bold" : "normal",
                            }}
                          >
                            ODI
                          </button>
                          <button
                            onClick={() => setTeamSelector("t20")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "t20" ? "#0F19AF" : null,
                              color: teamSelector === "t20" ? "white" : "black",
                              fontWeight:
                                teamSelector === "t20" ? "bold" : "normal",
                            }}
                          >
                            T20
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "teams" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "teams" ? "bold" : "normal",
                              color: "black",
                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("teams")}
                            className="text-[#0F19AF]"
                          >
                            Teams
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "batting"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "batting" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("batting")}
                          >
                            Batting
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "bowling"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "bowling" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("bowling")}
                          >
                            Bowling
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "alr" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "alr" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("alr")}
                          >
                            ALR
                          </div>
                        </div>
                        <table>
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Team</th>
                              <th className="w-[100px]">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mainCategory === "teams" && (
                              <>
                                {teamSelector === "test" &&
                                  test?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  t20s?.slice(0, 6).map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}

                                {teamSelector === "odi" &&
                                  odis?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                            {mainCategory === "batting" && (
                              <>
                                {teamSelector === "test" &&
                                  testBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "bowling" && (
                              <>
                                {teamSelector === "test" &&
                                  testBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "alr" && (
                              <>
                                {teamSelector === "test" &&
                                  testAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "odi" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On {new Date().toLocaleDateString()}
                        </div>
                      </div>

                      {bottomBanner1 && (
                        <img
                          src={bottomBanner1}
                          style={{
                            height: "550px",
                            borderRadius: "10px",
                            marginTop: "2rem",
                          }}
                          alt="images"
                        />
                      )}
                      <div
                        style={{
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        }}
                        className="bg-[white] rounded-lg mt-2 mb-3"
                      >
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
            {selectedDiv === "Teams" && (
              <>
                <div className="flex mt-2 justify-center pb-5">
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                      marginTop: "4rem",
                    }}
                  >
                    <p>Comming Soon ...</p>
                  </div>
                  {}
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

                    <div className="w-[250px]  mt-10">
                      {allSeries?.length > 0 && (
                        <div className="bg-[white] pb-3 pt-3 rounded-lg mb-3">
                          <span
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: "12px",
                              paddingLeft: "10px",
                            }}
                          >
                            CURRENT SERIES
                          </span>
                          <div className="flex flex-col mt-4 gap-3 items-center text-center">
                            {allSeries?.map((item, index) => {
                              if (index >= 4) return null;
                              return (
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${formatTitle(
                                        item?.title
                                      )}/${item?.cid}`
                                    )
                                  }
                                  key={item?._id}
                                  style={{
                                    display: "grid",
                                    placeItems: "center",
                                    justifyContent: "center",
                                    width: "90%",
                                    margin: "auto",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    textAlign: "center",
                                    paddingTop: "0.5rem",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <p>{item?.title}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {hompageBanner2?.image && (
                        <img
                          style={{
                            width: "100%",
                            height: "550px",
                            borderRadius: "10px",
                          }}
                          className="mb-3"
                          src={hompageBanner2?.image}
                          alt="middleBanner"
                        />
                      )}

                      <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
                        <div className="flex justify-between p-2">
                          <div
                            className="text-sm font-semibold"
                            style={{ fontSize: "12px" }}
                          >
                            RANKING’s
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                navigate("/icc-rankings/men/batting")
                              }
                              className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            >
                              View all
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between ml-2 mr-2">
                          <button
                            onClick={() => setTeamSelector("test")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "test" ? "#0F19AF" : "black",
                              color:
                                teamSelector === "test" ? "white" : "black",
                              fontWeight:
                                teamSelector === "test" ? "bold" : "normal",
                            }}
                          >
                            Test
                          </button>
                          <button
                            onClick={() => setTeamSelector("odi")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "odi" ? "#0F19AF" : null,
                              color: teamSelector === "odi" ? "white" : "black",
                              fontWeight:
                                teamSelector === "odi" ? "bold" : "normal",
                            }}
                          >
                            ODI
                          </button>
                          <button
                            onClick={() => setTeamSelector("t20")}
                            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                teamSelector === "t20" ? "#0F19AF" : null,
                              color: teamSelector === "t20" ? "white" : "black",
                              fontWeight:
                                teamSelector === "t20" ? "bold" : "normal",
                            }}
                          >
                            T20
                          </button>
                        </div>
                        <div className="flex justify-between m-2">
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "teams" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "teams" ? "bold" : "normal",
                              color: "black",
                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("teams")}
                            className="text-[#0F19AF]"
                          >
                            Teams
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "batting"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "batting" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("batting")}
                          >
                            Batting
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "bowling"
                                  ? "underline"
                                  : "none",
                              fontWeight:
                                mainCategory === "bowling" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("bowling")}
                          >
                            Bowling
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              textDecoration:
                                mainCategory === "alr" ? "underline" : "none",
                              fontWeight:
                                mainCategory === "alr" ? "bold" : "normal",

                              textDecorationColor: "#0F19AF",
                            }}
                            onClick={() => setMainCategory("alr")}
                          >
                            ALR
                          </div>
                        </div>
                        <table>
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th className="w-[100px]">Rank</th>
                              <th className="w-[100px]">Team</th>
                              <th className="w-[100px]">Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mainCategory === "teams" && (
                              <>
                                {teamSelector === "test" &&
                                  test?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  t20s?.slice(0, 6).map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}

                                {teamSelector === "odi" &&
                                  odis?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                            {mainCategory === "batting" && (
                              <>
                                {teamSelector === "test" &&
                                  testBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBestman
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "bowling" && (
                              <>
                                {teamSelector === "test" &&
                                  testBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "t20" &&
                                  t20Bolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                                {teamSelector === "odi" &&
                                  odiBolling
                                    ?.slice(0, 6)
                                    ?.map((item, index) => (
                                      <tr
                                        key={index}
                                        style={{ textAlign: "center" }}
                                      >
                                        <td className="text-center">
                                          {item?.rank}
                                        </td>
                                        <td className="text-center">
                                          {item?.team}
                                        </td>
                                        <td className="text-center">
                                          {item?.rating}
                                        </td>
                                      </tr>
                                    ))}
                              </>
                            )}
                            {mainCategory === "alr" && (
                              <>
                                {teamSelector === "test" &&
                                  testAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "t20" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                                {teamSelector === "odi" &&
                                  odiAlr?.slice(0, 6)?.map((item, index) => (
                                    <tr
                                      key={index}
                                      style={{ textAlign: "center" }}
                                    >
                                      <td className="text-center">
                                        {item?.rank}
                                      </td>
                                      <td className="text-center">
                                        {item?.team}
                                      </td>
                                      <td className="text-center">
                                        {item?.rating}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                          </tbody>
                        </table>
                        <div className="text-center text-[10px] mt-2">
                          Latest Updated On {new Date().toLocaleDateString()}
                        </div>
                      </div>

                      {hompageBanner3?.image && (
                        <img
                          src={hompageBanner3?.image}
                          style={{
                            height: "550px",
                            borderRadius: "10px",
                            marginTop: "2rem",
                          }}
                          alt="images"
                        />
                      )}
                      <div className="bg-[white] rounded-lg mt-2">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesById;

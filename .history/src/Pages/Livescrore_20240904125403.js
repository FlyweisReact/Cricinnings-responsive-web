/** @format */

import { useEffect, useState } from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import {
  GetData,
  baseUrl,
  convertStringFormat,
  formatTitle,
  getOrdinalSuffix,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import CurrentSeries from "../Components/CurrentSeries";
import { AdSideBanner, SpecialBox } from "../Components/HelpingComponent";
import RankingSeries from "../Components/RankingSeries";

const Livescrore = () => {
  const location = useLocation();

  const initialLocation =
    location.pathname === "/live-cricket-scores/Schedule"
      ? "Match Day By Day"
      : location.pathname === "/live-cricket-scores/Allseries"
      ? "Current & Future Series"
      : "Current Matches";
  const [selectedDiv, setSelectedDiv] = useState(initialLocation);
  const [category, setCategory] = useState("international");
  const [liveCategory, setLiveCategory] = useState("3");
  const [specialBanner, setSpecialBanner] = useState([]);
  const [competationsType, setCompetationsType] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
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

  const navigate = useNavigate();

  const getWinningTeamName = (match) => {
    if (match?.match?.status_note === "Match Drawn") {
      return "Match Drawn";
    }

    const winningTeamId = match?.match?.winning_team_id;

    // if (!winningTeamId) return "No winner yet";

    if (match?.match?.teama?.team_id === winningTeamId) {
      return match?.match?.teama?.name;
    } else if (match?.match?.teamb?.team_id === winningTeamId) {
      return match?.match?.teamb?.name;
    } else {
      return "";
    }
  };

  function formatTime11(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  const formatDateStringRkt = (dateString) => {
    const date = new Date(dateString?.replace(" ", "T"));

    const monthNames = [
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

    const month = monthNames[date.getMonth()];

    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${month} ${
      day < 10 ? "0" + day : day
    } • ${hours}:${formattedMinutes} ${ampm}`;
  };

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
      const res1 = await GetData("admin/getAllPosts");
      const middleBanner = res1?.data?.filter(
        (item) => item?.title === "LiveScore_middle"
      );
      const bottomBanner = res1?.data?.filter(
        (item) => item?.title === "LiveScore_bottom"
      );
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
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

  function convertMonthAndYearR(monthAndYear) {
    const date = new Date(monthAndYear);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatDateRangeR(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startOptions = { month: "short", day: "numeric" };
    const endOptions = { month: "short", day: "numeric" };

    const startFormatted = startDate.toLocaleDateString("en-US", startOptions);
    const endFormatted = endDate.toLocaleDateString("en-US", endOptions);

    return `${startFormatted} - ${endFormatted}`;
  }

  useEffect(() => {
    getAllSeriesData();
    getAllTeamRankingsData();
    getAllSpecialBanners();
  }, []);

  const [newMatchData, setNewMatchData] = useState([]);

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
        `${baseUrl}user/getcompetitionsMatchesListDayByDay?category=${category}&status=1`
      )
      .then((res) => {
        setNewMatchData(res?.data?.response?.matches);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllNewMatches();
  }, [category]);

  const [comp1, setComp1] = useState([]);

  const getAllCompetation1 = async () => {
    const current_year = new Date().getFullYear();
    const category1 =
      liveCategory === "live" ? "3" : liveCategory === "recent" ? "2" : "1";
    const res = await axios
      .get(
        `${baseUrl}user/getcompetitionsMatchesList?status=${liveCategory}&category=${category}`
      )
      .then((res) => {
        setComp1(res?.data?.response);
      })
      .catch((err) => {});
  };

  const getAllCompetationsType = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/getCompetitionsListByMonthAndDate?per_page=30&paged=1&category=${category}`
      );

      const actualData = res?.data?.response?.competitionsByMonthAndYear;

      setCompetationsType(actualData);
    } catch (err) {
      console.error("Error fetching competitions:", err);
    }
  };

  const [seriesArchiveInternation, setSeriesArchiveInternation] = useState([]);
  const [seriesArchiveDomestic, setSeriesArchiveDomestic] = useState([]);
  const [seriesArchiveYouth, setSeriesArchiveYouth] = useState([]);
  const [seriesArchiveWomen, setSeriesArchiveWomen] = useState([]);
  const currentYear = new Date().getFullYear();
  const [seriesArchieveSeason, setSeriesArchieveSeason] = useState(currentYear);

  const getAllCompetationsTypeR = async (currentCategory) => {
    const current_year = new Date().getFullYear();
    const res = await axios
      .get(
        `${baseUrl}user/getAllCompetitionsList?category=${currentCategory}&status=result&per_page=30&page=1&season=${seriesArchieveSeason}`
      )
      .then((res) => {
        console.log(res?.data);
        if (currentCategory === "international") {
          const reverseData = res?.data?.competitions?.reverse();
          setSeriesArchiveInternation(reverseData);
        } else if (currentCategory === "domestic") {
          const reverseData2 = res?.data?.competitions?.reverse();
          setSeriesArchiveDomestic(reverseData2);
        } else if (currentCategory === "youth") {
          const reverseData3 = res?.data?.competitions?.reverse();
          setSeriesArchiveYouth(reverseData3);
        } else if (currentCategory === "women") {
          const reverseData4 = res?.data?.competitions?.reverse();
          setSeriesArchiveWomen(reverseData4);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllCompetationsTypeR("international");
    getAllCompetationsTypeR("domestic");
    getAllCompetationsTypeR("youth");
    getAllCompetationsTypeR("women");
  }, [seriesArchieveSeason]);

  const formatDate22 = (dateString) => {
    const date = new Date(dateString);

    const options = { month: "short", day: "numeric" };

    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getAllCompetation1();
  }, [liveCategory, category]);

  useEffect(() => {
    getAllCompetationsType();
  }, [category, liveCategory]);

  useEffect(() => {}, []);

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllSpecialBanners();
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setSelectedDiv("Match Day By Day");
      setCategory("international");
    }
    if (pathname.includes("/cricket-match/live-scores/upcoming-matches")) {
      setSelectedDiv("Current Matches");
      setLiveCategory("1");
    } else if (pathname.includes("/cricket-match/live-scores/recent-matches")) {
      setSelectedDiv("Current Matches");
      setLiveCategory("2");
    } else if (pathname.includes("/cricket-match/live-scores")) {
      setSelectedDiv("Current Matches");
      setLiveCategory("3");
    } else if (pathname.includes("/cricket-schedule/series")) {
      setSelectedDiv("Current & Future Series");
    } else if (
      pathname.includes("/cricket-schedule/upcoming-series/international")
    ) {
      setSelectedDiv("Match Day By Day");
      setCategory("international");
    } else if (pathname.includes("/cricket-schedule/upcoming-series/league")) {
      setSelectedDiv("Match Day By Day");
      setCategory("youth");
    } else if (
      pathname.includes("/cricket-schedule/upcoming-series/domestic")
    ) {
      setSelectedDiv("Match Day By Day");
      setCategory("domestic");
    } else if (pathname.includes("/cricket-schedule/upcoming-series/women")) {
      setSelectedDiv("Match Day By Day");
      setCategory("women");
    } else if (pathname.includes("/cricket-scorecard-archives")) {
      setSelectedDiv("Series Archive");
    }
  }, [pathname]);

  const groupedMatches = newMatchData?.reduce((acc, item) => {
    const date = convertDate1(item?.date_start_ist);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="">
      {selectedDiv === "Current Matches" &&
      (liveCategory === "3" || liveCategory === "2" || liveCategory === "1") ? (
        <Helmet>
          <title>
            {`Live Cricket Score | Scorecard | Live Commentary | Cricinnings.com`}
          </title>
          <meta
            name="description"
            content={`Live cricket score | Live scorecard | Live commentary | Cricinnings.com`}
          />
        </Helmet>
      ) : selectedDiv === "Current & Future Series" ? (
        <Helmet>
          <title>
            {`Cricket Schedule - Upcomming international, domestic, youth and women series`}
          </title>
          <meta
            name="description"
            content={`Cricket Schedule - Upcomming international, domestic, youth and women series`}
          />
        </Helmet>
      ) : selectedDiv === "Match Day By Day" ? (
        <Helmet>
          <title>
            {`Cricket Schedule - international, domestic, youth and women matches -`}
          </title>
          <meta
            name="description"
            content={`Cricket Schedule - international, domestic, youth and women matches -`}
          />
        </Helmet>
      ) : selectedDiv === "Series Archive" ? (
        <Helmet>
          <title>
            {`Cricket Archives - Series results, scorecard for | Cricinnings.com`}
          </title>
          <meta
            name="description"
            content={`Cricket Archives - Series results, scorecard for | Cricinnings.com`}
          />
        </Helmet>
      ) : (
        ""
      )}

      <section className="livescore-component">
        <p className="heading">Live Cricket Score</p>

        <ul className="tabs-list">
          <li
            className={selectedDiv === "Current Matches" ? "active" : ""}
            onClick={() => navigate("/cricket-match/live-scores")}
          >
            Current Matches
          </li>
          <li
            className={
              selectedDiv === "Current & Future Series" ? "active" : ""
            }
            onClick={() => navigate("/cricket-schedule/series")}
          >
            Current & Future Series
          </li>
          <li
            className={selectedDiv === "Match Day By Day" ? "active" : ""}
            onClick={() =>
              navigate("/cricket-schedule/upcoming-series/international")
            }
          >
            Match Day By Day
          </li>
          <li
            className={selectedDiv === "Series Archive" ? "active" : ""}
            onClick={() => navigate("/cricket-scorecard-archives")}
          >
            Series Archive
          </li>
        </ul>

        {selectedDiv === "Match Day By Day" ? (
          <>
            <div
              style={{ display: selectedDiv === "Teams" ? "none" : "" }}
              className="btns-tabs"
            >
              <button
                onClick={() => {
                  navigate("/cricket-schedule/upcoming-series/international");
                }}
                className={category === "international" ? "active" : ""}
              >
                International
              </button>
              <button
                onClick={() => {
                  navigate("/cricket-schedule/upcoming-series/league");
                }}
                className={category === "youth" ? "active" : ""}
              >
                League
              </button>
              <button
                onClick={() => {
                  navigate("/cricket-schedule/upcoming-series/domestic");
                }}
                className={category === "domestic" ? "active" : ""}
              >
                Domestic
              </button>
              <button
                onClick={() => {
                  navigate("/cricket-schedule/upcoming-series/women");
                }}
                className={category === "women" ? "active" : ""}
              >
                Women
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              display:
                selectedDiv === "Teams"
                  ? "none"
                  : selectedDiv === "Series Archive"
                  ? "none"
                  : "flex",
              marginTop:
                selectedDiv === "Teams"
                  ? "0rem"
                  : selectedDiv === "Series Archive"
                  ? "0rem"
                  : "1rem",
            }}
            className="btns-tabs"
          >
            <button
              onClick={() => setCategory("international")}
              className={category === "international" ? "active" : ""}
            >
              International
            </button>
            <button
              onClick={() => setCategory("youth")}
              className={category === "youth" ? "active" : ""}
            >
              League
            </button>
            <button
              onClick={() => setCategory("domestic")}
              className={category === "domestic" ? "active" : ""}
            >
              Domestic
            </button>

            <button
              onClick={() => setCategory("women")}
              className={category === "women" ? "active" : ""}
            >
              Women
            </button>
          </div>
        )}

        {selectedDiv && (
          <div>
            {/* --Done-- */}
            {selectedDiv === "Current Matches" && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p
                    style={{
                      cursor: "pointer",
                      color: liveCategory === "3" ? "#0F19AF" : "black",
                    }}
                    onClick={() => navigate("/cricket-match/live-scores")}
                  >
                    Live
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: liveCategory === "2" ? "#0F19AF" : "black",
                    }}
                    onClick={() =>
                      navigate("/cricket-match/live-scores/recent-matches")
                    }
                  >
                    Recent
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: liveCategory === "1" ? "#0F19AF" : "black",
                    }}
                    onClick={() =>
                      navigate("/cricket-match/live-scores/upcoming-matches")
                    }
                  >
                    Upcoming
                  </p>
                </div>

                {comp1?.length === 0 && (
                  <div className="match-heading-div">
                    {" "}
                    There are no matches at the moment. Please check back later.{" "}
                  </div>
                )}

                {comp1[0]?.competition?.title && (
                  <>
                    <div
                      onClick={() =>
                        navigate(
                          `/cricket-series/${
                            comp1[0]?.competition?.cid
                          }/${formatTitle(comp1[0]?.competition?.title)}-${
                            comp1[0]?.matches?.[0]?.match?.competition?.season
                          }/matches`
                        )
                      }
                      className="match-heading-div cursor-pointer"
                    >
                      {comp1[0]?.competition?.title}
                      {","}
                      {comp1[0]?.competition?.season ||
                        comp1[0]?.matches?.[0]?.match?.competition?.season}
                    </div>
                  </>
                )}

                <div className="match-score-detail-container margin-div">
                  <div className="all-container">
                    <div className="left-section">
                      {comp1[0]?.matches?.map((item, index) => {
                        return (
                          <div key={index} className="custom-card">
                            <p className="heading">
                              {" "}
                              {item?.match?.title}
                              {","} {item?.match?.subtitle}
                            </p>

                            <p className="venue">
                              {formatDateStringRkt(item?.match?.date_start_ist)}{" "}
                              at {item?.match?.venue?.name}
                              {" ,"}
                              {item?.match?.venue?.location}
                            </p>

                            <div
                              onClick={() =>
                                navigate(
                                  `/live-cricket-scores/${
                                    item?.match?.match_id
                                  }/${formatTitle(
                                    item?.match?.short_title
                                  )}-${convertStringFormat(
                                    item?.match?.subtitle
                                  )}-${formatTitle(
                                    item?.match?.competition?.title
                                  )}-${item?.match?.competition?.season?.toLowerCase()}`
                                )
                              }
                              className="blank-screen cursor-pointer"
                            >
                              <div className="content">
                                <div className="main">
                                  <div className="flex gap-5 text-white text-here">
                                    <span>{item?.match?.teama?.name}</span>
                                    <span>
                                      {item?.match?.teama?.scores_full}
                                    </span>
                                  </div>
                                  <div className="flex gap-7 text-white text-here">
                                    <span>{item?.match?.teamb?.name}</span>
                                    <span>
                                      {item?.match?.teamb?.scores_full}
                                    </span>
                                  </div>
                                  <div className="text-slate-300 text-here">
                                    {getWinningTeamName(item)}{" "}
                                    {item?.match?.win_margin
                                      ? ` won by ${item?.match?.win_margin}`
                                      : ""}
                                  </div>
                                </div>

                                <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                  <IoCaretForwardOutline />
                                </div>
                              </div>
                            </div>

                            <ul className="links">
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-scores/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Live Score
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-scorecard/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Scorecard
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-full-commentary/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Full Commentary
                              </li>
                              <li onClick={() => navigate(`/cricket-news`)}>
                                News
                              </li>
                            </ul>
                          </div>
                        );
                      })}

                      {comp1?.slice(1)?.map((item) => {
                        return (
                          <>
                            {item?.competition?.title && (
                              <>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${
                                        item?.competition?.cid
                                      }/${formatTitle(
                                        item?.competition?.title
                                      )}-${
                                        item?.matches?.[0]?.match?.competition
                                          ?.season
                                      }/matches`
                                    )
                                  }
                                  className="match-heading-div cursor-pointer"
                                >
                                  {item?.competition?.title}
                                  {","}{" "}
                                  {item?.competition?.season ||
                                    item?.matches?.[0]?.match?.competition
                                      ?.season}
                                </div>
                              </>
                            )}

                            {item?.matches?.map((item, index) => {
                              return (
                                <div key={index} className="custom-card">
                                  <p className="heading">
                                    {" "}
                                    {item?.match?.title}
                                    {","} {item?.match?.subtitle}
                                  </p>

                                  <p className="venue">
                                    {formatDateStringRkt(
                                      item?.match?.date_start_ist
                                    )}{" "}
                                    at {item?.match?.venue?.name}
                                    {" ,"}
                                    {item?.match?.venue?.location}
                                  </p>

                                  <div
                                    onClick={() =>
                                      navigate(
                                        `/live-cricket-scores/${
                                          item?.match?.match_id
                                        }/${formatTitle(
                                          item?.match?.short_title
                                        )}-${
                                          item?.match?.competition?.type ===
                                          "tournament"
                                            ? `match-${getOrdinalSuffix(
                                                item?.match?.match_number
                                              )}`
                                            : `${getOrdinalSuffix(
                                                item?.match?.match_number
                                              )}-${item?.match?.format_str
                                                ?.toLowerCase()
                                                ?.split(" ")
                                                ?.join("-")}`
                                        }-${formatTitle(
                                          item?.match?.competition?.title
                                        )}-${item?.match?.competition?.season?.toLowerCase()}`
                                      )
                                    }
                                    className="blank-screen cursor-pointer"
                                  >
                                    <div className="content">
                                      <div className="main">
                                        <div className="flex gap-5 text-white text-here">
                                          <span>
                                            {item?.match?.teama?.name}
                                          </span>
                                          <span>
                                            {item?.match?.teama?.scores_full}
                                          </span>
                                        </div>
                                        <div className="flex gap-7 text-white text-here">
                                          <span>
                                            {item?.match?.teamb?.name}
                                          </span>
                                          <span>
                                            {item?.match?.teamb?.scores_full}
                                          </span>
                                        </div>
                                        <div className="text-slate-300 text-here">
                                          {getWinningTeamName(item)} won by{" "}
                                          {item?.match?.win_margin}
                                        </div>
                                      </div>
                                      <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                        <IoCaretForwardOutline />
                                      </div>
                                    </div>
                                  </div>
                                  <ul className="links">
                                    <li
                                      onClick={() =>
                                        navigate(
                                          `/live-cricket-scores/${
                                            item?.match?.match_id
                                          }/${formatTitle(
                                            item?.match?.short_title
                                          )}-${
                                            item?.match?.competition?.type ===
                                            "tournament"
                                              ? `match-${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}`
                                              : `${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}-${item?.match?.format_str
                                                  ?.toLowerCase()
                                                  ?.split(" ")
                                                  ?.join("-")}`
                                          }-${formatTitle(
                                            item?.match?.competition?.title
                                          )}-${item?.match?.competition?.season?.toLowerCase()}`
                                        )
                                      }
                                    >
                                      Live Score
                                    </li>
                                    <li
                                      onClick={() => {
                                        navigate(
                                          `/live-cricket-scorecard/${
                                            item?.match?.match_id
                                          }/${formatTitle(
                                            item?.match?.teama?.short_name
                                          )}-vs-${formatTitle(
                                            item?.match?.teamb?.short_name
                                          )}-${
                                            item?.match?.competition?.type ===
                                            "tournament"
                                              ? `match-${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}`
                                              : `${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}-${item?.match?.format_str
                                                  ?.toLowerCase()
                                                  ?.split(" ")
                                                  ?.join("-")}`
                                          }-${formatTitle(
                                            item?.match?.competition?.title
                                          )}-${item?.match?.competition?.season?.toLowerCase()}`
                                        );
                                      }}
                                    >
                                      Scorecard
                                    </li>
                                    <li
                                      onClick={() => {
                                        item?.match?.match_id &&
                                          navigate(
                                            `/live-cricket-full-commentary/${
                                              item?.match?.match_id
                                            }/${formatTitle(
                                              item?.match?.teama?.short_name
                                            )}-vs-${formatTitle(
                                              item?.match?.teamb?.short_name
                                            )}-${
                                              item?.match?.competition?.type ===
                                              "tournament"
                                                ? `match-${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}`
                                                : `${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}-${item?.match?.format_str
                                                    ?.toLowerCase()
                                                    ?.split(" ")
                                                    ?.join("-")}`
                                            }-${formatTitle(
                                              item?.match?.competition?.title
                                            )}-${item?.match?.competition?.season?.toLowerCase()}`
                                          );
                                      }}
                                    >
                                      Full Commentary
                                    </li>
                                    <li
                                      onClick={() => navigate(`/cricket-news`)}
                                    >
                                      News
                                    </li>
                                  </ul>
                                </div>
                              );
                            })}
                          </>
                        );
                      })}
                    </div>

                    <div className="right-section">
                      <CurrentSeries />
                      <AdSideBanner img={middleBanner2} />
                      <RankingSeries />
                      <AdSideBanner img={bottomBanner1} />
                      <SpecialBox />
                    </div>
                  </div>
                </div>

                <div className="match-score-detail-container margin-div">
                  <div className="all-container">
                    <div className="left-section">
                      {comp1[0]?.matches?.map((item, index) => {
                        return (
                          <div key={index} className="custom-card">
                            <p className="heading">
                              {item?.match?.title}
                              {","} {item?.match?.subtitle}{" "}
                            </p>

                            <p className="venue">
                              {formatDateStringRkt(item?.match?.date_start_ist)}{" "}
                              at {item?.match?.venue?.name}
                              {" ,"}
                              {item?.match?.venue?.location}
                            </p>

                            <div
                              onClick={() =>
                                navigate(
                                  `/live-cricket-scores/${
                                    item?.match?.match_id
                                  }/${formatTitle(
                                    item?.match?.short_title
                                  )}-${convertStringFormat(
                                    item?.match?.subtitle
                                  )}-${formatTitle(
                                    item?.match?.competition?.title
                                  )}-${item?.match?.competition?.season?.toLowerCase()}`
                                )
                              }
                              className="blank-screen cursor-pointer"
                            >
                              <div className="content">
                                <div className="main">
                                  <div className="flex gap-5 text-white text-here">
                                    <span>{item?.match?.teama?.name}</span>
                                    <span>
                                      {item?.match?.teama?.scores_full}
                                    </span>
                                  </div>
                                  <div className="flex gap-7 text-white text-here">
                                    <span>{item?.match?.teamb?.name}</span>
                                    <span>
                                      {item?.match?.teamb?.scores_full}
                                    </span>
                                  </div>
                                  <div className="text-slate-300 text-here">
                                    {getWinningTeamName(item)}{" "}
                                    {item?.match?.win_margin
                                      ? ` won by ${item?.match?.win_margin}`
                                      : ""}
                                  </div>
                                </div>
                                <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                  <IoCaretForwardOutline />
                                </div>
                              </div>
                            </div>

                            <ul className="links">
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-scores/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Live Score
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-scorecard/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Scorecard
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/live-cricket-full-commentary/${
                                      item?.match?.match_id
                                    }/${formatTitle(
                                      item?.match?.short_title
                                    )}-${convertStringFormat(
                                      item?.match?.subtitle
                                    )}-${formatTitle(
                                      item?.match?.competition?.title
                                    )}-${item?.match?.competition?.season?.toLowerCase()}`
                                  )
                                }
                              >
                                Full Commentary
                              </li>
                              <li onClick={() => navigate(`/cricket-news`)}>
                                News
                              </li>
                            </ul>
                          </div>
                        );
                      })}

                      {comp1?.slice(1)?.map((item) => {
                        return (
                          <>
                            {item?.competition?.title && (
                              <>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${
                                        item?.competition?.cid
                                      }/${formatTitle(
                                        item?.competition?.title
                                      )}-${
                                        item?.matches?.[0]?.match?.competition
                                          ?.season
                                      }/matches`
                                    )
                                  }
                                  className="match-heading-div cursor-pointer"
                                >
                                  {item?.competition?.title}
                                  {","}{" "}
                                  {item?.competition?.season ||
                                    item?.matches?.[0]?.match?.competition
                                      ?.season}
                                </div>
                              </>
                            )}

                            <div className="flex flex-col gap-5">
                              {item?.matches?.map((item, index) => {
                                return (
                                  <div key={index} className="custom-card">
                                    <p className="heading">
                                      {item?.match?.title}
                                      {","} {item?.match?.subtitle}{" "}
                                    </p>

                                    <p className="venue">
                                      {formatDateStringRkt(
                                        item?.match?.date_start_ist
                                      )}{" "}
                                      at {item?.match?.venue?.name}
                                      {" ,"}
                                      {item?.match?.venue?.location}
                                    </p>

                                    <div
                                      onClick={() =>
                                        navigate(
                                          `/live-cricket-scores/${
                                            item?.match?.match_id
                                          }/${formatTitle(
                                            item?.match?.short_title
                                          )}-${
                                            item?.match?.competition?.type ===
                                            "tournament"
                                              ? `match-${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}`
                                              : `${getOrdinalSuffix(
                                                  item?.match?.match_number
                                                )}-${item?.match?.format_str
                                                  ?.toLowerCase()
                                                  ?.split(" ")
                                                  ?.join("-")}`
                                          }-${formatTitle(
                                            item?.match?.competition?.title
                                          )}-${item?.match?.competition?.season?.toLowerCase()}`
                                        )
                                      }
                                      className="blank-screen cursor-pointer"
                                    >
                                      <div className="content">
                                        <div className="main">
                                          <div className="flex gap-5 text-white text-here">
                                            <span>
                                              {item?.match?.teama?.name}
                                            </span>
                                            <span>
                                              {item?.match?.teama?.scores_full}
                                            </span>
                                          </div>
                                          <div className="flex gap-7 text-white text-here">
                                            <span>
                                              {item?.match?.teamb?.name}
                                            </span>
                                            <span>
                                              {item?.match?.teamb?.scores_full}
                                            </span>
                                          </div>
                                          <div className="text-slate-300 text-here">
                                            {getWinningTeamName(item)} won by{" "}
                                            {item?.match?.win_margin}
                                          </div>
                                        </div>
                                        <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                          <IoCaretForwardOutline />
                                        </div>
                                      </div>
                                    </div>

                                    <ul className="links">
                                      <li
                                        onClick={() =>
                                          navigate(
                                            `/live-cricket-scores/${
                                              item?.match?.match_id
                                            }/${formatTitle(
                                              item?.match?.short_title
                                            )}-${
                                              item?.match?.competition?.type ===
                                              "tournament"
                                                ? `match-${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}`
                                                : `${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}-${item?.match?.format_str
                                                    ?.toLowerCase()
                                                    ?.split(" ")
                                                    ?.join("-")}`
                                            }-${formatTitle(
                                              item?.match?.competition?.title
                                            )}-${item?.match?.competition?.season?.toLowerCase()}`
                                          )
                                        }
                                      >
                                        Live Score
                                      </li>
                                      <li
                                        onClick={() => {
                                          navigate(
                                            `/live-cricket-scorecard/${
                                              item?.match?.match_id
                                            }/${formatTitle(
                                              item?.match?.teama?.short_name
                                            )}-vs-${formatTitle(
                                              item?.match?.teamb?.short_name
                                            )}-${
                                              item?.match?.competition?.type ===
                                              "tournament"
                                                ? `match-${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}`
                                                : `${getOrdinalSuffix(
                                                    item?.match?.match_number
                                                  )}-${item?.match?.format_str
                                                    ?.toLowerCase()
                                                    ?.split(" ")
                                                    ?.join("-")}`
                                            }-${formatTitle(
                                              item?.match?.competition?.title
                                            )}-${item?.match?.competition?.season?.toLowerCase()}`
                                          );
                                        }}
                                      >
                                        Scorecard
                                      </li>
                                      <li
                                        onClick={() => {
                                          item?.match?.match_id &&
                                            navigate(
                                              `/live-cricket-full-commentary/${
                                                item?.match?.match_id
                                              }/${formatTitle(
                                                item?.match?.teama?.short_name
                                              )}-vs-${formatTitle(
                                                item?.match?.teamb?.short_name
                                              )}-${
                                                item?.match?.competition
                                                  ?.type === "tournament"
                                                  ? `match-${getOrdinalSuffix(
                                                      item?.match?.match_number
                                                    )}`
                                                  : `${getOrdinalSuffix(
                                                      item?.match?.match_number
                                                    )}-${item?.match?.format_str
                                                      ?.toLowerCase()
                                                      ?.split(" ")
                                                      ?.join("-")}`
                                              }-${formatTitle(
                                                item?.match?.competition?.title
                                              )}-${item?.match?.competition?.season?.toLowerCase()}`
                                            );
                                        }}
                                      >
                                        Full Commentary
                                      </li>
                                      <li
                                        onClick={() =>
                                          navigate(`/cricket-news`)
                                        }
                                      >
                                        News
                                      </li>
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        );
                      })}
                    </div>

                    <div className="right-section"></div>
                  </div>
                </div>
              </>
            )}
            {/* ---- */}

            {selectedDiv === "Current & Future Series" && (
              <>
                <div className="future-series-container-head">
                  <div className="w-[700px] flex items-center gap-[13.5rem] pl-5 ">
                    <div className="font-semibold">Month</div>
                    <div className="font-semibold">Series Name</div>
                  </div>
                </div>

                <div className="future-series-container-boxes-container">
                  <div className="boxes">
                    {competationsType?.map((item) => (
                      <div className="box">
                        <div className="month-container">
                          {convertMonthAndYearR(item?.monthAndYear)}
                        </div>
                        <div className="text-slate-400 series-container">
                          <span>
                            {item?.competitions?.map((competition, index) => {
                              return (
                                <p
                                  onClick={() =>
                                    navigate(
                                      `/cricket-series/${
                                        competition?.cid
                                      }/${formatTitle(competition?.title)}-${
                                        competition?.season
                                      }/matches`
                                    )
                                  }
                                  className="cursor-pointer flex flex-col text-black hover:underline"
                                  key={index}
                                >
                                  <span>
                                    <h1 className="text-base">
                                      {competition?.title}{" "}
                                      {competition?.datestart?.slice(0, 4) ===
                                      competition?.dateend?.slice(0, 4)
                                        ? `${competition?.datestart?.slice(
                                            0,
                                            4
                                          )}`
                                        : `${competition?.datestart?.slice(
                                            0,
                                            4
                                          )}-${competition?.dateend?.slice(
                                            2,
                                            4
                                          )}`}
                                    </h1>
                                  </span>
                                  <span>
                                    {formatDateRangeR(
                                      competition?.datestart,
                                      competition?.dateend
                                    )}
                                  </span>
                                </p>
                                // </Link>
                              );
                            })}
                          </span>

                          <hr className="mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedDiv === "Match Day By Day" && (
              <>
                <div className="cricket-schedule-day-container">
                  <div className="main-section">
                    {Object?.keys(groupedMatches).map((date, index) => (
                      <div key={index}>
                        <div className="match-heading-div">{date}</div>

                        {groupedMatches[date]?.map((item, index) => (
                          <div key={index} className="grid-card">
                            <div className="item-content">
                              <h1
                                className="text-base font-bold text-black pl-1 cursor-pointer hover:underline first-head small-text"
                                onClick={() =>
                                  navigate(
                                    `/cricket-series/${
                                      item?.competition?.cid
                                    }/${formatTitle(
                                      item?.competition?.title
                                    )}-${item?.competition?.season}/matches`
                                  )
                                }
                              >
                                {item?.competition?.title},{" "}
                                {item?.competition?.season}-
                                {item?.competition?.dateend?.slice(2, 4)}
                              </h1>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                onClick={() => {
                                  navigate(
                                    `/live-cricket-scores/${
                                      item?.match_id
                                    }/${formatTitle(
                                      item?.teama?.short_name
                                    )}-vs-${item?.teamb?.short_name
                                      ?.toLowerCase()
                                      .split(" ")
                                      .join("-")}-${
                                      item?.competition?.type === "tournament"
                                        ? `match-${getOrdinalSuffix(
                                            item?.match_number
                                          )}`
                                        : `${getOrdinalSuffix(
                                            item?.match_number
                                          )}-${item?.format_str
                                            ?.toLowerCase()
                                            ?.split(" ")
                                            ?.join("-")}`
                                    }-${formatTitle(
                                      item?.competition?.title
                                    )}-${item?.competition?.season?.toLowerCase()}`
                                  );
                                }}
                              >
                                <span className="text-black hover:underline hover:cursor-pointer">
                                  <h1 className="text-base location-name">
                                    {item?.teama?.name && item?.teamb?.name
                                      ? `${item.teama.name} vs ${item.teamb.name}`
                                      : "Match details not available"}
                                    , {item?.subtitle}{" "}
                                    {item?.format_str === "Test" &&
                                      `, Day ${item?.day}`}
                                  </h1>
                                </span>

                                <span
                                  style={{ color: "#707071" }}
                                  className="xs-small-text"
                                >
                                  {item?.venue?.name?.split(",")?.[0]},{" "}
                                  {item?.venue?.location}
                                </span>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingRight: "3rem",
                              }}
                            >
                              <span
                                style={{ color: "black" }}
                                className="xs-small-text"
                              >
                                {formatTime11(item?.date_start_ist)}
                              </span>
                              <span
                                style={{
                                  color: "#707071",
                                  fontSize: "15px",
                                }}
                                className="xs-small-text"
                              >
                                {formatTime11(item?.date_start)} GMT /{" "}
                                {formatTime11(item?.date_start_ist)} Local
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
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
              <div className="series-archieve-container">
                <Table className="mb-2" responsive>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#028062",
                          fontWeight: "bold",
                        }}
                      >
                        International
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th style={{ color: "#000", fontWeight: "bold" }}>
                        {" "}
                        {seriesArchiveInternation?.map((item, index) => (
                          <p
                            key={index}
                            style={{
                              color: "#000",
                              fontWeight: "bold",
                              cursor: "pointer",
                              display: "flex",
                            }}
                            onClick={() =>
                              navigate(
                                `/cricket-series/${item?.cid}/${formatTitle(
                                  item?.title
                                )}-${item?.season}/matches`
                              )
                            }
                          >
                            <span>
                              <h1 className="text-base font-bold hover:underline hover:cursor-pointer xs-small-text">
                                {item?.title}
                                {","} {item?.season}
                              </h1>
                            </span>
                            <span
                              style={{
                                marginLeft: "2rem",
                                color: "gray",
                                fontWeight: "normal",
                              }}
                              className="xs-small-text"
                            >
                              {formatDate22(item?.datestart)}-
                              {formatDate22(item?.dateend)}
                            </span>
                          </p>
                        ))}
                      </th>
                    </tr>
                  </thead>
                </Table>

                <Table className="mb-2" responsive>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#028062",
                          fontWeight: "bold",
                        }}
                      >
                        Domestic
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th style={{ color: "#000", fontWeight: "bold" }}>
                        {" "}
                        {seriesArchiveDomestic?.map((item, index) => (
                          <p
                            key={index}
                            style={{
                              color: "#000",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(
                                `/cricket-series/${item?.cid}/${formatTitle(
                                  item?.title
                                )}-${item?.season}/matches`
                              )
                            }
                            className="xs-small-text"
                          >
                            {item?.title}
                            {","} {item?.season}
                            <span
                              style={{
                                marginLeft: "2rem",
                                color: "gray",
                                fontWeight: "normal",
                              }}
                            >
                              {formatDate22(item?.datestart)}-
                              {formatDate22(item?.dateend)}
                            </span>
                          </p>
                        ))}
                      </th>
                    </tr>
                  </thead>
                </Table>
                <Table className="mb-2" responsive>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#028062",
                          fontWeight: "bold",
                        }}
                      >
                        League
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        {seriesArchiveYouth?.map((item, index) => (
                          <p
                            key={index}
                            style={{
                              color: "#000",
                              fontWeight: "bold",
                            }}
                            onClick={() =>
                              navigate(
                                `/cricket-series/${item?.cid}/${formatTitle(
                                  item?.title
                                )}-${item?.season}/matches`
                              )
                            }
                            className="xs-small-text"
                          >
                            {item?.title}
                            {","} {item?.season}
                            <span
                              style={{
                                marginLeft: "2rem",
                                color: "gray",
                                fontWeight: "normal",
                              }}
                            >
                              {formatDate22(item?.datestart)}-
                              {formatDate22(item?.dateend)}
                            </span>
                          </p>
                        ))}
                      </th>
                    </tr>
                  </thead>
                </Table>
                <Table className="mb-2" responsive>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#028062",
                          fontWeight: "bold",
                        }}
                      >
                        Women
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th style={{ color: "#000", fontWeight: "bold" }}>
                        {" "}
                        {seriesArchiveWomen?.map((item, index) => (
                          <p
                            key={index}
                            style={{
                              color: "#000",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(
                                `/cricket-series/${item?.cid}/${formatTitle(
                                  item?.title
                                )}-${item?.season}/matches`
                              )
                            }
                            className="xs-small-text"
                          >
                            {item?.title}
                            {","} {item?.season}
                            <span
                              style={{
                                marginLeft: "2rem",
                                color: "gray",
                                fontWeight: "normal",
                              }}
                            >
                              {formatDate22(item?.datestart)}-
                              {formatDate22(item?.dateend)}
                            </span>
                          </p>
                        ))}
                      </th>
                    </tr>
                  </thead>
                </Table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Livescrore;

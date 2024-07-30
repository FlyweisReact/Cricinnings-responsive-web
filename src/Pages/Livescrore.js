import { useEffect, useState } from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import {
  GetData,
  GetDataWithToken,
  baseUrl,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Livescrore = () => {
  const location = useLocation();

  const initialLocation =
    location.pathname === "/live-cricket-scores/Schedule"
      ? "Match Day By Day"
      : location.pathname === "/live-cricket-scores/Allseries"
      ? "Current & Future Series"
      : "Current Matches";
  const [selectedDiv, setSelectedDiv] = useState(initialLocation);
  const [currentSeries, setCurrentSeries] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [category, setCategory] = useState("international");
  const [liveCategory, setLiveCategory] = useState("live");
  const [specialBanner, setSpecialBanner] = useState([]);
  const [competationsType, setCompetationsType] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
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
  const [t20Alr, setT20Alr] = useState([]);
  const [testAlr, setTestAlr] = useState([]);
  const [feacturePosts, setFeacturePosts] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [middleBanner, setMiddleBanner] = useState([]);
  const [editorpicks, setEditorpicks] = useState([]);
  const [matchesList, setMatchesList] = useState([]);
  const [homePageBanners, setHomePageBanners] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [topBanner2, setTopBanner2] = useState("");
  const [middleBanner1, setMiddleBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [bottomBanner2, setBottomBanner2] = useState("");
  const [hompageBanner2, setHompageBanner2] = useState("");
  const [hompageBanner3, setHompageBanner3] = useState("");
  const [hompageBanner4, setHompageBanner4] = useState("");
  const [hompageBanner5, setHompageBanner5] = useState("");
  const [hompageBanner6, setHompageBanner6] = useState("");
  const [hompageBanner7, setHompageBanner7] = useState("");
  const [hompageBanner8, setHompageBanner8] = useState("");
  const [scorePageBanner1, setScorePageBanner1] = useState("");
  const [scorePageBanner2, setScorePageBanner2] = useState("");
  const [scorePageBanner3, setScorePageBanner3] = useState("");
  const navigate = useNavigate();
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
  function formatDateString1(dateString) {
    const originalDate = new Date(dateString?.replace(" ", "T"));
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
    const month = monthNames[originalDate.getMonth()];
    const day = originalDate.getDate();
    let hours = originalDate.getHours();
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedDate = `${month} ${day} ${hours}:${minutes}${ampm}`;

    return formattedDate;
  }
  function formatDateStringb(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
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
    const month = monthNames[date.getMonth()];

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month}`;
  }
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

      const topBanner = res1?.data?.filter((item) => item?.title === "top");
      const middleBanner = res1?.data?.filter(
        (item) => item?.title === "middle"
      );
      const bottomBanner = res1?.data?.filter(
        (item) => item?.title === "bottom"
      );

      setTopBanner1(topBanner[0]?.image);
      setTopBanner2(topBanner[1]?.image);
      setMiddleBanner1(middleBanner[0]?.image);
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
      setBottomBanner2(bottomBanner[1]?.image);

      setHomePageBanners(res1?.data);

      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);

      setHompageBanner2(
        res2?.data?.data?.find((item) => item.title === "scorePageBanner1")
          ?.image
      );
      setHompageBanner3(
        res2?.data?.data?.find((item) => item.title === "scorePageBanner2")
          ?.image
      );
      setHompageBanner4(
        res2?.data?.data?.find((item) => item.title === "scorePageBanner3")
          ?.image
      );
      setHompageBanner5(
        res2?.data?.data?.find((item) => item.title === "hompageBanner5")?.image
      );
      setHompageBanner6(
        res2?.data?.data?.find((item) => item.title === "hompageBanner6")
      );
      setHompageBanner7(
        res2?.data?.data?.find((item) => item.title === "hompageBanner7")
      );
      setHompageBanner8(
        res2?.data?.data?.find((item) => item.title === "hompageBanner8")
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
    setT20Alr(res?.data?.rankingData?.ranks?.["all-rounders"]?.t20s || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
    setTeamRankings(res?.response?.items);
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

  const getAllFeacturePosts = () => {
    GetData("userAuth/getFeaturePost").then((res) => {
      setFeacturePosts(res?.data);
    });
  };
  const getAllTopPosts = () => {
    GetData("userAuth/getTopStories").then((res) => {
      setTopStories(res?.data);
    });
  };

  const getMiddleBanner = () => {
    GetData("userAuth/getMiddleBanner").then((res) => {
      setMiddleBanner(res?.data);
    });
  };

  const getAllEditorsPickData = () => {
    GetData("userAuth/getEditorPick").then((res) => {
      setEditorpicks(res?.data);
    });
  };

  useEffect(() => {
    getAllSeriesData();
    getAllTeamRankingsData();
    getAllFeacturePosts();
    getAllTopPosts();
    getMiddleBanner();
    getAllEditorsPickData();
    getAllSpecialBanners();
  }, []);
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
        `${baseUrl}user/getCompetitionsAndMatches?per_page=10&paged=1&include_matches=true&status=live&category=${category}`
      )
      .then((res) => {
        const reverseData = res?.data?.competitions.reverse();
        setNewMatchData(res?.data?.competitions);
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
        console.log(res?.data?.response);
        setComp1(res?.data?.response);
      })
      .catch((err) => {});
  };
  const getAllCompetationsType = async () => {
    const current_year = new Date().getFullYear();
    const res = await axios
      .get(
        `${baseUrl}user/getCompetitionsListByMonthAndDate?per_page=30&paged=1'&status=live&category=${category}`
      )
      .then((res) => {
        console.log(res?.data?.response);
        setCompetationsType(res?.data?.response?.competitionsByMonthAndYear);
      })
      .catch((err) => {});
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };

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
    getAllCompetation1();
  }, [liveCategory, category]);

  useEffect(() => {
    getAllCompetationsType();
  }, [category, liveCategory]);

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
          {}
          {}
        </div>
        <hr className="mt-2" />
        <div
          style={{ display: selectedDiv === "Teams" ? "none" : "flex" }}
          className="flex gap-5 mt-2"
        >
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
                    onClick={() => setLiveCategory("3")}
                  >
                    Live
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: liveCategory === "2" ? "#0F19AF" : "black",
                    }}
                    onClick={() => setLiveCategory("2")}
                  >
                    Recent
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      color: liveCategory === "1" ? "#0F19AF" : "black",
                    }}
                    onClick={() => setLiveCategory("1")}
                  >
                    Upcoming
                  </p>
                </div>
                {comp1?.length === 0 && (
                  <div className="bg-[#E6E6E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                    {" "}
                    There are no matches at the moment. Please check back later.{" "}
                  </div>
                )}
                {comp1[0]?.competition?.title && (
                  <>
                    <div className="bg-[#E6E6E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4">
                      {comp1[0]?.competition?.title}
                      {","}
                      {comp1[0]?.competition?.season}
                    </div>
                  </>
                )}

                <div className="flex mt-5 justify-center pb-5">
                  <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
                    <div className="left w-[700px]  ">
                      <div className="flex flex-col gap-5">
                        {comp1[0]?.matches?.map((item, index) => {
                          return (
                            <div
                              onClick={() =>
                                navigate(
                                  `/live-cricket-scores/${item?.match?.title
                                    ?.split(" ")
                                    ?.join(
                                      "-"
                                    )}-${item?.competition?.match?.title
                                    ?.split(" ")
                                    ?.join("-")}/commentry/${
                                    item?.match?.match_id
                                  }`
                                )
                              }
                              key={index}
                              style={{ borderRadius: "10px" }}
                              className=" h-[300px] pt-2 pl-2 shadow-2xl flex flex-col gap-2 cursor-pointer"
                            >
                              <div className="flex">
                                <span className="font-semibold"></span>
                                <span className="text-slate-400">
                                  {convertToOrdinal(
                                    item?.match?.subtitle?.split(" ")?.[1]
                                  )}{" "}
                                  {item?.match?.format_str}
                                </span>
                              </div>
                              <div className="text-slate-400">
                                {formatDateString1(item?.date_start)}
                                at {item?.match?.venue?.name}
                                {" ,"}
                                {item?.match?.venue?.location}
                              </div>
                              <div className="bg-[#858584] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                                <div
                                  style={{ padding: "0.5rem 1rem" }}
                                  className="flex items-center gap-[6rem] "
                                >
                                  <div>
                                    <div className="flex gap-5 text-white">
                                      <span>{item?.match?.teama?.name}</span>
                                      <span>
                                        {item?.match?.teama?.scores_full}
                                      </span>
                                    </div>
                                    <div className="flex gap-7 text-white">
                                      <span>{item?.match?.teamb?.name}</span>
                                      <span>
                                        {item?.match?.teamb?.scores_full}
                                      </span>
                                    </div>
                                    <div className="text-slate-300">
                                      {getWinningTeamName(item)} won by{" "}
                                      {item?.match?.win_margin}
                                    </div>
                                  </div>
                                  <div className="bg-[white] w-[35px] h-[35px] rounded flex justify-center items-center">
                                    <IoCaretForwardOutline />
                                  </div>
                                </div>
                              </div>
                              <div className="flex ">
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/live-cricket-scores/${item?.title
                                        ?.split(" ")
                                        ?.join("-")}-${item?.competition?.title
                                        ?.split(" ")
                                        ?.join("-")}/full_commentry/${
                                        item?.match_id
                                      }`
                                    )
                                  }
                                  className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px]  flex justify-center items-center cursor-pointer"
                                >
                                  Live Score
                                </div>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/live-cricket-scores/${item?.match?.title
                                        ?.split(" ")
                                        ?.join(
                                          "-"
                                        )}-${item?.match?.competition?.title
                                        ?.split(" ")
                                        ?.join("-")}/scorecard/${
                                        item?.match?.match_id
                                      }`
                                    )
                                  }
                                  className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center cursor-pointer"
                                >
                                  Scorecard
                                </div>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/live-cricket-scores/${item?.match?.title
                                        ?.split(" ")
                                        ?.join(
                                          "-"
                                        )}-${item?.match?.competition?.title
                                        ?.split(" ")
                                        ?.join("-")}/full_commentry/${
                                        item?.match?.match_id
                                      }`
                                    )
                                  }
                                  className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center cursor-pointer"
                                >
                                  Full Commentary
                                </div>
                                <div
                                  onClick={() =>
                                    navigate(`/News/${item?.match?.match_id}`)
                                  }
                                  className="text-[#0F19AF] w-[150px] h-[40px] border-r-[2px] flex justify-center items-center cursor-pointer"
                                >
                                  News
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {comp1?.map((item, index) => {
                        if (index === 0) {
                          return null;
                        }
                        return (
                          <>
                            <div
                              key={index}
                              className="bg-[#E6E6E7] font-semibold h-[70px] flex justify-start items-center pl-5 mt-4"
                            >
                              {item?.competition?.title}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                              {item?.matches?.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      borderRadius: "10px",
                                      boxShadow:
                                        "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    }}
                                    className=" h-[300px] pt-2 pl-2  flex flex-col gap-2"
                                  >
                                    <div className="flex">
                                      <span className="font-semibold"></span>
                                      <span className="text-slate-400">{}</span>
                                    </div>
                                    <div className="text-slate-400">
                                      {item?.match?.date_start
                                        ?.split("T")?.[0]
                                        ?.split("-")
                                        ?.reverse()
                                        ?.join("-")}
                                      at {item?.match?.venue?.name}
                                      {" ,"}
                                      {item?.match?.venue?.location}
                                    </div>
                                    <div className="bg-[#858584] rounded-lg h-[150px] w-[400px] flex justify-center items-center">
                                      <div className="flex items-center gap-[6rem] ">
                                        <div>
                                          <div className="flex gap-5 text-white">
                                            <span>
                                              {item?.match?.teama?.name}
                                            </span>
                                            <span>
                                              {item?.match?.teama?.scores_full}
                                            </span>
                                          </div>
                                          <div className="flex gap-7 text-white">
                                            <span>
                                              {item?.match?.teamb?.name}
                                            </span>
                                            <span>
                                              {item?.match?.teamb?.scores_full}
                                            </span>
                                          </div>
                                          <div className="text-slate-300">
                                            {getWinningTeamName(item)} won by{" "}
                                            {item?.match?.win_margin}
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
                                      `/cricket-series/${item?.title
                                        ?.split(" ")
                                        ?.join("-")}/${item?.cid}`
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
                              onClick={() => navigate("/icc-rankings/men")}
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
                    <div className="left w-[950px]  ">
                      <div className="flex flex-col gap-5">
                        {console.log(competationsType)}
                        {competationsType?.map((item) => (
                          <div className="flex gap-[5rem]">
                            <div
                              style={{ width: "150px" }}
                              className="font-semibold"
                            >
                              {convertMonthAndYearR(item?.monthAndYear)}
                            </div>
                            <div
                              onClick={() =>
                                navigate(
                                  `/cricket-series/${item?.title
                                    ?.split(" ")
                                    ?.join("-")}/${item?.cid}`
                                )
                              }
                              style={{ width: "650px" }}
                              className="text-slate-400"
                            >
                              <span>
                                {item?.competitions?.map(
                                  (competition, index) => {
                                    return (
                                      <p
                                        style={{
                                          cursor: "pointer",
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                        onClick={() =>
                                          navigate(
                                            `/cricket-series/${item?.competition?.title
                                              ?.split(" ")
                                              ?.join(
                                                "-"
                                              )}-${item?.competition?.season
                                              ?.split(" ")
                                              ?.join("-")}/${
                                              item?.competition?.cid
                                            }`
                                          )
                                        }
                                        key={index}
                                      >
                                        <span>
                                          {" "}
                                          {competition?.title}{" "}
                                          {competition?.datestart?.slice(0, 4) +
                                            " - " +
                                            competition?.dateend?.slice(2, 4)}
                                        </span>
                                        <span>
                                          {formatDateRangeR(
                                            competition?.datestart,
                                            competition?.dateend
                                          )}
                                        </span>
                                      </p>
                                    );
                                  }
                                )}
                              </span>

                              {/* <br /> */}
                              {}
                              <hr className="mt-2" />
                            </div>
                          </div>
                        ))}
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
                    <div className="left w-[950px]  ">
                      {newMatchData?.map((item, index) => {
                        return (
                          <div key={index}>
                            {" "}
                            <div
                              style={{
                                padding: "5px 0px 5px 0px",
                                backgroundColor: "#E7E7E7",
                                fontWeight: "bold",
                              }}
                            >
                              <p style={{ fontWeight: "bold", padding: "5px" }}>
                                {}
                                {}
                                {convertDate1(item?.datestart)}
                              </p>
                            </div>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "25% 50%  25%",
                                gap: "20px",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  color: "black",
                                  paddingLeft: "5px",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/cricket-series/${item?.title
                                      ?.split(" ")
                                      ?.join("-")}-${item?.season
                                      ?.split(" ")
                                      ?.join("-")}/${item?.cid}`
                                  )
                                }
                              >
                                {item?.title}
                                {","} {item?.season}
                              </p>
                              <p>
                                {item?.matches &&
                                  item?.matches
                                    ?.filter((m) => m?.status === 2)
                                    ?.map((item) => (
                                      <p
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                        onClick={() =>
                                          navigate(
                                            `/live-cricket-scores/${item?.short_title
                                              ?.split(" ")
                                              ?.join("-")}/commentry/${
                                              item?.match_id
                                            }`
                                          )
                                        }
                                      >
                                        <span style={{ color: "black" }}>
                                          {item?.short_title}
                                          {","} {item?.format_str}
                                          {","} {item?.date_start?.slice(0, 10)}
                                        </span>
                                        <span style={{ color: "#707071" }}>
                                          {}
                                          {item?.venue?.location}
                                          {","} {item?.venue?.name}
                                        </span>
                                      </p>
                                    ))}
                              </p>
                              <p>
                                {item?.matches &&
                                  item?.matches
                                    ?.filter((m) => m?.status === 2)
                                    ?.map((item) => (
                                      <p
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <span style={{ color: "black" }}>
                                          {formatTime11(item?.date_start_ist)}
                                        </span>
                                        <span style={{ color: "#707071",fontSize:"15px" }}>
                                          {formatTime11(item?.date_start) +
                                            " " +
                                            "GMT" +
                                            "/" +
                                            " " +
                                            formatTime11(item?.verify_time)+" "+"Local"}
                                          {}
                                        </span>
                                      </p>
                                    ))}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {}
                    {}
                    {}
                    {}
                    {}
                    {}
                    {}
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
                                      `/cricket-series/${item?.title
                                        ?.split(" ")
                                        ?.join("-")}/${item?.cid}`
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
                              onClick={() => navigate("/icc-rankings/men")}
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

export default Livescrore;

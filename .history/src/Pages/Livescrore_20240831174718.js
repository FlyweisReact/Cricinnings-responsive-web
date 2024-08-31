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
      const res1 = await GetData("userAuth/getPostsByPosition");

      const topBanner = res1?.data?.filter((item) => item?.title === "top");
      const middleBanner = res1?.data?.filter(
        (item) => item?.title === "middle"
      );
      const bottomBanner = res1?.data?.filter(
        (item) => item?.title === "bottom"
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

        </section>


    </div>
  );
};

export default Livescrore;

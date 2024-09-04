/** @format */
import { useEffect, useState } from "react";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AdSideBanner, TableLayout } from "../Components/HelpingComponent";

const SelectButtonComponent = ({ setValue, value, label, text }) => {
  return (
    <button
      onClick={() => setValue(text)}
      style={{
        cursor: "pointer",
        color: value === text ? "white" : "black",
        backgroundColor: value === text ? "#0F19AF" : "white",
      }}
      className="w-[80px] h-[40px] flex justify-center items-center rounded border small-text"
    >
      {label}
    </button>
  );
};

const Womenrankingpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [odiBestman, setOdiBestman] = useState([]);
  const [t20Bestman, setT20Bestman] = useState([]);
  const [odiBolling, setOdiBolling] = useState([]);
  const [t20Bolling, setT20Bolling] = useState([]);
  const [odiAlr, setOdiAlr] = useState([]);
  const [t20Alr, setT20Alr] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
  const [mainCategory, setMainCategory] = useState("batting");
  const [currentCategory, setCurrentCategory] = useState("odi");
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");

  useEffect(() => {
    if (pathname === "/icc-rankings/women/batting") {
      setMainCategory("batting");
    } else if (pathname === "/icc-rankings/women/bowling") {
      setMainCategory("bowling");
    } else if (pathname === "/icc-rankings/women/all-rounder") {
      setMainCategory("all-rounder");
    } else if (pathname === "/icc-rankings/women/teams") {
      setMainCategory("teams");
    }
    getAllTeamRankingsData();
  }, [pathname]);

  const getAllHomePageBanners = async () => {
    try {
      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);
      setBanner1(
        res2?.data?.data?.filter((item) => item.title === "rankingPageBanner1")
          ?.image
      );
      setBanner2(
        res2?.data?.data?.filter((item) => item.title === "rankingPageBanner2")
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
    setOdiBestman(res?.data?.rankingData?.women_ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.women_ranks?.batsmen?.t20s);
    setOdiBolling(res?.data?.rankingData?.women_ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.women_ranks?.bowlers?.t20s);
    setOdiAlr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.odis || []
    );
    setT20Alr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.t20s || []
    );
    setOdis(res?.data?.rankingData?.women_ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.women_ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.women_ranks?.teams?.tests);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const thead = ["Position", "Player", "Rating"];

  const odiBestmanBody = odiBestman?.map((item, index) => [
    <span>#{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span>{item.rating}</span>,
  ]);

  const t20BestmanBody = t20Bestman?.map((item, index) => [
    <span> #{index + 1} </span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span> {item.rating} </span>,
  ]);

  const odiBollingBody = odiBolling?.map((item, index) => [
    <span> #{index + 1} </span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
      className="cursor-pointer"
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span>{item.rating}</span>,
  ]);

  const t20BollingBody = t20Bolling?.map((item, index) => [
    <span>#{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span>{item.rating}</span>,
  ]);
  const odiAlrBody = odiAlr?.map((item, index) => [
    <span> #{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span>{item.rating}</span>,
  ]);
  const testAlrBody = t20Alr?.map((item, index) => [
    <span>#{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }}>{item.player}</span>
      <span style={{ fontWeight: "normal" }}>{item.team}</span>
    </span>,
    <span>{item.rating}</span>,
  ]);

  const odisBody = odis?.map((item, index) => [
    <span>#{index + 1}</span>,
    <span
      style={{
        display: "flex",
        gap: "30px",
        alignItems: "center",
        justifyContent: "left",
        marginLeft: "10px",
      }}
    >
      <span>
        <img src={item?.logo_url} alt="" className="test-team-country-img" />
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() =>
          navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
        }
      >
        <span style={{ fontWeight: "bold" }}>{item.player}</span>
        <span style={{ fontWeight: "normal" }}>{item.team}</span>
      </span>
    </span>,
    <span>{item.rating}</span>,
  ]);
  const t20sBody = t20s?.map((item, index) => [
    <span>#{index + 1}</span>,
    <span
      style={{
        display: "flex",
        gap: "30px",
        alignItems: "center",
        justifyContent: "left",
        marginLeft: "10px",
      }}
    >
      <span>
        <img src={item?.logo_url} alt="" className="test-team-country-img" />
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
        }
      >
        <span style={{ fontWeight: "bold" }}>{item.player}</span>
        <span style={{ fontWeight: "normal" }}>{item.team}</span>
      </span>
    </span>,
    <span>{item.rating}</span>,
  ]);

  let tbody;

  if (mainCategory === "batting") {
    if (currentCategory === "odi") {
      tbody = odiBestmanBody;
    } else if (currentCategory === "t20") {
      tbody = t20BestmanBody;
    }
  } else if (mainCategory === "bowling") {
    if (currentCategory === "odi") {
      tbody = odiBollingBody;
    } else if (currentCategory === "t20") {
      tbody = t20BollingBody;
    }
  } else if (mainCategory === "all-rounder") {
    if (currentCategory === "odi") {
      tbody = odiAlrBody;
    } else if (currentCategory === "t20") {
      tbody = testAlrBody;
    }
  } else if (mainCategory === "teams") {
    if (currentCategory === "odi") {
      tbody = odisBody;
    } else if (currentCategory === "t20") {
      tbody = t20sBody;
    }
  }

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <div className="font-semibold">
          <h1 className="text-lg font-bold">
            ICC Cricket Rankings-Women's{" "}
            {mainCategory === "batting"
              ? "Batsmen"
              : mainCategory === "bowling"
              ? "Bowling"
              : mainCategory === "all-rounder"
              ? "All-rounders"
              : "Team"}{" "}
          </h1>
        </div>
        <div className="flex gap-5 mt-3">
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "batting" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/batting");
            }}
          >
            Batting
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "bowling" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/bowling");
            }}
          >
            Bowling
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration:
                mainCategory === "all-rounder" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/all-rounder");
            }}
          >
            All-rounders
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "teams" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/teams");
            }}
          >
            Teams
          </div>
        </div>
        <hr className="mt-2" />
        <div className="mt-2 flex gap-5">
          <SelectButtonComponent
            setValue={setCurrentCategory}
            value={currentCategory}
            label={"ODI"}
            text={"odi"}
          />

          <SelectButtonComponent
            setValue={setCurrentCategory}
            value={currentCategory}
            label={"T20"}
            text={"t20"}
          />
        </div>
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5 column-flex">
          <div className="w-[680px] full-width">
            <TableLayout
              thead={thead}
              tbody={tbody}
              className={"ranking-table mt-5"}
            />
          </div>

          <div className="w-[250px] full-width small-padding">
            <AdSideBanner img={banner1?.image} />
            <AdSideBanner img={banner2?.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Womenrankingpage;

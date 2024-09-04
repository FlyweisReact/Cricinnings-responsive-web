/** @format */

import men from "../Assets/Homepage/men.svg";
import { useEffect, useState } from "react";
import {
  GetData,
  baseUrl,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Womenrankingpage = () => {
  const [odiBestman, setOdiBestman] = useState([]);
  const [t20Bestman, setT20Bestman] = useState([]);
  const [testBestman, setTestBestman] = useState([]);
  const [odiBolling, setOdiBolling] = useState([]);
  const [t20Bolling, setT20Bolling] = useState([]);
  const [testBolling, setTestBolling] = useState([]);
  const [odiAlr, setOdiAlr] = useState([]);
  const [t20Alr, setT20Alr] = useState([]);
  const [testAlr, setTestAlr] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [mainCategory, setMainCategory] = useState("batting");
  const [currentCategory, setCurrentCategory] = useState("odi");
  const [fantasyBanner, setFantasyBanner] = useState([]);
  const navigate = useNavigate();
  const getAllData = async () => {
    GetData("userAuth/getPostByTitle/CRICKET_NEWS").then((res) => {
      setFantasyBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);
  const location = useLocation();
  const { pathname } = useLocation();

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

  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");

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
    //
    setOdiBestman(res?.data?.rankingData?.women_ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.women_ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.women_ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.women_ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.women_ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.women_ranks?.bowlers?.tests);
    setOdiAlr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.odis || []
    );
    setT20Alr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.t20s || []
    );
    setTestAlr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.tests || []
    );
    setOdis(res?.data?.rankingData?.women_ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.women_ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.women_ranks?.teams?.tests);
    setTeamRankings(res?.response?.items);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

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
    getAllBanner();
  }, []);

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
          <div
            onClick={() => setCurrentCategory("odi")}
            style={{
              cursor: "pointer",
              color: currentCategory === "odi" ? "white" : "black",
              backgroundColor: currentCategory === "odi" ? "#0F19AF" : "white",
            }}
            className=" w-[80px] h-[40px] flex justify-center items-center rounded border"
          >
            ODI
          </div>
          <div
            onClick={() => setCurrentCategory("t20")}
            style={{
              cursor: "pointer",
              color: currentCategory === "t20" ? "white" : "black",
              backgroundColor: currentCategory === "t20" ? "#0F19AF" : "white",
            }}
            className="w-[80px] h-[40px] flex justify-center items-center rounded border"
          >
            T20
          </div>
        </div>
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5">
         <div className="w-[680px] full-width"></div>
         
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
  );
};

export default Womenrankingpage;

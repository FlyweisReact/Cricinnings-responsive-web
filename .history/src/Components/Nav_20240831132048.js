/** @format */

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatTitle, GetDataWithToken } from "./Integration/ApiIntegration";
import "../App.css";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "react-bootstrap";
import MobileNavBar from "./MobileNavBar";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleToggle1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsSeriesOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSeriesOpen(false);
  };

  const [iccpopuup, setIccpopup] = useState(false);
  const [topMatches, setTopMatches] = useState([]);
  const handleiccpopupenter = () => {
    setIccpopup(true);
  };
  const handleiccpopupleave = () => {
    setIccpopup(false);
  };
  const [matchesList, setMatchesList] = useState([]);
  const getTopMatches = async () => {
    const response = await axios.get(
      baseUrl + "user/getMatchesList?status=2&paged=1"
    );

    setMatchesList(response?.data?.response?.matches);
  };
  const getAllMatchList = () => {
    GetDataWithToken({
      path: "matches",
      status: "3",
    }).then((res) => {
      const top10 = res?.response?.items?.slice(0, 10);

      setMatchesList(top10);
    });
  };
  const [allSeries, setAllSeries] = useState([]);
  const getAllSeriesData = async () => {
    try {
      const res = await axios.get(
        baseUrl + "user/getCompetitionsList?status=live&per_page=30&paged=1"
      );

      setAllSeries(res?.data?.competitions?.slice(0, 5));
    } catch (error) {}
  };

  useEffect(() => {
    getAllSeriesData();
  }, []);

  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    getTopMatches();
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };
  const [topBanner1, setTopBanner1] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [topBanner2, setTopBanner2] = useState("");
  const [middleBanner1, setMiddleBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [bottomBanner2, setBottomBanner2] = useState("");
  const [homePageBanners, setHomePageBanners] = useState([]);
  const baseUrl = "https://cricinnings.in/api/";
  const getAllHomePageBanners = async () => {
    const res = await axios.get(`${baseUrl}admin/getAllPosts`);
    const banner = res?.data?.data?.filter(
      (item) => item.page === "HomePage" && item.type === "Top-Banner"
    )?.[0]?.image;
    const bannerLink1 = res?.data?.data?.filter(
      (item) => item.page === "HomePage" && item.type === "Top-Banner"
    );

    setBannerLink(bannerLink1?.[0]?.link);
    setTopBanner1(banner);
  };
  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  return (
    <>
      {topBanner1 && (
        <div className="ad-banner">
          <a href={bannerLink} target="_blank" rel="noreferrer">
            <img src={topBanner1} className="banner-img" alt="" />
          </a>
        </div>
      )}

      <div className="mobileCssNavbar1">
        <MobileNavBar />
      </div>

      <div className="myClassRKt">
        <nav>
          <div className="navBar">
            <div className="navBar_content">
              <div>
                <img
                  onClick={() => navigate("/")}
                  className="logo"
                  src="/logo.png"
                  alt="logo"
                />
              </div>
              <div className="navBar_links">
                <a href="/cricket-match/live-scores">
                  <p className="d-flex gap-1 items-center">
                    <span style={{ fontSize: "8px" }}>
                      <img src="/dot.svg" alt="dot" />
                    </span>
                    Live Scores
                  </p>
                </a>
                <a href="/cricket-schedule/upcoming-series/international">
                  <p>Schedule</p>
                </a>

                <p>
                  <p onClick={handleToggle1} style={{ cursor: "pointer" }}>
                    Series
                  </p>
                  <Dropdown
                    className="dropdown_nav"
                    show={showDropdown1}
                    onToggle={(isOpen) => setShowDropdown1(isOpen)}
                  >
                    <Dropdown.Menu
                      className="no-border-radius"
                      show={showDropdown1}
                      ref={dropdownRef1}
                    >
                      {allSeries?.slice(0, 5)?.map((item) => (
                        <Dropdown.Item
                          key={item?.cid}
                          className="no-border-radius-text"
                        >
                          <Link
                            to={`/cricket-series/${item?.cid}/${formatTitle(
                              item?.title
                            )}-${item?.season}/matches`}
                          >
                            {item?.title}
                          </Link>
                        </Dropdown.Item>
                      ))}
                      <a className="no1" href="/live-cricket-scores/Allseries">
                        <Dropdown.Item
                          className="no-border-radius-text1"
                          onClick={() =>
                            navigate("/live-cricket-scores/Allseries")
                          }
                        >
                          All Series {">>"}
                        </Dropdown.Item>
                      </a>
                    </Dropdown.Menu>
                  </Dropdown>
                </p>
                {/* <p onClick={() => navigate("/cricket-news")}>Cricket News</p> */}
                <p>
                  <p onClick={handleToggle} style={{ cursor: "pointer" }}>
                    ICC Ranking
                  </p>
                  <Dropdown
                    className="dropdown_nav"
                    show={showDropdown}
                    onToggle={(isOpen) => setShowDropdown(isOpen)}
                  >
                    <Dropdown.Menu
                      className="no-border-radius"
                      show={showDropdown}
                      ref={dropdownRef}
                    >
                      <Dropdown.Item
                        onClick={() => navigate("/icc-rankings/men/batting")}
                        className="no-border-radius-text"
                      >
                        ICC - Men's Ranking
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="no-border-radius-text"
                        onClick={() => navigate("/icc-rankings/women/batting")}
                      >
                        ICC - Women's Ranking
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </p>
                {/* <p onClick={() => navigate("/cric-special")}>Cricspecial</p>
                <p onClick={() => navigate("/pitch-report")}>Pitch Report</p> */}
              </div>
              <div className="navBar_icons">
                <p>{/* <Icon icon="iconamoon:search" /> */}</p>
                <p>
                  <Icon onClick={() => navigate("/login")} icon="gg:profile" />
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="bg-[#B3B3B3] w-[1000px] h-[48px] flex over mobileCssNavbar">
        <div className="UseFlexMenu">
          <div
            onClick={() => navigate("/cricket-match/live-scores")}
            className="w-[100px] h-[48px] flex justify-center items-center text-white border-white border text-[10px] cursor-pointer"
          >
            MATCHES
          </div>

          {matchesList?.slice(0, 5).map((item) => (
            <a
              style={{ textDecoration: "none", color: "white" }}
              href={`/live-cricket-scorecard/${item?.match_id}/${formatTitle(
                item?.short_title
              )}-${formatTitle(item?.subtitle)}-${formatTitle(
                item?.competition?.title
              )}-${item?.competition?.season?.toLowerCase()}`}
            >
              <div className="matchList">
                <h1 className="text-base">
                  {item?.short_title}
                  <span style={{ fontSize: "10px" }}>
                    {item?.status === 2
                      ? `   - ${item?.result?.split(" ")?.[0]} WON `
                      : ""}
                  </span>
                </h1>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Nav;

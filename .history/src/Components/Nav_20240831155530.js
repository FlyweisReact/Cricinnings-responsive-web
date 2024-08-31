/** @format */

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatTitle } from "./Integration/ApiIntegration";
import "../App.css";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "react-bootstrap";
import MobileNavBar from "./MobileNavBar";
import { SidebarMenu } from "./Modals/Sidebar";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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

  const [matchesList, setMatchesList] = useState([]);
  const getTopMatches = async () => {
    const response = await axios.get(
      baseUrl + "user/getMatchesList?status=2&paged=1"
    );

    setMatchesList(response?.data?.response?.matches);
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

  useEffect(() => {
    getTopMatches();
  }, []);

  const [topBanner1, setTopBanner1] = useState("");
  const [bannerLink, setBannerLink] = useState("");
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
      <SidebarMenu
        show={open}
        handleClose={() => setOpen(false)}
        allSeries={allSeries}
      />
      <section className="max-container">
        {topBanner1 && (
          <div className="ad-banner">
            <a href={bannerLink} target="_blank" rel="noreferrer">
              <img src={topBanner1} className="banner-img" alt="" />
            </a>
          </div>
        )}

        <nav className="main-navBar">
          <img
            onClick={() => navigate("/")}
            className="logo"
            src="/logo.png"
            alt=""
          />
          <div className="links hide-on-mobile">
            <a href="/cricket-match/live-scores">
              <span className="score-span">
                <img src="/dot.svg" alt="" />
                Live Scores
              </span>
            </a>

            <a href="/cricket-schedule/upcoming-series/international">
              Schedule
            </a>

            <a href="#" onClick={handleToggle1}>
              Series
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
                      onClick={() => navigate("/live-cricket-scores/Allseries")}
                    >
                      All Series {">>"}
                    </Dropdown.Item>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </a>

            <a href="#" onClick={handleToggle}>
              ICC Ranking
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
            </a>
          </div>

          <div className="icons">
            <Icon
              onClick={() => navigate("/login")}
              icon="gg:profile"
              className="hide-on-mobile"
            />
            <i className="fa-solid fa-bars" onClick={() => setOpen(true)}></i>
          </div>
        </nav>


        <section className='matche'>

        </section>

      </section>

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

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthToken, GetDataWithToken } from "./Integration/ApiIntegration";
import "../App.css";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown } from "react-bootstrap";
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
      baseUrl +
        "user/getCompetitionsAndMatchesDashboard?status=live&per_page=10&paged=1&include_matches=true&match_status=1,2",
      {
        params: {
          token: AuthToken,
        },
      }
    );

    setMatchesList(response?.data?.competitions?.[0]?.matches);
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
  const [topBanner2, setTopBanner2] = useState("");
  const [middleBanner1, setMiddleBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [bottomBanner2, setBottomBanner2] = useState("");
  const [homePageBanners, setHomePageBanners] = useState([]);
  const baseUrl = "https://vipin-jha-cricbuzz.vercel.app/";
  const getAllHomePageBanners = async () => {
    const res = await axios.get(`${baseUrl}userAuth/getPostsByPosition`);
    const banner = res?.data?.data?.filter((item) => item.title === "top")?.[0]
      ?.image;

    setTopBanner1(banner);
  };
  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  return (
    <>
      {}
      {topBanner1 && (
        <div
          style={{
            width: "800px",
            height: "96px",
            margin: "auto",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <img
            src={topBanner1}
            style={{ width: "100%", height: "96px" }}
            alt="topBanner"
          />
        </div>
      )}
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
              <p onClick={() => navigate("/Livescrore")}>Live Scores</p>
              <p onClick={() => navigate("/Livescrore/Schedule")}>Schedule</p>
              <p onClick={() => navigate("/Fantasytips")}>Fantasy Tips</p>
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
                        onClick={() => navigate("/Manrankingpage")}
                        className="no-border-radius-text"
                      >
                        {item?.title}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      className="no-border-radius-text1"
                      onClick={() => navigate("/Livescrore/Allseries")}
                    >
                      All Series {">>"} 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </p>
              <p onClick={() => navigate("/Cricketnews")}>Cricket News</p>
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
                      onClick={() => navigate("/Manrankingpage")}
                      className="no-border-radius-text"
                    >
                      ICC - Men's Ranking
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="no-border-radius-text"
                      onClick={() => navigate("/Womenrankingpage")}
                    >
                      ICC - Women's Ranking
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </p>
              <p onClick={() => navigate("/Cricspecial")}>Cricspecial</p>
              <p onClick={() => navigate("/Pitchreport")}>Pitch Report</p>
            </div>
            <div className="navBar_icons">
              <p>
                <Icon icon="iconamoon:search" />
              </p>
              <p>
                <Icon onClick={() => navigate("/login")} icon="gg:profile" />
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* <nav className="bg-[#0F19AF] w-[1000px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="">
                <span className="text-white">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </span>
              </div>
              <div className="hidden md:block">
                <ul className="flex ml-2 gap-4">
                  <Link to="/Livescrore">
                    <li>
                      <span className="live-dot"></span>
                      <span className="text-[15px] text-[white]">
                        Live Scores
                      </span>
                    </li>
                  </Link>
                  <Link to="/Livescrore">
                    <li>
                      <span className="text-[15px] text-[white]">Schedule</span>
                    </li>
                  </Link>
                  <Link to="/Fantasytips">
                    <li>
                      <span className="text-[15px] text-[white]">
                        Fantasy Tips
                      </span>
                    </li>
                  </Link>
                  <li className="relative">
                    <span
                      className="text-[15px] text-[white] cursor-pointer"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Series
                    </span>
                    {isSeriesOpen && (
                      <ul
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="absolute bg-white w-[300px] h-[260px] font-semibold p-2 flex flex-col gap-3   z-10"
                      >
                        {}
                        {allSeries?.map((item) => (
                          <Link to={"/Iccseriesschedule"}>
                            {}
                            {item?.title}
                          </Link>
                        ))}
                        {}
                        <span className="text-[#0F19AF] underline flex items-center">
                          Allseries <FaAnglesRight />
                        </span>
                      </ul>
                    )}
                  </li>
                  <Link to="/Cricketnews">
                    <li>
                      <span className="text-[15px] text-[white]">
                        Cricket News
                      </span>
                    </li>
                  </Link>
                  <li className="relative">
                    <span
                      className="text-[15px] text-[white] cursor-pointer"
                      onMouseEnter={handleiccpopupenter}
                      onMouseLeave={handleiccpopupleave}
                    >
                      ICC Ranking
                    </span>
                    {iccpopuup && (
                      <ul
                        onMouseEnter={handleiccpopupenter}
                        onMouseLeave={handleiccpopupleave}
                        className="absolute bg-white w-[200px] h-[80px] font-semibold p-2 flex flex-col gap-3   z-10"
                      >
                        <li>
                          <Link to="/Manrankingpage">ICC Men's Ranking </Link>
                        </li>
                        <li>
                          <Link to="/Womenrankingpage">
                            ICC Women's Ranking{" "}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <Link to="/Cricspecial">
                    <li>
                      <span className="text-[15px] text-[white]">
                        Cricspecial
                      </span>
                    </li>{" "}
                  </Link>
                  <Link to="/Pitchreport">
                    <li>
                      <span className="text-[15px] text-[white]">
                        Pitch Report
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-4 mr-2 items-center">
                <FaSearch style={{ color: "white" }} size={15} />
                <Link to="/login">
                  <FaRegUserCircle style={{ color: "white" }} size={20} />{" "}
                </Link>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white   "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="flex flex-col ml-5 gap-4">
              <Link to="/Livescrore">
                <li>
                  <span className="live-dot"></span>
                  <span className="text-[15px] text-[white]">Live Scores</span>
                </li>
              </Link>
              <Link to="/Livescrore">
                <li>
                  <span className="text-[15px] text-[white]">Schedule</span>
                </li>
              </Link>
              <Link to="/Fantasytips">
                <li>
                  <span className="text-[15px] text-[white]">Fantasy Tips</span>
                </li>
              </Link>
              <li className="relative">
                <span
                  className="text-[15px] text-[white] cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Series
                </span>
                {isSeriesOpen && (
                  <ul
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="absolute bg-white w-[300px] h-[260px] font-semibold p-2 flex flex-col gap-3   z-10"
                  >
                    {}

                    <li>
                      <Link to="/Iccseriesschedule">
                        Indian Premier League 2024
                      </Link>
                    </li>
                    <li>
                      <Link to="/series2">ICC Mens T20 World Cup 2024</Link>
                    </li>
                    <li>
                      <Link to="/series2">Women Premier League 2024</Link>
                    </li>
                    <li>
                      <Link to="/series2">Newzland tour of Pakistan,2024</Link>
                    </li>
                    <li>
                      <Link to="/series2">
                        Sri Lanka tour of Bangladesh,2024
                      </Link>
                    </li>
                    <li>
                      <Link to="/series2">Bangladesh tour of USA,2024</Link>
                    </li>
                    <span className="text-[#0F19AF] underline flex items-center">
                      Allseries <FaAnglesRight />
                    </span>
                  </ul>
                )}
              </li>
              <Link to="/Cricketnews">
                <li>
                  <span className="text-[15px] text-[white]">Cricket News</span>
                </li>
              </Link>
              <li className="relative">
                <span
                  className="text-[15px] text-[white] cursor-pointer"
                  onMouseEnter={handleiccpopupenter}
                  onMouseLeave={handleiccpopupleave}
                >
                  ICC Ranking
                </span>
                {iccpopuup && (
                  <ul
                    onMouseEnter={handleiccpopupenter}
                    onMouseLeave={handleiccpopupleave}
                    className="absolute bg-white w-[200px] h-[80px] font-semibold p-2 flex flex-col gap-3   z-10"
                  >
                    <li>
                      <Link to="/Manrankingpage">ICC Men's Ranking </Link>
                    </li>
                    <li>
                      <Link to="/Womenrankingpage">ICC Women's Ranking </Link>
                    </li>
                  </ul>
                )}
              </li>
              <Link to="/Cricspecial">
                <li>
                  <span className="text-[15px] text-[white]">Cricspecial</span>
                </li>{" "}
              </Link>
              <Link to="/Pitchreport">
                <li>
                  <span className="text-[15px] text-[white]">Pitch Report</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav> */}
      <div className="bg-[#B3B3B3] w-[1000px] h-[48px] flex over">
        <div className="UseFlexMenu">
          <div className="w-[100px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
            MATCHES
          </div>

          {matchesList?.slice(0, 5).map((match) => (
            <div
              onClick={() => navigate(`/Livescore/${match.match_id}`)}
              className="matchList"
            >
              <p>
                {match?.short_title}
                {match?.status === 2
                  ? `- ${match?.result?.split(" ")?.[0]} WON `
                  : ""}
              </p>
            </div>
          ))}
        </div>
        {}
      </div>
    </>
  );
};

export default Nav;

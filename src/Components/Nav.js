import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.svg";
import { FaAnglesRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthToken, GetDataWithToken } from "./Integration/ApiIntegration";
import "../App.css";
import axios from "axios";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      baseUrl + "user/competitions/128414/matches?status=3&per_page=7&paged=1",
      {
        params: {
          token: AuthToken,
        },
      }
    );
    console.log(response?.data?.matches);
    setMatchesList(response?.data?.matches);
  };
  const getAllMatchList = () => {
    GetDataWithToken({
      path: "matches",
      status: "3",
    }).then((res) => {
      const top10 = res?.response?.items?.slice(0, 10);
      console.log(res?.response?.items, "Navbar");
      setMatchesList(top10);
      // setMatchesList(res?.data?.matches)
    });
  };
  const [allSeries, setAllSeries] = useState([]);
  const getAllSeriesData = async () => {
    // GetDataWithToken({
    //   path: "competitions",
    //   status: "live",
    // }).then((res) => {
    //   setAllSeries(res?.response?.items);
    // });

    try {
      const res = await axios.get(
        baseUrl + "user/getCompetitionsList?status=live&per_page=30&paged=1"
      );

      console.log(res?.data?.competitions);
      setAllSeries(res?.data?.competitions?.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSeriesData();
  }, []);

  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    // getAllMatchList();
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
      {/* <div className="bg-[#B3B3B3] w-[1000px] h-[96px] flex items-center justify-center text-[white]">
        RESPONSIVE AD’s
      </div> */}
      {topBanner1 && (
        <div>
          <img
            src={topBanner1}
            className="w-[1000px] h-[96px]"
            alt="topBanner"
          />
        </div>
      )}

      <nav className="bg-[#0F19AF] w-[1000px]">
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
                        {console.log(allSeries)}
                        {allSeries?.map((item) => (
                          <Link to={"/Iccseriesschedule"}>
                            {console.log(item)}
                            {item?.title}
                          </Link>
                        ))}
                        {/* <li>
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
                          <Link to="/series2">
                            Newzland tour of Pakistan,2024
                          </Link>
                        </li>
                        <li>
                          <Link to="/series2">
                            Sri Lanka tour of Bangladesh,2024
                          </Link>
                        </li>
                        <li>
                          <Link to="/series2">Bangladesh tour of USA,2024</Link>
                        </li> */}
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
                    {console.log("series", allSeries)}

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
      </nav>
      <div className="bg-[#B3B3B3] w-[1000px] h-[48px] flex over">
        <div className="UseFlexMenu">
          <div className="w-[100px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
            MATCHES
          </div>

          {matchesList.map((match) => (
            <Link to={`/Livescore/${match.match_id}`}>
              <div
                className={`w-[100px] h-[48px] flex justify-center items-center border-white border text-[10px] cursor-pointer`}
                style={{
                  backgroundColor:
                    selectedMatch !== match.match_id ? "#767777" : "#DFDFDF",
                  color: selectedMatch !== match.match_id ? "white" : "black",
                  fontWeight:
                    selectedMatch !== match.match_id ? "normal" : "bold",
                }}
                onClick={() => handleMatchClick(match.match_id)}
              >
                {match.short_title}
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - LIVE
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - LIVE
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - RESULT
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - RESULT
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - UPCOMING
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - UPCOMING
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          IND vs ENG - UPCOMING
        </div> */}
      </div>
    </>
  );
};

export default Nav;

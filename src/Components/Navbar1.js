import { useEffect, useState } from "react";
import logo from "../Assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GetDataWithToken } from "./Integration/ApiIntegration";

const Navbar = () => {
  const [isSeriesOpen, setIsSeriesOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsSeriesOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSeriesOpen(false);
  };

  const [iccpopuup, setIccpopup] = useState(false);
  const handleiccpopupenter = () => {
    setIccpopup(true);
  };
  const handleiccpopupleave = () => {
    setIccpopup(false);
  };


 
  return (
    <div>
      <div className="bg-[#B3B3B3] w-[1000px] h-[96px] flex items-center justify-center text-[white]">
        RESPONSIVE AD’s
      </div>

      <div className="bg-[#0F19AF]  h-[61px] flex justify-between items-center">
        <Link to="/">
          <div>
            <img src={logo} alt="" />
          </div>
        </Link>

        <div className="">
          <ul className="flex gap-4">
            <Link to="/cricket-match/live-scores">
              <li>
                <span className="live-dot"></span>
                <span className="text-[15px] text-[white]">Live Scores</span>
              </li>
            </Link>
            <Link to="/live-cricket-scores">
              <li>
                <span className="text-[15px] text-[white]">Schedule</span>
              </li>
            </Link>
            <Link to="/fantasy-cricket-tips">
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
                    <Link to="/series2">Sri Lanka tour of Bangladesh,2024</Link>
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
            <Link to="/cricket-news">
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
                    <Link to="/icc-rankings/men">ICC Men's Ranking </Link>
                  </li>
                  <li>
                    <Link to="/icc-rankings/women">ICC Women's Ranking </Link>
                  </li>
                </ul>
              )}
            </li>
            <Link to="/cric-special">
              <li>
                <span className="text-[15px] text-[white]">Cricspecial</span>
              </li>{" "}
            </Link>
            <Link to="/pitch-report">
              <li>
                <span className="text-[15px] text-[white]">Pitch Report</span>
              </li>
            </Link>
          </ul>
        </div>
        {/* <GiHamburgerMenu style={{ color: "white" }} /> */}
        <div className="flex gap-4 mr-2 items-center">
          <FaSearch style={{ color: "white" }} size={15} />
          <FaRegUserCircle style={{ color: "white" }} size={20} />
        </div>
      </div>

      <div className="bg-[#B3B3B3] w-[1000px] h-[48px] flex over">
        <div className="w-[100px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
          MATCHES
        </div>
        <div className="w-[155px] h-[48px] flex justify-center items-center text-white border-white border text-[10px]">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;

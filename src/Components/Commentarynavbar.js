import React from "react";
import { Link } from "react-router-dom";

const Commentarynavbar = () => {
  return (
    <div className="bg-[white] pl-2 pt-2 pr-2">
      <div className="font-semibold ">
        Chennai Super Kings vs Mumbai Indians , Qualifier (3 v 1) - Live Cricket
        Score, Commentary
      </div>
      <div className="flex justify-between mt-3">
        <div className="text-slate-500">
          Series: Indian Premier League, 2024 
        </div>
        <div className="text-slate-500">Venue: National Stadium, Karachi </div>
        <div className="text-slate-500">
          Date & Time: Mar 14, 09:00 PM LOCAL
        </div>
      </div>
      <div className="flex items-center gap-5 mt-4">
        <div className="bg-[#0F19AF] flex justify-center items-center rounded w-[110px] h-[40px] text-white">
          Commentary
        </div>
        <Link to="/Scorecard">
          <div className="text-[#121212]">Scorecard</div>
        </Link>
        <Link to="/Squads">
          <div className="text-[#121212]">Squads</div>{" "}
        </Link>
        <Link to="/Highlights">
          <div className="text-[#121212]">Higlights</div>
        </Link>
        <Link to="/Fullcommentary">
          <div className="text-[#121212]">Full Commentary</div>
        </Link>
        <Link to="/Overs">
          <div className="text-[#121212]">Overs</div>{" "}
        </Link>
        <Link to="/Pointtable">
          <div className="text-[#121212]">Point Table</div>{" "}
        </Link>
        <Link to="/Matchinfo">
          <div className="text-[#121212]">Match Info</div>
        </Link>
        <Link to="/News">
          <div className="text-[#121212]">News</div>
        </Link>

        <Link to="/Stats">
          <div className="text-[#121212]">Stats</div>
        </Link>
      </div>

      <div className="underline text-[#0F19AF] mt-2">
        Multan Sultans won by 7 wkts
      </div>
    </div>
  );
};

export default Commentarynavbar;

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "./Integration/ApiIntegration";

const Commentarynavbar = () => {
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);

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

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${month} ${day}, ${hours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
  }

  const location = useLocation();
  const { pathname } = location;
  const params = useParams();
  const { matchId, commentary } = params;
  const [matchData, setMatchData] = useState([]);
  const [matchDetails, setMatchDetails] = useState({});

  const getMatchDetails = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setMatchDetails(res?.data?.match);
    });
  };

  useEffect(() => {
    getMatchDetails();
  }, []);
  return (
    <div className="bg-[white] pl-2 pt-2 pr-2">
      <div className="font-semibold ">
        <p style={{ fontSize: "14px", fontWeight: "bold" }}>
          {matchDetails?.title} , {matchDetails?.subtitle} -{" "}
          {matchDetails?.statue === 3
            ? "Live"
            : matchDetails?.statue === 1
            ? "Match Not Started Yet"
            : ""}{" "}
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500"
        >
          Series: {matchDetails?.competition?.title}
        </div>
        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500"
        >
          Venue: {matchDetails?.venue?.location}
          {matchDetails?.venue?.name}
        </div>
        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500"
        >
          Date: {formatDate(matchDetails?.date_start)}
        </div>
      </div>

      <div className="topBarCommentary">
        <p
          onClick={() => navigate(`/match/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/match/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/match/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/match/") ? "14px" : "0px",
          }}
        >
          Commentary
        </p>
        <p
          onClick={() => navigate(`/Scorecard/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Scorecard/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Scorecard/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Scorecard/") ? "14px" : "0px",
          }}
        >
          ScoreCard
        </p>
        <p
          onClick={() => navigate(`/Squads/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Squads/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Squads/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Squads/") ? "14px" : "0px",
          }}
        >
          Squads
        </p>
        <p
          onClick={() => navigate(`/Highlights/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Highlights/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Highlights/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Highlights/") ? "14px" : "0px",
          }}
        >
          Highlights
        </p>
        <p
          onClick={() => navigate(`/match/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/match/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/match/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/match/") ? "14px" : "0px",
          }}
        >
          Full Commentary
        </p>
        <p
          onClick={() => navigate(`/Overs/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Overs/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Overs/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Overs/") ? "14px" : "0px",
          }}
        >
          Overs
        </p>
        <p
          onClick={() => navigate(`/Pointtable/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Pointtable/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Pointtable/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Pointtable/") ? "14px" : "0px",
          }}
        >
          Point Table
        </p>
        <p
          onClick={() => navigate(`/Matchinfo/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Matchinfo/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Matchinfo/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Matchinfo/") ? "14px" : "0px",
          }}
        >
          Match Info
        </p>
        <p
          onClick={() => navigate(`/News/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/News/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/News/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/News/") ? "14px" : "0px",
          }}
        >
          News
        </p>
        <p
          onClick={() => navigate(`/Stats/${matchDetails?.match_id}`)}
          style={{
            color: pathname.startsWith("/Stats/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/Stats/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/Stats/") ? "14px" : "0px",
          }}
        >
          Stats
        </p>
      </div>
      {/* <div className="flex items-center gap-5 mt-4">
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
      </div> */}

      <div
        style={{ fontSize: "14px", paddingLeft: "30px" }}
        className=" text-[#0F19AF] mt-2"
      >
        <p style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
          <span>{matchDetails?.teama?.name}</span>{" "}
          <span>
            {matchDetails?.teama?.scores}
            {matchDetails?.teama?.overs && (
              <> ({matchDetails.teama.overs})</>
            )}{" "}
          </span>
        </p>
        <p style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
          <span>{matchDetails?.teamb?.name}</span>{" "}
          <span>
            {matchDetails?.teamb?.scores}
            {matchDetails?.teamb?.overs && (
              <> ({matchDetails.teamb.overs})</>
            )}{" "}
          </span>
        </p>
      </div>
      <div
        style={{ fontSize: "14px" }}
        className="underline text-[#0F19AF] mt-2"
      >
        {matchDetails?.status === 2 && matchDetails?.status_note}
      </div>
    </div>
  );
};

export default Commentarynavbar;

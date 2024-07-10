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
  const [squadData, setSquadData] = useState({});

  const getMatchDetails = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setMatchDetails(res?.data?.match);
    });
  };

  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      // console.log(res?.data?.scorecard);
      setSquadData(res?.data?.scorecard);
    });
  };

  useEffect(() => {
    getSquadData();
    getMatchDetails();
  }, []);
  return (
    <div className="bg-[white] pl-2 pt-2 pr-2">
      <div className="font-semibold ">
        <p style={{ fontSize: "14px", fontWeight: "bold" }}>
          {matchDetails?.title} , {matchDetails?.subtitle} - Live Cricket
          Commentary
          {matchDetails?.statue === 3
            ? "Live"
            : matchDetails?.statue === 1
            ? "Match Not Started Yet"
            : ""}{" "}
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <div
          onClick={() => navigate(`/live-cricket-scores/Allseries`)}
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#7E7F7E",
            cursor: "pointer",
          }}
          className="text-slate-500"
        >
          Series: {matchDetails?.competition?.title}
        </div>
        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500"
        >
          Venue:
          {matchDetails?.venue?.name}
          {","}
          {matchDetails?.venue?.location}
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
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/commentry/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/commentry\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/commentry\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/commentry\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Live
        </p>
        {console.log(matchDetails)}
    {matchDetails?.status !== 1 &&    <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/scorecard/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/scorecard\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/scorecard\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/scorecard\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Scorecard
        </p>}
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/squad/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/squad\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/squad\//i.test(pathname) ? "#0F19AF" : "white",
            padding: /\/squad\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Squads
        </p>
        {/* <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/highlights/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/highlights\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/highlights\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/highlights\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Highlights
        </p> */}
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/full_commentry/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/full_commentry\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/full_commentry\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/full_commentry\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Full Commentary
        </p>
        {/* <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(`/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/overs/${matchDetails?.match_id}`);
          }}
          style={{
            color: /\/overs\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/overs\//i.test(pathname) ? "#0F19AF" : "white",
            padding: /\/overs\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Overs
        </p> */}
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/points-table/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/points-table\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/points-table\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/points-table\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Point Table
        </p>
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/match-info/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/match-info\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/match-info\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/match-info\//i.test(pathname) ? "14px" : "0px",
          }}
        >
          Match Info
        </p>
        <p
          onClick={() => {
            matchDetails?.match_id && navigate(`/cricket-news/`);
          }}
          style={{
            color: pathname.startsWith("/cricket-news/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/cricket-news/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/cricket-news/") ? "14px" : "0px",
          }}
        >
          News
        </p>
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scores/${matchDetails?.title}-${matchDetails?.competition?.title}/stats/${matchDetails?.match_id}`
              );
          }}
          style={{
            color: /\/stats\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/stats\//i.test(pathname) ? "#0F19AF" : "white",
            padding: /\/stats\//i.test(pathname) ? "14px" : "0px",
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
        style={{
          fontSize: "14px",
          paddingLeft: "30px",
        }}
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
      <div>
        {matchDetails?.status === 2 && matchDetails?.status_note}
        <div className="d-flex gap-2">
          {squadData?.man_of_the_match && (
            <p className="CommentartyData1">
              Man of the match :{" "}
              <span className="CommentartyData2">
                {" "}
                {squadData?.man_of_the_match?.name}
              </span>
            </p>
          )}
          {squadData?.man_of_the_series && (
            <p className="CommentartyData1">
              Man of the series :{" "}
              <span className="CommentartyData2">
                {" "}
                {squadData?.man_of_the_series?.name}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commentarynavbar;

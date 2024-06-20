import { Link, useLocation, useNavigate } from "react-router-dom";

const Commentarynavbar = ({ matchDetails }) => {
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

  return (
    <div className="bg-[white] pl-2 pt-2 pr-2">
      <div className="font-semibold ">
        <p style={{ fontSize: "14px", fontWeight: "bold" }}>
          {console.log(matchDetails)}
          {matchDetails?.title} , {matchDetails?.subtitle} -{" "}
          {matchDetails?.statue === 3
            ? "Live"
            : matchDetails?.statue === 1
            ? "Match Not Started Yet"
            : ""}{" "}
          Cricket Score, Commentary
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
        <p style={{ color: pathname.startsWith("/Scorecard/") ? "black" : "white", fontWeight: "bold", backgroundColor: pathname.startsWith("/Scorecard/") ? "white" : "#0F19AF", padding: pathname.startsWith("/Scorecard/") ? "14px" : "0px" }} onClick={() => navigate(`/Scorecard/${matchDetails?.match_id}`)}>ScoreCard</p>
        <p>Squads</p>
        <p>Highlights</p>
        <p>Full Commentary</p>
        <p>Overs</p>
        <p>Point Table</p>
        <p>Match Info</p>
        <p>News</p>
        <p>Stats</p>
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

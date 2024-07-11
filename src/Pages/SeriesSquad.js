import { useEffect, useState } from "react";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const SeriesSquad = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const [competitionId, setCompetitionId] = useState("");
  const [filterByData, setFilterByData] = useState("batting_most_runs");
  const { seriesId } = useParams();
  const [competitionData, setCompetitionData] = useState([]);
  const [initialCondition, setInitialCondition] = useState("batting");
  const navigate = useNavigate();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      // console.log(banner);
    });
  };

  const [allTeams, setAllTeams] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [filterByteamId, setFilterByteamId] = useState("");

  const getStatesData = async (payload) => {
    axios.get(baseUrl + `user/competitions/${payload}/squads`).then((res) => {
      setAllTeams(res?.data?.response?.squads);
    });
  };

  useEffect(() => {
    getStatesData(seriesId);
  }, []);

  const getTeamFilteredData = async () => {
    if (allTeams?.length > 0) {
      setTeamData(allTeams?.find((item) => item?.team?.tid === filterByteamId));
    }
  };

  useEffect(() => {
    getTeamFilteredData();
  }, [filterByteamId]);

  useEffect(() => {
    getAllBanner();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        {/* <Commentarynavbar /> */}
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          <img
            style={{ height: "96px", width: "100%" }}
            src={banner1?.image}
            alt=""
          />
        </div>
        <div className="flex mt-2 g-4 p-3">
          <div className="mt-3 p-1" style={{ width: "250px" }}>
            <div className="stats_div">
              <p> Teams</p>
              <p
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
                className="statsDivSpantag123"
              >
                {allTeams?.map((item) => {
                  return (
                    <span
                      onClick={() => setFilterByteamId(item?.team?.tid)}
                      className="statsDivSpantag"
                    >
                      {item?.title}
                    </span>
                  );
                })}

                {/* <span
                  className={
                    filterByData === "batting_most_runs"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("batting_most_runs")}
                >
                  Most Runs{" "}
                </span>
                <span onClick={() => setFilterByData("batting_most_run4")}>
                  {" "}
                  Most Fours
                </span>
                <span onClick={() => setFilterByData("batting_most_run6")}>
                  {" "}
                  Most Sixes
                </span>
                <span onClick={() => setFilterByData("batting_most_run100")}>
                  Most Centuries
                </span>
                <span onClick={() => setFilterByData("batting_most_run50")}>
                  Most Fiftes
                </span> */}
              </p>
            </div>
          </div>

          <div className="mt-6" style={{ width: "100%" }}>
            <div className="p-3">
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  BATTER
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "bat")
                    ?.map((item) => {
                      return (
                        <div style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  Bowler
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "bowl")
                    ?.map((item) => {
                      return (
                        <div style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  All Rounder
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "all")
                    ?.map((item) => {
                      return (
                        <div style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                Wicket Keeper
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "wk")
                    ?.map((item) => {
                      return (
                        <div style={{ fontSize: "1.2rem", fontWeight: "400" }}>
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesSquad;

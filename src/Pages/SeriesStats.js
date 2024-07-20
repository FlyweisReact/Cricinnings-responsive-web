import { useEffect, useState } from "react";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
const SeriesStats = () => {
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

  const getStatesData = async (payload) => {
    axios
      .get(baseUrl + `user/competitions/${payload}/stats/${filterByData}`)
      .then((res) => {
        // console.log(res?.data);
        setCompetitionData(res?.data);
      });
  };

  useEffect(() => {
    getStatesData(seriesId);
  }, [filterByData, seriesId]);

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
            <div
              onClick={() => setInitialCondition("batting")}
              className="stats_div"
            >
              <p> Batting</p>
              <p
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
                className="statsDivSpantag123"
              >
                <span
                  className={
                    filterByData === "batting_most_runs"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("batting_most_runs")}
                >
                  Most Runs{" "}
                </span>
                <span
                  className={
                    filterByData === "batting_highest_average"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("batting_highest_average")}
                >
                  Best Batting Average{" "}
                </span>
                <span
                  className={
                    filterByData === "batting_highest_strikerate"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("batting_highest_strikerate")}
                >
                  Best Strike Rate{" "}
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
                </span>
              </p>
            </div>
            <div
              onClick={() => setInitialCondition("bowling")}
              className="stats_div"
            >
              <p> Bowling</p>
              <p
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
                className="statsDivSpantag123"
              >
                <span
                  className={
                    filterByData === "batting_most_runs"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("bowling_top_wicket_takers")}
                >
                  Most Wickets{" "}
                </span>
                <span onClick={() => setFilterByData("bowling_four_wickets")}>
                  {" "}
                  Four Wickets
                </span>
                <span onClick={() => setFilterByData("bowling_five_wickets")}>
                  {" "}
                  Five Wickets
                </span>
                <span onClick={() => setFilterByData("bowling_best_averages")}>
                  Best Averages
                </span>
                <span
                  onClick={() => setFilterByData("bowling_best_strike_rates")}
                >
                  Best Strike Rate
                </span>
                <span
                  onClick={() => setFilterByData("bowling_best_economy_rates")}
                >
                  Best Economy
                </span>
                <span
                  onClick={() =>
                    setFilterByData("bowling_best_bowling_figures")
                  }
                >
                  Best Bowling Figures
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6" style={{ width: "100%" }}>
            {initialCondition === "batting" ? (
              <Table>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Player</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Matches</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Inns</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Runs</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Avg</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>SR</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>4s</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>6s</th>
                  </tr>
                </thead>
                <tbody>
                  {competitionData?.stats?.map((item) => (
                    <tr key={item?.player?.id}>
                      <td
                        onClick={() =>
                          navigate(
                            `/cricket-players/${item?.player?.title
                              ?.split(" ")
                              ?.join("-")}/${item?.player?.pid}`
                          )
                        }
                      >
                        {item?.player?.first_name} {item?.player?.last_name}
                      </td>
                      <td>{item?.matches}</td>
                      <td>{item?.innings}</td>
                      <td>{item?.runs}</td>
                      <td>{item?.average}</td>
                      <td>{item?.strike}</td>
                      <td>{item?.run4}</td>
                      <td>{item?.run6}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : initialCondition === "bowling" ? (
              <Table>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Player</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Matches</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Overs</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Balls</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Wkts</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Avg</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Runs</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>4-fers</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>5-fers</th>
                  </tr>
                </thead>
                <tbody>
                  {competitionData?.stats?.map((item) => (
                    <tr key={item?.player?.id}>
                      <td
                        onClick={() =>
                          navigate(
                            `/cricket-players/${item?.player?.title
                              ?.split(" ")
                              ?.join("-")}/${item?.player?.pid}`
                          )
                        }
                      >
                        {item?.player?.first_name} {item?.player?.last_name}
                      </td>
                      <td>{item?.matches || "-"}</td>
                      <td>{item?.overs || "-"}</td>
                      <td>{item?.balls || "-"}</td>
                      <td>{item?.wickets || "-"}</td>
                      <td>{item?.average || "-"}</td>
                      <td>{item?.runs || "-"}</td>
                      <td>{item?.wicket4i || "-"}</td>
                      <td>{item?.wicket5i || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Team Name</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Runs</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Wickets</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Wickets 4i</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Wickets 5i</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Fiftes</th>
                    <th style={{ backgroundColor: "#EDEBEA" }}>Centuries</th>
                  </tr>
                </thead>
                <tbody>
                  {competitionData?.stats?.map((item) => (
                    <tr key={item?.player?.id}>
                      <td
                        onClick={() =>
                          navigate(
                            `/cricket-players/${item?.player?.title
                              ?.split(" ")
                              ?.join("-")}/${item?.player?.pid}`
                          )
                        }
                      >
                        {item?.team?.title}
                      </td>
                      <td>{item?.runs}</td>
                      <td>{item?.wickets}</td>
                      <td>{item?.wicket4i}</td>
                      <td>{item?.wicket5i}</td>
                      <td>{item?.run50}</td>
                      <td>{item?.run100}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesStats;

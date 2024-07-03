import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";

import videoframe from "../Assets/Homepage/videoframe.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
const Stats = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const [competitionId, setCompetitionId] = useState("");
  const [filterByData, setFilterByData] = useState("batting_most_runs");
  const { matchId } = useParams();
  const [competitionData, setCompetitionData] = useState([]);
  const [initialCondition, setInitialCondition] = useState("batting");
  const navigate = useNavigate();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      console.log(banner);
    });
  };

  const getStatesData = async (payload) => {
    axios
      .get(baseUrl + `user/competitions/${payload}/stats/${filterByData}`)
      .then((res) => {
        console.log(res?.data);
        setCompetitionData(res?.data);
      });
  };

  useEffect(() => {
    if (competitionId) {
      getStatesData(competitionId);
    }
  }, [filterByData]);

  const getCompetationId = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      console.log(res?.data);
      setCompetitionId(res?.data?.match?.competition?.cid);
      if (res?.data?.match?.competition?.cid) {
        getStatesData(res?.data?.match?.competition?.cid);
      }
    });
  };

  useEffect(() => {
    getCompetationId();
  }, [matchId]);

  useEffect(() => {
    getAllBanner();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          <img
            style={{ height: "96px", width: "100%" }}
            src={banner1?.image}
            alt=""
          />
        </div>
        {/* <div
            style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
          >
            <p>Comming Soon ...</p>
          </div> */}
        <div className="w-[750px] p3-3 mt-5">
          <div className="w-[950px]  pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="flex flex-col ">
              <div>
                {initialCondition === "batting" ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Matches</th>
                        <th>Inns</th>
                        <th>Runs</th>
                        <th>Avg</th>
                        <th>SR</th>
                        <th>4s</th>
                        <th>6s</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitionData?.stats?.map((item) => (
                        <tr key={item?.player?.id}>
                          <td onClick={() => navigate(`/playerprofile/${item?.player?.pid}/${item?.player?.title}`)}>
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
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Matches</th>
                        <th>Inns</th>
                        <th>Wkts</th>
                        <th>Balls</th>
                        <th>Econ</th>
                        <th>4-fers</th>
                        <th>5-fers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitionData?.stats?.map((item) => (
                        <tr key={item?.player?.id}>
                          <td onClick={() => navigate(`/profile/${item?.player?.pid}/${item?.player?.first_name}-${item?.player?.last_name}`)}>
                            {item?.player?.first_name} {item?.player?.last_name}
                          </td>
                          <td>{item?.matches}</td>
                          <td>{item?.innings}</td>
                          <td>{item?.wickets}</td>
                          <td>{item?.balls}</td>
                          <td>{item?.econ}</td>
                          <td>{item?.wicket4i}</td>
                          <td>{item?.wicket5i}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Team Name</th>
                        <th>Runs</th>
                        <th>Wickets</th>
                        <th>Wickets 4i</th>
                        <th>Wickets 5i</th>
                        <th>Fiftes</th>
                        <th>Centuries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitionData?.stats?.map((item) => (
                        <tr key={item?.player?.id}>
                          <td>
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

              <div className="mt-10 flex gap-5">
                <div onClick={() => setInitialCondition("batting")} className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Batting Stats
                    </div>
                    <div
                      onClick={() => setFilterByData("batting_most_runs")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Runs
                    </div>
                    <div
                      onClick={() => setFilterByData("batting_most_run4")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Fours
                    </div>
                    <div
                      onClick={() => setFilterByData("batting_most_run6")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Sixes
                    </div>
                    <div
                      onClick={() => setFilterByData("batting_most_run100")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Centuries
                    </div>
                    <div
                      onClick={() => setFilterByData("batting_most_run50")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Fiftes
                    </div>
                  </div>
                </div>
                <div onClick={() => setInitialCondition("bowling")} className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Bowling Stats
                    </div>
                    <div
                      onClick={() =>
                        setFilterByData("bowling_top_wicket_takers")
                      }
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Top Wicket Taker
                    </div>
                    <div
                      onClick={() => setFilterByData("bowling_four_wickets")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Fours Wickets
                    </div>
                    <div
                      onClick={() => setFilterByData("bowling_five_wickets")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Five Wickets
                    </div>
                    <div
                      onClick={() => setFilterByData("bowling_best_averages")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Best Averages
                    </div>
                    <div
                      onClick={() =>
                        setFilterByData("bowling_best_bowling_figures")
                      }
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Best Bowling Figures
                    </div>
                  </div>
                </div>
                <div onClick={() => setInitialCondition("team")} className="bg-[white] w-[220px] border pb-4 rounded-lg">
                  <div className="flex flex-col mt-4 gap-3 items-center">
                    <div className="h-[50px] w-[200px]  bg-[#0F19AF] rounded-lg font-semibold text-white shadow text-sm flex justify-center items-center">
                      Team Stats
                    </div>
                    <div
                      onClick={() => setFilterByData("team_total_runs")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Total Runs
                    </div>
                    <div
                      onClick={() => setFilterByData("team_total_run100")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Total Wickets
                    </div>
                    <div
                      onClick={() => setFilterByData("team_total_run50")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Fiftes
                    </div>
                    {/* <div
                      onClick={() => setFilterByData("team_total_centuries")}
                      className="h-[50px] w-[200px] shadow text-sm flex justify-center items-center"
                    >
                      Most Centuries
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[250px] ">
              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>
              <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
                <div className="text-sm p-3 font-semibold">
                  FEATURE VIDEOS !!
                </div>
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <div className="flex justify-center pb-5">
                  <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                    More Videos
                  </button>
                </div>
              </div>

              {/* <div className="bg-[white] rounded-lg mt-2 pb-5 border">
                <div className="p-1">
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
                  <img src={camp} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    Mumbai Indians Champions
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={ipl} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={premier} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

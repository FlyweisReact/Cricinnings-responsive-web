import Commentarynavbar from "../Components/Commentarynavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import { useEffect, useState } from "react";

const Squads = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const navigate = useNavigate();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      //
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const getSquadData = async () => {
    axios.get(baseUrl + "user/matchSquad/" + matchId).then((res) => {
      setSquadData(res?.data);
      //
    });
  };
  
  useEffect(() => {
    getSquadData();
  }, []);

  const [allSeries, setAllSeries] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
  const [mainCategory, setMainCategory] = useState("teams");
  const [teamSelector, setTeamSelector] = useState("test");
  const [odiBestman, setOdiBestman] = useState([]);
  const [t20Bestman, setT20Bestman] = useState([]);
  const [testBestman, setTestBestman] = useState([]);
  const [odiBolling, setOdiBolling] = useState([]);
  const [t20Bolling, setT20Bolling] = useState([]);
  const [testBolling, setTestBolling] = useState([]);
  const [odiAlr, setOdiAlr] = useState([]);
  const [t20Alr, setT20Alr] = useState([]);
  const [testAlr, setTestAlr] = useState([]);
  const [specialBanner, setSpecialBanner] = useState([]);
  const [hompageBanner7, setHompageBanner7] = useState("");
  const [hompageBanner8, setHompageBanner8] = useState("");

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
    setOdiBestman(res?.data?.rankingData?.ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.ranks?.bowlers?.tests);
    setOdiAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.odis || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
    setTeamRankings(res?.response?.items);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

  return (
    <>
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />
      </div>

      <div className="bg-white pb-5">
        <div className="flex justify-center pt-2 gap-5">
          <div>
            <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <div className="bg-[#0F19AF] flex  items-center shadow-2xl justify-between  rounded-t-lg w-full h-[45px] text-white">
                <div className="ml-2 flex items-center gap-2">
                  {" "}
                  <img
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                    src={
                      squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                        ? squadData?.teams?.[1]?.thumb_url
                        : squadData?.teams?.[0]?.thumb_url
                    }
                    alt=""
                  />
                  {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                    ? squadData?.teams?.[1]?.alt_name
                    : squadData?.teams?.[0]?.alt_name}
                </div>
                <div className="mr-2 flex items-center gap-2">
                  {" "}
                  <img
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                    src={
                      squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                        ? squadData?.teams?.[0]?.thumb_url
                        : squadData?.teams?.[1]?.thumb_url
                    }
                    alt=""
                  />
                  {squadData?.teama?.team_id === squadData?.teams?.[0]?.tid
                    ? squadData?.teams?.[0]?.alt_name
                    : squadData?.teams?.[1]?.alt_name}
                </div>
              </div>
              <div>
                <div className="font-semibold text-center mt-5 text-xl">
                  Playing XI
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px]">
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              onClick={() =>
                                navigate(
                                  `/profiles/${item?.player_id}/${formatTitle(
                                    item?.name
                                  )}`
                                )
                              }
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              <div>
                                {/* <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              /> */}
                              </div>
                              <div className="flex flex-col">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.player_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="font-semibold"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              onClick={() =>
                                navigate(
                                  `/profiles/${item?.player_id}/${formatTitle(
                                    item?.name
                                  )}`
                                )
                              }
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                className="flex flex-col"
                              >
                                <span className="font-semibold">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>

                  <div className="w-[300px]">
                    {/* <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasir Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    </div> */}
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                style={{
                                  width: "200px",
                                  textAlign: "left",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                }}
                                //  className="flex flex-col"
                              >
                                <span className="font-semibold">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                className="abc"
                              >
                                <span
                                  style={{
                                    width: "200px",
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                  className="font-semibold mr-2"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-center mt-5 text-xl">
                  Bench
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px]">
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              <div>
                                {/* <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              /> */}
                              </div>
                              <div className="flex flex-col">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.player_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="font-semibold"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              onClick={() =>
                                navigate(
                                  `/profiles/${item?.player_id}/${formatTitle(
                                    item?.name
                                  )}`
                                )
                              }
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                className="flex flex-col"
                              >
                                <span className="font-semibold">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>

                  <div className="w-[300px]">
                    {/* <div className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3">
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasir Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                    </div> */}
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              {/* <div>
                              <img
                                src={item?.playerpic || "defaultPlayerPic.jpg"}
                                alt={item?.name || "Player"}
                                className="w-[50px] h-[50px]"
                              />
                            </div> */}
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                style={{
                                  width: "200px",
                                  textAlign: "left",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                }}
                                //  className="flex flex-col"
                              >
                                <span className="font-semibold">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))
                      : squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3"
                            >
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                className="abc"
                              >
                                <span
                                  style={{
                                    width: "200px",
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                  className="font-semibold mr-2"
                                >
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400">
                                  {item?.role === "bat"
                                    ? "Batter"
                                    : item?.role === "bowl"
                                    ? "Bowler"
                                    : item?.role === "all"
                                    ? "All-Rounder"
                                    : item?.role === "wk"
                                    ? "Wicket-keeper"
                                    : item?.role || "Role"}
                                </span>
                              </div>
                            </div>
                          ))}

                    {/* <div className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6]">
                      <div>
                        <img
                          src={playerpic}
                          alt=""
                          className="w-[50px] h-[50px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Yasirqasdds Khan</span>
                        <span className="text-slate-400">Batter</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[250px]  mt-10">
            {allSeries?.length > 0 && (
              <div className="bg-white p-4 rounded-lg mb-4 shadow-lg">
                <span className="text-black font-bold text-sm pl-2">
                  CURRENT SERIES
                </span>
                <div className="flex flex-col mt-4 gap-2">
                  {allSeries?.map((item, index) => {
                    if (index >= 4) return null;
                    return (
                      <div
                        key={item?._id}
                        className="pt-1 pl-1 pb-0 rounded-md cursor-pointer hover:underline hover:text-[#0F19AF] transition duration-300"
                        onClick={() =>
                          navigate(
                            `/cricket-series/${item?.cid}/${formatTitle(
                              item?.title
                            )}-${item?.season}/matches`
                          )
                        }
                      >
                        <p className="text-left text-sm font-medium text-gray-800">
                          {item?.title}
                          {}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {hompageBanner7?.image && (
              <img
                style={{
                  width: "100%",
                  height: "550px",
                  borderRadius: "10px",
                }}
                className="mb-3"
                src={hompageBanner7?.image}
                alt="middleBanner"
              />
            )}

            <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
              <div className="flex justify-between p-2">
                <div
                  className="text-sm font-semibold"
                  style={{ fontSize: "12px" }}
                >
                  RANKING’s
                </div>
                <div>
                  <button
                    onClick={() => navigate("/icc-rankings/men/batting")}
                    className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                  >
                    View all
                  </button>
                </div>
              </div>
              <div className="flex justify-between ml-2 mr-2">
                <button
                  onClick={() => setTeamSelector("test")}
                  className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      teamSelector === "test" ? "#0F19AF" : "black",
                    color: teamSelector === "test" ? "white" : "black",
                    fontWeight: teamSelector === "test" ? "bold" : "normal",
                  }}
                >
                  Test
                </button>
                <button
                  onClick={() => setTeamSelector("odi")}
                  className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                  style={{
                    cursor: "pointer",
                    backgroundColor: teamSelector === "odi" ? "#0F19AF" : null,
                    color: teamSelector === "odi" ? "white" : "black",
                    fontWeight: teamSelector === "odi" ? "bold" : "normal",
                  }}
                >
                  ODI
                </button>
                <button
                  onClick={() => setTeamSelector("t20")}
                  className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
                  style={{
                    cursor: "pointer",
                    backgroundColor: teamSelector === "t20" ? "#0F19AF" : null,
                    color: teamSelector === "t20" ? "white" : "black",
                    fontWeight: teamSelector === "t20" ? "bold" : "normal",
                  }}
                >
                  T20
                </button>
              </div>
              <div className="flex justify-between m-2">
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "teams" ? "underline" : "none",
                    fontWeight: mainCategory === "teams" ? "bold" : "normal",
                    color: "black",
                    textDecorationColor: "#0F19AF",
                  }}
                  onClick={() => setMainCategory("teams")}
                  className="text-[#0F19AF]"
                >
                  Teams
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "batting" ? "underline" : "none",
                    fontWeight: mainCategory === "batting" ? "bold" : "normal",

                    textDecorationColor: "#0F19AF",
                  }}
                  onClick={() => setMainCategory("batting")}
                >
                  Batting
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "bowling" ? "underline" : "none",
                    fontWeight: mainCategory === "bowling" ? "bold" : "normal",

                    textDecorationColor: "#0F19AF",
                  }}
                  onClick={() => setMainCategory("bowling")}
                >
                  Bowling
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "alr" ? "underline" : "none",
                    fontWeight: mainCategory === "alr" ? "bold" : "normal",

                    textDecorationColor: "#0F19AF",
                  }}
                  onClick={() => setMainCategory("alr")}
                >
                  ALR
                </div>
              </div>
              <table>
                <thead style={{ textAlign: "center" }}>
                  {mainCategory === "teams" && (
                    <tr>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Team</th>
                      <th className="w-[100px]">Rating</th>
                    </tr>
                  )}

                  {mainCategory === "batting" && (
                    <tr>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Player</th>
                      <th className="w-[100px]">Rating</th>
                    </tr>
                  )}
                  {mainCategory === "bowling" && (
                    <tr>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Player</th>
                      <th className="w-[100px]">Rating</th>
                    </tr>
                  )}
                  {mainCategory === "alr" && (
                    <tr>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Player</th>
                      <th className="w-[100px]">Rating</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {mainCategory === "teams" && (
                    <>
                      {teamSelector === "test" &&
                        test?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20s?.slice(0, 6).map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}

                      {teamSelector === "odi" &&
                        odis?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                    </>
                  )}
                  {mainCategory === "batting" && (
                    <>
                      {teamSelector === "test" &&
                        testBestman?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bestman?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBestman?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                    </>
                  )}
                  {mainCategory === "bowling" && (
                    <>
                      {teamSelector === "test" &&
                        testBolling?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bolling?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBolling?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                    </>
                  )}
                  {mainCategory === "alr" && (
                    <>
                      {teamSelector === "test" &&
                        testAlr?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        odiAlr?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiAlr?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.player}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>
              <div className="text-center text-[10px] mt-2">
                Latest Updated On {new Date().toLocaleDateString()}
              </div>
            </div>

            {hompageBanner8?.image && (
              <img
                src={hompageBanner8?.image}
                style={{
                  height: "550px",
                  borderRadius: "10px",
                  marginTop: "2rem",
                }}
                alt="images"
              />
            )}
            <div className="bg-[white] rounded-lg mt-2">
              <div className="p-1">
                {specialBanner?.lenght > 0 && (
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
                )}
                {specialBanner?.map((item, index) => (
                  <>
                    <img src={item?.image} alt="" />
                    <span className="font-semibold text-sm ml-4">
                      {item?.subtitle}
                    </span>
                    <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                      {item?.description}
                    </p>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Squads;

/** @format */

import Commentarynavbar from "../Components/Commentarynavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import { useEffect, useState } from "react";
import RankingSeries from "../Components/RankingSeries";

const Squads = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [squadData, setSquadData] = useState();
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
  const [testAlr, setTestAlr] = useState([]);

  const getSquadData = async () => {
    axios.get(baseUrl + "user/matchSquad/" + matchId).then((res) => {
      setSquadData(res?.data);
    });
  };

  useEffect(() => {
    getSquadData();
  }, []);

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
        <div className="flex justify-center pt-2 gap-5 column-flex small-padding">
          <div>
            <div className="w-[680px] mt-2 bg-[white] rounded-lg box-shadow-container full-width">
              <div className="bg-[#0F19AF] flex  items-center  justify-between  rounded-t-lg w-full h-[45px] text-white">
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
                <div className="font-semibold text-center mt-2 mb-2 text-xl">
                  Playing XI
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px] full-width ">
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
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6] small-padding "
                            >
                              <div className="flex flex-col">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.player_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="font-semibold small-text"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6] small-padding"
                            >
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
                                <span className="font-semibold small-text">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                  </div>

                  <div className="w-[300px] full-width">
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "true")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3 small-padding"
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
                              >
                                <span className="font-semibold small-text">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3 small-padding"
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
                                  className="font-semibold mr-2 small-text"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                  </div>
                </div>
              </div>

              <div>
                <div className="font-semibold text-center mt-5 text-xl">
                  Bench
                </div>
                <div className="flex justify-center">
                  <div className="w-[300px] ">
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teama?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6] small-padding"
                            >
                              <div className="flex flex-col">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.player_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="font-semibold small-text"
                                >
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                              className="flex items-center gap-1 border-b border-r pt-1 pb-1 hover:bg-[#EBF9F6] small-padding"
                            >
                              <div
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.player_id}/${formatTitle(
                                      item?.name
                                    )}`
                                  )
                                }
                                className="flex flex-col "
                              >
                                <span className="font-semibold small-text">
                                  {item?.role_str === "(C)" ? "(C)" : ""}{" "}
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                  </div>

                  <div className="w-[300px]">
                    {squadData?.teama?.team_id !== squadData?.teams?.[0]?.tid
                      ? squadData?.teamb?.squads
                          ?.filter((item) => item?.playing11 === "false")
                          ?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3 small-padding"
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
                              >
                                <span className="font-semibold small-text">
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                              className="flex items-center justify-end  border-b pt-1 pb-1 hover:bg-[#EBF9F6] pr-3 small-padding"
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
                                  className="font-semibold mr-2 xs-small-text"
                                >
                                  {item?.name || "Player Name"}
                                </span>
                                <span className="text-slate-400 xs-small-text">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[250px] mt-10 full-width">
            <RankingSeries />
          </div>
        </div>
      </div>
    </>
  );
};

export default Squads;

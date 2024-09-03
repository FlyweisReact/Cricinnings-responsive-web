/** @format */

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { Table } from "react-bootstrap";

const SeriesPoints = () => {
  const { seriesId } = useParams();
  const [squadData, setSquadData] = useState({});
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

  const getMatchData = async () => {
    axios.get(baseUrl + "user/getpoints/" + seriesId).then((res) => {
      setSquadData(res?.data);
    });
  };

  useEffect(() => {
    getMatchData();
  }, [seriesId]);

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

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px]  bg-[white]  full-width column-flex point-table">
            <div
              style={{ padding: "1rem" }}
              className="left w-[700px] h-[700px]  full-width box-shadow-container auto-height"
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#rgb(34, 34, 34)",
                  padding: "10px",
                }}
              >
                <p style={{ color: "black", fontWeight: "bold" }}>
                  <h1 className="text-lg font-bold medium-text">
                    {squadData?.standings?.[0]?.round?.name}
                    {squadData?.standings?.[0]?.round?.name && "- Points Table"}
                  </h1>
                </p>
              </div>
              <Table className="w-full" responsive>
                <thead></thead>
                <tbody>
                  {Array.isArray(squadData?.standings) &&
                    squadData.standings.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="border-b bg-gray-200">
                          <td
                            style={{ fontSize: "12px" }}
                            className="font-bold text-center"
                          >
                            <h1 className="text-sm small-text"> {item?.round?.name}</h1>
                          </td>
                          <td></td>
                          <td className="small-text">Mat</td>
                          <td className="small-text">Won</td>
                          <td className="small-text">Lost</td>
                          <td className="small-text">Tied</td>
                          <td className="small-text">NR</td>
                          <td className="small-text">Pts</td>
                          <td className="small-text">NRR</td>
                        </tr>
                        {item?.standings?.map((team, teamIndex) => (
                          <tr key={teamIndex} className="border-b">
                            <td>
                              <div className="flex gap-2 items-center">
                                <span>
                                  <img
                                    src={team?.team?.logo_url}
                                    alt=""
                                    className="w-[30px] h-[30px]"
                                  />
                                </span>
                                <span>
                                  <h1 className="text-base xs-small-text">
                                    {team?.team?.alt_name}
                                  </h1>
                                </span>
                              </div>
                            </td>
                            <td></td>
                            <td className="xs-small-text">{team?.played}</td>
                            <td className="xs-small-text">{team?.win}</td>
                            <td className="xs-small-text">{team?.loss}</td>
                            <td className="xs-small-text">{team?.draw}</td>
                            <td className="xs-small-text">{team?.nr}</td>
                            <td className="xs-small-text">{team?.points}</td>
                            <td className="xs-small-text">{team?.netrr}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </div>
            <div className="w-[250px] mt-10 box-shadow-container full-width zero-margin">
              <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
                <div className="flex justify-between p-2">
                  <div
                    className="text-sm font-semibold small-text"
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
                      backgroundColor:
                        teamSelector === "odi" ? "#0F19AF" : null,
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
                      backgroundColor:
                        teamSelector === "t20" ? "#0F19AF" : null,
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
                    className="text-[#0F19AF]  xs-small-text"
                  >
                    Teams
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      textDecoration:
                        mainCategory === "batting" ? "underline" : "none",
                      fontWeight:
                        mainCategory === "batting" ? "bold" : "normal",

                      textDecorationColor: "#0F19AF",
                    }}
                    onClick={() => setMainCategory("batting")}
                    className='xs-small-text'
                  >
                    Batting
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      textDecoration:
                        mainCategory === "bowling" ? "underline" : "none",
                      fontWeight:
                        mainCategory === "bowling" ? "bold" : "normal",

                      textDecorationColor: "#0F19AF",
                    }}
                    onClick={() => setMainCategory("bowling")}
                    className='xs-small-text'
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
                    className='xs-small-text'
                  >
                    ALR
                  </div>
                </div>
                <table>
                  <thead style={{ textAlign: "center" }}>
                    {mainCategory === "teams" && (
                      <tr>
                        <th className="w-[100px] xs-small-text">Rank</th>
                        <th className="w-[100px] xs-small-text">Team</th>
                        <th className="w-[100px] xs-small-text">Rating</th>
                      </tr>
                    )}

                    {mainCategory === "batting" && (
                      <tr>
                        <th className="w-[100px] xs-small-text">Rank</th>
                        <th className="w-[100px] xs-small-text">Player</th>
                        <th className="w-[100px] xs-small-text">Rating</th>
                      </tr>
                    )}
                    {mainCategory === "bowling" && (
                      <tr>
                        <th className="w-[100px] xs-small-text">Rank</th>
                        <th className="w-[100px] xs-small-text">Player</th>
                        <th className="w-[100px] xs-small-text">Rating</th>
                      </tr>
                    )}
                    {mainCategory === "alr" && (
                      <tr>
                        <th className="w-[100px] xs-small-text">Rank</th>
                        <th className="w-[100px] xs-small-text">Player</th>
                        <th className="w-[100px] xs-small-text">Rating</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {mainCategory === "teams" && (
                      <>
                        {teamSelector === "test" &&
                          test?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.team}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20s?.slice(0, 6).map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.team}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}

                        {teamSelector === "odi" &&
                          odis?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.team}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "batting" && (
                      <>
                        {teamSelector === "test" &&
                          testBestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20Bestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiBestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "bowling" && (
                      <>
                        {teamSelector === "test" &&
                          testBolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20Bolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiBolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "alr" && (
                      <>
                        {teamSelector === "test" &&
                          testAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          odiAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">{item?.rank}</td>
                              <td className="text-center xs-small-text">{item?.player}</td>
                              <td className="text-center xs-small-text">{item?.rating}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPoints;

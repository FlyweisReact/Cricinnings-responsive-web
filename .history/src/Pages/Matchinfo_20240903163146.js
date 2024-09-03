import Commentarynavbar from "../Components/Commentarynavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";

const Matchinfo = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
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
    // getAllBanner();
  }, []);

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDateTime = `${formattedHours}:${formattedMinutes} ${period} (${month} ${day})`;

    return formattedDateTime;
  }
  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      setSquadData(res?.data?.scorecard);
    });
  };
  function formatDate11(dateString) {
    const date = new Date(dateString);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

    return formattedDate;
  }

  useEffect(() => {
    getSquadData();
  }, []);

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
  const navigate = useNavigate();

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");

    setOdiBestman(res?.data?.rankingData?.ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.ranks?.bowlers?.tests);
    setOdiAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.odis || []);
    setT20Alr(res?.data?.rankingData?.ranks?.["all-rounders"]?.t20s || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
  };

  useEffect(() => {
    getAllTeamRankingsData();
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
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="mt-1 shadow-2xl w-[700px] ml-3">
              <div
                style={{ borderRadius: "10px 10px 0 0" }}
                className="bg-[#0F19AF] h-[45px] flex items-center text-white pl-2"
              >
                Match Info
              </div>

              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Match
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.short_title}
                  {","} {squadData?.subtitle}
                  {","} {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Series
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Stadium
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.venue?.location}
                  {","} {squadData?.venue?.country}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Date
                </div>
                <div className="text-slate-400 mr-2">
                  {formatDate11(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Time
                </div>
                <div className="text-slate-400 mr-2">
                  {formatDateTime(squadData?.date_start)}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Toss
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.toss?.text}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Venue
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.venue?.name}
                  {","} {squadData?.venue?.location}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Umpires
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.umpires?.split(",")[0]}
                  {","}
                  {squadData?.umpires?.split(",")[1]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  3rd Umpire
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.umpires?.split(",")[2]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Referee
                </div>
                <div className="text-slate-400 mr-2">{squadData?.referee}</div>
              </div>
            </div>
            <div className="w-[250px]  mt-10">
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
                    className="text-[#0F19AF]"
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
      </div>
    </div>
  );
};

export default Matchinfo;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import CurrentSeries from "../Components/CurrentSeries";
import { TopBanner } from "../Components/HelpingComponent";

const Venu = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
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
  
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);


  const getSquadData = async () => {
    axios
      .get(baseUrl + "user/getCompetitionOverview/" + seriesId)
      .then((res) => {
        setSquadData(res?.data?.response);
      });
  };

  useEffect(() => {
    getSquadData();
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


  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        {banner1?.image && (
          <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
            <img
              style={{ height: "96px", width: "100%" }}
              src={banner1?.image}
              alt=""
            />
          </div>
        )}

        <TopBanner />

        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px] h-[1100px] shadow-2xl">
              <div className="mt-10 ml-4">
                <div
                  style={{ fontSize: "20px", paddingBottom: "10px" }}
                  className="text-[#0F19AF] underline font-semibold"
                >
                  Venue Guide
                </div>
                <div className="mt-2">
                  <span className="font-semibold">
                    Stadium:
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map((item) => item?.name + ", ")}
                    </span>
                  </span>
                  <div className="mt-2"> </div>
                  <span className="font-semibold">
                    City:
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map((item) => item?.city + ", ")}
                    </span>
                  </span>
                  <div className="mt-2"> </div>

                  <span className="font-semibold">
                    End:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {squadData?.dateend}
                    </span>
                  </span>
                  <div className="mt-2"></div>

                  <span className="font-semibold ">
                    Hosts to:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map(
                        (item) => item?.country + ", "
                      )}
                    </span>
                  </span>
                  <div className=""></div>
                </div>
              </div>
              {/* <div className=" mt-5 ml-4">
                <div className="text-[#0F19AF] font-semibold underline">
                  Match Info
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Match:</span>
                  <div className="">
                    {squadData?.short_title}
                    {","}
                    {squadData?.subtitle}
                    {","}
                    {squadData?.competition?.title}
                  </div>
                  <span className="font-semibold">Toss:</span>
                  <div className="">{squadData?.toss?.text}</div>
                  <span className="font-semibold">Time:</span>
                  <div className="">
                    {formatDateTime(squadData?.date_start)}
                  </div>
                  <span className="font-semibold">Indian Local Time:</span>
                  <div className="">
                    {squadData?.date_start
                      ?.slice(0, 10)
                      ?.split("-")
                      .reverse()
                      .join("-")}{" "}
                    {squadData?.date_start?.slice(11, 16) + " " + "IST"}
                  </div>
                  <span className="font-semibold">Venue:</span>
                  <div className="">
                    {squadData?.venue?.name} {","}
                    {squadData?.venue?.location}
                  </div>
                  <span className="font-semibold">Umpires:</span>
                  <div className="">
                    {squadData?.umpires?.split(",")[0]}
                    {","}
                    {squadData?.umpires?.split(",")[1]}
                  </div>
                  <span className="font-semibold"> Third Umpires:</span>
                  <div className=""> {squadData?.umpires?.split(",")[2]}</div>
                  <span className="font-semibold"> Match Referee:</span>
                  <div className=""> {squadData?.referee}</div>
                  {}
                </div>
              </div> */}
            </div>
            <div className="w-[250px]  mt-10">
           <CurrentSeries />


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

          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venu;

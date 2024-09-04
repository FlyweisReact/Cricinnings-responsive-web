/** @format */

import { useEffect, useState } from "react";
import ipl from "../Assets/Homepage/ipl.svg";
import {
  GetData,
  GetDataWithToken,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cricketnews = () => {
  const navigate = useNavigate();
  const [fantasyBanner, setFantasyBanner] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
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
  const [specialBanner, setSpecialBanner] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");

  const getAllData = async () => {
    GetData("userAuth/getPostByTitle/CRICKET_NEWS").then((res) => {
      setFantasyBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const formattedDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === today.getTime()) {
      return "Today";
    } else if (d.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
  };

  const getAllHomePageBanners = () => {
    GetData("userAuth/getPostsByPosition").then((res) => {
      const topBanner = res?.data?.filter((item) => item?.title === "top");
      const middleBanner = res?.data?.filter(
        (item) => item?.title === "middle"
      );
      const bottomBanner = res?.data?.filter(
        (item) => item?.title === "bottom"
      );
      setTopBanner1(topBanner[0]?.image);
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
    });
  };
  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  const getAllSeriesData = () => {
    GetDataWithToken({
      path: "competitions",
      status: "live",
    }).then((res) => {
      setAllSeries(res?.response?.items);
    });
  };

  const getAllTeamRankingsData = () => {
    GetDataWithToken({
      path: "iccranks",
    }).then((res) => {
      setOdiBestman(res?.response?.ranks?.batsmen?.odis);
      setT20Bestman(res?.response?.ranks?.batsmen?.t20s);
      setTestBestman(res?.response?.ranks?.batsmen?.tests);
      setOdiBolling(res?.response?.ranks?.bowlers?.odis);
      setT20Bolling(res?.response?.ranks?.bowlers?.t20s);
      setTestBolling(res?.response?.ranks?.bowlers?.tests);
      setOdiAlr(res?.response?.ranks?.["all-rounders"]?.odis || []);
      setTestAlr(res?.response?.ranks?.["all-rounders"]?.tests || []);
      setOdis(res?.response?.ranks?.teams?.odis);
      setT20s(res?.response?.ranks?.teams?.t20s);
      setTest(res?.response?.ranks?.teams?.tests);
    });
  };

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  useEffect(() => {
 c
    getAllTeamRankingsData();
    getAllSpecialBanners();
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>{`Cricket News | Cricinnings.com`}</title>
        <meta name="description" content={`Cricket News | Cricinnings.com`} />
      </Helmet>
      <div className="bg-[white] pl-2 pt-2 pr-2">
        {topBanner1 && (
          <div className="bg-[#B3B3B3] text-white h-[300px]  flex justify-center items-center rounded-lg mt-2">
            <img
              alt=""
              style={{ width: "950px", height: "300px" }}
              src={topBanner1}
              className="w-[950px]"
            />
          </div>
        )}

        <div className="cricket-news-container">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 full-width column-flex zero-margin main-container">
            <div className="left w-[700px] full-width box-shadow-container">
              <div className="flex justify-center mt-3 flex-col items-center gap-5">
                {fantasyBanner &&
                  fantasyBanner?.map((item) => (
                    <>
                      <div className="w-full p-2">
                        <div className="news-card">
                          <img alt="" src={item?.image || ipl} />
                          <div className="content">
                            <div className="heading small-text">
                              {item?.name}
                            </div>
                            <div className="text-[#0F19AF] font-semibold xs-small-text">
                              {item?.subtitle}
                            </div>
                            <div className="xs-small-text">
                              {item?.description}
                            </div>
                            <div className="text-slate-400 xs-small-text">
                              {formattedDate(item?.createdAt)}{" "}
                              {item?.uploadedBy}
                            </div>
                          </div>
                        </div>

                        <hr
                          style={{
                            color: "1px solid black",
                            paddingBottom: "1rem",
                          }}
                        />
                      </div>
                    </>
                  ))}
              </div>
            </div>
            <div className="w-[250px]  mt-10 zero-margin full-width small-padding">
              {allSeries?.length > 0 && (
                <div className="bg-white p-4 rounded-lg mb-4 box-shadow-container">
                  <span className="text-black font-bold text-sm pl-2 small-text">
                    CURRENT SERIES
                  </span>
                  <div className="flex flex-col mt-4 gap-2">
                    {allSeries?.map((item, index) => {
                      if (index >= 4) return null;
                      return (
                        <div
                          key={item?._id}
                          className="pt-1 pl-1 pb-0 rounded-md cursor-pointer hover:underline hover:text-[#0F19AF] transition duration-300 zero-padding"
                          onClick={() =>
                            navigate(
                              `/cricket-series/${item?.cid}/${formatTitle(
                                item?.title
                              )}-${item?.season}/matches`
                            )
                          }
                        >
                          <p className="text-left text-sm font-medium text-gray-800 xs-small-text">
                            {item?.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {middleBanner2 && (
                <img
                  style={{
                    width: "100%",
                    height: "550px",
                    marginTop: "2rem",
                    borderRadius: "10px",
                  }}
                  src={middleBanner2}
                  alt="middleBanner"
                />
              )}

              <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2 box-shadow-container">
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
                    className="text-[#0F19AF] xs-small-text"
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
                    className="xs-small-text"
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
                    className="xs-small-text"
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
                    className="xs-small-text"
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
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.team}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20s?.slice(0, 6).map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.team}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}

                        {teamSelector === "odi" &&
                          odis?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.team}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "batting" && (
                      <>
                        {teamSelector === "test" &&
                          testBestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20Bestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiBestman?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "bowling" && (
                      <>
                        {teamSelector === "test" &&
                          testBolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          t20Bolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiBolling?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                    {mainCategory === "alr" && (
                      <>
                        {teamSelector === "test" &&
                          testAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "t20" &&
                          odiAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
                            </tr>
                          ))}
                        {teamSelector === "odi" &&
                          odiAlr?.slice(0, 6)?.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                              <td className="text-center xs-small-text">
                                {item?.rank}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.player}
                              </td>
                              <td className="text-center xs-small-text">
                                {item?.rating}
                              </td>
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

              {bottomBanner1 && (
                <img
                  src={bottomBanner1}
                  style={{
                    height: "550px",
                    borderRadius: "10px",
                    marginTop: "2rem",
                  }}
                  alt="images"
                />
              )}
              
              <div className="special-box-container">
                <p className="heading">SPECIALS</p>
                <div className="box-cont">
                  {specialBanner?.map((item, index) => (
                    <div className="box" key={index}>
                      <img src={item?.image} alt="" />
                      <p className="title">{item?.subtitle}</p>
                      <p className="description">{item?.description}</p>
                    </div>
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

export default Cricketnews;

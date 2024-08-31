/** @format */

import cric from "../Assets/Homepage/cric.svg";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import editorpick from "../Assets/Homepage/editorpick.svg";
import { useEffect, useState } from "react";
import {
  AuthToken,
  GetData,
  baseUrl,
  convertStringFormat,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Helmet } from "react-helmet";
import Livescrore from "./Livescrore";

const Homepage = () => {
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <span>&#8594;</span>
      </div>
    );
  };
  function dateUpdate(dateString) {
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

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${dayOfWeek}, ${day} ${month}, ${hours}:${minutes} ${ampm}`;

    return formattedDate;
  }
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <span>&#8592;</span>
      </div>
    );
  };

  const editorsettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

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
  const [feacturePosts, setFeacturePosts] = useState([]);
  const [topStories, setTopStories] = useState([]);
  const [middleBanner, setMiddleBanner] = useState([]);
  const [editorpicks, setEditorpicks] = useState([]);
  const [specialBanner, setSpecialBanner] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [hompageBanner2, setHompageBanner2] = useState("");
  const [hompageBanner3, setHompageBanner3] = useState("");
  const [hompageBanner4, setHompageBanner4] = useState("");
  const [hompageBanner5, setHompageBanner5] = useState("");
  const [hompageBanner6, setHompageBanner6] = useState("");
  const [hompageBanner7, setHompageBanner7] = useState("");
  const [hompageBanner8, setHompageBanner8] = useState("");
  const navigate = useNavigate();
  const [sliderData, setSliderData] = useState([]);

  const getSliderDataMatch = async () => {
    const response = await axios.get(
      baseUrl + "user/getMatchesList?type=mixed&paged=1&per_page=10&type=mixed",
      {
        params: {
          token: AuthToken,
        },
      }
    );

    setSliderData(response?.data?.response?.matches);
  };

  useEffect(() => {
    getSliderDataMatch();
  }, []);

  const getAllHomePageBanners = async () => {
    try {
      const res1 = await GetData("userAuth/getPostsByPosition");

      const topBanner = res1?.data?.filter((item) => item?.title === "top");
      const middleBanner = res1?.data?.filter(
        (item) => item?.title === "middle"
      );
      const bottomBanner = res1?.data?.filter(
        (item) => item?.title === "bottom"
      );

      setTopBanner1(topBanner[0]?.image);


      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);

      setHompageBanner2(
        res2?.data?.data?.find((item) => item.title === "hompageBanner2")?.image
      );
      const ban3 = res2?.data?.data?.find(
        (item) => item.title === "hompageBanner3"
      )?.image;

      setHompageBanner3(
        res2?.data?.data?.find((item) => item.title === "hompageBanner3")?.image
      );
      setHompageBanner4(
        res2?.data?.data?.find((item) => item.title === "hompageBanner4")?.image
      );
      setHompageBanner5(
        res2?.data?.data?.find((item) => item.title === "hompageBanner5")?.image
      );
      setHompageBanner6(
        res2?.data?.data?.find((item) => item.title === "hompageBanner6")
      );
      setHompageBanner7(
        res2?.data?.data?.find((item) => item.title === "hompageBanner7")
      );
      setHompageBanner8(
        res2?.data?.data?.find((item) => item.title === "hompageBanner8")
      );
    } catch (error) {
      console.error("Error fetching homepage banners:", error);
    }
  };

  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  const getAllSeriesData = async () => {
    try {
      const res = await axios.get(
        baseUrl + "user/getCompetitionsList?status=live&per_page=30&paged=1"
      );

      setAllSeries(res?.data?.competitions);
    } catch (error) {}
  };

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
    setTeamRankings(res?.response?.items);
  };

  const getAllSpecialBanners = () => {
    GetData(`${baseUrl}admin/getAllPosts`).then((res) => {
      console.log(res);
      setSpecialBanner(res?.data);
    });
  };

  const getAllFeacturePosts = () => {
    GetData(`admin/getAllPosts`).then((res) => {
      const filteredData = res?.data?.filter(
        (item) => item.title === "FeacturePost"
      );
      console.log(res);
      setFeacturePosts(filteredData);
    });
  };

  const getAllTopPosts = () => {
    GetData("admin/getAllPosts").then((res) => {
      const filteredData = res?.data?.filter(
        (item) => item.title === "TopStories"
      );
      setTopStories(filteredData);
    });
  };

  const getMiddleBanner = () => {
    GetData("userAuth/getMiddleBanner").then((res) => {
      setMiddleBanner(res?.data);
    });
  };

  const getAllEditorsPickData = () => {
    GetData("userAuth/getEditorPick").then((res) => {
      setEditorpicks(res?.data);
    });
  };

  useEffect(() => {
    getAllSeriesData();
    getAllTeamRankingsData();
    getAllFeacturePosts();
    getAllTopPosts();
    getMiddleBanner();
    getAllEditorsPickData();
    getAllSpecialBanners();
  }, []);

  function timeAgo(createdAt) {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - createdTime;

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

    if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return "just now";
    }
  }
  const CustomNextArrow1 = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#0F19AF",
          color: "white",
          marginRight: "2rem",
        }}
        onClick={onClick}
      />
    );
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    nextArrow: <CustomNextArrow1 />,
    prevArrow: currentSlide === 0 ? null : <CustomPrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  const [hideItems, setHideItems] = useState(false);

  return (
    <div className="max-container">
      <Helmet>
        <title>
          Cricinnings : Cricket Live Score, Cricket News, Predictions, Stats
        </title>
        <meta
          name="description"
          content="Live Cricket: Get live cricket scores, news, schedules, highlights, commentary, rankings, stats, & more updates for all international & domestic"
        />
      </Helmet>

      {sliderData && (
        <div className="homePageSlider">
          <div style={{ overflow: "hidden" }} className="slider-container">
            <Slider {...settings1}>
              {sliderData &&
                sliderData?.map((item, index) => (
                  <div key={index} className="top_slider_card">
                    <div
                      onClick={() => {
                        if (item?.match_id) {
                          const teamAShortName = item.teama?.short_name
                            ?.toLowerCase()
                            .split(" ")
                            .join("-");
                          const teamBShortName = item.teamb?.short_name
                            ?.toLowerCase()
                            .split(" ")
                            .join("-");
                          const matchNumber =
                            item?.match_number ||
                            item?.subtitle?.split("Match")?.[1];
                          console.log(item?.subtitle?.split("Match")?.[1]);
                          const matchSuffix = convertStringFormat(
                            item?.subtitle
                          )?.toLowerCase();
                          const competitionTitle = item?.competition?.title
                            ?.toLowerCase()
                            .split(" ")
                            .join("-");
                          const competitionSeason =
                            item?.competition?.season?.toLowerCase();

                          const url = `/live-cricket-scores/${item.match_id}/${teamAShortName}-vs-${teamBShortName}-${matchSuffix}-${competitionTitle}-${competitionSeason}`;

                          navigate(url);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                      className="top_slider_card_div1"
                    >
                      <div className="top_slider_card_div1_text">
                        <p
                          style={{
                            width: "90%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span>{item?.subtitle} </span>
                          <span>
                            <Icon
                              icon="radix-icons:dot-filled"
                              width="1.2rem"
                              height="1.2rem"
                              style={{ color: "gray" }}
                            />
                          </span>
                          {item?.competition?.title}
                        </p>
                        <p>{item?.format_str?.slice(0, 5)}</p>
                      </div>
                      <div
                        style={{ lineHeight: "0" }}
                        className="top_slider_card_div2"
                      >
                        <div className="top_slider_card_div2_text">
                          <p>
                            <img
                              className="top_slider_card_div2_img"
                              src={item?.teama?.logo_url}
                              alt="logo"
                            />
                          </p>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span className="text-sm">
                              {item?.teama?.short_name}
                            </span>
                            <span>
                              {item?.teama?.scores_full?.slice(0, 17)}
                            </span>
                          </p>
                        </div>
                        <div className="top_slider_card_div2_text">
                          <p>
                            <img
                              className="top_slider_card_div2_img"
                              src={item?.teamb?.logo_url}
                              alt="logo"
                            />
                          </p>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span className="text-sm">
                              {item?.teamb?.short_name}
                            </span>
                            <span>
                              {item?.teamb?.scores_full?.slice(0, 17)}
                            </span>
                          </p>
                        </div>
                        <span>
                          {item?.status === 1 && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "rgb(163, 101, 1)",
                              }}
                            >
                              {dateUpdate(item?.date_start)}
                            </span>
                          )}
                          {item?.status === 2 && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "rgb(24, 102, 219)",
                              }}
                            >
                              {item?.result}
                            </span>
                          )}
                          {item?.status === 3 && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "rgb(24, 102, 219)",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item?.live?.slice(0, 30) + "..."}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="top_slider_card_div2_text11">
                      <div></div>
                      <div className="top_slider_card_div2_text11_text23">
                        {item?.competition?.total_teams > 2 && (
                          <p
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(
                                `/cricket-series/${
                                  item?.competition?.cid
                                }/${formatTitle(item?.competition?.title)}-${
                                  item?.competition?.season
                                }/points-table`
                              )
                            }
                          >
                            Points Table
                          </p>
                        )}
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              `/cricket-series/${
                                item?.competition?.cid
                              }/${formatTitle(item?.competition?.title)}-${
                                item?.competition?.season
                              }/matches`
                            )
                          }
                        >
                          Schedule
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              {hompageBanner2 && sliderData?.length >= 1 && (
                <div className="top_slider_card">
                  <div className="top_slider_card_div1">
                    <img
                      src={hompageBanner2}
                      style={{ width: "100%", height: "100%" }}
                      alt="banner"
                    />
                  </div>
                </div>
              )}
            </Slider>
          </div>
        </div>
      )}

      {hompageBanner3 && (
        <img
          style={{ width: "100%", height: "96px", marginTop: "2rem" }}
          src={hompageBanner3}
          alt="middleBanner"
        />
      )}

      <div className="bg-[#EEEEEE] pb-5  ">
        <Livescrore />

        {hideItems && (
          <div className="flex justify-center pt-2 gap-5 main-div">
            <div>
              <div className="flex justify-between m-2">
                <div className="font-semibold">FEATURE POSTS</div>
                <div
                  className="text-[#0F19AF] font-semibold cursor-pointer"
                  onClick={() => navigate("/cricket-news")}
                >
                  SEE ALL
                </div>
              </div>
              <div className="feacturePosts">
                {feacturePosts?.map((item) => (
                  <div key={item?._id} className="feacturePosts_div">
                    <div
                      onClick={() =>
                        navigate(
                          `/single-blog/${item?._id}/${formatTitle(
                            item?.subtitle
                          )}`
                        )
                      }
                      className="w-[300px] flex gap-2 cursor-pointer"
                    >
                      <div style={{ width: "130px" }}>
                        <img
                          style={{
                            height: "100px",
                            borderRadius: "10px",
                            maxWidth: "100%",
                          }}
                          src={item?.image || cric}
                          alt=""
                        />
                      </div>

                      <div className="text-sm">
                        <div>{item?.subtitle}</div>

                        <span className="text-[#929394]">
                          {timeAgo(item?.createdAt)}

                          {/* {item?.description?.slice(0, 100) + "..."} */}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hompageBanner4 && (
                <img
                  style={{ width: "100%", height: "96px", marginTop: "2rem" }}
                  src={hompageBanner4}
                  alt="middleBanner"
                />
              )}
              {hompageBanner5 && (
                <div className="w-[650px] mt-2">
                  <img
                    src={hompageBanner5}
                    style={{ width: "100%", height: "150px" }}
                    alt=""
                  />
                </div>
              )}
              <div className="flex justify-between m-2">
                <div className="font-semibold mt-2">TOP STORIES</div>
                <div
                  className="text-[#0F19AF] font-semibold cursor-pointer"
                  onClick={() => navigate("/feature-posts")}
                ></div>
              </div>
              <div className="feacturePosts">
                {topStories &&
                  topStories?.map((item) => (
                    <div className="feacturePosts_div">
                      <div className="flex gap-2">
                        <div>
                          <img src={cric} alt="" />
                        </div>

                        <div className="text-sm">
                          <div>{item?.subtitle}</div>

                          <span className="text-[#929394]">
                            {timeAgo(item?.createdAt)} {item?.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {hompageBanner6 && (
                <div className="middleBannerBig">
                  <p>{hompageBanner6?.name}</p>
                  <div>
                    <p className="middleBannerImage">
                      <img src={hompageBanner6?.image} alt="middleBanner" />
                    </p>
                    <p className="middleBannerText">
                      <p>{hompageBanner6?.subtitle}</p>
                      <p>{hompageBanner6?.description}</p>
                    </p>
                  </div>
                </div>
              )}

              <div className="text-sm mt-2 font-semibold">Editors Pick</div>

              <div className="w-[650px] h-[300px]  mt-2 pt-4 bg-white rounded-lg  shadow-lg ">
                <Slider {...editorsettings}>
                  {editorpicks?.map((item) => (
                    <div className="editorPick">
                      <img
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "10px 10px 0 0",
                          overflow: "hidden",
                        }}
                        src={item?.image || editorpick}
                        alt=""
                      />
                      <div
                        style={{
                          width: "90%",
                          margin: "auto",
                          lineHeight: "normal",
                          fontSize: "12px",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingTop: "0.2rem",
                            lineHeight: "normal",
                          }}
                        >
                          {item?.subtitle}
                        </p>
                        <p style={{ color: "gray", fontSize: "10px" }}>
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </Slider>
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
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
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
        )}
      </div>
    </div>
  );
};

export default Homepage;

import cric from "../Assets/Homepage/cric.svg";
import banner from "../Assets/Homepage/banner.svg";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import editorpick from "../Assets/Homepage/editorpick.svg";
import { useEffect, useState } from "react";
import {
  AuthToken,
  AuthUrl,
  GetData,
  baseUrl,
} from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";

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

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? '0' + minutes : minutes;

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
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const editorsettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const [matches, setMatches] = useState([]);
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
  const [matchesList, setMatchesList] = useState([]);
  const [homePageBanners, setHomePageBanners] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [topBanner2, setTopBanner2] = useState("");
  const [middleBanner1, setMiddleBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [bottomBanner2, setBottomBanner2] = useState("");
  const [hompageBanner1, setHompageBanner1] = useState("");
  const [hompageBanner2, setHompageBanner2] = useState("");
  const [hompageBanner3, setHompageBanner3] = useState("");
  const [hompageBanner4, setHompageBanner4] = useState("");
  const [hompageBanner5, setHompageBanner5] = useState("");
  const [hompageBanner6, setHompageBanner6] = useState("");
  const [hompageBanner7, setHompageBanner7] = useState("");
  const [hompageBanner8, setHompageBanner8] = useState("");
  const navigate = useNavigate();

  const [matches1, setMatches1] = useState({
    upcoming: [],
    live: [],
    completed: [],
  });

  const [sliderData, setSliderData] = useState([]);
  const [topMatches, setTopMatches] = useState([]);

  const getTopMatches = async () => {
    const response = await axios.get(
      baseUrl + "user/competitions/128414/matches?status=3&per_page=7&paged=1",
      {
        params: {
          token: AuthToken,
        },
      }
    );

    setTopMatches(response?.data?.matches);
  };

  const getSliderDataMatch = async () => {
    const response = await axios.get(
      baseUrl +
      "user/getCompetitionsAndMatchesDashboard?status=live&per_page=10&paged=1&include_matches=true&match_status=1,2",
      {
        params: {
          token: AuthToken,
        },
      }
    );
    // console.log(response?.data?.competitions)
    setSliderData(response?.data?.competitions?.[0]?.matches);
  };

  useEffect(() => {
    getSliderDataMatch();
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = async (status) => {
    const todayDate = new Date();
    const formattedDate = todayDate.toISOString().split("T")[0];
    const tommarrowDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
    const formattedTommorrowDate = tommarrowDate.toISOString().split("T")[0];
    const yesterdayDate = new Date(todayDate.setDate(todayDate.getDate() - 1));
    const formattedYesterdayDate = yesterdayDate.toISOString().split("T")[0];
    try {
      const response = await axios.get(AuthUrl + "matches", {
        params: {
          status: status,
          token: AuthToken,
          per_page: 2,
          paged: 1,
          timezone: "+05:30",
          date: `${formattedDate}_${formattedYesterdayDate}`,
        },
      });

      return response?.data?.response?.items;
    } catch (err) {
      console.error(`Error fetching matches for status ${status}:`, err);
      setError(`Error fetching matches for status ${status}`);
      return [];
    }
  };
  const getWinningTeamName = (match) => {
    const winningTeamId = match.winning_team_id;
    if (!winningTeamId) return "No winner yet";

    if (match.teama.team_id === winningTeamId) {
      return match.teama.name;
    } else if (match.teamb.team_id === winningTeamId) {
      return match.teamb.name;
    } else {
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchAllMatches = async () => {
      setLoading(true);
      const upcomingMatches = await fetchMatches(1);
      const liveMatches = await fetchMatches(2);
      const completedMatches = await fetchMatches(3);

      setMatches({
        upcoming: upcomingMatches,
        live: liveMatches,
        completed: completedMatches,
      });

      setLoading(false);
    };
  }, []);

  const getAllHomePageBanners = async () => {
    try {
      const res1 = await GetData("userAuth/getPostsByPosition");

      const topBanner = res1?.data?.filter((item) => item?.title === "top");
      const middleBanner = res1?.data?.filter((item) => item?.title === "middle");
      const bottomBanner = res1?.data?.filter((item) => item?.title === "bottom");

      setTopBanner1(topBanner[0]?.image);
      setTopBanner2(topBanner[1]?.image);
      setMiddleBanner1(middleBanner[0]?.image);
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
      setBottomBanner2(bottomBanner[1]?.image);

      setHomePageBanners(res1?.data);

      // Fetch data from the second endpoint
      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);

      // Extract and set banners from the second response
      setHompageBanner2(res2?.data?.data?.find((item) => item.title === "hompageBanner2")?.image);
      setHompageBanner3(res2?.data?.data?.find((item) => item.title === "hompageBanner3")?.image);
      setHompageBanner4(res2?.data?.data?.find((item) => item.title === "hompageBanner4")?.image);
      setHompageBanner5(res2?.data?.data?.find((item) => item.title === "hompageBanner5")?.image);
      setHompageBanner6(res2?.data?.data?.find((item) => item.title === "hompageBanner6"));
      setHompageBanner7(res2?.data?.data?.find((item) => item.title === "hompageBanner7"));
      setHompageBanner8(res2?.data?.data?.find((item) => item.title === "hompageBanner8"));
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
    } catch (error) { }
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
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  const getAllFeacturePosts = () => {
    GetData("userAuth/getFeaturePost").then((res) => {
      setFeacturePosts(res?.data);
    });
  };
  const getAllTopPosts = () => {
    GetData("userAuth/getTopStories").then((res) => {
      setTopStories(res?.data);
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
  function timeAgo(createdAt) {
    const createdTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - createdTime;

    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

    if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""
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

  const CustomPrevArrow1 = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#0F19AF",
          marginLeft: "2rem",
        }}
        onClick={onClick  }
      />
    );
  };
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow1 />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="">
      {sliderData &&

        <div className="homePageSlider">
          <div className="slider-container">
            <Slider {...settings1}>
              {sliderData &&
                sliderData?.map((item, index) => (
                  <div key={index} className="top_slider_card">
                    <div  onClick={() => navigate(`/live-cricket-scores/${item?.title}-${item?.competition?.title}/full_commentry/${item?.match_id}`)} style={{cursor:"pointer"}} className="top_slider_card_div1">
                      <div className="top_slider_card_div1_text">
                        <p
                          style={{
                            width: "80%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item?.subtitle}{" "}
                          <Icon
                            icon="radix-icons:dot-filled"
                            width="1.2rem"
                            height="1.2rem"
                            style={{ color: "gray" }}
                          />{" "}
                          {item?.competition?.title}
                        </p>
                        <p>{item?.format_str}</p>
                      </div>
                      <div style={{ lineHeight: "0" }} className="top_slider_card_div2">
                        <div className="top_slider_card_div2_text">

                          <p>
                            <img
                              className="top_slider_card_div2_img"
                              src={item?.teama?.logo_url}
                              alt="logo"
                            />
                          </p>
                          <p style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
                            <span>{item?.teama?.name?.split(" ")?.slice(0, 2)?.join(" ")}</span>
                            <span>{item?.teama?.scores_full}</span>
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
                          <p style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
                            <span >{item?.teamb?.name.split(" ")?.slice(0, 2)?.join(" ")}</span>
                            <span>{item?.teamb?.scores_full}</span>
                            </p>
                        </div>
                        <span>

                          {item?.status === 1 && <span  style={{ fontSize: "12px", color: "rgb(163, 101, 1)" }} >{dateUpdate(item?.date_start)}</span>}
                          {item?.status === 2 && <span  style={{
                            fontSize: "12px", color: "rgb(24, 102, 219)"
                          }}>{item?.result}</span>}
                        </span>
                      </div>
                    </div>
                    <div className="top_slider_card_div2_text11">
                      <div></div>
                      <div className="top_slider_card_div2_text11_text23">
                        <p style={{ cursor: "pointer" }} onClick={() => navigate(`/Pointtable/${item?.match_id}`)}>Points Table</p>
                        <p style={{ cursor: "pointer" }} onClick={() => navigate(`/Matchinfo/${item?.match_id}`)}>Schedule</p>
                      </div>
                    </div>
                  </div>
                ))}
              {hompageBanner2 && sliderData?.length >= 1 && <div className="top_slider_card">
                <div className="top_slider_card_div1">
                  <img src={hompageBanner2} style={{ width: "100%", height: "100%" }} alt="banner" />
                </div>
              </div>}
            </Slider>
          </div>
        </div>
      }{/* <div className="flex flex-wrap gap-2 bg-[#EEEEEE] pt-2 pb-2 justify-center ">
        <Slider {...settings} className="w-[1000px]">
          {sliderData &&
            sliderData?.map((item) => (
              <Link to={`/match/${item?.match_id}/commentary`}>
                <div className="homePageSlider">
                  <div className="pt-2 pl-2">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <p style={{ maxWidth: "80%" }}>
                        {item?.teama?.name} vs {item?.teamb?.name}
                      </p>
                      <p
                        style={{
                          backgroundColor: "black",
                          borderRadius: "50px",
                          color: "white",
                          fontSize: "15px",
                          padding: "5px 10px",
                          margin: "1rem",
                          textDecoration: "none",
                        }}
                      >
                        {item?.competition?.category}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <img
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            borderRadius: "50%",
                          }}
                          src={item?.teama?.logo_url}
                          alt="team"
                        />
                      </p>
                      <p style={{ color: "gray" }}>{item?.teama?.name}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <img
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            borderRadius: "50%",
                          }}
                          src={item?.teamb?.logo_url}
                          alt="team"
                        />
                      </p>
                      <p style={{ color: "gray" }}>{item?.teamb?.name}</p>
                    </div>
                    <p className="text-[#FE9839]">
                      {formattedDate(item?.date_start?.split(" ")?.[0])}.{" "}
                      {item?.date_start?.split(" ")?.[1]}
                    </p>
                  </div>
                  <div className="homePageSlider2">
                    <div></div>
                    <div>
                      <p>Points Table</p>
                      <p>Schedule</p>
                    </div>
                  </div>
                </div>
                {}
              </Link>
            ))}

          {}
          {}
        </Slider>
      </div> */}
      { }
      {hompageBanner3 && (
        <img
          style={{ width: "100%", height: "96px", marginTop: "2rem" }}
          src={hompageBanner3}
          alt="middleBanner"
        />
      )}

      <div className="bg-[#EEEEEE] pb-5  ">
        <div className="flex justify-center pt-2 gap-5 main-div">
          <div>
            <div className="flex justify-between m-2">
              <div className="font-semibold">FEATURE POSTS</div>
              <div
                className="text-[#0F19AF] font-semibold cursor-pointer"
                onClick={() => navigate("/feature_posts")}
              >
                SEE ALL
              </div>
            </div>
            <div className="feacturePosts">
              {feacturePosts?.map((item) => (
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

            {hompageBanner4 && (
              <img
                style={{ width: "100%", height: "96px", marginTop: "2rem" }}
                src={hompageBanner4}
                alt="middleBanner"
              />
            )}
            {hompageBanner5 && <div className="w-[650px] mt-2">
              <img src={hompageBanner5} style={{ width: "100%", height: "150px" }} alt="" />
            </div>}
            <div className="flex justify-between m-2">
              <div className="font-semibold mt-2">TOP STORIES</div>
              <div
                className="text-[#0F19AF] font-semibold cursor-pointer"
                onClick={() => navigate("/feature_posts")}
              >
                {/* Sell All */}
              </div>
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
              <div className="bg-[white] pb-3 pt-3 rounded-lg mb-3">
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "12px",
                    paddingLeft: "10px",
                  }}
                >
                  CURRENT SERIES
                </span>
                <div className="flex flex-col mt-4 gap-3 items-center text-center">
                  {allSeries?.map((item, index) => {
                    if (index >= 4) return null;
                    return (
                      <div onClick={() => navigate(`/live-cricket-scores/Allseries`)}
                        key={item?._id}
                        style={{
                          display: "grid",
                          placeItems: "center",
                          justifyContent: "center",
                          width: "90%",
                          margin: "auto",
                          boxShadow:
                            "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                          textAlign: "center",
                          paddingTop: "0.5rem",
                          borderRadius: "4px",
                        }}
                      >
                        <p>{item?.title}</p>
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
                    onClick={() => navigate("/icc-rankings/men")}
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
                { mainCategory === "teams" &&  <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Team</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>}

                  {mainCategory === "batting" && <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Player</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>}
                  {mainCategory === "bowling" && <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Player</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>}
                  {mainCategory === "alr" && <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Player</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>}
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
      </div>
    </div>
  );
};

export default Homepage;

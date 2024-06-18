import cric from "../Assets/Homepage/cric.svg";
import banner from "../Assets/Homepage/banner.svg";
import winner from "../Assets/Homepage/winner.svg";
import { Link, useNavigate } from "react-router-dom";
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
    console.log(response?.data?.matches);
    setTopMatches(response?.data?.matches);
  };

  const getSliderDataMatch = async () => {
    const response = await axios.get(
      baseUrl + "user/competitions/128414/matches?status=1&per_page=7&paged=1",
      {
        params: {
          token: AuthToken,
        },
      }
    );
    console.log(response?.data?.matches);
    setSliderData(response?.data?.matches);
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
      console.log(response?.data?.response?.items);
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

    // fetchAllMatches();
  }, []);

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
      setTopBanner2(topBanner[1]?.image);
      setMiddleBanner1(middleBanner[0]?.image);
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
      setBottomBanner2(bottomBanner[1]?.image);

      setHomePageBanners(res?.data);
    });
  };
  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  const getAllSeriesData = async () => {
    // GetDataWithToken({
    //   path: "competitions",
    //   status: "live",
    // }).then((res) => {
    //   setAllSeries(res?.response?.items);
    // });

    try {
      const res = await axios.get(
        baseUrl + "user/getCompetitionsList?status=live&per_page=30&paged=1"
      );

      console.log(res?.data?.competitions);
      setAllSeries(res?.data?.competitions);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
    console.log(res?.data?.rankingData);
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
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return "just now";
    }
  }

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 bg-[#EEEEEE] pt-2 pb-2 justify-center ">
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

          {/* {matches?.upcoming &&
            matches?.upcoming?.map((item) => (
              <Link to="/Commenatary">
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
            ))} */}
          {/* {matches?.live &&
            matches?.live?.map((item) => (
              <Link to="/Commenatary">
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
          {matches?.completed &&
            matches?.completed?.map((item) => (
              <Link to="/Commenatary">
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
            ))} */}
        </Slider>
      </div>
      {}
      {middleBanner1 && (
        <img
          style={{ width: "100%", height: "96px", marginTop: "2rem" }}
          src={middleBanner1}
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
                Sell All
              </div>
            </div>
            <div className="w-[650px]  bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
              {feacturePosts?.map((item) => (
                <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
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

            {middleBanner1 && (
              <img
                style={{ width: "100%", height: "96px", marginTop: "2rem" }}
                src={middleBanner1}
                alt="middleBanner"
              />
            )}
            <div className="w-[650px] mt-2">
              <img src={banner} alt="" />
            </div>
            <div className="text-sm mt-2 font-semibold">TOP STORIES</div>
            <div className="w-[650px]  mt-2 bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
              {topStories?.map((item) => (
                <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
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
            {middleBanner?.map((item) => (
              <div className="w-[650px] mt-2 bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
                <div>
                  <span className="text-sm ml-4">{"INDIA 2024"}</span>
                  <img
                    src={item?.image || winner}
                    style={{ width: "100%", height: "300px" }}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-xl font-semibold">{item?.subtitle}</div>
                  <p className="text-sm mt-2">{item?.description}</p>
                </div>
              </div>
            ))}
            <div className="text-sm mt-2 font-semibold">Editors Pick</div>
            <div className="w-[650px] h-[300px]  mt-2 pt-4 bg-white rounded-lg  shadow-lg ">
              <Slider {...editorsettings}>
                {editorpicks?.map((item) => (
                  <div className="w-[466px] h-[262px] p-4 border rounded-lg">
                    <img src={item?.image || editorpick} alt="" />
                    <div className=" font-semibold">{item?.subtitle}</div>
                    <div className="text-[#828383]">{item?.description}</div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="w-[250px]  mt-10">
            {allSeries?.length > 0 && (
              <div className="bg-[white] pb-3 pt-3 rounded-lg">
                <span className="text-sm ml-5 font-semibold">
                  CURRENT SERIES
                </span>
                <div className="flex flex-col mt-4 gap-3 items-center text-center">
                  {allSeries?.map((item, index) => {
                    if (index >= 4) return null;
                    return (
                      <div
                        key={item?._id}
                        className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center"
                      >
                        {item?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {}
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

            <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2">
              <div className="flex justify-between p-2">
                <div className="text-sm font-semibold">RANKING’s</div>
                <div>
                  <button onClick={()=>navigate("/Manrankingpage")} className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
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
                  }}
                >
                  T201
                </button>
              </div>
              <div className="flex justify-between m-2">
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "teams" ? "underline" : "none",
                    color: mainCategory === "teams" ? "#0F19AF" : "black",
                  }}
                  onClick={() => setMainCategory("teams")}
                  className="text-[#0F19AF] underline"
                >
                  Teams
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration:
                      mainCategory === "batting" ? "underline" : "none",
                    color: mainCategory === "batting" ? "#0F19AF" : "black",
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
                    color: mainCategory === "bowling" ? "#0F19AF" : "black",
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
                    color: mainCategory === "alr" ? "#0F19AF" : "black",
                  }}
                  onClick={() => setMainCategory("alr")}
                >
                  ALR
                </div>
              </div>
              <table>
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Team</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>
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
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bestman?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBestman?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
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
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bolling?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBolling?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
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
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        odiAlr?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiAlr?.slice(0, 6)?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
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

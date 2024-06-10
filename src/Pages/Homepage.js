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
  GetData,
  GetDataWithToken,
} from "../Components/Integration/ApiIntegration";

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

  const getAllMatchesData = () => {
    GetDataWithToken({
      path: "teams/25/matches",
    })
      .then((res) => {
        console.log(res?.response?.items);
        setMatches(res?.response?.items);
      })
      .catch((err) => {
        console.log(err);
      });
    // HomepageSliderData().then((res) => {
    //   setMatches(res);
    // });
  };

  const getAllHomePageBanners = () => {
    GetData("userAuth/getPostsByPosition").then((res) => {
      console.log(res?.data);
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
    getAllMatchesData();
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
      setT20Alr(res?.response?.ranks?.["all-rounders"]?.t20s || []);
      setTestAlr(res?.response?.ranks?.["all-rounders"]?.tests || []);
      setOdis(res?.response?.ranks?.teams?.odis);
      setT20s(res?.response?.ranks?.teams?.t20s);
      setTest(res?.response?.ranks?.teams?.tests);
      setTeamRankings(res?.response?.items);
    });
  };

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      //
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
    // Parse the createdAt timestamp
    const createdTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - createdTime;

    // Calculate the difference in hours
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

    // Format the result
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
          {matches &&
            matches?.map((item) => (
              <Link to="/Commenatary">
                <div className="w-[300px] h-[170px] rounded-t-lg  bg-[white] ">
                  <div className="p-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center ml-2 mr-2">
                      <div className="text-[12px]">
                        {/* 1st Match . Indian Premier League 2024 */}
                        {item?.title}
                      </div>

                      <div
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          padding: "5px 10px",
                          borderRadius: "50px",
                          textDecoration: "none",
                        }}
                      >
                        {/* T20 */}

                        {item?.competition?.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        style={{ maxWidth: "30px" }}
                        src={item?.teama?.logo_url}
                        alt=""
                      />
                      <span>{item?.teama?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        style={{ maxWidth: "30px" }}
                        src={item?.teamb?.logo_url}
                        alt=""
                      />
                      <span>{item?.teamb?.name}</span>
                    </div>
                    <div className="text-[#FE9839]">
                      {formattedDate(item?.date_start?.split(" ")?.[0])}.{" "}
                      {item?.date_start?.split(" ")?.[1]}
                    </div>
                  </div>
                  <div className="bg-[#0F19AF] h-[35px] border-b rounded-b-lg">
                    <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px]">
                      <span className="text-white underline">Points Table</span>

                      <span className="text-white underline">Schedule</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {/* <Link to="/Commenatary">
            <div className="w-[300px] h-[170px]  rounded-t-lg  bg-[white]">
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <div className="text-[12px]">
                    18 Match . Indian Premier League 2024
                  </div>

                  <div className="w-[40px] bg-[red] text-[8px] text-white h-[20px] flex justify-center items-center rounded-3xl">
                    Test
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={chennie} alt="" />
                  <span>Chennai Super Kings</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mumbai} alt="" />
                  <span>Mumbai Indians</span>
                </div>
                <div className="text-[#FE9839]">Today . 7: 30</div>
              </div>
              <div className="bg-[#0F19AF] h-[35px]  border-b rounded-b-xl">
                <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px] ">
                  <span className="text-white underline">Points Table</span>

                  <span className="text-white underline">Schedule</span>
                </div>
              </div>
            </div>
          </Link> */}
          {matches && topBanner1 && (
            <div className="bg-[#B3B3B3] w-[300px] h-[185px]  rounded-lg  text-white ">
              {
                <img
                  style={{ borderRadius: "10px" }}
                  src={topBanner1}
                  alt="topBanner"
                />
              }{" "}
              RESPONSIVE AD’s
            </div>
          )}
          {/* <Link to="/Commenatary">
            <div className="w-[300px] h-[170px] rounded-t-lg  bg-[white] ">
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <div className="text-[12px]">
                    1st Match . Indian Premier League 2024
                  </div>

                  <div className="w-[40px] bg-[black] text-[8px] text-white h-[20px] flex justify-center items-center rounded-3xl">
                    T20
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={chennie} alt="" />
                  <span>Chennai Super Kings</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mumbai} alt="" />
                  <span>Mumbai Indians</span>
                </div>
                <div className="text-[#FE9839]">Today . 7: 30</div>
              </div>
              <div className="bg-[#0F19AF] h-[35px] border-b rounded-b-lg">
                <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px]">
                  <span className="text-white underline">Points Table</span>

                  <span className="text-white underline">Schedule</span>
                </div>
              </div>
            </div>
          </Link> */}
        </Slider>
      </div>
      {/* {middleBanner1 && <div className="bg-[#B3B3B3] w-[1000px] h-[96px]  text-white flex justify-center items-center">
        RESPONSIVE AD’s 
        <img src={middleBanner1} alt="middleBanenr" />
      </div>} */}
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
            {/* <div className="bg-[#B3B3B3] mt-2 h-[96px]  text-white flex justify-center items-center">
              RESPONSIVE AD’s
            </div> */}
            {console.log(middleBanner1)}
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
                <div className="flex flex-col mt-4 gap-3 items-center">
                  {allSeries?.map((item) => {
                    return (
                      <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                        {item?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div> */}
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
                  <button className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                    Viewall
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
                        test?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20s?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odis?.map((item, index) => (
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
                        testBestman?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bestman?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBestman?.map((item, index) => (
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
                        testBolling?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        t20Bolling?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiBolling?.map((item, index) => (
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
                        testAlr?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "t20" &&
                        odiAlr?.map((item, index) => (
                          <tr key={index} style={{ textAlign: "center" }}>
                            <td className="text-center">{item?.rank}</td>
                            <td className="text-center">{item?.team}</td>
                            <td className="text-center">{item?.rating}</td>
                          </tr>
                        ))}
                      {teamSelector === "odi" &&
                        odiAlr?.map((item, index) => (
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
            {/* <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div> */}
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

import { useEffect, useState } from "react";
import ipl from "../Assets/Homepage/ipl.svg";
import {
  GetData,
  GetDataWithToken,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Pitchreport = () => {
  const [fantasyBanner, setFantasyBanner] = useState([]);

  const getAllData = async () => {
    GetData("userAuth/getPostByTitle/Pitch_Report").then((res) => {
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
  const [matches, setMatches] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [teamRankings, setTeamRankings] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
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
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const navigate = useNavigate();

  const getAllMatchesData = () => {
    GetDataWithToken({
      path: "teams/25/matches",
    })
      .then((res) => {
        setMatches(res?.response?.items);
      })
      .catch((err) => {});

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
    getAllMatchesData();
    getAllHomePageBanners();
  }, []);





  return (
    <div className="">
      <Helmet>
        <title>{`Cricket Special | Cricinnings.com`}</title>
        <meta
          name="description"
          content={`Cricket Special | Cricinnings.com`}
        />
      </Helmet>
      <div className="bg-[white] pl-2 pt-2 pr-2">
        {/* <div className="bg-[#B3B3B3] text-white h-[100px]  flex justify-center items-center rounded-lg mt-4">
          RESPONSIVE AD’s
        </div> */}
        {topBanner1 && (
          <div className="bg-[#B3B3B3] text-white h-[300px]  flex justify-center items-center rounded-lg mt-2">
            <div className="w-[950px]">
              <img
                alt=""
                style={{ width: "100%", height: "300px" }}
                src={topBanner1 || ipl}
                className="w-[950px]"
              />
            </div>
          </div>
        )}

        <div className="flex mt-5 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px]   boxShadowFantsyTips">
              <div className="flex justify-center mt-3 flex-col p-1">
                {fantasyBanner &&
                  fantasyBanner?.map((item) => (
                    <>
                      <div>
                        <div className="fantasyTips">
                          <div>
                            <img
                              alt=""
                              style={{ width: "100%", height: "300px" }}
                              src={item?.image || ipl}
                              className="w-[650px]"
                            />
                          </div>
                          <div>
                            <div className="text-slate-400">{item?.name}</div>
                            <div className="text-[#0F19AF] font-semibold ">
                              {item?.subtitle}
                            </div>
                            <div>{item?.description}</div>
                            <div className="text-slate-400">
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
                    // <div className="w-[650px] h-[250px] border-b flex justify-center gap-5">
                    //   <div>
                    //     <img
                    //       alt=""
                    //       style={{ width: "250px", height: "100px" }}
                    //       src={item?.image || fantasy}
                    //       className="w-[250px]"
                    //     />
                    //   </div>
                    //   <div className="w-[500px] flex flex-col gap-1">
                    //     <div className="text-slate-400">IPL 2024 - FINAL</div>
                    //     <div className="text-[#0F19AF] font-semibold ">
                    //       The Claim Call MS Dhoni -->Thaliva
                    //     </div>
                    //     <div className="text-slate-400 ">
                    //       Calm' has been the buzzword right through RCB's
                    //       title-winning campaign and their captain was its
                    //       perfect personification on the red-letter day
                    //     </div>
                    //     <div className="text-slate-400">
                    //       Calm' has been the buzzword right through RCB's
                    //       title-winning campaign and their captain was its
                    //       perfect personification on the red-letter day
                    //     </div>
                    //     <div className="flex">
                    //       <span className="text-slate-400">1 day ago . </span>
                    //       <span className="text-black">vishal bansali</span>
                    //     </div>
                    //   </div>
                    // </div>
                  ))}
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
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitchreport;

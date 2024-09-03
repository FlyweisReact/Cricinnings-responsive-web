/** @format */

import { useEffect, useState } from "react";
import ipl from "../Assets/Homepage/ipl.svg";
import { GetData } from "../Components/Integration/ApiIntegration";
import { Helmet } from "react-helmet";

const Pitchreport = () => {
  const [fantasyBanner, setFantasyBanner] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");

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
        {topBanner1 && (
          <div className="bg-[#B3B3B3] text-white h-[300px]  flex justify-center items-center rounded-lg mt-2">
            <div className="w-[950px]">
              <img
                alt=""
                style={{ width: "100%", height: "300px" }}
                src={topBanner1 || ipl}
              />
            </div>
          </div>
        )}

        <div className="cricket-news-container">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 full-width column-flex zero-margin main-container ">
            <div className="left w-[700px] full-width box-shadow-container">
              <div className="flex justify-center mt-3 flex-col p-1">
                {fantasyBanner &&
                  fantasyBanner?.map((item) => (
                    <>
                      <div className="w-full p-2">
                        <div className="news-card">
                           <img
                              alt=""
                              src={item?.image || ipl}
                            />
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
                  ))}
              </div>
            </div>
            <div className="w-[250px]  mt-10">
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

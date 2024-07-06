import { useEffect, useState } from "react";
import videoframe from "../Assets/Homepage/videoframe.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
import axios from "axios";
import { GetData, baseUrl } from "../Components/Integration/ApiIntegration";

const News = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      // console.log(banner);
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const interval in intervals) {
      const intervalSeconds = intervals[interval];
      const count = Math.floor(diffInSeconds / intervalSeconds);

      if (count >= 1) {
        return `${count} ${interval}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  const [fantasyBanner, setFantasyBanner] = useState([]);
  const getAllData = async () => {
    GetData("userAuth/getPostByTitle/CRICKET_NEWS").then((res) => {
      setFantasyBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllData();
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
        <div className="flex mt-5 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px]  shadow-2xl">
              <div className="flex justify-center mt-5 flex-col items-center gap-5">
                {fantasyBanner?.map((item, index) => (
                  <div className="w-[650px] h-[250px] border-b flex justify-center gap-5">
                    <div style={{ maxWidth: "250px", maxHeight: "250px" }}>
                      <img alt="" src={item?.image} className="w-[250px] h-full" />
                    </div>
                    <div className="w-[500px] flex flex-col gap-1">
                      <div className="text-slate-400">{item?.title}</div>
                      <div className="text-[#0F19AF] font-semibold ">
                        {item?.subtitle}
                      </div>
                      <div className="text-slate-400 ">{item?.description}</div>
                      <br />
                      <div className="flex gap-1">
                        <span className="text-slate-400">
                          {timeAgo(item?.createdAt)}{" "}
                        </span>
                        <span className="text-black">{item?.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[250px] ">
              {banner1 && (
                <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                  <img
                    src={banner1?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    alt=""
                  />
                </div>
              )}
              <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
                <div className="text-sm p-3 font-semibold">
                  FEATURE VIDEOS !!
                </div>
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <div className="flex justify-center pb-5">
                  <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                    More Videos
                  </button>
                </div>
              </div>
              {banner2 && (
                <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                  <img
                    src={banner2?.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;

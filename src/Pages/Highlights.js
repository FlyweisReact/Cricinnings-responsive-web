import Commentarynavbar from "../Components/Commentarynavbar";

import videoframe from "../Assets/Homepage/videoframe.svg";
import { useEffect, useState } from "react";
import { baseUrl, GetData } from "../Components/Integration/ApiIntegration";
import axios from "axios";
const Highlights = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      console.log(banner);
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
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />
      </div>
      <div className="bg-white pb-5  ">
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
      {/* <div style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}>
                    <p>Comming Soon ...</p>
                  </div> */}
        {/* <div className="flex justify-center pt-2 gap-5">
          <div>
            <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <div className="bg-[#0F19AF] flex  items-center shadow-2xl  rounded-t-lg w-full h-[45px] text-white">
                <div className="ml-2">Chennai Super Kings - 1st Innings</div>
              </div>
              <div className="flex justify-center">
                <div className="bg-[#B3B3B3] w-[630px] text-white h-[45px] mt-5 flex gap-5 items-center justify-around">
                  <div>ALL</div>
                  <div>Fours</div>
                  <div>Sixes</div>
                  <div>Wickets</div>
                  <div>Dropped Catches</div>
                  <div>URDS</div>
                  <div>Others</div>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col gap-4 mt-2">
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
                <div className="flex w-[630px] gap-3">
                  <div className="font-semibold">18.3</div>
                  <div className="text-slate-400">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna
                    odio porta vel sed mi sagittis fermentum odio. Volutpat
                    velit metus rhoncus enim dolor orci quis{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[250px] ">
            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>
            <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
              <div className="text-sm p-3 font-semibold">FEATURE VIDEOS !!</div>
              <img src={videoframe} alt="" />
              <img src={videoframe} alt="" />
              <img src={videoframe} alt="" />
              <div className="flex justify-center pb-5">
                <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                  More Videos
                </button>
              </div>
            </div>

            <div className="bg-[white] rounded-lg mt-2 shadow-2xl">
              <div className="p-1">
                <span className="font-semibold text-sm ml-4">TOP NEWS</span>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      Wankhade Stadium likely to host Ranji Final
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      I found a 2007 study on effects of hand sanitizers
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
                <div className="flex mt-5">
                  <div className="w-[200px]">
                    <img src={topnews} alt="" />
                  </div>

                  <div>
                    <div className="text-[12px] font-bold">
                      The study was repeated with three brands of hand
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Mon,Mar03 2024
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-400">
                  Lorem ipsum dolor sit amet consectetur. Elit eget mauris
                  egestas viverra urna sit. Tincidunt proin nulla dolor amet
                  purus adipiscing at ut. Nulla duis lorem venenatis mi dui
                  risus.
                </div>
              </div>
            </div>
            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Highlights;

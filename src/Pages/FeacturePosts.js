import ipl from "../Assets/Homepage/ipl.svg";
import camp from "../Assets/Homepage/campioins.svg";
import premier from "../Assets/Homepage/premier.svg";
import indianpremier from "../Assets/Homepage/indianpremier.svg";
import fantasy from "../Assets/Homepage/fantasyimg.svg";
import { useEffect, useState } from "react";
import { GetData } from "../Components/Integration/ApiIntegration";
const FeacturePosts = () => {
  const [feacturePosts, setFeacturePosts] = useState([]);
  const [homePageBanners, setHomePageBanners] = useState([]);
  const [topBanner1, setTopBanner1] = useState("");
  const [topBanner2, setTopBanner2] = useState("");
  const [middleBanner1, setMiddleBanner1] = useState("");
  const [middleBanner2, setMiddleBanner2] = useState("");
  const [bottomBanner1, setBottomBanner1] = useState("");
  const [bottomBanner2, setBottomBanner2] = useState("");
  const getAllFeacturePosts = () => {
    GetData("userAuth/getFeaturePost").then((res) => {
      setFeacturePosts(res?.data);
    });
  };
  const getAllHomePageBanners = () => {
    GetData("userAuth/getPostsByPosition").then((res) => {
      // console.log(res?.data);
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
    getAllFeacturePosts();
    getAllHomePageBanners();
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
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div className="bg-[#B3B3B3] text-white h-[100px]  flex justify-center items-center rounded-lg mt-2">
          RESPONSIVE AD’s
        </div>

        <div className="flex mt-5 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px] h-[1500px]  shadow-2xl">
              <div className="flex justify-center mt-5 flex-col items-center gap-5">
                {feacturePosts?.map((item) => (
                  <div className="w-[650px] h-[250px] border-b flex justify-center gap-5">
                    <div>
                      <img
                        alt=""
                        style={{ borderRadius: "10px" }}
                        src={item?.image || fantasy}
                        className="w-[250px]"
                      />
                    </div>
                    <div className="w-[500px] flex flex-col gap-1">
                      <div
                        style={{ fontSize: "12px" }}
                        className="text-slate-400"
                      >
                        {item?.title}
                      </div>
                      <div className="text-[#0F19AF] font-semibold ">
                        {item?.subTitle}
                      </div>
                      <div className="text-slate-400 ">{item?.description}</div>

                      <div className="flex">
                        <span className="text-slate-400">
                          {formattedDate(item?.createdAt)}
                        </span>
                        <span className="text-black">{item?.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[250px] mt-10">
              <div className="bg-[white] h-[400px] rounded-lg">
                <span className="text-sm ml-5 font-semibold">
                  CURRENT SERIES
                </span>
                <div className="flex flex-col mt-4 gap-3 items-center">
                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2 items-center">
                    Indian Premier L
                  </div>
                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                    Sri Lanka tour o Bangaladesh
                  </div>
                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                    Amritsar Premier League T20
                  </div>
                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                    Australia Women Tour to India
                  </div>
                  <div className="h-[50px] w-[220px] shadow text-sm flex justify-left pl-2  items-center">
                    ICC Men’s T20 World Cup
                  </div>
                </div>
              </div>

              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>

              <div className="bg-[white] h-[350px] rounded-lg mt-2">
                <div className="flex justify-between p-2">
                  <div className="text-sm font-semibold">RANKING’s</div>
                  <div>
                    <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                      Viewall
                    </button>
                  </div>
                </div>
                <div className="flex justify-between ml-2 mr-2">
                  <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                    Test
                  </button>
                  <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                    ODI
                  </button>
                  <button className="w-[70px] rounded-3xl h-[20px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                    T201
                  </button>
                </div>
                <div className="flex justify-between m-2">
                  <div>Teams</div>
                  <div>Batting</div>
                  <div>Bowling</div>
                  <div>ALR</div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Rank</th>
                      <th className="w-[100px]">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">2.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">3.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">4.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">5.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">6.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                    <tr>
                      <td className="text-center">7.</td>
                      <td className="text-center">India</td>
                      <td className="text-center">122</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center text-[10px] mt-2">
                  Latest Updated On 30 Mar 2024,13:30 IST
                </div>
              </div>
              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>
              <div className="bg-[white] border rounded-lg mt-2">
                <div className="p-1">
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
                  <img src={camp} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    Mumbai Indians Champions
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={ipl} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={premier} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={indianpremier} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeacturePosts;

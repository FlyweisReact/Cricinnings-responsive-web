/** @format */

import { useEffect, useState } from "react";
import {
  GetData,
  GetDataWithToken,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AdSideBanner, SpecialBox, TopBanner } from "../Components/HelpingComponent";
import CurrentSeries from "../Components/CurrentSeries";
import RankingSeries from "../Components/RankingSeries";

const SingleBlogPage = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
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
  const [fantasyBanner, setFantasyBanner] = useState([]);

  const getAllData = async () => {
    GetData(`admin/getAllPosts`).then((res) => {
      const filteredData = res?.data?.filter((item) => item._id === blogId);
      setFantasyBanner(filteredData);
    });
    GetData("userAuth/getPostByTitle/CRICKET_NEWS").then((res) => {});
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getAllHomePageBanners = () => {
    GetData("admin/getAllPosts").then((res) => {
      const topBanner = res?.data?.filter((item) => item?.title === "top");
      const middleBanner = res?.data?.filter(
        (item) => item?.title === "LiveScore_middle"
      );
      const bottomBanner = res?.data?.filter(
        (item) => item?.title === "LiveScore_bottom"
      );
      setTopBanner1(topBanner[0]?.image);
      setMiddleBanner2(middleBanner[1]?.image);
      setBottomBanner1(bottomBanner[0]?.image);
    });
  };

  useEffect(() => {
    getAllHomePageBanners();
  }, []);



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
        <TopBanner img={topBanner1} />

        <div className="flex mt-5 justify-center pb-5 zero-margin">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 full-width column-flex small-padding">
            <div className="left w-[700px] boxShadowFantsyTips full-width">
              <div className="flex justify-center mt-3 flex-col items-center gap-5 small-padding">
                {fantasyBanner &&
                  fantasyBanner?.map((item) => (
                    <>
                      <div
                        style={{ padding: "0.5rem" }}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </>
                  ))}
              </div>
            </div>

            <div className="w-[250px] mt-10 zero-margin full-width">
              <CurrentSeries />
              <AdSideBanner img={middleBanner2} />
              <RankingSeries />
              <AdSideBanner img={bottomBanner1} />
              <SpecialBox />
              <div className="bg-[white] rounded-lg mt-2 box-shadow-container ">
                <div className="p-1 small-padding">
                  <span className="font-semibold text-sm ml-4 medium-text">
                    SPECIALS
                  </span>
                  {specialBanner?.map((item) => (
                    <>
                      <img src={item?.image} alt="" />
                      <span className="font-semibold text-sm ml-4 small-text">
                        {item?.subtitle}
                      </span>
                      <p className="ml-4 mt-2 text-sm text-[#8B8C8D] xs-small-text">
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
    </div>
  );
};

export default SingleBlogPage;

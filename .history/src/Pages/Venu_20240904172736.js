/** @format */

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import CurrentSeries from "../Components/CurrentSeries";
import { TopBanner } from "../Components/HelpingComponent";
import RankingSeries from "../Components/RankingSeries";

const Venu = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
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

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const getSquadData = async () => {
    axios
      .get(baseUrl + "user/getCompetitionOverview/" + seriesId)
      .then((res) => {
        setSquadData(res?.data?.response);
      });
  };

  useEffect(() => {
    getSquadData();
  }, [seriesId]);

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");

    setOdiBestman(res?.data?.rankingData?.ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.ranks?.bowlers?.tests);
    setOdiAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.odis || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <TopBanner img={banner1?.image} />

        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5 column-flex full-width zero-padding">
            <div className="left w-[700px] h-[1100px] box-shadow-container   full-width auto-height  small-padding ">
              <div className="mt-10 ml-4 zero-margin">
                <div
                  style={{ fontSize: "20px", paddingBottom: "10px" }}
                  className="text-[#0F19AF] underline font-semibold medium-text"
                >
                  Venue Guide
                </div>
                <div className="mt-2">
                  <span className="font-semibold small-text">
                    Stadium:
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map((item) => item?.name + ", ")}
                    </span>
                  </span>
                  <div className="mt-2"> </div>
                  <span className="font-semibold small-text"  >
                    City:
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map((item) => item?.city + ", ")}
                    </span>
                  </span>
                  <div className="mt-2"> </div>

                  <span className="font-semibold small-text">
                    End:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {squadData?.dateend}
                    </span>
                  </span>
                  <div className="mt-2"></div>

                  <span className="font-semibold ">
                    Hosts to:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      {" "}
                      {squadData?.venue_list?.map(
                        (item) => item?.country + ", "
                      )}
                    </span>
                  </span>
                  <div className=""></div>
                </div>
              </div>
              {/* <div className=" mt-5 ml-4">
                <div className="text-[#0F19AF] font-semibold underline">
                  Match Info
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Match:</span>
                  <div className="">
                    {squadData?.short_title}
                    {","}
                    {squadData?.subtitle}
                    {","}
                    {squadData?.competition?.title}
                  </div>
                  <span className="font-semibold">Toss:</span>
                  <div className="">{squadData?.toss?.text}</div>
                  <span className="font-semibold">Time:</span>
                  <div className="">
                    {formatDateTime(squadData?.date_start)}
                  </div>
                  <span className="font-semibold">Indian Local Time:</span>
                  <div className="">
                    {squadData?.date_start
                      ?.slice(0, 10)
                      ?.split("-")
                      .reverse()
                      .join("-")}{" "}
                    {squadData?.date_start?.slice(11, 16) + " " + "IST"}
                  </div>
                  <span className="font-semibold">Venue:</span>
                  <div className="">
                    {squadData?.venue?.name} {","}
                    {squadData?.venue?.location}
                  </div>
                  <span className="font-semibold">Umpires:</span>
                  <div className="">
                    {squadData?.umpires?.split(",")[0]}
                    {","}
                    {squadData?.umpires?.split(",")[1]}
                  </div>
                  <span className="font-semibold"> Third Umpires:</span>
                  <div className=""> {squadData?.umpires?.split(",")[2]}</div>
                  <span className="font-semibold"> Match Referee:</span>
                  <div className=""> {squadData?.referee}</div>
                  {}
                </div>
              </div> */}
            </div>
            <div className="w-[250px]  mt-10 full-width zero-margin">
              <CurrentSeries />
              <RankingSeries />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venu;

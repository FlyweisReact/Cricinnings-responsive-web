import { IoCaretForwardOutline } from "react-icons/io5";
import topnews from "../Assets/Homepage/topnews.svg";
import videoframe from "../Assets/Homepage/videoframe.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Components/Integration/ApiIntegration";
const Scorecard = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"))
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"))
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"))
      console.log(banner)
    })
  }

  useEffect(() => {
    getAllBanner()
  }, [])

  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      setSquadData(res?.data?.scorecard);
    });
  };

  useEffect(() => {
    getSquadData();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5">
          <div>
            <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
              <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                <div className="ml-2">{squadData?.innings?.[0]?.name}</div>
                <div className="mr-2">
                  {squadData?.innings?.[0]?.scores_full}
                </div>
              </div>

              <table className="m-2">
                <thead>
                  <tr className="border-b">
                    <th className="w-[150px] text-left">Batter</th>
                    <th className="w-[300px]"></th>
                    <th className="w-[50px] text-left">R</th>
                    <th className="w-[50px] text-left">B</th>
                    <th className="w-[50px] text-left">4S</th>
                    <th className="w-[50px] text-left">6S</th>
                    <th className="w-[50px]">SR </th>
                  </tr>
                </thead>
                <tbody>
                  {squadData?.innings?.[0]?.batsmen?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="text-[#0F19AF]">{item.name}</td>
                      <td>{item.dismissal}</td>
                      <td>{item.runs}</td>
                      <td>{item.balls}</td>
                      <td>{item.fours}</td>
                      <td>{item.sixes}</td>
                      <td className="flex items-center">
                        {item.strike_rate} <IoCaretForwardOutline />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-b  ml-2 mr-2">
                <div className="flex justify-between w-[550px]">
                  <div className="text-slate-400">EXTRAS</div>
                  <div className="text-slate-400 flex">
                    {squadData?.innings?.[0]?.extra_runs &&
                      Object.entries(squadData.innings[0].extra_runs).map(
                        ([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="font-semibold">{key}:</span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="border-b ml-2 mr-2">
                <div className="flex  justify-between w-[550px]">
                  <div className="text-slate-400">TOTAL</div>
                  <div className=" flex">
                    {squadData?.innings?.[0]?.scores_full}
                  </div>
                </div>
              </div>

              <div className="flex ml-2 justify-between w-[400px]">
                <div className="text-slate-400 pr-14">Didn’t Bat</div>
                <div className="text-[#0F19AF]">
                  <div className="flex gap-2 flex-wrap">
                    {squadData?.innings?.[0]?.did_not_bat?.map(
                      (player, index) => (
                        <span key={index}>{player?.name}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <table className=" ">
                <thead className="border-b">
                  <tr
                    style={{ borderRadius: "10px 0 10px 0" }}
                    className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                  >
                    <th
                      style={{ overflow: "hidden" }}
                      className="w-[350px] pl-3 text-left"
                    >
                      Bowler
                    </th>
                    <th className="w-[50px] text-left">O</th>
                    <th className="w-[50px] text-left">M</th>
                    <th className="w-[50px] text-left">R</th>
                    <th className="w-[50px] text-left">W</th>
                    <th className="w-[50px] text-left">NB</th>
                    <th className="w-[50px] text-left">WD</th>
                    <th className="w-[50px] text-left">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {squadData?.innings?.[0]?.bowlers?.map((item, index) => (
                    <tr>
                      {console.log(item)}
                      <td className="text-[#0F19AF]  pt-2">{item.name}</td>
                      <td>{item.overs}</td>
                      <td>{item.maidens}</td>
                      <td>{item.run0}</td>
                      <td>{item.wickets}</td>
                      <td>{item.noballs}</td>
                      <td>{item.wides}</td>
                      <td>{item.econ}</td>
                      <td>{item.zeros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-[680px] mt-2 bg-white rounded-lg shadow-lg">
              <table className="w-full">
                <thead className="border-b">
                  <tr
                    className="bg-[#0F19AF] w-full h-[45px] text-white"
                    style={{ borderRadius: "10px 10px 0 0" }}
                  >
                    <th className="w-[350px] pl-3 text-left overflow-hidden">
                      Powerplays
                    </th>
                    <th className="w-[150px] text-left">Start Over</th>
                    <th className="w-[150px] text-left">End Over</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td></td>
                    <td className="pl-3">
                      {console.log(squadData?.innings?.[0]?.powerplay)}
                      {squadData?.innings?.[0]?.powerplay?.p1?.startover}
                    </td>
                    <td className="text-[#0F19AF] pt-2 pl-3">
                      {squadData?.innings?.[0]?.powerplay?.p1?.endover}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-[680px] mt-2 bg-white rounded-lg shadow-lg">
              <table className="w-full">
                <thead className="border-b">
                  <tr
                    className="bg-[#0F19AF] w-full h-[45px] text-white"
                    style={{ borderRadius: "10px 10px 0 0" }}
                  >
                    <th className="w-[350px] pl-3 text-left overflow-hidden">
                      Fall Of Wickets
                    </th>
                    <th className="w-[150px] text-left">Score</th>
                    <th className="w-[150px] text-left">Over</th>
                  </tr>
                </thead>
                <tbody>
                  {squadData?.innings?.[0]?.fows?.map((item, index) => (
                    <tr className="border-b">
                      <td>
                        {item?.name} {item?.dismissal}
                      </td>
                      <td className="pl-3">{item?.score_at_dismissal}</td>
                      <td className="text-[#0F19AF] pt-2 pl-3">
                        {item?.overs_at_dismissal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
              <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                <div className="ml-2">{squadData?.innings?.[1]?.name}</div>
                <div className="mr-2">
                  {squadData?.innings?.[1]?.scores_full}
                </div>
              </div>

              <table className="m-2">
                <thead>
                  <tr className="border-b">
                    <th className="w-[150px] text-left">Batter</th>
                    <th className="w-[300px]"></th>
                    <th className="w-[50px] text-left">R</th>
                    <th className="w-[50px] text-left">B</th>
                    <th className="w-[50px] text-left">4S</th>
                    <th className="w-[50px] text-left">6S</th>
                    <th className="w-[50px]">SR </th>
                  </tr>
                </thead>
                <tbody>
                  {squadData?.innings?.[1]?.batsmen?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="text-[#0F19AF]">{item.name}</td>
                      <td>{item.dismissal}</td>
                      <td>{item.runs}</td>
                      <td>{item.balls}</td>
                      <td>{item.fours}</td>
                      <td>{item.sixes}</td>
                      <td className="flex items-center">
                        {item.strike_rate} <IoCaretForwardOutline />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-b  ml-2 mr-2">
                <div className="flex justify-between w-[550px]">
                  <div className="text-slate-400">EXTRAS</div>
                  <div className="text-slate-400 flex">
                    {squadData?.innings?.[0]?.extra_runs &&
                      Object.entries(squadData.innings[0].extra_runs).map(
                        ([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="font-semibold">{key}:</span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="border-b ml-2 mr-2">
                <div className="flex  justify-between w-[550px]">
                  <div className="text-slate-400">TOTAL</div>
                  <div className=" flex">
                    {squadData?.innings?.[1]?.scores_full}
                  </div>
                </div>
              </div>

              <div className="flex ml-2 justify-between w-[400px]">
                <div className="text-slate-400 pr-14">Didn’t Bat</div>
                <div className="text-[#0F19AF]">
                  <div className="flex gap-2 flex-wrap">
                    {squadData?.innings?.[1]?.did_not_bat?.map(
                      (player, index) => (
                        <span key={index}>{player?.name}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <table className=" ">
                <thead className="border-b">
                  <tr
                    style={{ borderRadius: "10px 0 10px 0" }}
                    className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                  >
                    <th
                      style={{ overflow: "hidden" }}
                      className="w-[350px] pl-3 text-left"
                    >
                      Bowler
                    </th>
                    <th className="w-[50px] text-left">O</th>
                    <th className="w-[50px] text-left">M</th>
                    <th className="w-[50px] text-left">R</th>
                    <th className="w-[50px] text-left">W</th>
                    <th className="w-[50px] text-left">NB</th>
                    <th className="w-[50px] text-left">WD</th>
                    <th className="w-[50px] text-left">ECO</th>
                  </tr>
                </thead>
                <tbody>
                  {squadData?.innings?.[1]?.bowlers?.map((item, index) => (
                    <tr>
                      {console.log(item)}
                      <td className="text-[#0F19AF]  pt-2">{item.name}</td>
                      <td>{item.overs}</td>
                      <td>{item.maidens}</td>
                      <td>{item.run0}</td>
                      <td>{item.wickets}</td>
                      <td>{item.noballs}</td>
                      <td>{item.wides}</td>
                      <td>{item.econ}</td>
                      <td>{item.zeros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
              <table className=" ">
                <thead>
                  <tr className="rounded-t-lg bg-[#0F19AF]  h-[45px] text-white">
                    <th className="w-[200px] text-left ">Fall Of Wicktes</th>
                    <th className="w-[300px] text-left">O</th>
                    <th className="w-[100px] text-left">Score</th>
                    <th className="w-[100px] text-left">Over</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="text-[#0F19AF]">Mahmudul Hasan Joy </td>

                    <td>b L Kumara</td>
                    <td>1-47</td>
                    <td className="flex  items-center">
                      12.3 <IoCaretForwardOutline />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            <div className="mt-5 shadow-2xl">
              <div className="bg-[#0F19AF] h-[45px] flex items-center text-white pl-2">
                Match Info
              </div>

              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Match
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.innings?.[0]?.name} {" Vs"}
                  {squadData?.innings?.[1]?.name}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Series
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.competition?.title}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Date
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.competition?.datestart
                    ?.split(" ")[0]
                    ?.split("-")
                    ?.reverse()
                    ?.join("-")}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Time
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.date_start?.split(" ")[1]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Toss
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.toss?.text}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Venue
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.venue?.name}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Umpires
                </div>
                <div className="text-slate-400 mr-2">{squadData?.umpires}</div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  3rd Umpire
                </div>
                <div className="text-slate-400 mr-2">
                  {squadData?.umpires?.split(",")[2]}
                </div>
              </div>
              <div className="flex justify-between border-b">
                <div
                  className="text-slate-400 ml-2"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Referee
                </div>
                <div className="text-slate-400 mr-2">{squadData?.referee}</div>
              </div>
            </div>
          </div>

          <div className="w-[250px] ">
            {banner1 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner1?.image} style={{ width: "100%",height:"100%",borderRadius:"10px"   }} alt="" />
            </div>}
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
            {banner2 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner2?.image} style={{ width: "100%",height:"100%"  ,borderRadius:"10px" }} alt="" />
            </div>}
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
            {banner3 && <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              <img src={banner3?.image} style={{ width: "100%",height:"100%",borderRadius:"10px"   }} alt="" />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;

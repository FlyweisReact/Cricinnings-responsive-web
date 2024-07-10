import videoframe from "../Assets/Homepage/videoframe.svg";
import Commentarynavbar from "../Components/Commentarynavbar";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { Table } from "react-bootstrap";
const Pointtable = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState({});

  const [matchData, setMatchData] = useState();
  const [compId, setCompId] = useState("");
  const [title, setTitle] = useState("");

  const getMatchData = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setTitle(res?.data?.match?.competition?.title);
      setCompId(res?.data?.match?.competition?.cid);
    });
  };

  useEffect(() => {
    getMatchData();
  }, []);
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"))
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"))
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"))
      // console.log(banner)
    })
  }

  useEffect(() => {
    getAllBanner()
  }, [])
  const getSquadData = async () => {
    axios.get(baseUrl + "user/getpoints/" + compId).then((res) => {
      setSquadData(res?.data);
    });
  };

  useEffect(() => {
    if (compId) {

      getSquadData();
    }
  }, [compId]);


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
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div  style={{padding:"1rem"}} className="left w-[700px] h-[700px] shadow-2xl">
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#rgb(34, 34, 34)",
                  padding: "10px",
                }}
              >
                <p  style={{color:"black",fontWeight:"bold"}}> {title}- Points Table</p>
              </div>
              <Table className="w-full">
                <thead></thead>
                <tbody>
                  {Array.isArray(squadData?.standings) &&
                    squadData.standings.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="border-b bg-gray-200">
                          <td
                            style={{ fontSize: "12px" }}
                            className="font-bold text-center"
                          >
                            {item?.round?.name}
                          </td>
                          <td></td>
                          <td>Mat</td>
                          <td>Won</td>
                          <td>Lost</td>
                          <td>Tied</td>
                          <td>NR</td>
                          <td>Pts</td>
                          <td>NRR</td>
                        </tr>
                        {item?.standings?.map((team, teamIndex) => (
                          <tr key={teamIndex} className="border-b">
                            <td>
                              <div className="flex gap-2">
                                <span>
                                  <img
                                    src={team?.team?.logo_url}
                                    alt=""
                                    className="w-[30px] h-[30px]"
                                  />
                                </span>
                                <span>{team?.team?.alt_name}</span>
                              </div>
                            </td>
                            <td></td>
                            <td>{team?.played}</td>
                            <td>{team?.win}</td>
                            <td>{team?.loss}</td>
                            <td>{team?.draw}</td>
                            <td>{team?.nr}</td>
                            <td>{team?.points}</td>
                            <td>{team?.netrr}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
              {/* <table className="ml-2 table-auto">
                <thead>
                  <tr>
                    <th className="w-[300px] text-left">Team</th>
                    <th className="w-[50px] text-center">Mat</th>
                    <th className="w-[50px] text-center">Won</th>
                    <th className="w-[50px] text-text-center">Lost</th>
                    <th className="w-[50px] text-center">Tied</th>
                    <th className="w-[50px] text-center">NR</th>
                    <th className="w-[50px] text-center">Pts</th>
                    <th className="w-[50px] text-center">NRR</th>
                    <th className="w-[50px] text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr-margin h-[50px] ">
                    <td className="flex items-center gap-1">
                      <img src={chennai} alt="" />{" "}
                      <span className="font-semibold">Chennai Super Kings</span>
                    </td>
                    <td className="text-center text-slate-400">7</td>
                    <td className="text-center text-slate-400">6</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">+1.109 </td>
                    <td className="text-center">
                      <IoCaretDownSharp />
                    </td>
                  </tr>
                  <tr className="tr-margin h-[50px] ">
                    <td className="flex items-center gap-1">
                      <img src={chennai} alt="" />{" "}
                      <span className="font-semibold">Chennai Super Kings</span>
                    </td>
                    <td className="text-center text-slate-400">7</td>
                    <td className="text-center text-slate-400">6</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">+1.109 </td>
                    <td className="text-center">
                      <IoCaretDownSharp />
                    </td>
                  </tr>
                  <tr className="tr-margin h-[50px] ">
                    <td className="flex items-center gap-1">
                      <img src={chennai} alt="" />{" "}
                      <span className="font-semibold">Chennai Super Kings</span>
                    </td>
                    <td className="text-center text-slate-400">7</td>
                    <td className="text-center text-slate-400">6</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">+1.109 </td>
                    <td className="text-center">
                      <IoCaretDownSharp />
                    </td>
                  </tr>
                  <tr className="tr-margin h-[50px] ">
                    <td className="flex items-center gap-1">
                      <img src={chennai} alt="" />{" "}
                      <span className="font-semibold">Chennai Super Kings</span>
                    </td>
                    <td className="text-center text-slate-400">7</td>
                    <td className="text-center text-slate-400">6</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">+1.109 </td>
                    <td className="text-center">
                      <IoCaretDownSharp />
                    </td>
                  </tr>
                  <tr className="tr-margin h-[50px] ">
                    <td className="flex items-center gap-1">
                      <img src={chennai} alt="" />{" "}
                      <span className="font-semibold">Chennai Super Kings</span>
                    </td>
                    <td className="text-center text-slate-400">7</td>
                    <td className="text-center text-slate-400">6</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">2</td>
                    <td className="text-center text-slate-400">+1.109 </td>
                    <td className="text-center">
                      <IoCaretDownSharp />
                    </td>
                  </tr>
                </tbody>
              </table> */}
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

export default Pointtable;

import videoframe from "../Assets/Homepage/videoframe.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import camp from "../Assets/Homepage/campioins.svg";
import premier from "../Assets/Homepage/premier.svg";
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

  const getSquadData = async () => {
    axios.get(baseUrl + "user/getpoints/" + compId).then((res) => {
      setSquadData(res?.data);
    });
  };

  useEffect(() => {
    getSquadData();
  }, [compId]);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          RESPONSIVE AD’s
        </div>
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px] h-[700px] shadow-2xl">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "900",
                  margin: "2rem",
                  color: "black",
                }}
              >
                <p>Indian Premier League 2024 - Points Table</p>
              </div>
              <Table className="w-full">
                <thead>
                  <tr className="bg-[#0F19AF] text-white">
                    <th className="text-left pl-3">Team</th>
                    <th className="text-left">Mat</th>
                    <th className="text-left">Won</th>
                    <th className="text-left">Lost</th>
                    <th className="text-left">Tied</th>
                    <th className="text-left">NR</th>
                    <th className="text-left">Pts</th>
                    <th className="text-left">NRR</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(squadData?.standings) &&
                    squadData.standings.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr className="border-b bg-gray-200">
                          <td colSpan="8" className="font-bold text-center">
                            {item?.round?.name}
                          </td>
                        </tr>
                        {item.standings?.map((team, teamIndex) => (
                          <tr key={teamIndex} className="border-b">
                            <td>{team?.team?.name}</td>
                            <td>{team.mat}</td>
                            <td>{team.won}</td>
                            <td>{team.lost}</td>
                            <td>{team.tied}</td>
                            <td>{team.nr}</td>
                            <td>{team.pts}</td>
                            <td>{team.nrr}</td>
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
              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>
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

              <div className="bg-[white] rounded-lg mt-2 pb-5 border">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pointtable;

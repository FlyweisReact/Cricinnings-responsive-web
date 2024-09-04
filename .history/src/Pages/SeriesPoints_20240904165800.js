/** @format */

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { Table } from "react-bootstrap";
import RankingSeries from "../Components/RankingSeries";

const SeriesPoints = () => {
  const { seriesId } = useParams();
  const [squadData, setSquadData] = useState({});
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
  const [testAlr, setTestAlr] = useState([]);

  const getMatchData = async () => {
    axios.get(baseUrl + "user/getpoints/" + seriesId).then((res) => {
      setSquadData(res?.data);
    });
  };

  useEffect(() => {
    getMatchData();
  }, [seriesId]);

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
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
        <div className="flex mt-2 justify-center pb-5">
          <div className="w-[950px]  bg-[white]  full-width column-flex point-table">
            <div
              style={{ padding: "1rem" }}
              className="left w-[700px] h-[700px]  full-width box-shadow-container auto-height"
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#rgb(34, 34, 34)",
                  padding: "10px",
                }}
              >
                <p style={{ color: "black", fontWeight: "bold" }}>
                  <h1 className="text-lg font-bold medium-text">
                    {squadData?.standings?.[0]?.round?.name}
                    {squadData?.standings?.[0]?.round?.name && "- Points Table"}
                  </h1>
                </p>
              </div>
              <Table className="w-full" responsive>
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
                            <h1 className="text-sm small-text">
                              {" "}
                              {item?.round?.name}
                            </h1>
                          </td>
                          <td></td>
                          <td className="small-text">Mat</td>
                          <td className="small-text">Won</td>
                          <td className="small-text">Lost</td>
                          <td className="small-text">Tied</td>
                          <td className="small-text">NR</td>
                          <td className="small-text">Pts</td>
                          <td className="small-text">NRR</td>
                        </tr>
                        {item?.standings?.map((team, teamIndex) => (
                          <tr key={teamIndex} className="border-b">
                            <td>
                              <div className="flex gap-2 items-center">
                                <span>
                                  <img
                                    src={team?.team?.logo_url}
                                    alt=""
                                    className="w-[30px] h-[30px]"
                                  />
                                </span>
                                <span>
                                  <h1 className="text-base xs-small-text">
                                    {team?.team?.alt_name}
                                  </h1>
                                </span>
                              </div>
                            </td>
                            <td></td>
                            <td className="xs-small-text">{team?.played}</td>
                            <td className="xs-small-text">{team?.win}</td>
                            <td className="xs-small-text">{team?.loss}</td>
                            <td className="xs-small-text">{team?.draw}</td>
                            <td className="xs-small-text">{team?.nr}</td>
                            <td className="xs-small-text">{team?.points}</td>
                            <td className="xs-small-text">{team?.netrr}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </div>
            <div className="w-[250px] mt-10  full-width zero-margin small-padding">
              <RankingSeries />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPoints;

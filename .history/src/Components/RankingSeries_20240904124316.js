/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "./Integration/ApiIntegration";

const RankingSeries = () => {
  const navigate = useNavigate();
  const [teamSelector, setTeamSelector] = useState("test");
  const [mainCategory, setMainCategory] = useState("teams");
  const [test, setTest] = useState([]);

  const getAllTeamRankingsData = () => {
    GetDataWithToken({
      path: "iccranks",
    }).then((res) => {
      setTest(res?.response?.ranks?.teams?.tests);
    });
  };

  useEffect(() => {
    
  })

  return (
    <div className="bg-[white] pt-3 pb-3 rounded-lg mt-2 box-shadow-container">
      <div className="flex justify-between p-2">
        <div
          className="text-sm font-semibold small-text"
          style={{ fontSize: "12px" }}
        >
          RANKING’s
        </div>
        <div>
          <button
            onClick={() => navigate("/icc-rankings/men/batting")}
            className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
          >
            View all
          </button>
        </div>
      </div>
      <div className="flex justify-between ml-2 mr-2">
        <button
          onClick={() => setTeamSelector("test")}
          className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white"
          style={{
            cursor: "pointer",
            backgroundColor: teamSelector === "test" ? "#0F19AF" : "black",
            color: teamSelector === "test" ? "white" : "black",
            fontWeight: teamSelector === "test" ? "bold" : "normal",
          }}
        >
          Test
        </button>
        <button
          onClick={() => setTeamSelector("odi")}
          className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
          style={{
            cursor: "pointer",
            backgroundColor: teamSelector === "odi" ? "#0F19AF" : null,
            color: teamSelector === "odi" ? "white" : "black",
            fontWeight: teamSelector === "odi" ? "bold" : "normal",
          }}
        >
          ODI
        </button>
        <button
          onClick={() => setTeamSelector("t20")}
          className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white"
          style={{
            cursor: "pointer",
            backgroundColor: teamSelector === "t20" ? "#0F19AF" : null,
            color: teamSelector === "t20" ? "white" : "black",
            fontWeight: teamSelector === "t20" ? "bold" : "normal",
          }}
        >
          T20
        </button>
      </div>
      <div className="flex justify-between m-2">
        <div
          style={{
            cursor: "pointer",
            textDecoration: mainCategory === "teams" ? "underline" : "none",
            fontWeight: mainCategory === "teams" ? "bold" : "normal",
            color: "black",
            textDecorationColor: "#0F19AF",
          }}
          onClick={() => setMainCategory("teams")}
          className="text-[#0F19AF] xs-small-text"
        >
          Teams
        </div>
        <div
          style={{
            cursor: "pointer",
            textDecoration: mainCategory === "batting" ? "underline" : "none",
            fontWeight: mainCategory === "batting" ? "bold" : "normal",

            textDecorationColor: "#0F19AF",
          }}
          onClick={() => setMainCategory("batting")}
          className="xs-small-text"
        >
          Batting
        </div>
        <div
          style={{
            cursor: "pointer",
            textDecoration: mainCategory === "bowling" ? "underline" : "none",
            fontWeight: mainCategory === "bowling" ? "bold" : "normal",

            textDecorationColor: "#0F19AF",
          }}
          onClick={() => setMainCategory("bowling")}
          className="xs-small-text"
        >
          Bowling
        </div>
        <div
          style={{
            cursor: "pointer",
            textDecoration: mainCategory === "alr" ? "underline" : "none",
            fontWeight: mainCategory === "alr" ? "bold" : "normal",

            textDecorationColor: "#0F19AF",
          }}
          onClick={() => setMainCategory("alr")}
          className="xs-small-text"
        >
          ALR
        </div>
      </div>
      <table>
        <thead style={{ textAlign: "center" }}>
          {mainCategory === "teams" && (
            <tr>
              <th className="w-[100px] xs-small-text">Rank</th>
              <th className="w-[100px] xs-small-text">Team</th>
              <th className="w-[100px] xs-small-text">Rating</th>
            </tr>
          )}

          {mainCategory === "batting" && (
            <tr>
              <th className="w-[100px] xs-small-text">Rank</th>
              <th className="w-[100px] xs-small-text">Player</th>
              <th className="w-[100px] xs-small-text">Rating</th>
            </tr>
          )}
          {mainCategory === "bowling" && (
            <tr>
              <th className="w-[100px] xs-small-text">Rank</th>
              <th className="w-[100px] xs-small-text">Player</th>
              <th className="w-[100px] xs-small-text">Rating</th>
            </tr>
          )}
          {mainCategory === "alr" && (
            <tr>
              <th className="w-[100px] xs-small-text">Rank</th>
              <th className="w-[100px] xs-small-text">Player</th>
              <th className="w-[100px] xs-small-text">Rating</th>
            </tr>
          )}
        </thead>
        <tbody>
          {mainCategory === "teams" && (
            <>
              {teamSelector === "test" &&
                test?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">{item?.team}</td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "t20" &&
                t20s?.slice(0, 6).map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">{item?.team}</td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}

              {teamSelector === "odi" &&
                odis?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">{item?.team}</td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
            </>
          )}
          {mainCategory === "batting" && (
            <>
              {teamSelector === "test" &&
                testBestman?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "t20" &&
                t20Bestman?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "odi" &&
                odiBestman?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
            </>
          )}
          {mainCategory === "bowling" && (
            <>
              {teamSelector === "test" &&
                testBolling?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "t20" &&
                t20Bolling?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "odi" &&
                odiBolling?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
            </>
          )}
          {mainCategory === "alr" && (
            <>
              {teamSelector === "test" &&
                testAlr?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "t20" &&
                odiAlr?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
              {teamSelector === "odi" &&
                odiAlr?.slice(0, 6)?.map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td className="text-center xs-small-text">{item?.rank}</td>
                    <td className="text-center xs-small-text">
                      {item?.player}
                    </td>
                    <td className="text-center xs-small-text">
                      {item?.rating}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      <div className="text-center text-[10px] mt-2">
        Latest Updated On {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default RankingSeries;

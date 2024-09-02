/** @format */

import Commentarynavbar from "../Components/Commentarynavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
const Scorecard = () => {
  const { matchId } = useParams();
  const [squadData, setSquadData] = useState();
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const navigate = useNavigate();

  function formatDate11(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const month = months[date.getUTCMonth()];
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();

      const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

      return formattedDate;
    } catch (error) {
      return "";
    }
  }

  function formatDateTime(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const day = date.getUTCDate();
      const month = date.toLocaleString("default", { month: "short" });
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      const formattedDateTime = `${formattedHours}:${formattedMinutes} ${period} (${month} ${day})`;

      return formattedDateTime;
    } catch (error) {
      return "";
    }
  }

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      setSquadData(res?.data?.scorecard);
    });
  };

  function formatExtraRuns(extraRuns) {
    if (!extraRuns) return "";

    const formattedValues = [
      `b ${extraRuns.byes || 0}`,
      `lb ${extraRuns.legbyes || 0}`,
      `w ${extraRuns.wides || 0}`,
      `nb ${extraRuns.noballs || 0}`,
      `p ${extraRuns.penalty || 0}`,
    ];

    return `${extraRuns.total} (${formattedValues.join(", ")})`;
  }

  useEffect(() => {
    getSquadData();
  }, []);

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />

        {banner1?.image && (
          <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
            <img
              style={{ height: "96px", width: "100%" }}
              src={banner1?.image}
              alt="ad-Image2"
            />
          </div>
        )}

        <div>
          <p
            style={{
              color: "#1995EB",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            {squadData?.result && <span>{squadData?.status_note}</span>}
          </p>
        </div>
      </div>

      <div className="bg-white pb-5">
        <div className="flex justify-center pt-2 gap-5 column-flex">
          <div className="full-width">
            <div className="full-width">
              {squadData?.status === 1 && (
                <div className="w-[680px]  mt-5 mb-5 pb-5  text-center full-width">
                  <p>No Data Found</p>
                </div>
              )}

              {squadData?.status === 2 && (
                <>
                  <div className="full-width small-padding">
                    <div className="w-[680px] mt-2 mb-2 bg-[white] rounded-lg  shadow-lg full-width ">
                      <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                        <div className="ml-2 small-text">
                          {squadData?.innings?.[0]?.name}
                        </div>
                        <div className="mr-2 small-text">
                          {squadData?.innings?.[0]?.scores
                            ?.split("/")
                            ?.join("-")}{" "}
                          {squadData?.innings?.[0]?.scores_full &&
                            "(" +
                              squadData?.innings?.[0]?.scores_full
                                ?.split("(")?.[1]
                                ?.split(" ")?.[0] +
                              ") Ov"}
                        </div>
                      </div>

                          <div className="overflow-div"></div>
                      <table className="m-2">
                        <thead>
                          <tr className="border-b">
                            <th className="w-[150px] text-left xs-small-text">Batter</th>
                            <th className="w-[300px]"></th>
                            <th className="w-[50px] text-left xs-small-text">R</th>
                            <th className="w-[50px] text-left xs-small-text">B</th>
                            <th className="w-[50px] text-left xs-small-text">4S</th>
                            <th className="w-[50px] text-left xs-small-text">6S</th>
                            <th className="w-[50px] xs-small-text">SR </th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadData?.innings?.[0]?.batsmen?.map(
                            (item, index) => (
                              <tr key={index} className="border-b">
                                <td
                                  className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.batsman_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                >
                                  {item.name}{" "}
                                  {item?.role_str === "(WK)"
                                    ? "(WK)"
                                    : item?.role_str === "(C)"
                                    ? "(C)"
                                    : ""}
                                </td>

                                <td>{item.how_out}</td>
                                <td>{item.runs}</td>
                                <td>{item.balls_faced}</td>
                                <td>{item.fours}</td>
                                <td>{item.sixes}</td>
                                <td className="flex items-center">
                                  {item.strike_rate}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>


                      <div className="border-b  ml-2 mr-2">
                        <div className="flex justify-between w-[550px]">
                          <div className="text-slate-400">EXTRAS</div>
                          <div className="text-slate-400 flex">
                            {formatExtraRuns(
                              squadData?.innings?.[0]?.extra_runs
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border-b ml-2 mr-2">
                        <div className="flex  justify-between w-[550px]">
                          <div className="text-slate-400">TOTAL</div>
                          <div className=" flex">
                            {squadData?.innings?.[0]?.scores?.split("/")?.[0]}{" "}
                            {squadData?.innings?.[0]?.scores?.split("/")?.[1]
                              ? "(" +
                                squadData?.innings?.[0]?.scores?.split(
                                  "/"
                                )?.[1] +
                                " wkts" +
                                "," +
                                " " +
                                squadData?.innings?.[0]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                " " +
                                "Ov)"
                              : ""}
                          </div>
                        </div>
                      </div>

                      <div className="flex ml-2 w-[680px] full-width">
                        <div
                          style={{ width: "150px" }}
                          className="text-slate-400 pr-14"
                        >
                          Didn’t Bat
                        </div>
                        <div className="text-[#0F19AF] ml-4">
                          <div className="flex flex-wrap gap-1">
                            {squadData?.innings?.[0]?.did_not_bat?.map(
                              (player, index) => (
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        player?.player_id
                                      }/${formatTitle(player?.name)}`
                                    )
                                  }
                                  className="hover:underline hover:cursor-pointer"
                                  key={index}
                                >
                                  {player?.name}
                                  {index !==
                                    squadData.innings[0].did_not_bat.length -
                                      1 && ","}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                      <table className="p-2">
                        <thead className="border-b">
                          <tr
                            style={{ borderRadius: "10px 0 10px 0" }}
                            className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                          >
                            <th
                              style={{ borderRadius: "10px 0 0 0" }}
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
                            <th
                              style={{ borderRadius: "0 10px 0 0" }}
                              className="w-[50px] text-left"
                            >
                              ECO
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadData?.innings?.[0]?.bowlers?.map(
                            (item, index) => (
                              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                                <td
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.bowler_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                >
                                  {item?.role_str === "(WK)"
                                    ? "(WK)"
                                    : item?.role_str === "(C)"
                                    ? "(C)"
                                    : ""}{" "}
                                  {item.name}
                                </td>

                                <td>{item.overs}</td>
                                <td>{item.maidens}</td>
                                <td>{item.run0}</td>
                                <td>{item.wickets}</td>
                                <td>{item.noballs}</td>
                                <td>{item.wides}</td>
                                <td>{item.econ}</td>
                                <td>{item.zeros}</td>
                              </tr>
                            )
                          )}
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
                            <th
                              style={{ borderRadius: "10px 0 0 0" }}
                              className="w-[350px] pl-3 text-left overflow-hidden"
                            >
                              Powerplays
                            </th>
                            <th className="w-[150px] text-left"> Over</th>
                            <th
                              style={{ borderRadius: "0 10px 0 0" }}
                              className="w-[150px] text-left"
                            >
                              Runs
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td></td>
                            <td>
                              {
                                squadData?.innings?.[0]?.powerplay?.p1
                                  ?.startover
                              }
                              -{" "}
                              {squadData?.innings?.[0]?.powerplay?.p1?.endover}
                            </td>

                            <td>{squadData?.innings?.[0]?.result}</td>
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
                            <th className="w-[150px] text-left"></th>
                            <th className="w-[150px] text-left">Score</th>
                            <th className="w-[150px] text-left">Over</th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadData?.innings?.[0]?.fows?.map((item, index) => (
                            <tr className="border-b">
                              <td
                                style={{ color: "#0F19B6" }}
                                className="pl-3 hover:underline hover:cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/profiles/${
                                      item?.batsman_id
                                    }/${formatTitle(item?.name)}`
                                  )
                                }
                              >
                                {item?.role_str === "(WK)"
                                  ? "(WK)"
                                  : item?.role_str === "(C)"
                                  ? "(C)"
                                  : ""}{" "}
                                {item?.name}
                              </td>

                              <td className="pr-3">{item?.how_out}</td>
                              <td className="pl-3">
                                {item?.score_at_dismissal}
                              </td>
                              <td className="text-[#0F19AF] pt-2 pl-3">
                                {item?.overs_at_dismissal}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                      <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                        <div className="ml-2">
                          {squadData?.innings?.[1]?.name}
                        </div>
                        <div className="mr-2">
                          {squadData?.innings?.[1]?.scores
                            ?.split("/")
                            ?.join("-")}{" "}
                          {squadData?.innings?.[1]?.scores_full &&
                            "(" +
                              squadData?.innings?.[1]?.scores_full
                                ?.split("(")?.[1]
                                ?.split(" ")?.[0] +
                              ") Ov"}
                          {/* {squadData?.innings?.[1]?.scores_full} */}
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
                          {squadData?.innings?.[1]?.batsmen?.map(
                            (item, index) => (
                              <tr key={index} className="border-b">
                                <td
                                  className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.batsman_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                >
                                  {item.name}{" "}
                                  {item?.role_str === "(WK)"
                                    ? "(WK)"
                                    : item?.role_str === "(C)"
                                    ? "(C)"
                                    : ""}
                                </td>

                                <td>{item.how_out}</td>
                                <td>{item.runs}</td>
                                <td>{item.balls_faced}</td>
                                <td>{item.fours}</td>
                                <td>{item.sixes}</td>
                                <td className="flex items-center">
                                  {item.strike_rate}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <div className="border-b  ml-2 mr-2">
                        <div className="flex justify-between w-[550px]">
                          <div className="text-slate-400">EXTRAS</div>
                          <div className="text-slate-400 flex">
                            {formatExtraRuns(
                              squadData?.innings?.[1]?.extra_runs
                            )}
                            {}
                          </div>
                        </div>
                      </div>
                      <div className="border-b ml-2 mr-2">
                        <div className="flex  justify-between w-[550px]">
                          <div className="text-slate-400">TOTAL</div>
                          <div className=" flex">
                            {squadData?.innings?.[1]?.scores?.split("/")?.[0]}{" "}
                            {squadData?.innings?.[1]?.scores?.split("/")?.[1]
                              ? "(" +
                                squadData?.innings?.[1]?.scores?.split(
                                  "/"
                                )?.[1] +
                                " wkts" +
                                "," +
                                " " +
                                squadData?.innings?.[1]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                " " +
                                "Ov)"
                              : ""}
                            {/* {(squadData?.innings?.[0]?.scores_full)} */}
                          </div>
                        </div>
                      </div>

                      <div className="flex ml-2 w-[680px]">
                        <div
                          style={{ width: "150px" }}
                          className="text-slate-400 pr-14"
                        >
                          Didn’t Bat
                        </div>
                        <div className="text-[#0F19AF] ml-4">
                          <div className="flex flex-wrap gap-1">
                            {squadData?.innings?.[1]?.did_not_bat?.map(
                              (player, index) => (
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        player?.player_id
                                      }/${formatTitle(player?.name)}`
                                    )
                                  }
                                  className="hover:underline hover:cursor-pointer"
                                  key={index}
                                >
                                  {player?.name}
                                  {index !==
                                    squadData.innings[1].did_not_bat.length -
                                      1 && ","}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                      <table className="p-2">
                        <thead className="border-b">
                          <tr
                            style={{ borderRadius: "10px 0 10px 0" }}
                            className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                          >
                            <th
                              style={{ borderRadius: "10px 0 0 0" }}
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
                            <th
                              style={{ borderRadius: "0 10px 0 0" }}
                              className="w-[50px] text-left"
                            >
                              ECO
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadData?.innings?.[1]?.bowlers?.map(
                            (item, index) => (
                              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                                <td
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${
                                        item?.bowler_id
                                      }/${formatTitle(item?.name)}`
                                    )
                                  }
                                  className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                >
                                  {item?.role_str === "(WK)"
                                    ? "(WK)"
                                    : item?.role_str === "(C)"
                                    ? "(C)"
                                    : ""}{" "}
                                  {item.name}
                                </td>

                                <td>{item.overs}</td>
                                <td>{item.maidens}</td>
                                <td>{item.run0}</td>
                                <td>{item.wickets}</td>
                                <td>{item.noballs}</td>
                                <td>{item.wides}</td>
                                <td>{item.econ}</td>
                                <td>{item.zeros}</td>
                              </tr>
                            )
                          )}
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
                            <th
                              style={{ borderRadius: "10px 0 0 0" }}
                              className="w-[350px] pl-3 text-left overflow-hidden"
                            >
                              Powerplays
                            </th>
                            <th className="w-[150px] text-left"> Over</th>
                            <th
                              style={{ borderRadius: "0 10px 0 0" }}
                              className="w-[150px] text-left"
                            >
                              Runs
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td></td>
                            <td>
                              {
                                squadData?.innings?.[1]?.powerplay?.p1
                                  ?.startover
                              }
                              -{" "}
                              {squadData?.innings?.[1]?.powerplay?.p1?.endover}
                            </td>

                            <td>{squadData?.innings?.[1]?.result}</td>
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
                            <th className="w-[150px] text-left"></th>
                            <th className="w-[150px] text-left">Score</th>
                            <th className="w-[150px] text-left">Over</th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadData?.innings?.[1]?.fows?.map((item, index) => (
                            <tr className="border-b">
                              <td
                                style={{ color: "#0F19B6" }}
                                className="pl-3 hover:underline hover:cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/profiles/${
                                      item?.batsman_id
                                    }/${formatTitle(item?.name)}`
                                  )
                                }
                              >
                                {item?.role_str === "(WK)"
                                  ? "(WK)"
                                  : item?.role_str === "(C)"
                                  ? "(C)"
                                  : ""}{" "}
                                {item?.name}
                              </td>

                              <td className="pr-3">{item?.how_out}</td>
                              <td className="pl-3">
                                {item?.score_at_dismissal}
                              </td>
                              <td className="text-[#0F19AF] pt-2 pl-3">
                                {item?.overs_at_dismissal}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {squadData?.innings?.length === 4 && (
                    <div>
                      <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2">
                            {squadData?.innings?.[2]?.name}
                          </div>
                          <div className="mr-2">
                            {squadData?.innings?.[2]?.scores
                              ?.split("/")
                              ?.join("-")}{" "}
                            {squadData?.innings?.[2]?.scores_full &&
                              "(" +
                                squadData?.innings?.[2]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                ") Ov"}
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
                            {squadData?.innings?.[2]?.batsmen?.map(
                              (item, index) => (
                                <tr key={index} className="border-b">
                                  <td
                                    className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>

                                  <td>{item.how_out}</td>
                                  <td>{item.runs}</td>
                                  <td>{item.balls_faced}</td>
                                  <td>{item.fours}</td>
                                  <td>{item.sixes}</td>
                                  <td className="flex items-center">
                                    {item.strike_rate}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="border-b  ml-2 mr-2">
                          <div className="flex justify-between w-[550px]">
                            <div className="text-slate-400">EXTRAS</div>
                            <div className="text-slate-400 flex">
                              {formatExtraRuns(
                                squadData?.innings?.[2]?.extra_runs
                              )}
                              {}
                            </div>
                          </div>
                        </div>
                        <div className="border-b ml-2 mr-2">
                          <div className="flex  justify-between w-[550px]">
                            <div className="text-slate-400">TOTAL</div>
                            <div className=" flex">
                              {squadData?.innings?.[2]?.scores?.split("/")?.[0]}{" "}
                              {squadData?.innings?.[2]?.scores?.split("/")?.[1]
                                ? "(" +
                                  squadData?.innings?.[2]?.scores?.split(
                                    "/"
                                  )?.[1] +
                                  " wkts" +
                                  "," +
                                  " " +
                                  squadData?.innings?.[2]?.scores_full
                                    ?.split("(")?.[1]
                                    ?.split(" ")?.[0] +
                                  " " +
                                  "Ov)"
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex ml-2 w-[680px]">
                          <div
                            style={{ width: "150px" }}
                            className="text-slate-400 pr-14"
                          >
                            Didn’t Bat
                          </div>
                          <div className="text-[#0F19AF] ml-4">
                            <div className="flex flex-wrap gap-1">
                              {squadData?.innings?.[2]?.did_not_bat?.map(
                                (player, index) => (
                                  <span
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          player?.player_id
                                        }/${formatTitle(player?.name)}`
                                      )
                                    }
                                    className="hover:underline hover:cursor-pointer"
                                    key={index}
                                  >
                                    {player?.name}
                                    {index !==
                                      squadData.innings[2].did_not_bat.length -
                                        1 && ","}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <table className="p-2">
                          <thead className="border-b">
                            <tr
                              style={{ borderRadius: "10px 0 10px 0" }}
                              className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                            >
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
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
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[50px] text-left"
                              >
                                ECO
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[2]?.bowlers?.map(
                              (item, index) => (
                                <tr
                                  style={{ borderBottom: "1px solid #E5E7EB" }}
                                >
                                  <td
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.bowler_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item.name}
                                  </td>

                                  <td>{item.overs}</td>
                                  <td>{item.maidens}</td>
                                  <td>{item.run0}</td>
                                  <td>{item.wickets}</td>
                                  <td>{item.noballs}</td>
                                  <td>{item.wides}</td>
                                  <td>{item.econ}</td>
                                  <td>{item.zeros}</td>
                                </tr>
                              )
                            )}
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
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
                                className="w-[350px] pl-3 text-left overflow-hidden"
                              >
                                Powerplays
                              </th>
                              <th className="w-[150px] text-left"> Over</th>
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[150px] text-left"
                              >
                                Runs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td></td>
                              <td>
                                {
                                  squadData?.innings?.[2]?.powerplay?.p1
                                    ?.startover
                                }
                                -{" "}
                                {
                                  squadData?.innings?.[2]?.powerplay?.p1
                                    ?.endover
                                }
                              </td>

                              <td>{squadData?.innings?.[2]?.result}</td>
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
                              <th className="w-[150px] text-left"></th>
                              <th className="w-[150px] text-left">Score</th>
                              <th className="w-[150px] text-left">Over</th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[2]?.fows?.map(
                              (item, index) => (
                                <tr className="border-b">
                                  <td
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item?.name}{" "}
                                  </td>

                                  <td className="pr-3">{item?.how_out}</td>
                                  <td className="pl-3">
                                    {item?.score_at_dismissal}
                                  </td>
                                  <td className="text-[#0F19AF] pt-2 pl-3">
                                    {item?.overs_at_dismissal}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {squadData?.innings?.length === 4 && (
                    <div>
                      <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2">
                            {squadData?.innings?.[3]?.name}
                          </div>
                          <div className="mr-2">
                            {squadData?.innings?.[3]?.scores
                              ?.split("/")
                              ?.join("-")}{" "}
                            {squadData?.innings?.[3]?.scores_full &&
                              "(" +
                                squadData?.innings?.[3]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                ") Ov"}
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
                            {squadData?.innings?.[3]?.batsmen?.map(
                              (item, index) => (
                                <tr key={index} className="border-b">
                                  <td
                                    className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>

                                  <td>{item.how_out}</td>
                                  <td>{item.runs}</td>
                                  <td>{item.balls_faced}</td>
                                  <td>{item.fours}</td>
                                  <td>{item.sixes}</td>
                                  <td className="flex items-center">
                                    {item.strike_rate}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="border-b  ml-2 mr-2">
                          <div className="flex justify-between w-[550px]">
                            <div className="text-slate-400">EXTRAS</div>
                            <div className="text-slate-400 flex">
                              {formatExtraRuns(
                                squadData?.innings?.[3]?.extra_runs
                              )}
                              {}
                            </div>
                          </div>
                        </div>
                        <div className="border-b ml-2 mr-2">
                          <div className="flex  justify-between w-[550px]">
                            <div className="text-slate-400">TOTAL</div>
                            <div className=" flex">
                              {squadData?.innings?.[3]?.scores?.split("/")?.[0]}{" "}
                              {squadData?.innings?.[3]?.scores?.split("/")?.[1]
                                ? "(" +
                                  squadData?.innings?.[3]?.scores?.split(
                                    "/"
                                  )?.[1] +
                                  " wkts" +
                                  "," +
                                  " " +
                                  squadData?.innings?.[3]?.scores_full
                                    ?.split("(")?.[1]
                                    ?.split(" ")?.[0] +
                                  " " +
                                  "Ov)"
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex ml-2 w-[680px]">
                          <div
                            style={{ width: "150px" }}
                            className="text-slate-400 pr-14"
                          >
                            Didn’t Bat
                          </div>
                          <div className="text-[#0F19AF] ml-4">
                            <div className="flex flex-wrap gap-1">
                              {squadData?.innings?.[3]?.did_not_bat?.map(
                                (player, index) => (
                                  <span
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          player?.player_id
                                        }/${formatTitle(player?.name)}`
                                      )
                                    }
                                    className="hover:underline hover:cursor-pointer"
                                    key={index}
                                  >
                                    {player?.name}
                                    {index !==
                                      squadData.innings[3].did_not_bat.length -
                                        1 && ","}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <table className="p-2">
                          <thead className="border-b">
                            <tr
                              style={{ borderRadius: "10px 0 10px 0" }}
                              className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                            >
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
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
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[50px] text-left"
                              >
                                ECO
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[3]?.bowlers?.map(
                              (item, index) => (
                                <tr
                                  style={{ borderBottom: "1px solid #E5E7EB" }}
                                >
                                  <td
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.bowler_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item.name}
                                  </td>

                                  <td>{item.overs}</td>
                                  <td>{item.maidens}</td>
                                  <td>{item.run0}</td>
                                  <td>{item.wickets}</td>
                                  <td>{item.noballs}</td>
                                  <td>{item.wides}</td>
                                  <td>{item.econ}</td>
                                  <td>{item.zeros}</td>
                                </tr>
                              )
                            )}
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
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
                                className="w-[350px] pl-3 text-left overflow-hidden"
                              >
                                Powerplays
                              </th>
                              <th className="w-[150px] text-left"> Over</th>
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[150px] text-left"
                              >
                                Runs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td></td>
                              <td>
                                {
                                  squadData?.innings?.[3]?.powerplay?.p1
                                    ?.startover
                                }
                                -{" "}
                                {
                                  squadData?.innings?.[3]?.powerplay?.p1
                                    ?.endover
                                }
                              </td>

                              <td>{squadData?.innings?.[3]?.result}</td>
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
                              <th className="w-[150px] text-left"></th>
                              <th className="w-[150px] text-left">Score</th>
                              <th className="w-[150px] text-left">Over</th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[3]?.fows?.map(
                              (item, index) => (
                                <tr className="border-b">
                                  <td
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item?.name}{" "}
                                  </td>

                                  <td className="pr-3">{item?.how_out}</td>
                                  <td className="pl-3">
                                    {item?.score_at_dismissal}
                                  </td>
                                  <td className="text-[#0F19AF] pt-2 pl-3">
                                    {item?.overs_at_dismissal}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {(squadData?.latest_inning_number === 2 ||
                squadData?.latest_inning_number === 3) &&
                squadData?.status !== 2 && (
                  <>
                    <div>
                      <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2">
                            {squadData?.innings?.[1]?.name}
                          </div>
                          <div className="mr-2">
                            {squadData?.innings?.[1]?.scores
                              ?.split("/")
                              ?.join("-")}{" "}
                            {squadData?.innings?.[1]?.scores_full &&
                              "(" +
                                squadData?.innings?.[1]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                ") Ov"}
                            {/* {squadData?.innings?.[1]?.scores_full} */}
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
                            {squadData?.innings?.[1]?.batsmen?.map(
                              (item, index) => (
                                <tr key={index} className="border-b">
                                  <td
                                    className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>

                                  <td>{item.how_out}</td>
                                  <td>{item.runs}</td>
                                  <td>{item.balls_faced}</td>
                                  <td>{item.fours}</td>
                                  <td>{item.sixes}</td>
                                  <td className="flex items-center">
                                    {item.strike_rate}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="border-b  ml-2 mr-2">
                          <div className="flex justify-between w-[550px]">
                            <div className="text-slate-400">EXTRAS</div>
                            <div className="text-slate-400 flex">
                              {formatExtraRuns(
                                squadData?.innings?.[1]?.extra_runs
                              )}
                              {}
                            </div>
                          </div>
                        </div>
                        <div className="border-b ml-2 mr-2">
                          <div className="flex  justify-between w-[550px]">
                            <div className="text-slate-400">TOTAL</div>
                            <div className=" flex">
                              {squadData?.innings?.[1]?.scores?.split("/")?.[0]}{" "}
                              {squadData?.innings?.[1]?.scores?.split("/")?.[1]
                                ? "(" +
                                  squadData?.innings?.[1]?.scores?.split(
                                    "/"
                                  )?.[1] +
                                  " wkts" +
                                  "," +
                                  " " +
                                  squadData?.innings?.[1]?.scores_full
                                    ?.split("(")?.[1]
                                    ?.split(" ")?.[0] +
                                  " " +
                                  "Ov)"
                                : ""}
                              {/* {(squadData?.innings?.[0]?.scores_full)} */}
                            </div>
                          </div>
                        </div>

                        <div className="flex ml-2 w-[680px]">
                          <div
                            style={{ width: "150px" }}
                            className="text-slate-400 pr-14"
                          >
                            Didn’t Bat
                          </div>
                          <div className="text-[#0F19AF] ml-4">
                            <div className="flex flex-wrap gap-1">
                              {squadData?.innings?.[1]?.did_not_bat?.map(
                                (player, index) => (
                                  <span
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          player?.player_id
                                        }/${formatTitle(player?.name)}`
                                      )
                                    }
                                    className="hover:underline hover:cursor-pointer"
                                    key={index}
                                  >
                                    {player?.name}
                                    {index !==
                                      squadData.innings[1].did_not_bat.length -
                                        1 && ","}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <table className="p-2">
                          <thead className="border-b">
                            <tr
                              style={{ borderRadius: "10px 0 10px 0" }}
                              className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                            >
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
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
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[50px] text-left"
                              >
                                ECO
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[1]?.bowlers?.map(
                              (item, index) => (
                                <tr
                                  style={{ borderBottom: "1px solid #E5E7EB" }}
                                >
                                  <td
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.bowler_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item.name}
                                  </td>

                                  <td>{item.overs}</td>
                                  <td>{item.maidens}</td>
                                  <td>{item.run0}</td>
                                  <td>{item.wickets}</td>
                                  <td>{item.noballs}</td>
                                  <td>{item.wides}</td>
                                  <td>{item.econ}</td>
                                  <td>{item.zeros}</td>
                                </tr>
                              )
                            )}
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
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
                                className="w-[350px] pl-3 text-left overflow-hidden"
                              >
                                Powerplays
                              </th>
                              <th className="w-[150px] text-left"> Over</th>
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[150px] text-left"
                              >
                                Runs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td></td>
                              <td>
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.startover
                                }
                                -{" "}
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.endover
                                }
                              </td>

                              <td>{squadData?.innings?.[0]?.result}</td>
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
                              <th className="w-[150px] text-left"></th>
                              <th className="w-[150px] text-left">Score</th>
                              <th className="w-[150px] text-left">Over</th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[1]?.fows?.map(
                              (item, index) => (
                                <tr className="border-b">
                                  <td
                                    style={{ color: "blue" }}
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="pl-3"
                                  >
                                    {item?.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>
                                  <td className="pr-3">{item?.how_out}</td>
                                  <td className="pl-3">
                                    {item?.score_at_dismissal}
                                  </td>
                                  <td className="text-[#0F19AF] pt-2 pl-3">
                                    {item?.overs_at_dismissal}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2">
                            {squadData?.innings?.[0]?.name}
                          </div>
                          <div className="mr-2">
                            {/* {squadData?.innings?.[0]?.scores_full} */}
                            {squadData?.innings?.[0]?.scores
                              ?.split("/")
                              ?.join("-")}{" "}
                            {squadData?.innings?.[0]?.scores_full &&
                              "(" +
                                squadData?.innings?.[0]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                ") Ov"}
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
                            {squadData?.innings?.[0]?.batsmen?.map(
                              (item, index) => (
                                <tr key={index} className="border-b">
                                  <td
                                    className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>

                                  <td>{item.how_out}</td>
                                  <td>{item.runs}</td>
                                  <td>{item.balls_faced}</td>
                                  <td>{item.fours}</td>
                                  <td>{item.sixes}</td>
                                  <td className="flex items-center">
                                    {item.strike_rate}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="border-b  ml-2 mr-2">
                          <div className="flex justify-between w-[550px]">
                            <div className="text-slate-400">EXTRAS</div>
                            <div className="text-slate-400 flex">
                              {formatExtraRuns(
                                squadData?.innings?.[0]?.extra_runs
                              )}
                              {}
                            </div>
                          </div>
                        </div>
                        <div className="border-b ml-2 mr-2">
                          <div className="flex  justify-between w-[550px]">
                            <div className="text-slate-400">TOTAL</div>
                            <div className=" flex">
                              {squadData?.innings?.[0]?.scores?.split("/")?.[0]}{" "}
                              {squadData?.innings?.[0]?.scores?.split("/")?.[1]
                                ? "(" +
                                  squadData?.innings?.[0]?.scores?.split(
                                    "/"
                                  )?.[1] +
                                  " wkts" +
                                  "," +
                                  " " +
                                  squadData?.innings?.[0]?.scores_full
                                    ?.split("(")?.[1]
                                    ?.split(" ")?.[0] +
                                  " " +
                                  "Ov)"
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex ml-2 w-[680px]">
                          <div
                            style={{ width: "150px" }}
                            className="text-slate-400 pr-14"
                          >
                            Didn’t Bat
                          </div>
                          <div className="text-[#0F19AF] ml-4">
                            <div className="flex flex-wrap gap-1">
                              {squadData?.innings?.[0]?.did_not_bat?.map(
                                (player, index) => (
                                  <span
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          player?.player_id
                                        }/${formatTitle(player?.name)}`
                                      )
                                    }
                                    className="hover:underline hover:cursor-pointer"
                                    key={index}
                                  >
                                    {player?.name}
                                    {index !==
                                      squadData.innings[0].did_not_bat.length -
                                        1 && ","}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <table className="p-2">
                          <thead className="border-b">
                            <tr
                              style={{ borderRadius: "10px 0 10px 0" }}
                              className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                            >
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
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
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[50px] text-left"
                              >
                                ECO
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[0]?.bowlers?.map(
                              (item, index) => (
                                <tr
                                  style={{ borderBottom: "1px solid #E5E7EB" }}
                                >
                                  <td
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.bowler_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item.name}
                                  </td>

                                  <td>{item.overs}</td>
                                  <td>{item.maidens}</td>
                                  <td>{item.run0}</td>
                                  <td>{item.wickets}</td>
                                  <td>{item.noballs}</td>
                                  <td>{item.wides}</td>
                                  <td>{item.econ}</td>
                                  <td>{item.zeros}</td>
                                </tr>
                              )
                            )}
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
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
                                className="w-[350px] pl-3 text-left overflow-hidden"
                              >
                                Powerplays
                              </th>
                              <th className="w-[150px] text-left"> Over</th>
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[150px] text-left"
                              >
                                Runs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td></td>
                              <td>
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.startover
                                }
                                -{" "}
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.endover
                                }
                              </td>

                              <td>{squadData?.innings?.[0]?.result}</td>
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
                              <th className="w-[150px] text-left"></th>
                              <th className="w-[150px] text-left">Score</th>
                              <th className="w-[150px] text-left">Over</th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[0]?.fows?.map(
                              (item, index) => (
                                <tr className="border-b">
                                  <td
                                    style={{ color: "blue" }}
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="pl-3"
                                  >
                                    {item?.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>
                                  <td className="pr-3">{item?.how_out}</td>
                                  <td className="pl-3">
                                    {item?.score_at_dismissal}
                                  </td>
                                  <td className="text-[#0F19AF] pt-2 pl-3">
                                    {item?.overs_at_dismissal}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

              {squadData?.latest_inning_number === 1 &&
                squadData?.status !== 2 && (
                  <>
                    <div>
                      <div className="w-[680px]  mt-2 mb-2 bg-[white] rounded-lg  shadow-lg">
                        <div className="bg-[#0F19AF] flex justify-between items-center  rounded-t-lg w-full h-[45px] text-white">
                          <div className="ml-2">
                            {squadData?.innings?.[0]?.name}
                          </div>
                          <div className="mr-2">
                            {/* {squadData?.innings?.[0]?.scores_full} */}
                            {squadData?.innings?.[0]?.scores
                              ?.split("/")
                              ?.join("-")}{" "}
                            {squadData?.innings?.[0]?.scores_full &&
                              "(" +
                                squadData?.innings?.[0]?.scores_full
                                  ?.split("(")?.[1]
                                  ?.split(" ")?.[0] +
                                ") Ov"}
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
                            {squadData?.innings?.[0]?.batsmen?.map(
                              (item, index) => (
                                <tr key={index} className="border-b">
                                  <td
                                    className="text-[#0F19AF] hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item.name}{" "}
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}
                                  </td>

                                  <td>{item.how_out}</td>
                                  <td>{item.runs}</td>
                                  <td>{item.balls_faced}</td>
                                  <td>{item.fours}</td>
                                  <td>{item.sixes}</td>
                                  <td className="flex items-center">
                                    {item.strike_rate}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="border-b  ml-2 mr-2">
                          <div className="flex justify-between w-[550px]">
                            <div className="text-slate-400">EXTRAS</div>
                            <div className="text-slate-400 flex">
                              {formatExtraRuns(
                                squadData?.innings?.[0]?.extra_runs
                              )}
                              {}
                            </div>
                          </div>
                        </div>
                        <div className="border-b ml-2 mr-2">
                          <div className="flex  justify-between w-[550px]">
                            <div className="text-slate-400">TOTAL</div>
                            <div className=" flex">
                              {squadData?.innings?.[0]?.scores?.split("/")?.[0]}{" "}
                              {squadData?.innings?.[0]?.scores?.split("/")?.[1]
                                ? "(" +
                                  squadData?.innings?.[0]?.scores?.split(
                                    "/"
                                  )?.[1] +
                                  " wkts" +
                                  "," +
                                  " " +
                                  squadData?.innings?.[0]?.scores_full
                                    ?.split("(")?.[1]
                                    ?.split(" ")?.[0] +
                                  " " +
                                  "Ov)"
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex ml-2 w-[680px]">
                          <div
                            style={{ width: "150px" }}
                            className="text-slate-400 pr-14"
                          >
                            Didn’t Bat
                          </div>
                          <div className="text-[#0F19AF] ml-4">
                            <div className="flex flex-wrap gap-1">
                              {squadData?.innings?.[0]?.did_not_bat?.map(
                                (player, index) => (
                                  <span
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          player?.player_id
                                        }/${formatTitle(player?.name)}`
                                      )
                                    }
                                    className="hover:underline hover:cursor-pointer"
                                    key={index}
                                  >
                                    {player?.name}
                                    {index !==
                                      squadData.innings[0].did_not_bat.length -
                                        1 && ","}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[680px]  mt-2 bg-[white] rounded-lg  shadow-lg">
                        <table className="p-2">
                          <thead className="border-b">
                            <tr
                              style={{ borderRadius: "10px 0 10px 0" }}
                              className="bg-[#0F19AF] rounded-t-lg w-[680px] h-[45px] text-white"
                            >
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
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
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[50px] text-left"
                              >
                                ECO
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[0]?.bowlers?.map(
                              (item, index) => (
                                <tr
                                  style={{ borderBottom: "1px solid #E5E7EB" }}
                                >
                                  <td
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.bowler_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item.name}
                                  </td>

                                  <td>{item.overs}</td>
                                  <td>{item.maidens}</td>
                                  <td>{item.run0}</td>
                                  <td>{item.wickets}</td>
                                  <td>{item.noballs}</td>
                                  <td>{item.wides}</td>
                                  <td>{item.econ}</td>
                                  <td>{item.zeros}</td>
                                </tr>
                              )
                            )}
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
                              <th
                                style={{ borderRadius: "10px 0 0 0" }}
                                className="w-[350px] pl-3 text-left overflow-hidden"
                              >
                                Powerplays
                              </th>
                              <th className="w-[150px] text-left"> Over</th>
                              <th
                                style={{ borderRadius: "0 10px 0 0" }}
                                className="w-[150px] text-left"
                              >
                                Runs
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td></td>
                              <td>
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.startover
                                }
                                -{" "}
                                {
                                  squadData?.innings?.[0]?.powerplay?.p1
                                    ?.endover
                                }
                              </td>

                              <td>{squadData?.innings?.[0]?.result}</td>
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
                              <th className="w-[150px] text-left"></th>
                              <th className="w-[150px] text-left">Score</th>
                              <th className="w-[150px] text-left">Over</th>
                            </tr>
                          </thead>
                          <tbody>
                            {squadData?.innings?.[0]?.fows?.map(
                              (item, index) => (
                                <tr className="border-b">
                                  <td
                                    className="text-[#0F19AF] pl-3 hover:underline hover:cursor-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/profiles/${
                                          item?.batsman_id
                                        }/${formatTitle(item?.name)}`
                                      )
                                    }
                                  >
                                    {item?.role_str === "(WK)"
                                      ? "(WK)"
                                      : item?.role_str === "(C)"
                                      ? "(C)"
                                      : ""}{" "}
                                    {item?.name}{" "}
                                  </td>

                                  <td className="pr-3">{item?.how_out}</td>
                                  <td className="pl-3">
                                    {item?.score_at_dismissal}
                                  </td>
                                  <td className="text-[#0F19AF] pt-2 pl-3">
                                    {item?.overs_at_dismissal}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>

          {squadData?.innings?.length !== 0 && (
            <div className="w-[250px] full-width ">
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
              {/* <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
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
              </div> */}
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
          )}
        </div>

        <div>
          <div className="mt-5 shadow-2xl w-[680px] ml-3">
            <div
              style={{ borderRadius: "10px 10px 0 0" }}
              className="bg-[#0F19AF] h-[45px] flex items-center text-white pl-2"
            >
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
                {squadData?.short_title}
                {","} {squadData?.subtitle}
                {","} {squadData?.competition?.title}
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
                {formatDate11(squadData?.date_start)}
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
                {formatDateTime(squadData?.date_start)}
              </div>
            </div>
            <div className="flex justify-between border-b">
              <div
                className="text-slate-400 ml-2"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Toss
              </div>
              <div className="text-slate-400 mr-2">{squadData?.toss?.text}</div>
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
                {","} {squadData?.venue?.location}
              </div>
            </div>
            <div className="flex justify-between border-b">
              <div
                className="text-slate-400 ml-2"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Umpires
              </div>
              <div className="text-slate-400 mr-2">
                {squadData?.umpires?.split(",")[0]}
                {","}
                {squadData?.umpires?.split(",")[1]}
              </div>
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
      </div>
    </div>
  );
};

export default Scorecard;

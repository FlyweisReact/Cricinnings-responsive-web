/** @format */

import { useEffect, useState } from "react";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TopBanner } from "../Components/HelpingComponent";

const SeriesSquad = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [banner1, setBanner1] = useState();
  const [allTeams, setAllTeams] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [filterByteamId, setFilterByteamId] = useState("");

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
    });
  };

  const getStatesData = async (payload) => {
    axios.get(baseUrl + `user/competitions/${payload}/squads`).then((res) => {
      setAllTeams(res?.data?.response?.squads);
    });
  };

  useEffect(() => {
    getStatesData(seriesId);
  }, [seriesId]);

  const getTeamFilteredData = async () => {
    if (allTeams?.length > 0) {
      setTeamData(allTeams?.find((item) => item?.team?.tid === filterByteamId));
    }
  };

  useEffect(() => {
    getTeamFilteredData();
  }, [filterByteamId]);

  useEffect(() => {
    getAllBanner();
  }, []);

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <TopBanner img={banner1?.image} className="mt-2" />

        <div className="schedule-squad">
          <div className="mt-3 p-1" style={{ width: "250px" }}>
            <div className="stats_div">
              <p className=""> Teams</p>
              <p
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
                className="statsDivSpantag123"
              >
                {allTeams?.map((item) => {
                  return (
                    <span
                      onClick={() => setFilterByteamId(item?.team?.tid)}
                      className="statsDivSpantag"
                    >
                      <h1 className="text-sm">
                        {" "}
                        {item?.title} {item?.format_str}
                      </h1>
                    </span>
                  );
                })}

                {/* <span
                  className={
                    filterByData === "batting_most_runs"
                      ? "statsDivSpantag1"
                      : "statsDivSpantag"
                  }
                  onClick={() => setFilterByData("batting_most_runs")}
                >
                  Most Runs{" "}
                </span>
                <span onClick={() => setFilterByData("batting_most_run4")}>
                  {" "}
                  Most Fours
                </span>
                <span onClick={() => setFilterByData("batting_most_run6")}>
                  {" "}
                  Most Sixes
                </span>
                <span onClick={() => setFilterByData("batting_most_run100")}>
                  Most Centuries
                </span>
                <span onClick={() => setFilterByData("batting_most_run50")}>
                  Most Fiftes
                </span> */}
              </p>
            </div>
          </div>

          <div className="mt-6" style={{ width: "100%" }}>
            <div className="p-3 zero-padding">
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1 zero-padding medium-text"
                >
                  BATTER
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                  className='zero-padding'
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "bat")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(
                              `/profiles/${item?.pid}/${formatTitle(
                                item?.title
                              )}`
                            )
                          }
                          className="text-lg font-normal cursor-pointer hover:underline "
                        >
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  Bowler
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "bowl")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(
                              `/profiles/${item?.pid}/${formatTitle(
                                item?.title
                              )}`
                            )
                          }
                          className="text-lg font-normal cursor-pointer hover:underline"
                        >
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  All Rounder
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "all")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(
                              `/profiles/${item?.pid}/${formatTitle(
                                item?.title
                              )}`
                            )
                          }
                          className="text-lg font-normal cursor-pointer hover:underline"
                        >
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-3">
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  className="pl-1"
                >
                  Wicket Keeper
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px",
                    padding: "1rem",
                  }}
                >
                  {teamData?.players
                    ?.filter((item) => item?.playing_role === "wk")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(
                              `/profiles/${item?.pid}/${formatTitle(
                                item?.title
                              )}`
                            )
                          }
                          className="text-lg font-normal cursor-pointer hover:underline"
                        >
                          <p>{item?.first_name + " " + item?.last_name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesSquad;

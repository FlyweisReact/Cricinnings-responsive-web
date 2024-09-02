import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  baseUrl,
  convertStringFormat,
  formatTitle,
} from "./Integration/ApiIntegration";
import { Helmet } from "react-helmet";




const Commentarynavbar = () => {
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${month} ${day}, ${hours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
  }

  const location = useLocation();
  const { pathname } = location;
  const params = useParams();
  const { matchId, commentary } = params;
  const [matchData1, setMatchData1] = useState([]);
  const [matchDetails, setMatchDetails] = useState({});
  const [squadData, setSquadData] = useState({});

  const getMatchDetails = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setMatchDetails(res?.data?.match);
    });
  };

  const getSquadData = async () => {
    axios.get(baseUrl + "user/scorecard/" + matchId).then((res) => {
      // console.log(res?.data?.scorecard);
      setSquadData(res?.data?.scorecard);
    });
  };

  const getMatchData1 = async () => {
    axios.get(baseUrl + "user/getLiveMatchById/" + matchId).then((res) => {
      setMatchData1(res?.data?.response);
    });
  };

  useEffect(() => {
    getSquadData();
    getMatchDetails();
    getMatchData1();
  }, [pathname]);


  useEffect(() => {
    if (matchDetails?.status === 3) {
      const intervalId = setInterval(() => {
        getMatchDetails();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [matchDetails]);

  const [commentaryData, setCommentaryData] = useState({});

  return (
    <div className="bg-[white] pl-2 pt-2 pr-2">
      {/\/live-cricket-scores\//i.test(pathname) ? (
        <Helmet>
          <title>
            {`${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Score, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          </title>
          <meta
            name="description"
            content={`${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Score, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          />
        </Helmet>
      ) : /\/live-cricket-scorecard\//i.test(pathname) ? (
        <Helmet>
          <title>
            Cricket scorecard -{" "}
            {`${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Scorecard, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          </title>
          <meta
            name="description"
            content={`Cricket scorecard - ${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Score, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          />
        </Helmet>
      ) : /\/cricket-match-squads\//i.test(pathname) ? (
        <Helmet>
          <title>
            Cricket match squads -{" "}
            {`${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Scorecard, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          </title>
          <meta
            name="description"
            content={`Cricket match squads - ${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Score, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          />
        </Helmet>
      ) : /\/live-cricket-full-commentary\//i.test(pathname) ? (
        <Helmet>
          <title>
            Catch the Full Commentary of -{" "}
            {`${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Scorecard, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          </title>
          <meta
            name="description"
            content={`Catch the Full Commentary of - ${matchDetails?.title}, ${
              matchDetails?.subtitle
            } - Live Cricket Score, Commentary ${
              matchDetails?.statue === 3
                ? "Live"
                : matchDetails?.statue === 1
                ? "Match Not Started Yet"
                : ""
            }`}
          />
        </Helmet>
      ) : (
        ""
      )}



      <div className="font-semibold">
        <h1 style={{ fontSize: "14px", fontWeight: "bold" }}>
          {(matchDetails?.title && matchDetails?.title + ",") || ""}{" "}
          {matchDetails?.subtitle || ""}- Live Cricket Score, Commentary
          {matchDetails?.statue === 3
            ? "Live"
            : matchDetails?.statue === 1
            ? "Match Not Started Yet"
            : ""}{" "}
        </h1>
      </div>

      <div className="flex justify-between mt-3">
        <div
          onClick={() =>
            navigate(
              `/cricket-series/${
                matchDetails?.competition?.cid
              }/${matchDetails?.competition?.title
                ?.toLowerCase()
                ?.split(" ")
                ?.join("-")}-${matchDetails?.competition?.season}/matches`
            )
          }
          className="text-slate-500 text-sm font-bold cursor-pointer hover:underline"
        >
          <h1 className="text-sm xs-small-text">
            Series:{" "}
            {(matchDetails?.competition?.title || "") +
              "," +
              " " +
              (matchDetails?.competition?.season || "")}
          </h1>
        </div>

        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500"
        >
          {" "}
          <h1 className="text-sm xs-small-text">
            venue: {matchDetails?.venue?.name || ""}
            {matchDetails?.venue?.name && matchDetails?.venue?.location
              ? ","
              : ""}
            {matchDetails?.venue?.location || ""}
          </h1>
          {/* {","} {matchDetails?.venue?.location || ""} */}
        </div>
        <div
          style={{ fontSize: "14px", fontWeight: "bold", color: "#7E7F7E" }}
          className="text-slate-500 xs-small-text"
        >
          Date: 
          {matchDetails?.date_start &&
            formatDate(matchDetails?.date_start || "")}
        </div>
      </div>
      <div className="topBarCommentary">
        <p
          onClick={() => {
            if (matchDetails?.match_id) {
              const teamAShortName = matchDetails.teama?.short_name
                ?.toLowerCase()
                .split(" ")
                .join("-");
              const teamBShortName = matchDetails.teamb?.short_name
                ?.toLowerCase()
                .split(" ")
                .join("-");
              const matchNumber =
                matchDetails?.match_number ||
                matchDetails?.subtitle?.split("Match")?.[1];
              console.log(matchDetails?.subtitle?.split("Match")?.[1]);
              const matchSuffix = convertStringFormat(
                matchDetails?.subtitle
              )?.toLowerCase();
              const competitionTitle = matchDetails?.competition?.title
                ?.toLowerCase()
                .split(" ")
                .join("-");
              const competitionSeason =
                matchDetails?.competition?.season?.toLowerCase();

              const url = `/live-cricket-scores/${matchDetails.match_id}/${teamAShortName}-vs-${teamBShortName}-${matchSuffix}-${competitionTitle}-${competitionSeason}`;

              navigate(url);
            }
          }}
          style={{
            color: /\/live-cricket-scores\//i.test(pathname)
              ? "white"
              : "black",
            fontWeight: "bold",
            backgroundColor: /\/live-cricket-scores\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/live-cricket-scores\//i.test(pathname) ? "14px" : "0px",
          }}
          className='xs-small-text'
        >
          Live
        </p>

        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-scorecard/${
                  matchDetails?.match_id
                }/${matchDetails?.teama?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-vs-${matchDetails?.teamb?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-${convertStringFormat(
                  matchDetails?.subtitle
                )?.toLowerCase()}-${matchDetails?.competition?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  .join(
                    "-"
                  )}-${matchDetails?.competition?.season?.toLowerCase()}`
              );
          }}
          style={{
            color: /\/live-cricket-scorecard\//i.test(pathname)
              ? "white"
              : "black",
            fontWeight: "bold",
            backgroundColor: /\/live-cricket-scorecard\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/live-cricket-scorecard\//i.test(pathname)
              ? "14px"
              : "0px",
          }}
          
          className='xs-small-text'
        >
          Scorecard
        </p>

        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/cricket-match-squads/${
                  matchDetails?.match_id
                }/${matchDetails?.teama?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-vs-${matchDetails?.teamb?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-${convertStringFormat(
                  matchDetails?.subtitle
                )}-${matchDetails?.competition?.title
                  ?.toLowerCase()
                  .split(" ")
                  .join(
                    "-"
                  )}-${matchDetails?.competition?.season?.toLowerCase()}`
              );
          }}
          style={{
            color: /\/cricket-match-squads\//i.test(pathname)
              ? "white"
              : "black",
            fontWeight: "bold",
            backgroundColor: /\/cricket-match-squads\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/cricket-match-squads\//i.test(pathname)
              ? "14px"
              : "0px",
          }}
          
          className='xs-small-text'
        >
          Squads
        </p>

        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/live-cricket-full-commentary/${
                  matchDetails?.match_id
                }/${matchDetails?.teama?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-vs-${matchDetails?.teamb?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-${convertStringFormat(
                  matchDetails?.subtitle
                )?.toLowerCase()}-${matchDetails?.competition?.title
                  ?.toLowerCase()
                  .split(" ")
                  .join(
                    "-"
                  )}-${matchDetails?.competition?.season?.toLowerCase()}`
              );
          }}
          style={{
            color: /\/live-cricket-full-commentary\//i.test(pathname)
              ? "white"
              : "black",
            fontWeight: "bold",
            backgroundColor: /\/live-cricket-full-commentary\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/live-cricket-full-commentary\//i.test(pathname)
              ? "14px"
              : "0px",
          }}
          
          className='xs-small-text'
        >
          Full Commentary
        </p>

        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/cricket-series/${
                  matchDetails?.competition?.cid
                }/${matchDetails?.competition?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.join("-")}-${
                  matchDetails?.competition?.season
                }/points-table`
              );
          }}
          style={{
            color: /\/points-table\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/points-table\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/points-table\//i.test(pathname) ? "14px" : "0px",
          }}
          
          className='xs-small-text'
        >
          Point Table
        </p>
        <p
          onClick={() => {
            matchDetails?.match_id &&
              navigate(
                `/cricket-match-facts/${
                  matchDetails?.match_id
                }/${matchDetails?.teama?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-vs-${matchDetails?.teamb?.short_name
                  ?.toLowerCase()
                  .split(" ")
                  .join("-")}-${convertStringFormat(
                  matchDetails?.subtitle
                )?.toLowerCase()}-${matchDetails?.competition?.title
                  ?.toLowerCase()
                  .split(" ")
                  .join(
                    "-"
                  )}-${matchDetails?.competition?.season?.toLowerCase()}`
              );
          }}
          style={{
            color: /\/cricket-match-facts\//i.test(pathname)
              ? "white"
              : "black",
            fontWeight: "bold",
            backgroundColor: /\/cricket-match-facts\//i.test(pathname)
              ? "#0F19AF"
              : "white",
            padding: /\/cricket-match-facts\//i.test(pathname) ? "14px" : "0px",
          }}
          
          className='xs-small-text'
        >
          Match Info
        </p>
        <p
          onClick={() => {
            matchDetails?.match_id && navigate(`/cricket-news/`);
          }}
          style={{
            color: pathname.startsWith("/cricket-news/") ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: pathname.startsWith("/cricket-news/")
              ? "#0F19AF"
              : "white",
            padding: pathname.startsWith("/cricket-news/") ? "14px" : "0px",
          }}
          
          className='xs-small-text'
        >
          News
        </p>
        <p
          onClick={() => {
            console.log(matchDetails?.match_id);
            matchDetails?.match_id &&
              navigate(
                `/cricket-series/${
                  matchDetails?.competition?.cid
                }/${formatTitle(matchDetails?.competition?.title)}-${
                  matchDetails?.competition?.season
                }/stats`
              );
          }}
          style={{
            color: /\/stats\//i.test(pathname) ? "white" : "black",
            fontWeight: "bold",
            backgroundColor: /\/stats\//i.test(pathname) ? "#0F19AF" : "white",
            padding: /\/stats\//i.test(pathname) ? "14px" : "0px",
          }}
          
          className='xs-small-text'
        >
          Stats
        </p>
      </div>

      {/\/live-cricket-scores\//i.test(pathname) && (
        <div
          style={{
            fontSize: "12px",
          }}
          className=" text-[#0F19AF] mt-2"
        >
          <div style={{ lineHeight: "1.1rem" }}>
            <p
              style={{
                color: "#666666",
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "1rem",
              }}
              className='xs-small-text'
            >
              {matchDetails?.status !== 1 && (
                <span>{matchDetails?.teama?.short_name}</span>
              )}{" "}
              <span>
                {matchDetails?.teama?.scores}
                {matchDetails?.teama?.overs && (
                  <> ({matchDetails?.teama.overs})</>
                )}{" "}
                {matchDetails?.status === 3 &&
                  matchData1?.live_inning?.batting_team_id ===
                    matchDetails?.teama?.team_id && (
                    <span
                      style={{
                        color: "#666666",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      CRR: {matchData1?.live_inning?.equations?.runrate}{" "}
                      {matchData1?.live_inning_number === 2 &&
                        matchData1?.live_inning?.batting_team_id ===
                          matchDetails?.teama?.team_id && (
                          <span>
                            | RR: {matchData1?.live_score?.required_runrate}
                          </span>
                        )}
                    </span>
                  )}{" "}
              </span>
            </p>
            <p
              style={{
                color: "#000",
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "1rem",
              }}
            >
              {matchDetails?.status === 1 && <span>Match Not Started Yet</span>}
              {matchDetails?.status !== 1 && (
                <span> {matchDetails?.teamb?.short_name}</span>
              )}{" "}
              
              <span>
                {matchDetails?.teamb?.scores}
                {matchDetails?.teamb?.overs && (
                  <> ({matchDetails.teamb.overs})</>
                )}{" "}
                {matchDetails?.status === 3 &&
                  matchData1?.live_inning?.batting_team_id ===
                    matchDetails?.teamb?.team_id && (
                    <span
                      style={{
                        color: "#666666",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      CRR:{" "}
                      {matchData1?.live_inning?.equations?.required_runrate}{" "}
                      {matchData1?.live_inning_number === 2 &&
                        matchData1?.live_inning?.batting_team_id ===
                          matchDetails?.teamb?.team_id && (
                          <span>
                            | RR: {matchData1?.live_score?.required_runrate}
                          </span>
                        )}
                    </span>
                  )}
              </span>
            </p>
            <p
              style={{
                color: matchDetails?.statue !== 2 ? "#d0021b" : "#187EE5",
                marginLeft: "1rem",
                fontSize: "14px",
              }}
            >
              {matchDetails?.status_note}
            </p>
          </div>
          {/\/live-cricket-scores\//i.test(pathname) && (
            <div className="ml-4 mb-1">
              <div className="d-flex gap-4 ">
                {squadData?.man_of_the_match?.name && (
                  <p className="CommentartyData1">
                    Man of the match :{" "}
                    <span className="CommentartyData2">
                      {" "}
                      {squadData?.man_of_the_match?.name}
                    </span>
                  </p>
                )}
                {squadData?.man_of_the_series?.name && (
                  <p className="CommentartyData1">
                    Man of the series :{" "}
                    <span className="CommentartyData2">
                      {" "}
                      {squadData?.man_of_the_series?.name}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            {matchData1?.status === 3 && (
              <div style={{ width: "600px", fontSize: "14px" }}>
                <div>
                  <table className="m-2 ml-0">
                    <thead>
                      <tr className="border-b">
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            borderRadius: "8px 0 0 0",
                            padding: "0.4rem",
                          }}
                          className="w-[150px] text-left"
                        >
                          Batter
                        </th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            padding: "0.4rem",
                          }}
                          className="w-[300px]"
                        ></th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            padding: "0.4rem",
                          }}
                          className="w-[50px] text-left"
                        >
                          R
                        </th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            padding: "0.4rem",
                          }}
                          className="w-[50px] text-left"
                        >
                          B
                        </th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            padding: "0.4rem",
                          }}
                          className="w-[50px] text-left"
                        >
                          4S
                        </th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            padding: "0.4rem",
                          }}
                          className="w-[50px] text-left"
                        >
                          6S
                        </th>
                        <th
                          style={{
                            backgroundColor: "#0F19AF",
                            color: "white",
                            borderRadius: "0 8px 0 0",
                            padding: "0.4rem",
                          }}
                          className="w-[50px]"
                        >
                          SR{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchData1?.batsmen?.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td
                            className="text-[#0F19AF]"
                            onClick={() =>
                              navigate(
                                `/profiles/${item?.batsman_id}/${formatTitle(
                                  item?.name
                                )}`
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
                          <td>{item?.how_out}</td>
                          <td>{item?.runs}</td>
                          <td>{item?.balls_faced}</td>
                          <td>{item?.fours}</td>
                          <td>{item?.sixes}</td>
                          <td className="flex items-center">
                            {item?.strike_rate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {matchData1?.status !== 1 && (
                  <div>
                    <table className="m-2">
                      <thead>
                        <tr className="border-b">
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              borderRadius: "8px 0 0 0",
                              padding: "0.4rem",
                            }}
                            className="w-[150px] text-left"
                          >
                            Bowler
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              padding: "0.4rem",
                            }}
                            className="w-[300px]"
                          ></th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              padding: "0.4rem",
                            }}
                            className="w-[50px] text-left"
                          >
                            Ov
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              padding: "0.4rem",
                            }}
                            className="w-[50px] text-left"
                          >
                            M
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              padding: "0.4rem",
                            }}
                            className="w-[50px] text-left"
                          >
                            R
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              padding: "0.4rem",
                            }}
                            className="w-[50px] text-left"
                          >
                            W
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0F19AF",
                              color: "white",
                              borderRadius: "0 8px 0 0",
                              padding: "0.4rem",
                            }}
                            className="w-[50px]"
                          >
                            Eco{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {matchData1?.bowlers?.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td
                              className="text-[#0F19AF]"
                              onClick={() =>
                                navigate(
                                  `/profiles/${item?.batsman_id}/${formatTitle(
                                    item?.name
                                  )}`
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
                            <td></td>
                            <td>{item?.overs}</td>
                            <td>{item?.maidens}</td>
                            <td>{item?.runs_conceded}</td>
                            <td>{item?.wickets}</td>
                            <td>{item?.econ}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Commentarynavbar;

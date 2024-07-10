import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import { useParams } from "react-router-dom";
import axios from "axios";

const Fullcommentary = () => {
  const [matchDetails, setMatchDetails] = useState({});
  const { matchId } = useParams();
  const [commentaryData, setCommentaryData] = useState({});
  const [itemsToShow, setItemsToShow] = useState(7);
  const [initialInning, setInitialInning] = useState(1);
  function dateConvert12(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function timeConvert12(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm} IST`;
  }
  const handleViewMore = () => {
    setItemsToShow(commentaryData?.commentaries?.length);
  };

  const getMatchDetails = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setMatchDetails(res?.data?.match);
    });
  };

  const getAllCommentary = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/${initialInning}/commentary`
      );
      // console.log(res?.data);
      setCommentaryData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCommentary();
  }, [initialInning]);

  useEffect(() => {
    getMatchDetails();
  }, []);
  const convertCommentaryToSymbol = (commentaryItem) => {
    if (commentaryItem.six) return "6";
    if (commentaryItem.four) return "4";
    if (commentaryItem.wideball) return "Wd";
    if (commentaryItem.noball) return "Nb";
    if (commentaryItem.bye_run > 0) return "B";
    if (commentaryItem.legbye_run > 0) return "Lb";
    if (commentaryItem.event === "wicket") return "W";
    return commentaryItem.run.toString();
  };
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar matchDetails={matchDetails} />
        <div>
          {/* <div
            style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
          >
            <p>Comming Soon ...</p>
          </div> */}
          <div>
            <div style={{ padding: "1rem" }}>
              {commentaryData?.commentaries
                ?.slice(0, itemsToShow)
                .map((item, index) => (
                  <div>
                    {item?.event === "overend" ? (
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          padding: "0.5rem 0.5rem",
                          backgroundColor: "#0E19AE",
                          color: "white",
                          borderRadius: "5px",
                          display: "flex",
                          gap: "2rem",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <span
                          style={{
                            borderRight: "1px solid white",
                            marginLeft: "0.5rem",
                            paddingRight: "0.5rem",
                          }}
                        >
                          {item?.over}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "0.8rem",
                            borderRight: "1px solid white",
                            flexDirection: "column",
                            fontSize: "15px",
                          }}
                        >
                          <span>Runs Scored : {item?.runs}</span>
                          <span>
                            {" "}
                            {item.bowls.map((bowler, i) => (
                              <p style={{ display: "flex", gap: "0.5rem" }} key={i}>
                                <span> M {bowler.maidens}</span>
                                <span> RC {bowler.runs_conceded}</span>
                                <span> W {bowler.wickets}</span>
                              </p>
                            ))}
                          </span>
                        </span>
                        <span></span>
                      </p>
                    ) : (
                      <p style={{ display: "flex", gap: "2.5rem" }}>
                        <span
                          style={{
                            color: "black",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.ball} {"."}
                          {item?.over}
                        </span>
                        <span>{item?.commentary}</span>
                      </p>
                    )}
                  </div>
                ))}
              <div onClick={handleViewMore}>
                <p>Load More Data..</p>
              </div>
            </div>
          </div>
          {/* <div className="w-[950px] mb-5 pb-5 shadow-2xl bg-white flex justify-center gap-3 mt-5 pt-5 ">
            <div className="border w-[250px] h-[400px]">
             
              <div style={{ display: "flex", justifyContent: "space-between",padding:"0.5rem",justifyContent:"center",gap:"1rem" }}>
                <p onClick={() => {initialInning === 1 ? setInitialInning(2) : setInitialInning(1)}} style={{ fontSize: "14px", fontWeight: "bold" ,padding:"0.2rem 0.5rem",backgroundColor:"blue",color:"white",borderRadius:"35px",border:"1px solid gray",cursor:"pointer"}}>Switch</p>
                <p style={{ fontSize: "14px", fontWeight: "bold",padding:"0.2rem 0.5rem ",backgroundColor:"white",color:"blue",borderRadius:"35px",border:"1px solid gray" }}>{commentaryData?.inning?.name}</p>
              </div>

              <div className="bg-[#767676] text-white flex justify-center pt-2 pb-2 mt-2">
                MATCH INFO
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-3">
                <span className="font-semibold"> Match </span> :{matchDetails?.title}{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Date </span> : {dateConvert12(matchDetails?.date_start)}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Toss </span> : {matchDetails?.toss?.text}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Time </span> : {timeConvert12(matchDetails?.date_start)} IST{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-t pl-2 flex gap-3">
                <span className="font-semibold">Venue</span>: {matchDetails?.venue?.name}, {matchDetails?.venue?.location},{matchDetails?.venue?.country},
              </div>
            </div>
            <div className="w-[650px] flex flex-col gap-5">
              {commentaryData?.commentaries
                ?.slice(0, itemsToShow)
                .map((item, index) => (
                  <div>
                    {item?.event === "overend" ? (
                      <div
                        style={{
                          backgroundColor: "#ECEAEA",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #D0D0D1",
                            height: "20px",
                          }}
                        ></div>
                        <div className="d-flex align-items-center p-2">
                          <div>
                            <p>{item?.event?.over}</p>
                          </div>
                          <div
                            style={{
                              borderRight: "1px solid #D0D0D1",
                              paddingRight: "10px",
                            }}
                          >
                            <p style={{ paddingTop: "3px" }}>
                              Runs Scored: {item?.runs}
                            </p>
                            {item.bowls.map((bowler, i) => (
                              <p key={i}>
                                <span> M {bowler.maidens}</span>
                                <span> RC {bowler.runs_conceded}</span>
                                <span> W {bowler.wickets}</span>
                              </p>
                            ))}
                          </div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="commentryDataClass">
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            padding: "5px",
                            backgroundColor: "#55B2A8",
                            color: "white",
                          }}
                        >
                          <p style={{ fontSize: "20px", textAlign: "center" }}>
                            {item?.bat_run}
                          </p>
                        </div>
                        <div>
                          <p>{item?.commentary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {itemsToShow < commentaryData?.commentaries?.length && (
                <div
                  onClick={handleViewMore}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  View More
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Fullcommentary;

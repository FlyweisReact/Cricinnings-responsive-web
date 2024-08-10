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
  const [commantryInning, setCommantryInning] = useState(1);
  const [matchStatus, setMatchStatus] = useState("");
  const [commantryInning1Data, setCommantryInning1Data] = useState([]);
  const [commantryInning2Data, setCommantryInning2Data] = useState([]);

  const getAllCommentary = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/${commantryInning}/commentary`
      );
      // 
      setCommantryInning(res?.data?.inning?.number);
      setMatchStatus(res?.data?.match?.status);
      const reverseData = res?.data?.commentaries?.reverse();
      setCommentaryData({ ...res?.data, commentaries: reverseData });
    } catch (error) {

    }
  };

  const getCommantryInning1 = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/1/commentary`
      );
      const reverseData = res?.data?.commentaries?.reverse();
      setCommantryInning1Data({ ...res?.data, commentaries: reverseData });
    } catch (error) {
      console.log(error);
    }
  };

  const getCommantryInning2 = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/2/commentary`
      );
      const reverseData = res?.data?.commentaries?.reverse();
      setCommantryInning2Data({ ...res?.data, commentaries: reverseData });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCommantryInning1();
    getCommantryInning2();
  }, []);


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
      <div className="bg-[white] pt-3">
        <Commentarynavbar matchDetails={matchDetails} />
        <div>

          <div>
            <div>

            </div>
            {matchStatus !== 2 ? commantryInning === 1 ? (
              <div >
                {commantryInning1Data?.commentaries
                  ?.slice(0, itemsToShow)
                  .map((item, index) => (
                    <div key={index}>
                      {item?.event === "overend" ? (
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "1rem",
                            backgroundColor: "#E1E0E1",
                            color: "700",

                          }}
                        >

                          <p>Overs {item?.over}{" "}Runs {item?.runs}</p>
                          <p>{item?.commentary}</p>
                        </p>


                      ) : (
                        <p style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                          <span
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              padding: "1rem",
                            }}
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span>{item?.commentary}</span>
                        </p>
                      )}
                      {item?.six || item?.four && (
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            width: "30px", height: "30px",

                            backgroundColor: "#D15CEF",
                            color: "white",
                            borderRadius: "50%",
                            textAlign: "center",
                            display: "grid", placeItems: "center",
                            marginLeft: "1rem"

                          }}
                        >
                          <span>

                            {item?.six ? "6" : item?.four ? "4" : ""}
                          </span>
                        </p>
                      )}

                    </div>
                  ))}
                <div onClick={handleViewMore}>
                  <p>Load More Data..</p>
                </div>
              </div>) :
              <div style={{borderTop: "1px solid #000"}} >
                {commantryInning2Data?.commentaries
                  ?.slice(0, itemsToShow)
                  .map((item, index) => (
                    <div key={index}>
                      {item?.event === "overend" ? (
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "1rem",
                            backgroundColor: "#E1E0E1",
                            color: "700",

                          }}
                        >

                          <p>Overs {item?.over}{" "}Runs {item?.runs}</p>
                          <p>{item?.commentary}</p>
                        </p>


                      ) : (
                        <p style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                          <span
                            style={{
                              color: "black",
                              fontSize: "18px",
                              fontWeight: "bold",
                              padding: "1rem",
                            }}
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span>{item?.commentary}</span>
                        </p>
                      )}
                      {item?.six || item?.four && (
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            width: "30px", height: "30px",

                            backgroundColor: "#D15CEF",
                            color: "white",
                            borderRadius: "50%",
                            textAlign: "center",
                            display: "grid", placeItems: "center",
                            marginLeft: "1rem"

                          }}
                        >
                          <span>

                            {item?.six ? "6" : item?.four ? "4" : ""}
                          </span>
                        </p>
                      )}

                    </div>
                  ))}
                <div onClick={handleViewMore}>
                  <p>Load More Data..</p>
                </div>
              </div>
              :
              <>
                <div >
                  {commantryInning1Data?.commentaries
                    ?.slice(0, itemsToShow)
                    .map((item, index) => (
                      <div key={index}>
                        {item?.event === "overend" ? (
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              padding: "1rem",
                              backgroundColor: "#E1E0E1",
                              color: "700",

                            }}
                          >

                            <p>Overs {item?.over}{" "}Runs {item?.runs}</p>
                            <p>{item?.commentary}</p>
                          </p>


                        ) : (
                          <p style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                            <span
                              style={{
                                color: "black",
                                fontSize: "18px",
                                fontWeight: "bold",
                                padding: "1rem",
                              }}
                            >
                              {item?.over}
                              {"."}
                              {item?.ball}
                            </span>
                            <span>{item?.commentary}</span>
                          </p>
                        )}
                        {item?.six || item?.four && (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              width: "30px", height: "30px",

                              backgroundColor: "#D15CEF",
                              color: "white",
                              borderRadius: "50%",
                              textAlign: "center",
                              display: "grid", placeItems: "center",
                              marginLeft: "1rem"

                            }}
                          >
                            <span>

                              {item?.six ? "6" : item?.four ? "4" : ""}
                            </span>
                          </p>
                        )}

                      </div>
                    ))}
                  <div onClick={handleViewMore}>
                    <p>Load More Data..</p>
                  </div>
                </div>
                <div style={{borderTop: "1px solid #000"}} >
                  {commantryInning2Data?.commentaries
                    ?.slice(0, itemsToShow)
                    .map((item, index) => (
                      <div key={index}>
                        {item?.event === "overend" ? (
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              padding: "1rem",
                              backgroundColor: "#E1E0E1",
                              color: "700",

                            }}
                          >

                            <p>Overs {item?.over}{" "}Runs {item?.runs}</p>
                            <p>{item?.commentary}</p>
                          </p>


                        ) : (
                          <p style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                            <span
                              style={{
                                color: "black",
                                fontSize: "18px",
                                fontWeight: "bold",
                                padding: "1rem",
                              }}
                            >
                              {item?.over}
                              {"."}
                              {item?.ball}
                            </span>
                            <span>{item?.commentary}</span>
                          </p>
                        )}
                        {item?.six || item?.four && (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              width: "30px", height: "30px",

                              backgroundColor: "#D15CEF",
                              color: "white",
                              borderRadius: "50%",
                              textAlign: "center",
                              display: "grid", placeItems: "center",
                              marginLeft: "1rem"

                            }}
                          >
                            <span>

                              {item?.six ? "6" : item?.four ? "4" : ""}
                            </span>
                          </p>
                        )}

                      </div>
                    ))}
                  <div onClick={handleViewMore}>
                    <p>Load More Data..</p>
                  </div>
                </div>
              </>
            }
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

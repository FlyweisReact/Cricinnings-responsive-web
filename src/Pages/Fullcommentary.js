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
      console.log(res?.data);
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
        <div className="flex justify-center">
          {/* <div
            style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
          >
            <p>Comming Soon ...</p>
          </div> */}
          <div className="w-[950px] mb-5 pb-5 shadow-2xl bg-white flex justify-center gap-3 mt-5 pt-5 ">
            <div className="border w-[250px] h-[400px]">
              <div className="flex justify-center mt-5 gap-2">
                <div className="bg-[#0F19AF] text-white w-[80px] h-[30px] rounded-3xl flex justify-center items-center">
                  Preview
                </div>
                <div className="border w-[80px] h-[30px] rounded-3xl flex justify-center items-center">
                  Csk-Inn
                </div>
              </div>

              <div className="bg-[#767676] text-white flex justify-center pt-2 pb-2 mt-2">
                MATCH INFO
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-3">
                <span className="font-semibold"> Match </span> : CSK vs MI{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Date </span> : Mar 18, 2024{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Toss </span> : CSK (Batting){" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Time </span> : 7:30 PM IST{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-t pl-2 flex gap-3">
                <span className="font-semibold">Venue</span>: wankhade stadium ,
                Mumbai, Maharashtra.
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fullcommentary;

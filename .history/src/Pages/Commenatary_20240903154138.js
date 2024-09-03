/** @format */

import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import {
  baseUrl,
  highlightKeywords,
} from "../Components/Integration/ApiIntegration";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const Commenatary = () => {
  const [matchDetails, setMatchDetails] = useState({});
  const { matchId } = useParams();
  const [commentaryData, setCommentaryData] = useState({});
  const [itemsToShow, setItemsToShow] = useState(7);
  const [initialInning, setInitialInning] = useState(1);
  const [commantryInning, setCommantryInning] = useState(1);
  const [commantryInning1Data, setCommantryInning1Data] = useState([]);
  const [commantryInning2Data, setCommantryInning2Data] = useState([]);



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
        `${baseUrl}user/matches/${matchId}/innings/${commantryInning}/commentary`
      );
      //
      setCommantryInning(res?.data?.inning?.number);
      const reverseData = res?.data?.commentaries?.reverse();
      setCommentaryData({ ...res?.data, commentaries: reverseData });
    } catch (error) {}
  };

  const getCommantryInning1 = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/1/commentary`
      );
      const reverseData = res?.data?.commentaries?.reverse();
      setCommantryInning1Data({ ...res?.data, commentaries: reverseData });
    } catch (error) {}
  };

  const getCommantryInning2 = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}user/matches/${matchId}/innings/2/commentary`
      );
      const reverseData = res?.data?.commentaries?.reverse();
      setCommantryInning2Data({ ...res?.data, commentaries: reverseData });
    } catch (error) {}
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
  useEffect(() => {
    if (matchDetails?.status === 3) {
      const intervalId = setInterval(() => {
        getMatchDetails();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [matchDetails]);
  const [initialInning1, setInitialInning1] = useState(
    matchDetails?.live_inning_number || 1
  );

  return (
    <div className="">
      <div className="bg-[white] pt-3">
        <Commentarynavbar matchDetails={matchDetails} />

        <div>
          <div>
            <div>
              {matchDetails?.status === 1 ? (
                "Match is not Started Yet"
              ) : (
                <div>
                  {commantryInning2Data && (
                    <div className="flex gap-2 ml-3 mb-2">
                      <Button
                        onClick={() => {
                          setInitialInning1(1);
                        }}
                        className="bg-[#009688] text-[white]"
                      >
                        {commantryInning1Data?.inning?.name}
                      </Button>
                      <Button
                        onClick={() => setInitialInning1(2)}
                        className="bg-[#009688] text-[white]"
                      >
                        {commantryInning2Data?.inning?.name}
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <div></div>
            </div>
            {matchDetails?.status === 1 ? (
              ""
            ) : (
              <div>
                {initialInning1 === 1 ? (
                  <div>
                    <div>
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
                                <p className="small-text">
                                  Overs {item?.over} Runs {item?.runs}
                                </p>
                                <p className="small-text">{item?.commentary}</p>
                              </p>
                            ) : (
                              <p
                                style={{
                                  display: "flex",
                                  gap: "2.5rem",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    padding: "1rem",
                                  }}
                                  className="small-text"
                                >
                                  {item?.over}
                                  {"."}
                                  {item?.ball}
                                </span>
                                <span className="small-text">
                                  {highlightKeywords(item?.commentary)}
                                </span>
                              </p>
                            )}
                          </div>
                        ))}
                      {itemsToShow <
                        commantryInning1Data?.commentaries?.length && (
                        <div
                          className="pl-2 cursor-pointer"
                          onClick={handleViewMore}
                        >
                          <p>Load More Data..</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ borderTop: "1px solid #000" }}>
                      {commantryInning2Data?.commentaries
                        ?.slice(0, itemsToShow)
                        ?.map((item, index) => (
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
                                className="small-text"
                              >
                                <p>
                                  Overs {item?.over} Runs {item?.runs}
                                </p>
                                <p>{item?.commentary}</p>
                              </p>
                            ) : (
                              <p
                                style={{
                                  display: "flex",
                                  gap: "2.5rem",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    padding: "1rem",
                                  }}
                                  className='small-text'
                                >
                                  {item?.over}
                                  {"."}
                                  {item?.ball}
                                </span>
                                <span>
                                  {highlightKeywords(item?.commentary)}
                                </span>
                              </p>
                            )}
                         
                          </div>
                        ))}
                      {commantryInning2Data?.commentaries?.length >
                        itemsToShow && (
                        <div
                          className="pl-2 cursor-pointer"
                          onClick={handleViewMore}
                        >
                          <p>Load More Data..</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commenatary;

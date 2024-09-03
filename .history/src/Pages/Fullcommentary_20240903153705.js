/** @format */

import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import {
  baseUrl,
  highlightKeywords,
} from "../Components/Integration/ApiIntegration";
import { useParams } from "react-router-dom";
import axios from "axios";

const Fullcommentary = () => {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState({});
  const [commentaryData, setCommentaryData] = useState({});
  const [itemsToShow, setItemsToShow] = useState(7);
  const [commantryInning, setCommantryInning] = useState(1);
  const [matchStatus, setMatchStatus] = useState("");
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
      setCommantryInning(res?.data?.inning?.number);
      setMatchStatus(res?.data?.match?.status);
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
  }, []);

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

  return (
    <div className="">
      <div className="bg-[white] pt-3">
        <Commentarynavbar matchDetails={matchDetails} />
        {matchStatus !== 2 ? (
          matchDetails?.live_inning_number === 1 ? (
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
                          <p className="xs-small-text">
                            Overs {item?.over} Runs {item?.runs}
                          </p>
                          <p className="xs-small-text">{item?.commentary}</p>
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
                            className="xs-small-text"
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span className="xs-small-text">
                            {highlightKeywords(item?.commentary)}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}

                {itemsToShow < commantryInning1Data?.commentaries?.length && (
                  <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
                    <p>Load More Data..</p>
                  </div>
                )}
              </div>
              <div>
                {matchDetails?.status !== 1 && (
                  <h4 className="text-center">2nd Inning</h4>
                )}
              </div>
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
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span>{highlightKeywords(item?.commentary)}</span>
                        </p>
                      )}
                    </div>
                  ))}
                {commantryInning2Data?.commentaries?.length > itemsToShow && (
                  <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
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
                            className="xs-small-text"
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span>{highlightKeywords(item?.commentary)}</span>
                        </p>
                      )}
                    </div>
                  ))}
                {commantryInning2Data?.commentaries?.length > itemsToShow && (
                  <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
                    <p>Load More Data..</p>
                  </div>
                )}
              </div>
              <div>
                {matchDetails?.status !== 1 && (
                  <h4 className="text-center">1st Inning</h4>
                )}
              </div>
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
                          >
                            {item?.over}
                            {"."}
                            {item?.ball}
                          </span>
                          <span>{highlightKeywords(item?.commentary)}</span>
                        </p>
                      )}
                      {/* {item?.six ||
                          (item?.four && (
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                width: "30px",
                                height: "30px",

                                backgroundColor: "#D15CEF",
                                color: "white",
                                borderRadius: "50%",
                                textAlign: "center",
                                display: "grid",
                                placeItems: "center",
                                marginLeft: "1rem",
                              }}
                            >
                              <span>
                                {item?.six ? "6" : item?.four ? "4" : ""}
                              </span>
                            </p>
                          ))} */}
                    </div>
                  ))}
                {itemsToShow < commantryInning1Data?.commentaries?.length && (
                  <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
                    <p>Load More Data..</p>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <>
            <div>
              {commantryInning1Data?.commentaries
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
                      >
                        <p className="xs-small-text">
                          Overs {item?.over} Runs {item?.runs}
                        </p>
                        <p className="xs-small-text">{item?.commentary}</p>
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
                          className="xs-small-text"
                        >
                          {item?.over}
                          {"."}
                          {item?.ball}
                        </span>
                        <span className="xs-small-text">
                          {highlightKeywords(item?.commentary)}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              {commantryInning1Data?.commentaries?.length > itemsToShow && (
                <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
                  <p className="xs-small-text bold-font">Load More Data..</p>
                </div>
              )}
            </div>

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
                      >
                        <p className="xs-small-text">
                          Overs {item?.over} Runs {item?.runs}
                        </p>
                        <p className="xs-small-text">{item?.commentary}</p>
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
                          className='xs-small-text'
                        >
                          {item?.over}
                          {"."}
                          {item?.ball}
                        </span>
                        <span className="xs-small-text">{highlightKeywords(item?.commentary)}</span>
                      </p>
                    )}
                  
                  </div>
                ))}
              {commantryInning2Data?.commentaries?.length > itemsToShow && (
                <div className="pl-2 cursor-pointer" onClick={handleViewMore}>
                  <p className="xs-small-text bold-font">Load More Data..</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Fullcommentary;

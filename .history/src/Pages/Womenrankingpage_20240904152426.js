/** @format */

import men from "../Assets/Homepage/men.svg";
import { useEffect, useState } from "react";
import {
  GetData,
  baseUrl,
  formatTitle,
} from "../Components/Integration/ApiIntegration";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AdSideBanner, TableLayout } from "../Components/HelpingComponent";

const Womenrankingpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [odiBestman, setOdiBestman] = useState([]);
  const [t20Bestman, setT20Bestman] = useState([]);
  const [testBestman, setTestBestman] = useState([]);
  const [odiBolling, setOdiBolling] = useState([]);
  const [t20Bolling, setT20Bolling] = useState([]);
  const [testBolling, setTestBolling] = useState([]);
  const [odiAlr, setOdiAlr] = useState([]);
  const [t20Alr, setT20Alr] = useState([]);
  const [testAlr, setTestAlr] = useState([]);
  const [odis, setOdis] = useState([]);
  const [t20s, setT20s] = useState([]);
  const [test, setTest] = useState([]);
  const [mainCategory, setMainCategory] = useState("batting");
  const [currentCategory, setCurrentCategory] = useState("odi");
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");


  useEffect(() => {
    if (pathname === "/icc-rankings/women/batting") {
      setMainCategory("batting");
    } else if (pathname === "/icc-rankings/women/bowling") {
      setMainCategory("bowling");
    } else if (pathname === "/icc-rankings/women/all-rounder") {
      setMainCategory("all-rounder");
    } else if (pathname === "/icc-rankings/women/teams") {
      setMainCategory("teams");
    }
    getAllTeamRankingsData();
  }, [pathname]);

  const getAllHomePageBanners = async () => {
    try {
      const res2 = await axios.get(`${baseUrl}admin/getAllPosts`);
      setBanner1(
        res2?.data?.data?.filter((item) => item.title === "rankingPageBanner1")
          ?.image
      );
      setBanner2(
        res2?.data?.data?.filter((item) => item.title === "rankingPageBanner2")
          ?.image
      );
    } catch (error) {
      console.error("Error fetching homepage banners:", error);
    }
  };

  useEffect(() => {
    getAllHomePageBanners();
  }, []);

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
    setOdiBestman(res?.data?.rankingData?.women_ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.women_ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.women_ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.women_ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.women_ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.women_ranks?.bowlers?.tests);
    setOdiAlr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.odis || []
    );
    setT20Alr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.t20s || []
    );
    setTestAlr(
      res?.data?.rankingData?.women_ranks?.["all-rounders"]?.tests || []
    );
    setOdis(res?.data?.rankingData?.women_ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.women_ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.women_ranks?.teams?.tests);
  };

  useEffect(() => {
    getAllTeamRankingsData();
  }, []);

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const thead = [
    "Position",
    "Player" ,
    "Rating"
  ]

  


  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <div className="font-semibold">
          <h1 className="text-lg font-bold">
            ICC Cricket Rankings-Women's{" "}
            {mainCategory === "batting"
              ? "Batsmen"
              : mainCategory === "bowling"
              ? "Bowling"
              : mainCategory === "all-rounder"
              ? "All-rounders"
              : "Team"}{" "}
          </h1>
        </div>
        <div className="flex gap-5 mt-3">
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "batting" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/batting");
            }}
          >
            Batting
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "bowling" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/bowling");
            }}
          >
            Bowling
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration:
                mainCategory === "all-rounder" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/all-rounder");
            }}
          >
            All-rounders
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "teams" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/women/teams");
            }}
          >
            Teams
          </div>
        </div>
        <hr className="mt-2" />
        <div className="mt-2 flex gap-5">
          <div
            onClick={() => setCurrentCategory("odi")}
            style={{
              cursor: "pointer",
              color: currentCategory === "odi" ? "white" : "black",
              backgroundColor: currentCategory === "odi" ? "#0F19AF" : "white",
            }}
            className=" w-[80px] h-[40px] flex justify-center items-center rounded border"
          >
            ODI
          </div>
          <div
            onClick={() => setCurrentCategory("t20")}
            style={{
              cursor: "pointer",
              color: currentCategory === "t20" ? "white" : "black",
              backgroundColor: currentCategory === "t20" ? "#0F19AF" : "white",
            }}
            className="w-[80px] h-[40px] flex justify-center items-center rounded border"
          >
            T20
          </div>
        </div>
      </div>
      <div className="bg-white pb-5  ">
        <div className="flex justify-center pt-2 gap-5">
          <div className="w-[680px] full-width">
          <TableLayout
              thead={thead}
              // tbody={tbody}
              className={"ranking-table mt-5"}
            />
            {mainCategory === "batting" && (
              <>
                <div>
                  <Table style={{ textAlign: "center", marginTop: "40px" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "15px 0px 0px 0px",
                          }}
                        >
                          Position
                        </th>
                        <th
                          style={{ backgroundColor: "rgb(231,231,231)" }}
                        ></th>
                        <th style={{ backgroundColor: "rgb(231,231,231)" }}>
                          Player
                        </th>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "0px 15px 0px 0px",
                          }}
                        >
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategory === "test" &&
                        testBestman?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p>
                                <span></span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "odi" &&
                        odiBestman?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "t20" &&
                        t20Bestman?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
            {mainCategory === "bowling" && (
              <>
                <div>
                  <Table style={{ textAlign: "center", marginTop: "40px" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "15px 0px 0px 0px",
                          }}
                        >
                          Position
                        </th>
                        <th
                          style={{ backgroundColor: "rgb(231,231,231)" }}
                        ></th>
                        <th style={{ backgroundColor: "rgb(231,231,231)" }}>
                          Player
                        </th>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "0px 15px 0px 0px",
                          }}
                        >
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategory === "test" &&
                        testBolling?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "odi" &&
                        odiBolling?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "t20" &&
                        t20Bolling?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div
                    style={{ visibility: "hidden" }}
                    className="w-[680px] pb-5 mt-2 bg-white rounded-lg  shadow-lg "
                  >
                    <div className="h-[70px] bg-[#E7E7E7] flex justify-between items-center pl-5 pr-5">
                      <div className="font-semibold">Position</div>
                      <div className="font-semibold">Player</div>
                      <div className="font-semibold">Ranking</div>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {mainCategory === "all-rounder" && (
              <>
                <div>
                  <Table style={{ textAlign: "center", marginTop: "40px" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "15px 0px 0px 0px",
                          }}
                        >
                          Position
                        </th>
                        <th
                          style={{ backgroundColor: "rgb(231,231,231)" }}
                        ></th>
                        <th style={{ backgroundColor: "rgb(231,231,231)" }}>
                          Player
                        </th>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "0px 15px 0px 0px",
                          }}
                        >
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategory === "test" &&
                        testAlr?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "odi" &&
                        odiAlr?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "t20" &&
                        t20Alr?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                              // style={{
                              //   display: "flex",
                              //   gap: "30px",
                              //   alignItems: "center",
                              //   justifyContent: "left",
                              //   marginLeft: "10px",
                              // }}
                              >
                                {/* <span>
                                <img
                                  style={{ maxWidth: "100px" }}
                                  src={men}
                                  alt="playerImage"
                                />
                              </span> */}
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div
                    style={{ visibility: "hidden" }}
                    className="w-[680px] pb-5 mt-2 bg-white rounded-lg  shadow-lg "
                  >
                    <div className="h-[70px] bg-[#E7E7E7] flex justify-between items-center pl-5 pr-5">
                      <div className="font-semibold">Position</div>
                      <div className="font-semibold">Player</div>
                      <div className="font-semibold">Ranking</div>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {mainCategory === "teams" && (
              <>
                <div>
                  <Table style={{ textAlign: "center", marginTop: "40px" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "15px 0px 0px 0px",
                          }}
                        >
                          Position
                        </th>
                        <th
                          style={{ backgroundColor: "rgb(231,231,231)" }}
                        ></th>
                        <th style={{ backgroundColor: "rgb(231,231,231)" }}>
                          Team
                        </th>
                        <th
                          style={{
                            backgroundColor: "rgb(231,231,231)",
                            borderRadius: "0px 15px 0px 0px",
                          }}
                        >
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategory === "test" &&
                        test?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                                style={{
                                  display: "flex",
                                  gap: "30px",
                                  alignItems: "center",
                                  justifyContent: "left",
                                  marginLeft: "10px",
                                }}
                              >
                                <span>
                                  <img
                                    style={{ maxWidth: "100px" }}
                                    src={item?.logo_url}
                                    alt="playerImage"
                                  />
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "odi" &&
                        odis?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                                style={{
                                  display: "flex",
                                  gap: "30px",
                                  alignItems: "center",
                                  justifyContent: "left",
                                  marginLeft: "10px",
                                }}
                              >
                                <span>
                                  <img
                                    style={{ maxWidth: "100px" }}
                                    src={item?.logo_url}
                                    alt="playerImage"
                                  />
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                      {currentCategory === "t20" &&
                        t20s?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p>{index + 1}</p>
                            </td>{" "}
                            <td>
                              <p> - </p>
                            </td>
                            <td>
                              <p
                                style={{
                                  display: "flex",
                                  gap: "30px",
                                  alignItems: "center",
                                  justifyContent: "left",
                                  marginLeft: "10px",
                                }}
                              >
                                <span>
                                  <img
                                    style={{ maxWidth: "100px" }}
                                    src={item?.logo_url}
                                    alt="playerImage"
                                  />
                                </span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/profiles/${item?.pid}/${formatTitle(
                                        item?.player
                                      )}`
                                    )
                                  }
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {item.player}
                                  </span>
                                  <span style={{ fontWeight: "normal" }}>
                                    {item.team}
                                  </span>
                                </span>
                              </p>
                            </td>{" "}
                            <td>
                              <p>{item.rating}</p>
                            </td>{" "}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div
                    style={{ visibility: "hidden" }}
                    className="w-[680px] pb-5 mt-2 bg-white rounded-lg  shadow-lg "
                  >
                    <div className="h-[70px] bg-[#E7E7E7] flex justify-between items-center pl-5 pr-5">
                      <div className="font-semibold">Position</div>
                      <div className="font-semibold">Player</div>
                      <div className="font-semibold">Rating</div>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                      <div className="flex items-center justify-between ml-10 mr-10">
                        <div>1</div>
                        <div>-</div>
                        <div className="flex items-center gap-4">
                          <img src={men} alt="" className="w-[50px] h-[50px]" />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              Kane Williamson
                            </span>
                            <span className="text-[12px]">NEW ZEALAND</span>
                          </div>
                        </div>
                        <div>650</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-[250px] full-width small-padding">
            <AdSideBanner img={banner1?.image} />
            <AdSideBanner img={banner2?.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Womenrankingpage;

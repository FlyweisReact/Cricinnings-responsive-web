/** @format */

import men from "../Assets/Homepage/men.svg";
import { useEffect, useState } from "react";
import { baseUrl, formatTitle } from "../Components/Integration/ApiIntegration";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AdSideBanner, TableLayout } from "../Components/HelpingComponent";

const Manrankingpage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
  const [currentCategory, setCurrentCategory] = useState("test");
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();

  const getAllTeamRankingsData = async () => {
    const res = await axios.get(baseUrl + "user/getRankings");
    setOdiBestman(res?.data?.rankingData?.ranks?.batsmen?.odis);
    setT20Bestman(res?.data?.rankingData?.ranks?.batsmen?.t20s);
    setTestBestman(res?.data?.rankingData?.ranks?.batsmen?.tests);
    setOdiBolling(res?.data?.rankingData?.ranks?.bowlers?.odis);
    setT20Bolling(res?.data?.rankingData?.ranks?.bowlers?.t20s);
    setTestBolling(res?.data?.rankingData?.ranks?.bowlers?.tests);
    setOdiAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.odis || []);
    setT20Alr(res?.data?.rankingData?.ranks?.["all-rounders"]?.t20s || []);
    setTestAlr(res?.data?.rankingData?.ranks?.["all-rounders"]?.tests || []);
    setOdis(res?.data?.rankingData?.ranks?.teams?.odis);
    setT20s(res?.data?.rankingData?.ranks?.teams?.t20s);
    setTest(res?.data?.rankingData?.ranks?.teams?.tests);
  };

  useEffect(() => {
    if (pathname === "/icc-rankings/men/batting") {
      setMainCategory("batting");
    } else if (pathname === "/icc-rankings/men/bowling") {
      setMainCategory("bowling");
    } else if (pathname === "/icc-rankings/men/all-rounder") {
      setMainCategory("all-rounder");
    } else if (pathname === "/icc-rankings/men/teams") {
      setMainCategory("teams");
    }

    getAllTeamRankingsData();
  }, [pathname]);

  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.filter((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.filter((item) => item?.title === "scorePageBanner2"));
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const thead = ["Position", "Team", "Rating"];
  const testBatmanBody = testBestman?.map((item, index) => [
    <span className="xs-small-text"> #{index + 1} </span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        onClick={() =>
          navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
        }
        style={{ fontWeight: "bold" }}
        className="xs-small-text cursor-pointer"
      >
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span> {item?.rating} </span>,
  ]);

  const odiTableBody = odiBestman?.map((item, index) => [
    <span className="xs-small-text"> #{index + 1} </span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
    >
      <span style={{ fontWeight: "bold" }} className="xs-small-text">
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span className="xs-small-text"> {item.rating}</span>,
  ]);

  const t20TableBody = t20Bestman?.map((item, index) => [
    <span className="xs-small-text">{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
      className="cursor-pointer"
    >
      <span style={{ fontWeight: "bold" }} className="xs-small-text">
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span className="xs-small-text">{item.rating}</span>,
  ]);

  const testBoilingBody = testBolling?.map((item, index) => [
    <span className="xs-small-text">{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
      className="cursor-pointer"
    >
      <span style={{ fontWeight: "bold" }} className="xs-small-text">
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span className="xs-small-text">{item.rating}</span>,
  ]);

  const odiBollingBody = odiBolling?.map((item, index) => [
    <span className="xs-small-text">{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
      className="cursor-pointer"
    >
      <span style={{ fontWeight: "bold" }} className="xs-small-text">
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span className="xs-small-text">{item.rating}</span>,
  ]);

  const t20BollingBody = t20Bolling?.map((item, index) => [
    <span className="xs-small-text">{index + 1}</span>,
    <span
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(`/profiles/${item?.pid}/${formatTitle(item?.player)}`)
      }
      className="cursor-pointer"
    >
      <span style={{ fontWeight: "bold" }} className="xs-small-text">
        {item.player}
      </span>
      <span style={{ fontWeight: "normal" }} className="xs-small-text">
        {item.team}
      </span>
    </span>,
    <span className="xs-small-text">{item.rating}</span>,
  ]);

  const testAlrBody  =  testAlr?.map((item, index) => [])
  const odiAlrBody  =  odiAlr?.map((item, index) => [])
  const t20AlrBody  =  t20Alr?.map((item, index) => [])

  let tbody;

  if (mainCategory === "batting") {
    if (currentCategory === "test") {
      tbody = testBatmanBody;
    } else if (currentCategory === "odi") {
      tbody = odiTableBody;
    } else if (currentCategory === "t20") {
      tbody = t20TableBody;
    }
  } else if (mainCategory === "bowling") {
    if (currentCategory === "test") {
      tbody = testBoilingBody;
    } else if (currentCategory === "odi") {
      tbody = odiBollingBody;
    } else if (currentCategory === "t20") {
      tbody = t20BollingBody;
    }
  } else if (mainCategory === "all-rounder") {
    if (currentCategory === "test") {
      tbody = testAlrBody;
    } else if (currentCategory === "odi") {
      tbody = odiAlrBody;
    } else if (currentCategory === "t20") {
      tbody = t20BollingBody;
    }
  }

  return (
    <div className="">
      <Helmet>
        <title>{`ICC Player Ranking | Men's Ranking | Top ${
          mainCategory !== "Teams" ? "50" : ""
        } ${
          mainCategory === "batting"
            ? "Batsmen"
            : mainCategory === "bowling"
            ? "Bowler"
            : mainCategory === "all-rounder"
            ? "All-rounder"
            : "Teams"
        } | Cricinnings.com`}</title>
        <meta name="description" content={`Cricket News | Cricinnings.com`} />
      </Helmet>

      <div className="bg-[white] pl-2 pt-2">
        <div className="font-semibold">
          <h1 className="text-lg font-bold medium-text">
            ICC Cricket Rankings-Men’s{" "}
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
              navigate("/icc-rankings/men/batting");
            }}
            className="small-text"
          >
            Batting
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "bowling" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/men/bowling");
            }}
            className="small-text"
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
              navigate("/icc-rankings/men/all-rounder");
            }}
            className="small-text"
          >
            All-rounders
          </div>
          <div
            style={{
              cursor: "pointer",
              textDecoration: mainCategory === "teams" ? "underline" : "none",
            }}
            onClick={() => {
              navigate("/icc-rankings/men/teams");
            }}
            className="small-text"
          >
            Teams
          </div>
        </div>
        <hr className="mt-2" />
        <div className="mt-2 flex gap-5">
          <div
            onClick={() => setCurrentCategory("test")}
            style={{
              cursor: "pointer",
              color: currentCategory === "test" ? "white" : "black",
              backgroundColor: currentCategory === "test" ? "#0F19AF" : "white",
              border:
                currentCategory === "test"
                  ? "1px solid #dee2e6"
                  : "1px solid #dee2e6",
            }}
            className=" w-[80px] h-[40px] flex justify-center items-center rounded bg-[#0F19AF] small-text"
          >
            Test
          </div>
          <div
            onClick={() => setCurrentCategory("odi")}
            style={{
              cursor: "pointer",
              color: currentCategory === "odi" ? "white" : "black",
              backgroundColor: currentCategory === "odi" ? "#0F19AF" : "white",
            }}
            className="w-[80px] h-[40px] flex justify-center items-center rounded border small-text"
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
            className="w-[80px] h-[40px] flex justify-center items-center rounded border small-text"
          >
            T20
          </div>
        </div>
      </div>

      <div className="bg-white pb-5">
        <div className="flex justify-center pt-2 gap-5 column-flex">
          <div className="w-[680px] full-width">
            <TableLayout
              thead={thead}
              tbody={tbody}
              className={"ranking-table mt-5"}
            />
            {mainCategory === "batting" && (
              <Table
                style={{ textAlign: "center", marginTop: "40px" }}
                responsive
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "15px 0px 0px 0px",
                      }}
                      className="small-text"
                    >
                      Position
                    </th>
                    <th style={{ backgroundColor: "rgb(231,231,231)" }}></th>
                    <th
                      style={{ backgroundColor: "rgb(231,231,231)" }}
                      className="small-text"
                    >
                      Player
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "0px 15px 0px 0px",
                      }}
                      className="small-text"
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
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                onClick={() =>
                                  navigate(
                                    `/profiles/${item?.pid}/${formatTitle(
                                      item?.player
                                    )}`
                                  )
                                }
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "odi" &&
                    odiBestman?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> {item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "t20" &&
                    t20Bestman?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}

            {mainCategory === "bowling" && (
              <Table
                style={{ textAlign: "center", marginTop: "40px" }}
                responsive
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "15px 0px 0px 0px",
                      }}
                      className="small-text"
                    >
                      Position
                    </th>
                    <th style={{ backgroundColor: "rgb(231,231,231)" }}></th>
                    <th
                      style={{ backgroundColor: "rgb(231,231,231)" }}
                      className="small-text"
                    >
                      Player
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "0px 15px 0px 0px",
                      }}
                      className="small-text"
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
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "odi" &&
                    odiBolling?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "t20" &&
                    t20Bolling?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}

            {mainCategory === "all-rounder" && (
              <Table style={{ textAlign: "center", marginTop: "40px" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "15px 0px 0px 0px",
                      }}
                      className="small-text"
                    >
                      Position
                    </th>
                    <th style={{ backgroundColor: "rgb(231,231,231)" }}></th>
                    <th
                      style={{ backgroundColor: "rgb(231,231,231)" }}
                      className="small-text"
                    >
                      Player
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "0px 15px 0px 0px",
                      }}
                      className="small-text"
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
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "odi" &&
                    odiAlr?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "t20" &&
                    t20Alr?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
                        </td>
                        <td>
                          <p>
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}

            {mainCategory === "teams" && (
              <Table
                style={{ textAlign: "center", marginTop: "40px" }}
                responsive
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "15px 0px 0px 0px",
                      }}
                      className="small-text"
                    >
                      Position
                    </th>
                    <th style={{ backgroundColor: "rgb(231,231,231)" }}></th>
                    <th
                      style={{ backgroundColor: "rgb(231,231,231)" }}
                      className="small-text"
                    >
                      Team
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgb(231,231,231)",
                        borderRadius: "0px 15px 0px 0px",
                      }}
                      className="small-text"
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
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
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
                                src={item?.logo_url}
                                alt=""
                                className="test-team-country-img"
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "odi" &&
                    odis?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
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
                                src={item?.logo_url}
                                alt=""
                                className="test-team-country-img"
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                  {currentCategory === "t20" &&
                    t20s?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="xs-small-text">{index + 1}</p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text"> - </p>
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
                                src={item?.logo_url}
                                alt=""
                                className="test-team-country-img"
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
                              <span
                                style={{ fontWeight: "bold" }}
                                className="xs-small-text"
                              >
                                {item.player}
                              </span>
                              <span
                                style={{ fontWeight: "normal" }}
                                className="xs-small-text"
                              >
                                {item.team}
                              </span>
                            </span>
                          </p>
                        </td>{" "}
                        <td>
                          <p className="xs-small-text">{item.rating}</p>
                        </td>{" "}
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </div>

          <div className="w-[250px] full-width small-padding">
            <AdSideBanner img={banner1?.[0]?.image} />
            <AdSideBanner img={banner2?.[0]?.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manrankingpage;

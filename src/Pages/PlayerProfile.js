import { useEffect, useState } from "react";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
const PlayerProfile = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const [competitionId, setCompetitionId] = useState("");
  const [filterByData, setFilterByData] = useState("batting_most_runs");
  const { matchId } = useParams();
  const [competitionData, setCompetitionData] = useState([]);
  const [initialCondition, setInitialCondition] = useState("batting");
  const [playerData, setPlayerData] = useState({});
  const [playerData1, setPlayerData1] = useState({});
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      // console.log(banner);
    });
  };
  const params = useParams();
  const { playerId } = params;
  // console.log(playerId);
  const getPlayerDataById = async () => {
    axios.get(baseUrl + "user/getPlayerStats/" + playerId).then((res) => {
      setPlayerData(res?.data?.player);
      setPlayerData1(res?.data);
      // console.log(res?.data);
    });
  };

  useEffect(() => {
    getPlayerDataById();
  }, [playerId]);

  const getStatesData = async (payload) => {
    axios
      .get(baseUrl + `user/competitions/${payload}/stats/${filterByData}`)
      .then((res) => {
        // console.log(res?.data);
        setCompetitionData(res?.data);
      });
  };

  useEffect(() => {
    if (competitionId) {
      //   getStatesData(competitionId);
    }
  }, [filterByData]);

  useEffect(() => {
    // getAllBanner();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <div className="w-[950px] p-2">
          <div className="player-profile">
            {playerData?.thumb_url && (
              <div
                style={{
                  height: "200px",
                  width: "150px",
                  borderRadius: "10px",
                }}
              >
                <img
                  style={{ height: "100%", width: "100%" }}
                  strikec={playerData?.thumb_url}
                  alt=""
                />
              </div>
            )}
            <div className="mt-[120px]">
              <p className="player-name">{playerData?.title}</p>
              <p className="player-country">{playerData?.country}</p>
            </div>
          </div>
          <div className="d-flex gap-3">
            <div className="left-container">
              <p>Personal Information</p>
              <div>
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Born</span>
                  <span className="right-text">
                    {playerData?.birthdate
                      ?.split("T")?.[0]
                      ?.split("-")
                      ?.reverse()
                      ?.join("-")}
                  </span>
                </p>
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Birth Place</span>
                  <span className="right-text">{playerData?.birthplace}</span>
                </p>
                {/* <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Height</span>
                  <span className="right-text">{playerData?.dob}</span>
                </p> */}
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Role</span>
                  <span className="right-text">{playerData?.playing_role}</span>
                </p>
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Batting Style</span>
                  <span className="right-text">
                    {playerData?.batting_style}
                  </span>
                </p>
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Bowling Style</span>
                  <span className="right-text">
                    {playerData?.bowling_style}
                  </span>
                </p>
              </div>
            </div>
            <div className="right-container">
              <p className="lef-co-header1 mt-3">Batting Career Summary</p>
              <Table style={{ width: "600px",textAlign:"center"}}>
                <thead>
                  <tr>
                    <th className="lef-co-header"></th>
                    <th className="lef-co-header">M</th>
                    <th className="lef-co-header">Inn</th>
                    <th className="lef-co-header">NO</th>
                    <th className="lef-co-header">Runs</th>
                    <th className="lef-co-header">HS</th>
                    <th className="lef-co-header">Avg</th>
                    <th className="lef-co-header">BF</th>
                    <th className="lef-co-header">strike</th>
                    <th className="lef-co-header">100</th>
                    <th className="lef-co-header">50</th>
                    <th className="lef-co-header">4s</th>
                    <th className="lef-co-header">6s</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="lef-co-header1">Test</td>
                    <td>{playerData1?.batting?.test?.matches}</td>
                    <td>{playerData1?.batting?.test?.innings}</td>
                    <td>{playerData1?.batting?.test?.notout}</td>
                    <td>{playerData1?.batting?.test?.runs}</td>
                    <td>{playerData1?.batting?.test?.highest}</td>
                    <td>{playerData1?.batting?.test?.average}</td>
                    <td>{playerData1?.batting?.test?.balls}</td>
                    <td>{playerData1?.batting?.test?.strike}</td>
                    <td>{playerData1?.batting?.test?.run100}</td>
                    <td>{playerData1?.batting?.test?.run50}</td>
                    <td>{playerData1?.batting?.test?.run4}</td>
                    <td>{playerData1?.batting?.test?.run6}</td>
                  </tr>
                  <tr>
                    <td className="lef-co-header1">T20</td>
                    <td>{playerData1?.batting?.t20?.matches}</td>
                    <td>{playerData1?.batting?.t20?.innings}</td>
                    <td>{playerData1?.batting?.t20?.notout}</td>
                    <td>{playerData1?.batting?.t20?.runs}</td>
                    <td>{playerData1?.batting?.t20?.highest}</td>
                    <td>{playerData1?.batting?.t20?.average}</td>
                    <td>{playerData1?.batting?.t20?.balls}</td>
                    <td>{playerData1?.batting?.t20?.strike}</td>
                    <td>{playerData1?.batting?.t20?.run100}</td>

                    <td>{playerData1?.batting?.t20?.run50}</td>
                    <td>{playerData1?.batting?.t20?.run4}</td>
                    <td>{playerData1?.batting?.t20?.run6}</td>
                  </tr>
                  <tr>
                    <td className="lef-co-header1">ODI</td>
                    <td>{playerData1?.batting?.odi?.matches}</td>
                    <td>{playerData1?.batting?.odi?.innings}</td>
                    <td>{playerData1?.batting?.odi?.notout}</td>
                    <td>{playerData1?.batting?.odi?.runs}</td>
                    <td>{playerData1?.batting?.odi?.highest}</td>
                    <td>{playerData1?.batting?.odi?.average}</td>
                    <td>{playerData1?.batting?.odi?.balls}</td>
                    <td>{playerData1?.batting?.odi?.strike}</td>
                    <td>{playerData1?.batting?.odi?.run100}</td>
                    <td>{playerData1?.batting?.odi?.run50}</td>
                    <td>{playerData1?.batting?.odi?.run4}</td>
                    <td>{playerData1?.batting?.odi?.run6}</td>
                  </tr>
                </tbody>
              </Table>
              <p className="lef-co-header1 mt-5">Bowling Career Summary</p>
              <Table style={{ width: "600px",textAlign:"center" }}>
                <thead>
                  <tr>
                    <th className="lef-co-header"></th>
                    <th className="lef-co-header">M</th>
                    <th className="lef-co-header">Inn</th>
                    <th className="lef-co-header">NO</th>
                    <th className="lef-co-header">Runs</th>

                    <th className="lef-co-header">Wkts</th>
                    <th className="lef-co-header">Econ</th>
                    <th className="lef-co-header">Avg</th>
                    <th className="lef-co-header">strike</th>
                    <th className="lef-co-header">5W</th>
                    <th className="lef-co-header">10W</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="lef-co-header1">Test</td>

                    <td>{playerData1?.bowling?.test?.matches || 0}</td>
                    <td>{playerData1?.bowling?.test?.innings || 0}</td>
                    <td>{playerData1?.bowling?.test?.balls || 0 }</td>
                    <td>{playerData1?.bowling?.test?.runs || 0}</td>
                    <td>{playerData1?.bowling?.test?.wickets || 0}</td>
                    <td>{playerData1?.bowling?.test?.econ || 0}</td>
                    <td>{playerData1?.bowling?.test?.average || 0}</td>
                    <td>{playerData1?.bowling?.test?.strike}</td>
                    <td>{playerData1?.bowling?.test?.wicket5i}</td>
                    <td>{playerData1?.bowling?.test?.wicket10m}</td>
                  </tr>
                  <tr>
                    <td className="lef-co-header1">ODI</td>
                    <td>{playerData1?.bowling?.odi?.matches}</td>
                    <td>{playerData1?.bowling?.odi?.innings}</td>
                    <td>{playerData1?.bowling?.odi?.balls || 0 }</td>
                    <td>{playerData1?.bowling?.odi?.runs}</td>
                    <td>{playerData1?.bowling?.odi?.wickets}</td>
                    <td>{playerData1?.bowling?.odi?.econ}</td>
                    <td>{playerData1?.bowling?.odi?.average}</td>
                    <td>{playerData1?.bowling?.odi?.strike}</td>
                    <td>{playerData1?.bowling?.odi?.wicket5i}</td>
                    <td>{playerData1?.bowling?.odi?.wicket10m}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="lef-co-header1">T20</td>
                    <td>{playerData1?.bowling?.t20?.matches}</td>
                    <td>{playerData1?.bowling?.t20?.innings}</td>
                    <td>{playerData1?.bowling?.t20?.balls || 0 }</td>
                    <td>{playerData1?.bowling?.t20?.runs}</td>
                    <td>{playerData1?.bowling?.t20?.wickets}</td>
                    <td>{playerData1?.bowling?.t20?.econ}</td>
                    <td>{playerData1?.bowling?.t20?.average}</td>
                    <td>{playerData1?.bowling?.t20?.strike}</td>
                    <td>{playerData1?.bowling?.t20?.wicket5i}</td>
                    <td>{playerData1?.bowling?.t20?.wicket10m}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";

import videoframe from "../Assets/Homepage/videoframe.svg";
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
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      console.log(banner);
    });
  };
  const params = useParams();
  const { playerId } = params;
  console.log(playerId);
  const getPlayerDataById = async () => {
    axios.get(baseUrl + "user/getPlayerStats/" + playerId).then((res) => {
      console.log(res?.data);
      setPlayerData(res?.data?.player);
    });
  };

  useEffect(() => {
    getPlayerDataById();
  }, [playerId]);

  const getStatesData = async (payload) => {
    axios
      .get(baseUrl + `user/competitions/${payload}/stats/${filterByData}`)
      .then((res) => {
        console.log(res?.data);
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
          {playerData?.thumb_url &&  <div
              style={{ height: "200px", width: "150px", borderRadius: "10px" }}
            >
              <img
                style={{ height: "100%", width: "100%" }}
                src={playerData?.thumb_url }
                alt=""
              />
            </div>}
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
                  <span className="right-text">{playerData?.birthdate?.split("T")?.[0]?.split("-")?.reverse()?.join("-")}</span>
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
                  <span className="right-text">{playerData?.batting_style}</span>
                </p>
                <p className="d-flex gap-2 justify-between">
                  <span className="left-text">Bowling Style</span>
                  <span className="right-text">{playerData?.bowling_style}</span>
                </p>
               
              </div>
            </div>
            <div className="right-container">
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

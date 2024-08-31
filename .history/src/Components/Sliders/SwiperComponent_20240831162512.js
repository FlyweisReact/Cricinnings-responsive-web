/** @format */

import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  convertStringFormat,
  formatTitle,
} from "../Integration/ApiIntegration";

const RenderTestCard = ({ item }) => {
  const navigate = useNavigate();
  function dateUpdate(dateString) {
    const date = new Date(dateString);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${dayOfWeek}, ${day} ${month}, ${hours}:${minutes} ${ampm}`;

    return formattedDate;
  }
  return (
    <div className="top_slider_card">
      <div
        onClick={() => {
          if (item?.match_id) {
            const teamAShortName = item.teama?.short_name
              ?.toLowerCase()
              .split(" ")
              .join("-");
            const teamBShortName = item.teamb?.short_name
              ?.toLowerCase()
              .split(" ")
              .join("-");
            const matchNumber =
              item?.match_number || item?.subtitle?.split("Match")?.[1];
            console.log(item?.subtitle?.split("Match")?.[1]);
            const matchSuffix = convertStringFormat(
              item?.subtitle
            )?.toLowerCase();
            const competitionTitle = item?.competition?.title
              ?.toLowerCase()
              .split(" ")
              .join("-");
            const competitionSeason = item?.competition?.season?.toLowerCase();

            const url = `/live-cricket-scores/${item.match_id}/${teamAShortName}-vs-${teamBShortName}-${matchSuffix}-${competitionTitle}-${competitionSeason}`;

            navigate(url);
          }
        }}
        style={{ cursor: "pointer" }}
        className="top_slider_card_div1"
      >
        <div className="top_slider_card_div1_text">
          <p
            style={{
              width: "90%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span>{item?.subtitle} </span>
            <span>
              <Icon
                icon="radix-icons:dot-filled"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "gray" }}
              />
            </span>
            {item?.competition?.title}
          </p>
          <p>{item?.format_str?.slice(0, 5)}</p>
        </div>
        <div style={{ lineHeight: "0" }} className="top_slider_card_div2">
          <div className="top_slider_card_div2_text">
            <p>
              <img
                className="top_slider_card_div2_img"
                src={item?.teama?.logo_url}
                alt="logo"
              />
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className="text-sm">{item?.teama?.short_name}</span>
              <span>{item?.teama?.scores_full?.slice(0, 17)}</span>
            </p>
          </div>
          <div className="top_slider_card_div2_text">
            <p>
              <img
                className="top_slider_card_div2_img"
                src={item?.teamb?.logo_url}
                alt="logo"
              />
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span className="text-sm">{item?.teamb?.short_name}</span>
              <span>{item?.teamb?.scores_full?.slice(0, 17)}</span>
            </p>
          </div>
          <span>
            {item?.status === 1 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "rgb(163, 101, 1)",
                }}
              >
                {dateUpdate(item?.date_start)}
              </span>
            )}
            {item?.status === 2 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "rgb(24, 102, 219)",
                }}
              >
                {item?.result}
              </span>
            )}
            {item?.status === 3 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "rgb(24, 102, 219)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item?.live?.slice(0, 30) + "..."}
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="top_slider_card_div2_text11">
        <div></div>
        <div className="top_slider_card_div2_text11_text23">
          {item?.competition?.total_teams > 2 && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/cricket-series/${item?.competition?.cid}/${formatTitle(
                    item?.competition?.title
                  )}-${item?.competition?.season}/points-table`
                )
              }
            >
              Points Table
            </p>
          )}
          <p
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/cricket-series/${item?.competition?.cid}/${formatTitle(
                  item?.competition?.title
                )}-${item?.competition?.season}/matches`
              )
            }
          >
            Schedule
          </p>
        </div>
      </div>
    </div>
  );
};

export { RenderTestCard };

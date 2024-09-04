/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "./Integration/ApiIntegration";
import { formatTitle } from "./Integration/ApiIntegration";

const CurrentSeries = () => {
  const navigate = useNavigate();
  const [allSeries, setAllSeries] = useState([]);

  const getAllSeriesData = () => {
    GetDataWithToken({
      path: "competitions",
      status: "live",
    }).then((res) => {
      setAllSeries(res?.response?.items);
    });
  };

  useEffect(() => {
    getAllSeriesData();
  }, []);

  return (
    allSeries?.length > 0 && (
      <div className="current-series-container">
        <p className="heading">CURRENT SERIES</p>

        <ul className="main-container">
          {allSeries?.map((item, index) => {
            if (index >= 4) return null;
            return (
              <li
                key={item?._id}
                className="hover:underline hover:text-[#0F19AF] transition duration-300"
                onClick={() =>
                  navigate(
                    `/cricket-series/${item?.cid}/${formatTitle(item?.title)}-${
                      item?.season
                    }/matches`
                  )
                }
              >
                {item?.title}
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default CurrentSeries;

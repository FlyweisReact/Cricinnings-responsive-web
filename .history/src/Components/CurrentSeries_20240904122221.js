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
        
        <div className="main-container">
          {allSeries?.map((item, index) => {
            if (index >= 4) return null;
            return (
              <div
                key={item?._id}
                className="pt-1 pl-1 pb-0 rounded-md cursor-pointer hover:underline hover:text-[#0F19AF] transition duration-300 zero-padding"
                onClick={() =>
                  navigate(
                    `/cricket-series/${item?.cid}/${formatTitle(item?.title)}-${
                      item?.season
                    }/matches`
                  )
                }
              >
                <p className="text-left text-sm font-medium text-gray-800 xs-small-text zero-margin">
                  {item?.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col mt-4 gap-2 zero-margin">
          {allSeries?.map((item, index) => {
            if (index >= 4) return null;
            return (
              <div
                key={item?._id}
                className="pt-1 pl-1 pb-0 rounded-md cursor-pointer hover:underline hover:text-[#0F19AF] transition duration-300 zero-padding"
                onClick={() =>
                  navigate(
                    `/cricket-series/${item?.cid}/${formatTitle(item?.title)}-${
                      item?.season
                    }/matches`
                  )
                }
              >
                <p className="text-left text-sm font-medium text-gray-800 xs-small-text zero-margin">
                  {item?.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default CurrentSeries;

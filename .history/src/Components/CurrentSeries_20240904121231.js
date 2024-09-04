/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "./Integration/ApiIntegration";
import { formatTitle } from "./Integration/ApiIntegration";

const CurrentSeries = () => {
  const navigate = useNavigate()
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
      <div className="bg-white p-4 rounded-lg mb-4 box-shadow-container">
        <span className="text-black font-bold text-sm pl-2 small-text zero-padding">
          CURRENT SERIES
        </span>
        <div className="flex flex-col mt-4 gap-2">
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
                <p className="text-left text-sm font-medium text-gray-800 xs-small-text">
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

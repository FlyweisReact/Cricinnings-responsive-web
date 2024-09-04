/** @format */

import React, { useState, useEffect } from "react";

const CurrentSeries = () => {
  const [allSeries, setAllSeries] = useState([]);
  return (
    <div className="w-[250px]  mt-10 zero-margin full-width small-padding">
      {allSeries?.length > 0 && (
        <div className="bg-white p-4 rounded-lg mb-4 box-shadow-container">
          <span className="text-black font-bold text-sm pl-2 small-text">
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
                      `/cricket-series/${item?.cid}/${formatTitle(
                        item?.title
                      )}-${item?.season}/matches`
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
      )}
    </div>
  );
};

export default CurrentSeries;

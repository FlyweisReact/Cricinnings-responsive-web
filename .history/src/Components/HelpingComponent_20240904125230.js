/** @format */

import { useState } from "react";

export const AdSideBanner = ({ img }) => {
  return img && <img src={img} alt="" className="ad-side-banner" />;
};

export const SpecialBox = () => {
  const [specialBanner, setSpecialBanner] = useState([]);
  return (
    <div className="special-box-container">
      <p className="heading">SPECIALS</p>
      <div className="box-cont">
        {specialBanner?.map((item, index) => (
          <div className="box" key={index}>
            <img src={item?.image} alt="" />
            <p className="title">{item?.subtitle}</p>
            <p className="description">{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

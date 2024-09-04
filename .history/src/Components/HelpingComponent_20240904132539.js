/** @format */

import { useEffect, useState } from "react";
import { GetData } from "./Integration/ApiIntegration";
import { Table } from "react-bootstrap";

export const AdSideBanner = ({ img }) => {
  return img && <img src={img} alt="" className="ad-side-banner" />;
};

export const SpecialBox = () => {
  const [specialBanner, setSpecialBanner] = useState([]);

  const getAllSpecialBanners = () => {
    GetData("userAuth/getSpecials").then((res) => {
      setSpecialBanner(res?.data);
    });
  };

  useEffect(() => {
    getAllSpecialBanners();
  }, []);
  return (
    specialBanner?.length > 0 && (
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
    )
  );
};

export const TableLayout = ({ className, thead, tbody }) => {
  return (
    <Table className={className} responsive>
      <thead>
        <tr>
          {thead?.map((i, index) => (
            <th key={`thead${index}`}> {i} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbody?.map((rowData, rowIndex) => (
          <tr key={`row${rowIndex}`}>
            {rowData?.map((cellData, cellIndex) => (
              <td key={`cell${cellIndex}`}>{cellData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

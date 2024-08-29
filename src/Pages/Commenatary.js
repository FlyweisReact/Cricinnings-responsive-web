import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
const Commenatary = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const [data, setData] = useState([]);
  const [commentary, setCommentary] = useState([]);
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data;
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"));
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"));
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"));
      //
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          <img
            style={{ height: "96px", width: "100%" }}
            src={banner1?.image}
            alt=""
          />
        </div>
        {/* <div className="text-xl text-slate-500">Player Of The Match</div>
        <div className="text-xl">Suresh Raina</div> */}
      </div>
      <div className="bg-white pb-5  ">
        <div
          style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
        >
          <p>Comming Soon ...</p>
        </div>
      </div>
    </div>
  );
};

export default Commenatary;

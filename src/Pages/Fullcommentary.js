import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import { useParams } from "react-router-dom";
import axios from "axios";

const Fullcommentary = () => {
  const [matchDetails, setMatchDetails] = useState({});
  const { matchId } = useParams();

  const getMatchDetails = async () => {
    axios.get(baseUrl + "user/getMatchById/" + matchId).then((res) => {
      setMatchDetails(res?.data?.match);
    });
  };

  useEffect(() => {
    getMatchDetails();
  }, []);

  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
            <Commentarynavbar matchDetails={matchDetails} />
        <div className="flex justify-center">
          <div className="w-[950px] mb-5 pb-5 shadow-2xl bg-white flex justify-center gap-3 mt-5 pt-5 ">
            <div className="border w-[250px] h-[400px]">
              <div className="flex justify-center mt-5 gap-2">
                <div className="bg-[#0F19AF] text-white w-[80px] h-[30px] rounded-3xl flex justify-center items-center">
                  Preview
                </div>
                <div className="border w-[80px] h-[30px] rounded-3xl flex justify-center items-center">
                  Csk-Inn
                </div>
              </div>

              <div className="bg-[#767676] text-white flex justify-center pt-2 pb-2 mt-2">
                MATCH INFO
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-3">
                <span className="font-semibold"> Match </span> : CSK vs MI{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Date </span> : Mar 18, 2024{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Toss </span> : CSK (Batting){" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-y pl-2 flex gap-5">
                <span className="font-semibold"> Time </span> : 7:30 PM IST{" "}
              </div>
              <div className=" pt-2 pb-2 mt-2 border-t pl-2 flex gap-3">
                <span className="font-semibold">Venue</span>: wankhade stadium ,
                Mumbai, Maharashtra.
              </div>
            </div>
            <div className="w-[650px] flex flex-col gap-5">
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
              <div>
                <span className="font-semibold">Najmul Hossain Shanto: </span>
                <div>
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fullcommentary;

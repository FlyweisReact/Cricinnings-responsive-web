import { useEffect, useState } from "react";
import Commentarynavbar from "../Components/Commentarynavbar";
import { baseUrl } from "../Components/Integration/ApiIntegration";
import axios from "axios";
const Overs = () => {
  const [banner1, setBanner1] = useState();
  const [banner2, setBanner2] = useState();
  const [banner3, setBanner3] = useState();
  const getAllBanner = async () => {
    axios.get(baseUrl + "admin/getAllPosts").then((res) => {
      const banner = res?.data?.data
      setBanner1(banner?.find((item) => item?.title === "scorePageBanner1"))
      setBanner2(banner?.find((item) => item?.title === "scorePageBanner2"))
      setBanner3(banner?.find((item) => item?.title === "scorePageBanner3"))
      console.log(banner)
    })
  }

  useEffect(() => {
    getAllBanner()
  }, [])
  return (
    <div className="">
      <div className="bg-[white] pl-2 pt-2 pr-2">
        <Commentarynavbar />
        <div className="bg-[#B3B3B3] h-[96px] mt-2 text-white flex justify-center items-center">
          
          <img style={{ height: "96px" ,width:"100%"}} src={banner1?.image} alt="" />
        </div>        <div className="flex mt-2 justify-center pb-5">
        <div style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}>
                    <p>Comming Soon ...</p>
                  </div>
          {/* <div className="w-[950px] pb-5 bg-[white] flex justify-center gap-5 pt-5">
            <div className="left w-[700px]  shadow-2xl">
              <div className="flex gap-4 m-5">
                <div className="w-[150px] h-[40px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                  CSK Innings
                </div>
                <div className="w-[150px] h-[40px] bg-[#D3D3D3] text-white  flex justify-center items-center rounded">
                  MI Innings
                </div>
              </div>
              <div className="flex justify-center items-center flex-col gap-5">
                <div className=" h-[200px] w-[650px] shadow-xl flex  justify-start items-center">
                  <div className="flex flex-col gap-2 items-center border-r-2 pr-5 pl-5 h-[100px] ">
                    <span className="text-slate-400">19 Over</span>
                    <div className="w-[120px] h-[39px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                      12 Runs
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <span className="text-slate-400">
                      Mukesh Kumar To Ravindra Jadeja & MS Dhoni
                    </span>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          2
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] text-white rounded-full bg-[#FE9839] flex justify-center items-center">
                          4
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#0F19AF]  text-white flex justify-center items-center">
                          6
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]"> 19.1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" h-[200px] w-[650px] shadow-xl flex  justify-start items-center">
                  <div className="flex flex-col gap-2 items-center border-r-2 pr-5 pl-5 h-[100px] ">
                    <span className="text-slate-400">19 Over</span>
                    <div className="w-[120px] h-[39px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                      12 Runs
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <span className="text-slate-400">
                      Mukesh Kumar To Ravindra Jadeja & MS Dhoni
                    </span>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          2
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] text-white rounded-full bg-[#FE9839] flex justify-center items-center">
                          4
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#0F19AF]  text-white flex justify-center items-center">
                          6
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]"> 19.1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" h-[200px] w-[650px] shadow-xl flex  justify-start items-center">
                  <div className="flex flex-col gap-2 items-center border-r-2 pr-5 pl-5 h-[100px] ">
                    <span className="text-slate-400">19 Over</span>
                    <div className="w-[120px] h-[39px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                      12 Runs
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <span className="text-slate-400">
                      Mukesh Kumar To Ravindra Jadeja & MS Dhoni
                    </span>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          2
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] text-white rounded-full bg-[#FE9839] flex justify-center items-center">
                          4
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#0F19AF]  text-white flex justify-center items-center">
                          6
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]"> 19.1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" h-[200px] w-[650px] shadow-xl flex  justify-start items-center">
                  <div className="flex flex-col gap-2 items-center border-r-2 pr-5 pl-5 h-[100px] ">
                    <span className="text-slate-400">19 Over</span>
                    <div className="w-[120px] h-[39px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                      12 Runs
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <span className="text-slate-400">
                      Mukesh Kumar To Ravindra Jadeja & MS Dhoni
                    </span>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          2
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] text-white rounded-full bg-[#FE9839] flex justify-center items-center">
                          4
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#0F19AF]  text-white flex justify-center items-center">
                          6
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]"> 19.1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" h-[200px] w-[650px] shadow-xl flex  justify-start items-center">
                  <div className="flex flex-col gap-2 items-center border-r-2 pr-5 pl-5 h-[100px] ">
                    <span className="text-slate-400">19 Over</span>
                    <div className="w-[120px] h-[39px] bg-[#0F19AF] text-white  flex justify-center items-center rounded">
                      12 Runs
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pl-5">
                    <span className="text-slate-400">
                      Mukesh Kumar To Ravindra Jadeja & MS Dhoni
                    </span>
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          2
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] text-white rounded-full bg-[#FE9839] flex justify-center items-center">
                          4
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#0F19AF]  text-white flex justify-center items-center">
                          6
                        </div>
                        <span className="text-[#CFCFCF]">19.1</span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#D3D3D3] flex justify-center items-center">
                          0
                        </div>
                        <span className="text-[#CFCFCF]"> 19.1</span>
                      </div>
                    </div>
                  </div>
                </div>
           
              </div>
            </div>
            <div className="w-[250px] ">
              <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
                RESPONSIVE AD’s
              </div>
              <div className="bg-[white]  rounded-lg shadow-2xl mt-2">
                <div className="text-sm p-3 font-semibold">
                  FEATURE VIDEOS !!
                </div>
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <img src={videoframe} alt="" />
                <div className="flex justify-center pb-5">
                  <button className="w-[100px] h-[30px] text-[12px] rounded flex justify-center items-center bg-[#0F19AF] text-white">
                    More Videos
                  </button>
                </div>
              </div>

              <div className="bg-[white] rounded-lg mt-2 pb-5 border">
                <div className="p-1">
                  <span className="font-semibold text-sm ml-4">SPECIALS</span>
                  <img src={camp} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    Mumbai Indians Champions
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={ipl} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                  <img src={premier} alt="" />
                  <span className="font-semibold text-sm ml-4">
                    1st Match . IPL 2024
                  </span>
                  <p className="ml-4 mt-2 text-sm text-[#8B8C8D]">
                    Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                    vivamus tincidunt. Odio rhoncus pretium eu vivamus.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Overs;

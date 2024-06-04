import React from "react";
import cric from "../Assets/Homepage/cric.svg";
import banner from "../Assets/Homepage/banner.svg";
import winner from "../Assets/Homepage/winner.svg";
import camp from "../Assets/Homepage/campioins.svg";
import ipl from "../Assets/Homepage/ipl.svg";
import premier from "../Assets/Homepage/premier.svg";
import indianpremier from "../Assets/Homepage/indianpremier.svg";
import chennie from "../Assets/Homepage/chennia.svg";
import mumbai from "../Assets/Homepage/mumbai.svg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import editorpick from "../Assets/Homepage/editorpick.svg";

const Homepage = () => {
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <span>&#8594;</span>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: "10px", zIndex: 1 }}
        onClick={onClick}
      >
        <span>&#8592;</span>
      </div>
    );
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const editorsettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 bg-[#EEEEEE] pt-2 pb-2 justify-center ">
        <Slider {...settings} className="w-[1000px]">
          <Link to="/Commenatary">
            <div className="w-[300px] h-[170px] rounded-t-lg  bg-[white] ">
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <div className="text-[12px]">
                    1st Match . Indian Premier League 2024
                  </div>

                  <div className="w-[40px] bg-[black] text-[8px] text-white h-[20px] flex justify-center items-center rounded-3xl">
                    T20
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={chennie} alt="" />
                  <span>Chennai Super Kings</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mumbai} alt="" />
                  <span>Mumbai Indians</span>
                </div>
                <div className="text-[#FE9839]">Today . 7: 30</div>
              </div>
              <div className="bg-[#0F19AF] h-[35px] border-b rounded-b-lg">
                <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px]">
                  <span className="text-white underline">Points Table</span>

                  <span className="text-white underline">Schedule</span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/Commenatary">
            <div className="w-[300px] h-[170px]  rounded-t-lg  bg-[white]">
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <div className="text-[12px]">
                    18 Match . Indian Premier League 2024
                  </div>

                  <div className="w-[40px] bg-[red] text-[8px] text-white h-[20px] flex justify-center items-center rounded-3xl">
                    Test
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={chennie} alt="" />
                  <span>Chennai Super Kings</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mumbai} alt="" />
                  <span>Mumbai Indians</span>
                </div>
                <div className="text-[#FE9839]">Today . 7: 30</div>
              </div>
              <div className="bg-[#0F19AF] h-[35px]  border-b rounded-b-xl">
                <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px] ">
                  <span className="text-white underline">Points Table</span>

                  <span className="text-white underline">Schedule</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="bg-[#B3B3B3] w-[300px] h-[185px]  rounded-lg  text-white ">
            RESPONSIVE AD’s
          </div>
          <Link to="/Commenatary">
            <div className="w-[300px] h-[170px] rounded-t-lg  bg-[white] ">
              <div className="p-2 flex flex-col gap-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <div className="text-[12px]">
                    1st Match . Indian Premier League 2024
                  </div>

                  <div className="w-[40px] bg-[black] text-[8px] text-white h-[20px] flex justify-center items-center rounded-3xl">
                    T20
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={chennie} alt="" />
                  <span>Chennai Super Kings</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={mumbai} alt="" />
                  <span>Mumbai Indians</span>
                </div>
                <div className="text-[#FE9839]">Today . 7: 30</div>
              </div>
              <div className="bg-[#0F19AF] h-[35px] border-b rounded-b-lg">
                <div className="flex gap-2 justify-end items-center pt-2 mr-2 text-[12px]">
                  <span className="text-white underline">Points Table</span>

                  <span className="text-white underline">Schedule</span>
                </div>
              </div>
            </div>
          </Link>
        </Slider>
      </div>
      <div className="bg-[#B3B3B3] w-[1000px] h-[96px]  text-white flex justify-center items-center">
        RESPONSIVE AD’s
      </div>

      <div className="bg-[#EEEEEE] pb-5  ">
        <div className="flex justify-center pt-2 gap-5 main-div">
          <div>
            <div className="flex justify-between m-2">
              <div className="font-semibold">FEATURE POSTS</div>
              <div className="text-[#0F19AF] font-semibold">Sell All</div>
            </div>
            <div className="w-[650px]  bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#B3B3B3] mt-2 h-[96px]  text-white flex justify-center items-center">
              RESPONSIVE AD’s
            </div>
            <div className="w-[650px] mt-2">
              <img src={banner} alt="" />
            </div>
            <div className="text-sm mt-2 font-semibold">TOP STORIES</div>
            <div className="w-[650px]  mt-2 bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[270px] h-[100px] bg-[white] shadow flex justify-center p-2 items-center">
                <div className="flex gap-2">
                  <div>
                    <img src={cric} alt="" />
                  </div>

                  <div className="text-sm">
                    <div>
                      Stats - Heinrich Klaasen's big-hitting transformation
                    </div>

                    <span className="text-[#929394]">
                      1 hr ago Shiva Jayaraman
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[650px] mt-2 bg-white rounded-lg  shadow-lg flex justify-center flex-wrap gap-5 pt-5 pb-5">
              <div>
                <span className="text-sm ml-4">INDIA ( ICCI - 2024 )</span>
                <img src={winner} alt="" />
              </div>
              <div className="ml-4">
                <div className="text-xl font-semibold">
                  Cricket Web is a well-established cricket site that attracts a
                  global following.
                </div>
                <p className="text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis Lorem ipsum dolor sit amet
                  consectetur. Amet mus aliquam vivamus tincidunt. Odio rhoncus
                  pretium eu vivamus. Urna odio porta vel sed mi sagittis
                  fermentum odio. Volutpat velit metus rhoncus enim dolor orci
                  quis Lorem ipsum dolor sit amet consectetur. Amet mus aliquam
                  vivamus tincidunt. Odio rhoncus pretium eu vivamus. Urna odio
                  porta vel sed mi sagittis fermentum odio. Volutpat velit metus
                  rhoncus enim dolor orci quis Lorem ipsum dolor sit amet
                  consectetur. Amet mus aliquam vivamus tincidunt. Odio rhoncus
                  pretium eu vivamus. Urna
                </p>
              </div>
            </div>
            <div className="text-sm mt-2 font-semibold">Editors Pick</div>
            <div className="w-[650px] h-[300px]  mt-2 pt-4 bg-white rounded-lg  shadow-lg ">
              <Slider {...editorsettings}>
                <div className="w-[466px] h-[262px] p-4 border rounded-lg">
                  <img src={editorpick} alt="" />
                  <div className=" font-semibold">
                    Where does the Hundred go from here?
                  </div>
                  <div className="text-[#828383]">Ben Bloom</div>
                </div>
                <div className="w-[466px] h-[262px] p-4 border rounded-lg">
                  <img src={editorpick} alt="" />
                  <div className=" font-semibold">
                    Where does the Hundred go from here?
                  </div>
                  <div className="text-[#828383]">Ben Bloom</div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="w-[250px]  mt-10">
            <div className="bg-[white] h-[400px] rounded-lg">
              <span className="text-sm ml-5 font-semibold">CURRENT SERIES</span>
              <div className="flex flex-col mt-4 gap-3 items-center">
                <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                  Indian Premier L
                </div>
                <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                  Sri Lanka tour o Bangaladesh
                </div>
                <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                  Amritsar Premier League T20
                </div>
                <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                  Australia Women Tour to India
                </div>
                <div className="h-[50px] w-[220px] shadow text-sm flex justify-center items-center">
                  ICC Men’s T20 World Cup
                </div>
              </div>
            </div>

            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>

            <div className="bg-[white] h-[300px] rounded-lg mt-2">
              <div className="flex justify-between p-2">
                <div className="text-sm font-semibold">RANKING’s</div>
                <div>
                  <button className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                    Viewall
                  </button>
                </div>
              </div>
              <div className="flex justify-between ml-2 mr-2">
                <button className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0F19AF] text-[10px] text-white">
                  Test
                </button>
                <button className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                  ODI
                </button>
                <button className="w-[70px] rounded-3xl h-[25px] flex justify-center items-center bg-[#0D121A] text-[10px] text-white">
                  T201
                </button>
              </div>
              <div className="flex justify-between m-2">
                <div className="text-[#0F19AF] underline">Teams</div>
                <div>Batting</div>
                <div>Bowling</div>
                <div>ALR</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th className="w-[100px]">Rank</th>
                    <th className="w-[100px]">Team</th>
                    <th className="w-[100px]">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1.</td>
                    <td className="text-center">India</td>
                    <td className="text-center">122</td>
                  </tr>
                  <tr>
                    <td className="text-center">2.</td>
                    <td className="text-center">India</td>
                    <td className="text-center">122</td>
                  </tr>
                  <tr>
                    <td className="text-center">3.</td>
                    <td className="text-center">India</td>
                    <td className="text-center">122</td>
                  </tr>
                  <tr>
                    <td className="text-center">4.</td>
                    <td className="text-center">India</td>
                    <td className="text-center">122</td>
                  </tr>
                  <tr>
                    <td className="text-center">5.</td>
                    <td className="text-center">India</td>
                    <td className="text-center">122</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center text-[10px] mt-2">
                Latest Updated On 30 Mar 2024,13:30 IST
              </div>
            </div>
            <div className="bg-[#B3B3B3] text-white h-[550px]  flex justify-center items-center rounded-lg mt-2">
              RESPONSIVE AD’s
            </div>
            <div className="bg-[white] rounded-lg mt-2">
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
                <img src={indianpremier} alt="" />
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;

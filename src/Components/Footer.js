import React from "react";
import logo from "../Assets/logo.svg";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWordpress } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#4A4A4A] lg:w-full md:min-w-[500px] ">
      <div className="flex justify-around pt-20 ">
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <span className="text-white text-xl">Mobile Site & Apps</span>
          <ul className="mt-5 flex flex-col gap-3">
            <li className=" text-white">CricInnings.com</li>
            <li className=" text-white">Android</li>
            <li className=" text-white">IOS</li>
          </ul>
        </div>
        <div>
          <span className="text-white text-xl">Company</span>
          <ul className="mt-5 flex flex-col gap-3">
            <li className=" text-white">About</li>
            <li className=" text-white">Careers</li>
            <li className=" text-white">Privacy Policy</li>
            <li className=" text-white">Terms of use</li>
            <li className=" text-white">CricInnings</li>
          </ul>
        </div>
        <div>
          <span className="text-white text-xl">Contact Us</span>
          <ul className="mt-5 flex flex-col gap-3">
            <li className=" text-white">
              <span>Toll free:</span>
              <span>123-456-789</span>
            </li>
            <li className=" text-white">
              <span>Office:</span>
              <span>123-456-789</span>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-white text-xl">Social</span>
          <div className="flex gap-2 mt-5">
            <FaFacebookF style={{ color: "white" }} size={25} />
            <IoLogoInstagram style={{ color: "white" }} size={25} />
            <FaTwitter style={{ color: "white" }} size={25} />
            <FaYoutube style={{ color: "white" }} size={25} />
            <FaWordpress style={{ color: "white" }} size={25}/>
          </div>
        </div>
      </div>
      <hr className="mt-5"/>
      <div className="text-center text-sm text-white  p-5">
      © 2024  CricInnings | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;

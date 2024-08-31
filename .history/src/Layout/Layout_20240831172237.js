/** @format */

import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Layout = () => {
  return (
    <div className="root-div">
      <Nav />

      <div className="flex flex-col bg-white  w-[1000px] ">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

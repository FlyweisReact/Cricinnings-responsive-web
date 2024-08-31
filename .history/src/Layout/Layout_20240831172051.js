/** @format */

import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Layout = () => {
  return (
    <div className="">
      <div className="">
        <Nav />

        <div className="flex flex-col bg-white  w-[1000px]">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

/** @format */

import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Layout = () => {
  return (
    <div className="root-div">
      <Nav />

      <div className="main-div max-container">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

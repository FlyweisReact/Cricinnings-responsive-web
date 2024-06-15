import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const Layout = () => {
  return (
    <div className="">
      <div className="lg:flex lg:justify-center lg:flex-col lg:items-center lg:bg-slate-100 main-div">
        {/* <Navbar /> */}
        {/* <Nav /> */}
        <Nav />
        <div className="flex flex-col bg-white  w-[1000px]">
          <Outlet />
          <Footer />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

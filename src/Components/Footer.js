import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="Footer_Div">
      <div className="d-flex justify-between">
        <div className="footer_logo_div">
          <img className="footer_logo" src={"/logo.png"} alt="Logo" />
        </div>
        <div>
          <p>MOBILE SITE & APPS</p>
          <div className="d-flex flex-col gap-2">
            <p className="d-flex gap-2 items-center">
              <span>
                <Icon
                  icon="mdi:web"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8" }}
                />
              </span>
              <span onClick={() => navigate("/")}>Cricinnings.com</span>
            </p>
            <p className="d-flex gap-2 items-center">
              <span>
                <Icon
                  icon="mdi:android"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8" }}
                />
              </span>
              <span onClick={() => navigate("/")}>Android</span>
            </p>
            <p className="d-flex gap-2 items-center">
              <span>
                <Icon
                  icon="mdi:apple"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8" }}
                />
              </span>
              <span onClick={() => navigate("/")}>iOS</span>
            </p>
          </div>
        </div>
        <div>
          <p>COMPANY</p>
          <div className="d-flex flex-col gap-2">
            <p className="d-flex flex-col gap-2 text-left">
              <span onClick={() => navigate("/about")}>About</span>
              <span onClick={() => navigate("/about")}>Careers</span>
              <span onClick={() => navigate("/about")}>Privacy Policy</span>
              <span onClick={() => navigate("/about")}>Terms of use</span>
              <span onClick={() => navigate("/about")}>About</span>
            </p>
          </div>
        </div>
        <div>
          <p>FOLLOW US ON</p>
        </div>
      </div>
      <div className="footer_copyright">
        <div>
          <p className="text-center text-white">
            © 2024 CricInnings | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

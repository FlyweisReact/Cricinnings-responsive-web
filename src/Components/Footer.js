import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="Footer_Div">
      <div className="d-flex justify-between">
        <div className="footer_logo_div">
          <img onClick={() => navigate("/")} className="footer_logo" src={"/logo.png"} alt="Logo" />
        </div>
        <div>
          <p>MOBILE SITE & APPS</p>
          <div className="d-flex flex-col gap-2">
            <p className="d-flex gap-2 items-center">
              <span>
                <Icon
                  onClick={() => navigate("/")}
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
          <p>USEFUL LINKS</p>
          <div className="d-flex flex-col gap-2">
            <p className="d-flex flex-col gap-2 text-left">
              <span className="cursor-pointer" onClick={() => navigate("/about-us")}>About</span>
              <span className="cursor-pointer" onClick={() => navigate("/")}>Careers</span>
              <span className="cursor-pointer" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>
              <span className="cursor-pointer" onClick={() => navigate("/terms-conditions")}>Terms of use</span>
              {/* <span className="cursor-pointer" onClick={() => navigate("/about")}>About</span> */}
            </p>
          </div>
        </div>
        <div>
          <p>FOLLOW US ON</p>
          <p className="d-flex gap-2">
            <span>
              <Link to="https://www.facebook.com/CricInningsOfficial/">
                <Icon
                  onClick={() => navigate("/")}
                  icon="mdi:facebook"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8", cursor: "pointer" }}
                />
              </Link>
            </span>
            <span>
              <Link to="https://x.com/i/flow/login?redirect_after_login=%2Fcric_innings">
                <Icon
                  icon="mdi:twitter"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8", cursor: "pointer" }}
                />
              </Link>

            </span>
            <span>
              <Link to="https://www.instagram.com/cricinningsofficial/">
                <Icon
                  icon="mdi:instagram"
                  width="1.2rem"
                  height="1.2rem"
                  style={{ color: "#fcf8f8", cursor: "pointer" }}
                />
              </Link>
            </span>
            <span>
              <Link to="https://news.google.com/publications/CAAqBwgKMKzLvQswuebUAw?hl=en-IN&gl=IN&ceid=IN%3Aen">
                <Icon icon="simple-icons:googlenews" width="1.2rem" height="1.2rem" style={{ color: "#fcf8f8", cursor: "pointer" }} />
              </Link>
            </span>
            <span>
              <Link to="https://t.me/cricinnings">
                <Icon icon="mingcute:telegram-fill" width="1.2rem" height="1.2rem" style={{ color: "#fcf8f8", cursor: "pointer" }} />
              </Link>
            </span>
          </p>
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

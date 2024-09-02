/** @format */

import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="Footer_Div">
      <div className="main-container">
        <div className="footer_logo_div">
          <img
            onClick={() => navigate("/")}
            className="footer_logo"
            src={"/logo.png"}
            alt=""
          />
        </div>

        <div>
          <p className="small-text">MOBILE SITE & APPS</p>
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
              <span onClick={() => navigate("/")} className="xs-small-text">
                Cricinnings.com
              </span>
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
              <span onClick={() => navigate("/")} className="xs-small-text">
                Android
              </span>
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
              <span onClick={() => navigate("/")} className="xs-small-text">
                iOS
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="small-text">USEFUL LINKS</p>
          <div className="d-flex flex-col gap-2">
            <p className="d-flex flex-col gap-2 text-left">
              <span
                className="cursor-pointer xs-small-text"
                onClick={() => {
                  navigate("/about-us");
                  window.scrollTo(0, 0);
                }}
              >
                About
              </span>
              <span
                className="cursor-pointer xs-small-text"
                onClick={() => {
                  navigate("/disclaimer");
                  window.scrollTo(0, 0);
                }}
              >
                Disclaimer
              </span>
              <span
                className="cursor-pointer xs-small-text"
                onClick={() => {
                  navigate("/privacy-policy xs-small-text");
                  window.scrollTo(0, 0);
                }}
              >
                Privacy Policy
              </span>
              <span
                className="cursor-pointer xs-small-text"
                onClick={() => {
                  navigate("/terms-conditions");
                  window.scrollTo(0, 0);
                }}
              >
                Terms of use
              </span>
              <span
                className="cursor-pointer xs-small-text"
                onClick={() => {
                  navigate("/contact-us");
                  window.scrollTo(0, 0);
                }}
              >
                Contact Us
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="small-text">FOLLOW US ON</p>
          <div className="d-flex gap-2">
            <Link to="https://www.facebook.com/CricInningsOfficial/">
              <Icon
                onClick={() => navigate("/")}
                icon="mdi:facebook"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "#fcf8f8", cursor: "pointer" }}
              />
            </Link>

            <Link to="https://x.com/i/flow/login?redirect_after_login=%2Fcric_innings">
              <Icon
                icon="mdi:twitter"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "#fcf8f8", cursor: "pointer" }}
              />
            </Link>

            <Link to="https://www.instagram.com/cricinningsofficial/">
              <Icon
                icon="mdi:instagram"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "#fcf8f8", cursor: "pointer" }}
              />
            </Link>

            <Link to="https://news.google.com/publications/CAAqBwgKMKzLvQswuebUAw?hl=en-IN&gl=IN&ceid=IN%3Aen">
              <Icon
                icon="simple-icons:googlenews"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "#fcf8f8", cursor: "pointer" }}
              />
            </Link>

            <Link to="https://t.me/cricinnings">
              <Icon
                icon="mingcute:telegram-fill"
                width="1.2rem"
                height="1.2rem"
                style={{ color: "#fcf8f8", cursor: "pointer" }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer_copyright">
        <div>
          <p className="text-center text-white xs-small-text">
            © 2024 CricInnings | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

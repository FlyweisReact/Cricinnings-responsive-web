/** @format */

import ReactDOM from "react-dom/client";
import App from "./App";
import { ReactNotifications } from "react-notifications-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-notifications-component/dist/theme.css";
import "react-quill/dist/quill.snow.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ReactNotifications />
    <App />
  </>
);


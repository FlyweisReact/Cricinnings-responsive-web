import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ReactNotifications />
    <App />
  </>
);

reportWebVitals();

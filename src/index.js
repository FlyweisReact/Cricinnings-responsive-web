import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNotifications } from "react-notifications-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-notifications-component/dist/theme.css";
import 'react-quill/dist/quill.snow.css';
import { hydrate, render } from "react-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ReactNotifications />
    <App />
  </>
);
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
reportWebVitals();

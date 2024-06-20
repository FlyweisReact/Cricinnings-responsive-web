import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage";
import Commenatary from "./Pages/Commenatary";
import Scorecard from "./Pages/Scorecard";
import Squads from "./Pages/Squads";
import Highlights from "./Pages/Highlights";
import Fullcommentary from "./Pages/Fullcommentary";
import Overs from "./Pages/Overs";
import Pointtable from "./Pages/Pointtable";
import Matchinfo from "./Pages/Matchinfo";
import News from "./Pages/News";
import Stats from "./Pages/Stats";
import Cricketnews from "./Pages/Cricketnews";
import Cricspecial from "./Pages/Cricspecial";
import Pitchreport from "./Pages/Pitchreport";
import Fantasytips from "./Pages/Fantasytips";
import Livescrore from "./Pages/Livescrore";
import Iccseriesschedule from "./Pages/Iccseriesschedule";
import Manrankingpage from "./Pages/Manrankingpage";
import Womenrankingpage from "./Pages/Womenrankingpage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TermsPage from "./Pages/TermsPage";
import "react-quill/dist/quill.snow.css";
import PrivacyPage from "./Pages/PrivacyPage";
import LivescroreById from "./Pages/LiveScoresById";
import FeacturePosts from "./Pages/FeacturePosts";
import AboutPage from "./Pages/AboutPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/match/:matchId/:commentary",
        element: <Commenatary />,
      },
      {
        path: "/Scorecard",
        element: <Scorecard />,
      },
      {
        path: "/Scorecard/:matchId",
        element: <Scorecard />,
      },

      {
        path: "/Squads",
        element: <Squads />,
      },
      {
        path: "/Squads/:matchId",
        element: <Squads />,
      },
      {
        path: "/Highlights/:matchId",
        element: <Highlights />,
      },
      {
        path: "/Highlights",
        element: <Highlights />,
      },

      // {
      //   path: "/Fullcommentary",
      //   element: <Fullcommentary />,
      // },
      {
        path: "/match/:matchId",
        element: <Fullcommentary />,
      },
      {
        path: "/Overs",
        element: <Overs />,
      },
      {
        path: "/Overs/:matchId",
        element: <Overs />,
      },
      {
        path: "/Pointtable/:matchId",
        element: <Pointtable />,
      },
      {
        path: "/Pointtable",
        element: <Pointtable />,
      },
      {
        path: "/Matchinfo",
        element: <Matchinfo />,
      },
      {
        path: "/Matchinfo/:matchId",
        element: <Matchinfo />,
      },
      {
        path: "/News/:matchId",
        element: <News />,
      },
      {
        path: "/News",
        element: <News />,
      },
      {
        path: "/Stats/:matchId",
        element: <Stats />,
      },
      {
        path: "/Stats",
        element: <Stats />,
      },
      {
        path: "/Cricketnews",
        element: <Cricketnews />,
      },
      {
        path: "/Cricspecial",
        element: <Cricspecial />,
      },
      {
        path: "/Pitchreport",
        element: <Pitchreport />,
      },
      {
        path: "/Fantasytips",
        element: <Fantasytips />,
      },
      {
        path: "/Livescrore",
        element: <Livescrore />,
      },
      {
        path: "/Livescrore/:category",
        element: <Livescrore />,
      },
      {
        path: "/Iccseriesschedule",
        element: <Iccseriesschedule />,
      },
      {
        path: "/Manrankingpage",
        element: <Manrankingpage />,
      },
      {
        path: "/Womenrankingpage",
        element: <Womenrankingpage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/livescore/:id",
        element: <LivescroreById />,
      },
      {
        path: "/feature_posts",
        element: <FeacturePosts />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

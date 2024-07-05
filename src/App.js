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
import PlayerProfile from "./Pages/PlayerProfile";
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
        path: "/live-cricket-scores/matchName:/scorecard/:matchId" || "/Scorecard/:matchId",
        element: <Scorecard />,
      },

      {
        path: "/Squads",
        element: <Squads />,
      },
      {
        path: "/cricket-players/:playerName/:playerId",
        element: <PlayerProfile />,
      },
      {
        path: "/live-cricket-scores/matchName:/squad/:matchId",
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
        path: "/live-cricket-scores/:matchName/full_commentry/:matchId",
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
        path: "/cricket-news",
        element: <Cricketnews />,
      },
      {
        path: "/cric-special",
        element: <Cricspecial />,
      },
      {
        path: "/pitch-report",
        element: <Pitchreport />,
      },
      {
        path: "/fantasy-cricket-tips",
        element: <Fantasytips />,
      },
      {
        path: "/live-cricket-scores",
        element: <Livescrore />,
      },
      {
        path: "/live-cricket-scores/:category",
        element: <Livescrore />,
      },
      {
        path: "/Iccseriesschedule",
        element: <Iccseriesschedule />,
      },
      {
        path: "/icc-rankings/men",
        element: <Manrankingpage />,
      },
      {
        path: "/icc-rankings/women",
        element: <Womenrankingpage />,
      },
      {
        path: "terms-conditions",
        element: <TermsPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPage />,
      },
      {
        path: "/about-us",
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

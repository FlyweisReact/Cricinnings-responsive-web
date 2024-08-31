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
import SeriesById from "./Pages/SeriesById";
import SingleBlogPage from "./Pages/singleBlogPage";
import DisclaimerPage from "./Pages/DisclaimerPage";
import ContactUsPage from "./Pages/ContactUs";
import './css/mediaQuery.css'
import './css/style.css'

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
        path: "/live-cricket-scorecard/:matchId/:matchName",
        element: <Scorecard />,
      },
      {
        path: "/Scorecard/:matchId",
        element: <Scorecard />,
      },

      // {
      //   path: "/Squads",
      //   element: <Squads />,
      // },
      {
        path: "/profiles/:playerId/:playerName",
        element: <PlayerProfile />,
      },
      {
        path: "/cricket-news/:blogId/:blogName",
        element: <SingleBlogPage />,
      },
      {
        path: "/cricket-match-squads/:matchId/:matchName",
        element: <Squads />,
      },
      {
        path: "/Squads/:matchId",
        element: <Squads />,
      },
      {
        path: "/live-cricket-scores/:matchName/highlights/:matchId",
        element: <Highlights />,
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
        path: "/live-cricket-scores/:matchId/:matchName",
        element: <Fullcommentary />,
      },
      {
        path: "/live-cricket-full-commentary/:matchId/:matchName",
        element: <Commenatary />,
      },
      {
        path: "/live-cricket-scores/:matchName/overs/:matchId",
        element: <Overs />,
      },
      {
        path: "/Overs/:matchId",
        element: <Overs />,
      },
      // {
      //   path: "/Pointtable/:matchId",
      //   element: <Pointtable />,
      // },
      {
        path: "/cricket-series/:matchId/:matchName/point-table",
        element: <Pointtable />,
      },

      {
        path: "/cricket-match-facts/:matchId/:matchName",
        element: <Matchinfo />,
      },
      {
        path: "/Matchinfo/:matchId",
        element: <Matchinfo />,
      },
      {
        path: "/live-cricket-scores/:matchName/cricket-news/:matchId",
        element: <News />,
      },
      {
        path: "/News",
        element: <News />,
      },
      {
        path: "/cricket-series/:matchName/stats/:matchId",
        element: <Stats />,
      },
      {
        path: "/Stats",
        element: <Stats />,
      },
      {
        path: "/cricket-news/",
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
        path: "/cricket-match/live-scores",
        element: <Livescrore />,
      },
      {
        path: "/cricket-schedule/series",
        element: <Livescrore />,
      },
      {
        path: "/cricket-schedule/upcoming-series/:categoryId",
        element: <Livescrore />,
      },
      {
        path: "/cricket-scorecard-archives",
        element: <Livescrore />,
      },
      {
        path: "/cricket-match/live-scores/recent-matches",
        element: <Livescrore />,
      },
      {
        path: "/cricket-match/live-scores/upcoming-matches",
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
        path: "/icc-rankings/men/:category",
        element: <Manrankingpage />,
      },
      {
        path: "/icc-rankings/women/:category",
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
        path: "/single-blog/:blogId/:blogName",
        element: <SingleBlogPage />,
      },
      {
        path: "/livescore/:id",
        element: <LivescroreById />,
      },
      {
        path: "/feature-posts",
        element: <FeacturePosts />,
      },
      {
        path: "/cricket-series/:seriesId/:seriesName/matches",
        element: <SeriesById />,
      },
      {
        path: "/cricket-series/:seriesId/:seriesName/points-table",
        element: <SeriesById />,
      },
      {
        path: "/cricket-series/:seriesId/:seriesName/squads",
        element: <SeriesById />,
      },
      {
        path: "/cricket-series/:seriesId/:seriesName/stats",
        element: <SeriesById />,
      },
      {
        path: "/cricket-series/:seriesId/:seriesName/venues",
        element: <SeriesById />,
      },
      {
        path: "/disclaimer",
        element: <DisclaimerPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path:"*",
        element: <Homepage />,
      }
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

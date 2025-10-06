import { createBrowserRouter } from "react-router";
import App from "@/app/App";
import Timers from "@/pages/Timers/Timers";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import About from "@/pages/About/About";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        { path: "/", Component: Home },
        { path: "timers/:timersSetId?/:timerId?", Component: Timers },
        { path: "about", Component: About},
        { path: "*", Component: NotFound },
      ],
    },

  ],
  {
    basename: "/TimeForge",
  }
);

export default router;
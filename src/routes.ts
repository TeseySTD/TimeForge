import { createBrowserRouter } from "react-router";
import App from "@/app/App";
import Timers from "@/pages/Timers/Timers";
import Home from "@/pages/Home/Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        { path: "/", Component: Home },
        { path: "timers/:timersSetId?/:timerId?", Component: Timers }
      ],
    },
  ],
  {
    basename: "/TimeForge",
  }
);

export default router;
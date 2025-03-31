import { HomeScreen } from "@/pages/home-screen";
import { NotFound } from "@/pages/not-found";
import { createBrowserRouter } from "react-router";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: HomeScreen,
    index: true,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

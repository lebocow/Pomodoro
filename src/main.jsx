import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LogIn from "./routes/logIn/logIn.route";
import Navigation from "./routes/navigation/navigation.route";
import Pomodoro from "./routes/pomodoro/pomodoro.route";
import Reports from "./routes/reports/reports.route";
import Settings from "./routes/settings/settings.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigation />,
        children: [
          {
            path: "/",
            element: <Pomodoro />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/login",
            element: <LogIn />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

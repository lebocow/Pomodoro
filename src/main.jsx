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
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

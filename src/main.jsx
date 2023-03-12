import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const App = lazy(() => import("./App"));
const SignIn = lazy(() => import("./routes/signIn/signIn.route"));
const SignUp = lazy(() => import("./routes/signUp/signUp.route"));
const Navigation = lazy(() => import("./routes/navigation/navigation.route"));
const Pomodoro = lazy(() => import("./routes/pomodoro/pomodoro.route"));
const Reports = lazy(() => import("./routes/reports/reports.route"));
const Settings = lazy(() => import("./routes/settings/settings.route"));

import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Error from "./components/error/error.component";
import LoadingPomodoro from "./components/loading-pomodoro/loading-pomodoro.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
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
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
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
        <React.Suspense fallback={<LoadingPomodoro />}>
          <RouterProvider router={router} />
        </React.Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

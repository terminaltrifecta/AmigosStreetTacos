import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "../src/error-page.jsx";
import About from "./routes/about.tsx";
import Locations from "./routes/locations.tsx";
import Order from "./routes/order.tsx";
import Menu from "./routes/menu.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/menu",
    element: <Menu />
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
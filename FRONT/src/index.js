import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/login.js";
import Registro from "./components/Registro";
import Restaurants from "./views/restaurants.js";
import RestaurantsDetails from "./views/restaurantDetails.js";
import Profile from "./views/profile.js";
import RegistroRestaurante from "./components/RegistroRestaurante.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Registro />,
  },
  {
    path: "/registerRestaurant",
    element: <RegistroRestaurante />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/restaurants",
    element: <Restaurants />,
  },
  {
    path: "/restaurants/:id",
    element: <RestaurantsDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import About from "./routes/about.tsx";
import Locations from "./routes/locations.tsx";
import Order from "./routes/order.tsx";
import Menu from "./routes/menu.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/locations" element={<Locations />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
      </Routes>
    </>
  );
}

export default App;

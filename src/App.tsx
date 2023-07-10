import { Route, Routes } from "react-router-dom";
import Root from "./routes/root.tsx";
import About from "./routes/about.tsx";
import Locations from "./routes/locations.tsx";
import Menu from "./routes/menu.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      {/* pages */}
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/locations" element={<Locations />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;

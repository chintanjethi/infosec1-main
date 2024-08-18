import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import { About } from "./components/About/about";
import { Home } from "./components/Home/home";
import { ApiInventory } from "./components/Inventory/inventory";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import {Add} from "./components/adduser/Add";


function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/inventory" element={<ApiInventory />} />
            <Route path="/add" element={<Add/>} />
          </Routes>
       
        </div>
      </Router>
  </>
  );
}

export default App;
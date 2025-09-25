import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Topics from "./pages/Topics/Topics";
import Instructions from "./pages/Instructions/Instructions";
import AnsweringPanel from "./pages/AnweringPanel/AnsweringPanel";
import ReviewPanel from "./pages/ReviewPanel/ReviewPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/topics" element={<Topics />} />
        <Route exact path="/instructions" element={<Instructions />} />
        <Route exact path="/answer" element={<AnsweringPanel />} />
        <Route exact path="/review" element={<ReviewPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

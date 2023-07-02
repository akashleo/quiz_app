import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Topics from "./pages/Topics/Topics";
import Instructions from "./pages/Instructions/Instructions";
import AnsweringPanel from "./pages/AnsweringPanel/AnsweringPanel";
import ReviewPanel from "./pages/ReviewPanel/ReviewPanel";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar";
//import AddQuestion from "./pages/QuestionBank/AddQuestion";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import { useSelector } from "react-redux";

function App() {
  console.log(window.location.pathname)

  const { tokenValidity
  } = useSelector((state) => state.auth)
  return (
    <>
    
    
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/topics" element={<Topics />} />
        <Route exact path="/instructions" element={<Instructions />} />
        <Route exact path="/answer" element={<AnsweringPanel />} />
        <Route exact path="/review" element={<ReviewPanel />} />
        <Route exact path="/question" element={<QuestionBank />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

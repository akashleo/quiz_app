import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Topics from "./pages/Topics/Topics";
import Instructions from "./pages/Instructions/Instructions";
import AnsweringPanel from "./pages/AnsweringPanel/AnsweringPanel";
import Profile from "./pages/Profile/Profile";
import AdminLogin from "./pages/Login/AdminLogin";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import ArchivedQuestions from "./pages/QuestionBank/ArchivedQuestions";
import GoogleAuthCallback from "./pages/Auth/GoogleAuthCallback";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const { tokenValidity } = useSelector((state) => state.auth);
  return (
    <>
      {/* <Navbar/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/topics" element={<Topics />} />
          <Route exact path="/instructions" element={<Instructions />} />
          <Route exact path="/answer" element={<AnsweringPanel />} />

          <Route exact path="/auth/google/callback" element={<GoogleAuthCallback />} />
          <Route
            exact
            path="/question/archive"
            element={
              <PrivateRoute requiredRole="admin">
                <ArchivedQuestions />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/question"
            element={
              <PrivateRoute requiredRole="admin">
                <QuestionBank />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

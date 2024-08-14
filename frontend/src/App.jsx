import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrincipalDashboard from "./pages/PrincipalDashboard.jsx";
import TeacherPage from "./components/TeacherPage.jsx"; // Updated import
import StudentDashboard from "./pages/StudentDashboard.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "../public/styles/toast.css";

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user info

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle routing based on user role
  return (
    <Router>
      <Routes>
        {/* If the user is not logged in, render the Login component */}
        <Route
          path="/"
          element={
            !user ? (
              <Login setUser={setUser} />
            ) : user.role === "Principal" ? (
              <Navigate to="/principal" />
            ) : user.role === "Teacher" ? (
              <Navigate to="/teacher" />
            ) : user.role === "Student" ? (
              <Navigate to="/student" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Dashboard routes for different roles */}
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/teacher" element={<TeacherPage />} />{" "}
        {/* Updated Route */}
        <Route path="/student" element={<StudentDashboard />} />
        {/* Explicit login route */}
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

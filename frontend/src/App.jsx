import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import PrincipalDashboard from "./pages/PrincipalDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user info

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user.role === "Principal" ? (
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
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;

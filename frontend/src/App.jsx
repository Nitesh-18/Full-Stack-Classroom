import { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
  )
};

export default App

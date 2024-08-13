import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PrincipalDashboard from "./pages/PrincipalDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import NavBar from "./components/Navbar";

function App() {
  return (
    <main className="bg-slate-400">
      <Router>
      <NavBar />
      <Routes>
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
    </main>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../pages/TeacherDashboard.jsx";

const TeacherPage = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/"); // Redirect to the login page if no token is found
    }
  }, [navigate]);

  return token ? <TeacherDashboard token={token} /> : null;
};

export default TeacherPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setTeachers(response.data.filter((user) => user.role === "Teacher"));
        setStudents(response.data.filter((user) => user.role === "Student"));
      } catch (error) {
        console.error("There was an error fetching users!", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teachers</h2>
      {/* Display teachers in a table */}
      <h2 className="text-xl font-bold mb-4">Students</h2>
      {/* Display students in a table */}
    </div>
  );
};

export default PrincipalDashboard;

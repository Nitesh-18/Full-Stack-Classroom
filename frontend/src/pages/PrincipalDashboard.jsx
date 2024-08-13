import React, { useState, useEffect } from "react";
import axios from "axios";

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classrooms, setClassrooms] = useState([]);

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
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("/api/classrooms");
        setClassrooms(response.data);
      } catch (error) {
        console.error("There was an error fetching classrooms!", error);
      }
    };
    fetchUsers();
    fetchClassrooms();
  }, []);

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/classrooms/create", {
        name: classroomName,
        startTime,
        endTime,
        days,
      });
      setClassrooms([...classrooms, response.data]);
      setClassroomName("");
      setStartTime("");
      setEndTime("");
      setDays([]);
    } catch (error) {
      console.error("There was an error creating the classroom!", error);
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/classrooms/assign-teacher", {
        classroomId: selectedTeacher,
        teacherId: selectedTeacher,
      });
      setSelectedTeacher("");
    } catch (error) {
      console.error("There was an error assigning the teacher!", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teachers</h2>
      {/* Display teachers in a table */}
      <h2 className="text-xl font-bold mb-4">Students</h2>
      {/* Display students in a table */}

      <h2 className="text-xl font-bold mb-4">Create Classroom</h2>
      <form onSubmit={handleCreateClassroom}>
        <input
          type="text"
          placeholder="Classroom Name"
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Days (e.g., Monday, Tuesday)"
          value={days.join(", ")}
          onChange={(e) => setDays(e.target.value.split(", "))}
          required
        />
        <button type="submit">Create Classroom</button>
      </form>

      <h2 className="text-xl font-bold mb-4">Assign Teacher to Classroom</h2>
      <form onSubmit={handleAssignTeacher}>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          required
        >
          <option value="">Select Classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom._id} value={classroom._id}>
              {classroom.name}
            </option>
          ))}
        </select>
        <button type="submit">Assign Teacher</button>
      </form>
    </div>
  );
};

export default PrincipalDashboard;

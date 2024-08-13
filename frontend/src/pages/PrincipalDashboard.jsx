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
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/getusers");
        console.log("Full response object:", response); // Log the full response to inspect its structure
        console.log("Users fetched:", response.data); // Log the data field

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setTeachers(response.data.filter((user) => user.role === "Teacher"));
          setStudents(response.data.filter((user) => user.role === "Student"));
        } else {
          throw new Error("Unexpected data format for users");
        }
      } catch (error) {
        console.error("There was an error fetching users!", error);
      }
    };

    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("/api/classrooms/");
        console.log("Classrooms fetched:", response.data); // Check if data is an array
        if (Array.isArray(response.data)) {
          setClassrooms(response.data);
        } else {
          throw new Error("Unexpected data format for classrooms");
        }
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
      console.log("Classroom created:", response.data); // Debugging
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
        classroomId: selectedClassroom,
        teacherId: selectedTeacher,
      });
      console.log("Teacher assigned successfully"); // Debugging
      setSelectedTeacher("");
      setSelectedClassroom("");
    } catch (error) {
      console.error("There was an error assigning the teacher!", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>{teacher.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-4">Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>

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
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
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

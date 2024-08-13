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
      setSelectedTeacher("");
      setSelectedClassroom("");
    } catch (error) {
      console.error("There was an error assigning the teacher!", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Principal Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Teachers</h2>
          <ul className="bg-white p-4 rounded-lg shadow">
            {teachers.map((teacher) => (
              <li key={teacher._id} className="border-b py-2">
                {teacher.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <ul className="bg-white p-4 rounded-lg shadow">
            {students.map((student) => (
              <li key={student._id} className="border-b py-2">
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create Classroom</h2>
        <form
          onSubmit={handleCreateClassroom}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Classroom Name"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="time"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Days (e.g., Monday, Tuesday)"
              value={days.join(", ")}
              onChange={(e) => setDays(e.target.value.split(", "))}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Create Classroom
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Assign Teacher to Classroom
        </h2>
        <form
          onSubmit={handleAssignTeacher}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Assign Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrincipalDashboard;

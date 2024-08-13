import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [newDetails, setNewDetails] = useState({ name: "", age: "" });
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const response = await axios.get("/api/classrooms/teacher-classroom");
        setClassroom(response.data.classroom);
        setStudents(response.data.students);
        setTimetable(response.data.classroom.timetable || []);
      } catch (error) {
        console.error("Error fetching classroom data:", error);
      }
    };

    fetchClassroomData();
  }, []);

  const handleUpdateStudent = async (studentId) => {
    try {
      const response = await axios.put(
        `/api/users/update/${studentId}`,
        newDetails
      );
      setStudents(
        students.map((student) =>
          student._id === studentId ? response.data : student
        )
      );
      setNewDetails({ name: "", age: "" });
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`/api/users/delete/${studentId}`);
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleAddTimetable = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/classrooms/add-timetable", {
        classroomId: classroom._id,
        timetable,
      });
      setTimetable(response.data.timetable);
    } catch (error) {
      console.error("Error adding timetable:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Classroom: {classroom?.name}</h2>

      <h3 className="text-xl font-semibold mb-4">Students</h3>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleUpdateStudent(student._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional: Add Timetable */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Timetable</h3>
        <form onSubmit={handleAddTimetable} className="space-y-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="5"
            placeholder="Add timetable details"
            value={timetable.join("\n")}
            onChange={(e) => setTimetable(e.target.value.split("\n"))}
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Save Timetable
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherDashboard;

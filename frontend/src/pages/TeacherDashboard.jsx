import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchClassroomAndStudents = async () => {
        try {
          const classroomResponse = await axios.get("/api/classrooms/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const classroomData = classroomResponse.data;
          setClassroom(classroomData);

          if (classroomData && classroomData._id) {
            const studentsResponse = await axios.get(
              `/api/students/classroom/${classroomData._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setStudents(studentsResponse.data);
          }
        } catch (error) {
          console.error(
            "There was an error fetching the classroom and students!",
            error
          );
        }
      };

      fetchClassroomAndStudents();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/users/update-student/${selectedStudent._id}`,
        {
          name: selectedStudent.name,
          email: selectedStudent.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the students list in state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === selectedStudent._id ? response.data : student
        )
      );
      setSelectedStudent(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      console.error("There was an error updating the student!", error);
      toast.error("There was an error updating the student.");
    }
  };

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        await axios.delete(`/api/users/delete-student/${selectedStudent._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(
          students.filter((student) => student._id !== selectedStudent._id)
        );
        setSelectedStudent(null);
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("There was an error deleting the student!", error);
        toast.error("There was an error deleting the student.");
      }
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/users/create-student",
        {
          name: newStudent.name,
          email: newStudent.email,
          password: newStudent.password,
          classroomId: classroom._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents([...students, response.data]);
      setNewStudent({ name: "", email: "", password: "" });
      toast.success("Student created successfully!");
    } catch (error) {
      console.error(
        "There was an error creating the student!",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response?.data?.message ||
          "There was an error creating the student."
      );
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Teacher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-pink-700"
        >
          Logout
        </button>
      </div>

      {classroom ? (
        <>
          {/* Display list of students */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              All Students
            </h2>
            <table className="w-full bg-white border rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td className="p-4 border-b">{student.name}</td>
                      <td className="p-4 border-b">{student.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-4 text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Form to create a new student */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Create New Student
            </h2>
            <form
              onSubmit={handleCreateStudent}
              className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            >
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                required
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
                required
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                value={newStudent.password}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, password: e.target.value })
                }
                required
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-teal-700"
              >
                Create Student
              </button>
            </form>
          </div>

          {/* Form to update/delete students */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Update/Delete Student
            </h2>
            <form
              onSubmit={handleUpdateStudent}
              className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            >
              <div>
                <select
                  value={selectedStudent ? selectedStudent._id : ""}
                  onChange={(e) =>
                    setSelectedStudent(
                      students.find((student) => student._id === e.target.value)
                    )
                  }
                  required
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedStudent && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={selectedStudent.name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        name: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        email: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-lg hover:from-green-600 hover:to-teal-700"
                  >
                    Update Student
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteStudent}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-pink-700"
                  >
                    Delete Student
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <p>Loading classroom details...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default TeacherDashboard;

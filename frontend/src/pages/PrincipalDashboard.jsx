import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherPassword, setNewTeacherPassword] = useState("");
  const [token, setToken] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // If token is not present, redirect to login page
      window.location.href = "/";
    }
  }, []);

  // ...

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api/users/getusers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (Array.isArray(response.data)) {
            const teachers = response.data.filter(
              (user) => user.role === "Teacher"
            );
            const students = response.data.filter(
              (user) => user.role === "Student"
            );
            setTeachers(teachers);
            setStudents(students);
          } else {
            throw new Error("Unexpected data format for users");
          }
        } catch (error) {
          console.error("There was an error fetching users!", error);
        }
      };

      const fetchClassrooms = async () => {
        try {
          const response = await axios.get("/api/classrooms/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
    }
  }, [token]);

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/api/classrooms/create",
        {
          name: classroomName,
          startTime,
          endTime,
          days,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClassrooms([...classrooms, response.data]); // Update the classrooms state
      setClassroomName("");
      setStartTime("");
      setEndTime("");
      setDays([]);
      toast.success("Classroom created successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("There was an error creating the classroom!", error);
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/api/users/create-teacher",
        {
          name: newTeacherName,
          email: newTeacherEmail,
          password: newTeacherPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeachers([...teachers, response.data]);
      setNewTeacherName("");
      setNewTeacherEmail("");
      setNewTeacherPassword("");
      toast.success("Teacher created successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `/api/users/assign-classroom-to-teacher/${selectedTeacher}`,
        {
          classroomId: selectedClassroom,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedTeacher("");
      setSelectedClassroom("");
      toast.success("Teacher assigned to Classroom successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("There was an error assigning the teacher!", error);
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
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
      setStudents(
        students.map((student) =>
          student._id === selectedStudent._id ? response.data : student
        )
      );
      setSelectedStudent(null);
      toast.success("Student updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("There was an error updating the student!", error);
    }
  };

  const handleDeleteStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/users/delete-student/${selectedStudent._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(
        students.filter((student) => student._id !== selectedStudent._id)
      );
      setSelectedStudent(null);
      toast.success("Student deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/api/users/update-teacher/${selectedTeacher._id}`,
        {
          name: selectedTeacher.name,
          email: selectedTeacher.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTeachers = teachers.map((teacher) =>
        teacher._id === selectedTeacher._id ? response.data : teacher
      );
      setTeachers(updatedTeachers);
      setSelectedTeacher(null);
      toast.success("Teacher updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        toast.error(`Error updating teacher: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Error updating teacher: No response received");
      } else {
        console.error("Error:", error.message);
        toast.error(`Error updating teacher: ${error.message}`);
      }
    }
  };

  const handleDeleteTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/users/delete-teacher/${selectedTeacher._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(
        teachers.filter((teacher) => teacher._id !== selectedTeacher._id)
      );
      setSelectedTeacher(null);
      toast.success("Teacher deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        style: {
          fontSize: 14,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("There was an error deleting the teacher!", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Principal Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Teachers</h2>
          <ul className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            {teachers.map((teacher) => (
              <li
                key={teacher._id}
                className="border p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {teacher.name}{" "}
                {teacher.classroomId
                  ? `(${
                      classrooms.find(
                        (classroom) => classroom._id === teacher.classroomId
                      ).name
                    })`
                  : ""}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Students</h2>
          <ul className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            {students.map((student) => (
              <li
                key={student._id}
                className="border p-4 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Classroom
        </h2>
        <form
          onSubmit={handleCreateClassroom}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Classroom Name"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="time"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Days (e.g., Monday, Tuesday)"
              value={days.join(", ")}
              onChange={(e) =>
                setDays(e.target.value.split(", ").map((day) => day.trim()))
              }
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700"
          >
            Create Classroom
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create Teacher
        </h2>
        <form
          onSubmit={handleCreateTeacher}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              value={newTeacherName}
              onChange={(e) => setNewTeacherName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newTeacherEmail}
              onChange={(e) => setNewTeacherEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={newTeacherPassword}
              onChange={(e) => setNewTeacherPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700"
          >
            Create Teacher
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Assign Teacher to Classroom
        </h2>
        <form
          onSubmit={handleAssignTeacher}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
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
              className="w-full p-3 border rounded-lg"
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
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700"
          >
            Assign Teacher
          </button>
        </form>
      </div>

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
                onClick={() => handleDeleteStudent(selectedStudent._id)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-pink-700"
              >
                Delete Student
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-pink-700"
        >
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PrincipalDashboard;

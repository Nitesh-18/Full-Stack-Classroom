import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/principal">Principal Dashboard</Link>
        </li>
        <li>
          <Link to="/teacher">Teacher Dashboard</Link>
        </li>
        <li>
          <Link to="/student">Student Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;




import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900 text-white py-4 shadow-md">
      <nav className="flex justify-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-2 rounded-lg transition duration-300 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-6 py-2 rounded-lg transition duration-300 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          📄 Pastes
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

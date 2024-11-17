import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { MdDashboard, MdPerson, MdSettings } from "react-icons/md"; // Material icons for sidebar

const Sidebar = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Parse the JSON string
      setRole(parsedUser.role); // Set the role
    }
  }, []);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">CollegeName</h2>

      <ul>
        <li className="mb-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
            }
          >
            <MdDashboard size={24} className="mr-3" />
            Dashboard
          </NavLink>
        </li>

        {/* Student-specific links */}
        {role === "Student" && (
          <>
            <li className="mb-4">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdPerson size={24} className="mr-3" />
                Profile
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdSettings size={24} className="mr-3" />
                Courses
              </NavLink>
            </li>
          </>
        )}

        {/* Teacher-specific links */}
        {role === "Teacher" && (
          <>
            <li className="mb-4">
              <NavLink
                to="/manage-students"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdPerson size={24} className="mr-3" />
                Manage Students
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdSettings size={24} className="mr-3" />
                Manage Courses
              </NavLink>
            </li>
          </>
        )}

        {/* Admin-specific links */}
        {role === "Admin" && (
          <>
            <li className="mb-4">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdDashboard size={24} className="mr-3" />
                Admin Dashboard
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/manage-users"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdPerson size={24} className="mr-3" />
                Manage Users
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center text-lg p-2 rounded-md ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                <MdSettings size={24} className="mr-3" />
                Settings
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

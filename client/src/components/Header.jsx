import { useState, useEffect } from "react";
import { MdPerson } from "react-icons/md"; // Profile icon from react-icons
import { useNavigate } from "react-router-dom";
import { logoutFn } from "../services/user.service";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    
    if (userData) {
      const parsedUser = JSON.parse(userData); // Parse the JSON string
      setUser({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
      });
    }
  }, []);

  // Function to get the initials from the first and last names
  const getInitials = () => {
    const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : "";
    const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Logout function
  const handleLogout = () => {
    logoutFn().then(()=>{
        localStorage.clear(); 
        navigate("/login"); 

    })
  };

  // Go to the profile page
  const handleProfile = () => {
    navigate("/profile"); // Redirect to profile page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-lg font-bold">Student Management System</div>
      
      {/* User Profile Section */}
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center cursor-pointer"
        >
          {/* Display initials in a rounded div */}
          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
            {getInitials()}
          </div>
          
          {/* Profile Icon */}
          <MdPerson size={24} className="ml-2" />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black border rounded shadow-lg">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

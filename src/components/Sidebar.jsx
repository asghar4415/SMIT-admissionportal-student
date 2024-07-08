import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfilePic from "../../public/img/profilepic.avif";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex md:flex-col md:w-1/4 bg-white p-4 rounded-lg shadow-md">
      {/* Mobile and Tablet Sidebar Toggle Button */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar Content */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block md:flex md:flex-col md:w-full`}
      >
        <div className="flex flex-row items-center justify-left">
            <div>
            <img
                src={ProfilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
            </div>
            <div className='flex flex-col items-left gap-y-0 justify-left ml-4'> 
            <h2 className="text-md font-semibold">Abdullah Shafiq</h2>
            <p className="text-sm text-gray-600">any Description</p>
            </div>
        </div>
        <div className="mt-4">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-2 bg-gray-300 rounded cursor-pointer'
                    : 'flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer'
                }
              >
                <LuLayoutDashboard className="mr-2" />
                <span>Dashboard</span>
                <span className="ml-auto bg-gray-300 text-gray-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">0</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/updateProfile"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-2 bg-gray-300 rounded cursor-pointer'
                    : 'flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer'
                }
              >
                <FaUserEdit className="mr-2" />
                <span>Update Profile</span>
                <span className="ml-auto bg-gray-300 text-gray-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">2</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/courseEnrollment"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-2 bg-gray-300 rounded cursor-pointer'
                    : 'flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer'
                }
              >
                <SiGoogledocs className="mr-2" />
                <span>Course Enrollment</span>
                <span className="ml-auto bg-gray-300 text-gray-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">5</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notificationPanel"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-2 bg-gray-300 rounded cursor-pointer'
                    : 'flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer'
                }
              >
                <IoIosNotifications className="mr-2" />
                <span>Notification Panel</span>
                <span className="ml-auto bg-gray-300 text-gray-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">0</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

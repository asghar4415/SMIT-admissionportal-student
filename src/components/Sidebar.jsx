import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfilePic from "/img/profile.jpg";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
import { useSelector } from 'react-redux';
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { cnic, name, url } = useSelector((state) => state.userReducer);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cnic = JSON.parse(atob(token.split(".")[1])).cnic;


if(window.location.pathname === "/notificationPanel"){
    const getNotifications = async () => {
      try {

        const response = await axios.get(`${apiUrl}/api/getnotification/${cnic}`);
        setNotifications(response.data);
      } catch (err) {
      }
    };
    getNotifications();
  }
  }, []);

  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const setPicture = () => {
    
    if(url === null || url.length==0){
      return ProfilePic;
    }
    else{
      return url;
    }
  };

  return (
    <div className="md:flex md:flex-col md:w-2/6 lg:w-[27%] xl:w-1/6 bg-white p-4 rounded-lg shadow-md">
      <button className="md:hidden p-1 focus:outline-none" onClick={toggleSidebar}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block md:flex md:flex-col md:w-full sidebar-separation`}>
        <div className="mt-5">
          <div className="flex flex-row items-center justify-left">
            <div>
              <img src={setPicture()} className="w-11 h-11 rounded-full" />
            </div>
            <div className="flex flex-col items-left gap-y-0 justify-left ml-4">
              <h2
                className="text-md font-semibold"
                style={{
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {name}
              </h2>
            </div>
          </div>

          <div className="md:mt-4">
            <ul className="sidebar-content">
              <li className="mt-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-3 bg-gray-300 rounded cursor-pointer'
                      : 'flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer'
                  }
                >
                  <LuLayoutDashboard className="mr-2" />
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: ".9rem",
                    }}
                  >
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/updateProfile"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-3 bg-gray-300 rounded cursor-pointer'
                      : 'flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer'
                  }
                >
                  <FaUserEdit className="mr-2" />
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: ".9rem",
                    }}
                  >
                    Update Profile
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/courseEnrollment"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-3 bg-gray-300 rounded cursor-pointer'
                      : 'flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer'
                  }
                >
                  <SiGoogledocs className="mr-2" />
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: ".9rem",
                    }}
                  >
                    Course Enrollment
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/notificationPanel"
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-3 bg-gray-300 rounded cursor-pointer'
                      : 'flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer'
                  }
                >
                  <IoIosNotifications className="mr-2" />
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: ".9rem",
                    }}
                  >
                    Notification Panel
                  </span>
                  {notifications.length > 0 && (
                    <span className="ml-auto bg-gray-300 text-gray-700 text-sm rounded-full w-6 h-6 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="logout-button" onClick={removeToken}>
          Logout
          <span>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

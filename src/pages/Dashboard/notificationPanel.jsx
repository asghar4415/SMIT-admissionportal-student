import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfilePic from "/img/profile.jpg";
import "./dashboard.css";
import "../../components/sidebar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const NotificationPanel = () => {
  const navigate = useNavigate();

  const { cnic, stdregion } = useSelector((state) => state.userReducer);
  const [notifications, setNotifications] = useState([]);

  const [stdDetails, setStdDetails] = useState({
    name: null,
    img: null,
    marks: null,
    result: false,
    email: null,
    cnic: cnic,
    region: stdregion,
    phoneNo: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cnic = JSON.parse(atob(token.split(".")[1])).cnic;

    const getUserData = async () => {
      const resp = await axios.get(`${apiUrl}/getUserData/${cnic}`);

      setStdDetails({
        ...stdDetails,
        name: resp.data.fullName,
        img: resp.data.img,
        marks: resp.data.marks,
        result: resp.data.result,
        email: resp.data.email,
        cnic: resp.data.cnic,
        phoneNo: resp.data.phone,
        region: resp.data.city,
      });
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/api/notification/${stdregion}`);
        setNotifications(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotifications();
  }, [stdregion]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />

      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <div className="flex-2 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-8 md:mt-0">
          <div className="flex flex-col mt-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="mt-4">
                  <div className="flex justify-between items-center p-2 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <h1 className="text-lg font-semibold text-gray-800">
                          {notification.courseName} - Batch {notification.courseBatch}
                        </h1>
                        <p className="text-sm text-gray-500">
                          Deadline:{" "}
                          <span className="text-red-500">
                            {new Date(notification.courseDeadline).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Test Date:{" "}
                          <span className="text-red-500">
                            {new Date(notification.courseTestDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Region:{" "}
                          <span className="text-gray-700">{notification.courseRegion}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center mt-4">
                No notifications available for your region.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;

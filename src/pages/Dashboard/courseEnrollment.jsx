import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './CourseEnrollment.css'; // Ensure this path is correct
import "../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;



const CourseEnrollment = () => {
  const [expanded, setExpanded] = useState(null);

  const courses = [
    { id: 1, title: 'Website and Mobile App Development', region: "karachi", deadline: '24th Jan 2024', description: ['12 months module', 'Weekdays Classes', 'Any other description', 'Any other description'], color: 'bg-blue-100' },
    { id: 2, title: 'Website and App', region: "karachi", deadline: '24th Jan 2024', description: [''], color: 'bg-blue-100' },
  ];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const cnic = JSON.parse(atob(token.split(".")[1])).cnic;
  const [stdregion, setStdRegion] = useState(null);

  const [courseDetails, setCourseDetails] = useState([]);

  useEffect(() => {
    const getRegion = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/getUserData/${cnic}`);
        setStdRegion(resp.data.city.toLowerCase());
      } catch (error) {
        console.error("Error fetching region:", error);
      }
    };
    getRegion();
  }, [cnic, apiUrl]);

  const getColor = () => {
    const colors = ['red', 'blue', 'green', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  

  useEffect(() => {
    const getCourses = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/api/course/view`);
        const courses = [];
  
        for (let i = 0; i < resp.data.length; i++) {
          const coursename = resp.data[i].course_name;
          const batch = resp.data[i].batch;
          // console.log(batch);
          for (let j = 0; j < batch.length; j++) {
            const batch_region = batch[j].region.toLowerCase();
            

            if (batch_region === stdregion) {
              // console.log("hiii");
              const deadline = new Date(batch[j].deadline);
              
              const today_date = new Date();
              if (today_date < deadline) {
                courses.push({
                  id: batch[j].batch_id,
                  title: coursename,
                  region: batch[j].region,
                  deadline: batch[j].deadline,
                  description: [ "Batch No: " + batch[j].batch_id , "Region: " + batch[j].region, "Test Date: " + batch[j].test_date ],
                  color: `bg-${getColor()}-100`
                });
              }
            }
          }
        }
        setCourseDetails(courses);
        // console.log(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    getCourses();
  }, [stdregion, apiUrl]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  



  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-10"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {

          //if courseDetails is empty, show a loading spinner
          //else, show the courses



  Array.isArray(courseDetails) && courseDetails.map((course) => (
    <div
      key={course.id}
      style={{ fontFamily: "Arsenal SC" }}
      className={`${course.color} border p-4 rounded-lg shadow-md transition-all duration-500 transform ${expanded === course.id ? 'scale-105' : 'scale-100'} ${expanded === course.id ? 'h-auto' : 'h-32'}`}
      onClick={() => handleExpand(course.id)}
    >
      <div className="cursor-pointer h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              <span className="blink_mee"></span>
              <span>NEW</span>
            </div>
            <span className="text-sm text-gray-600">Deadline |  {formatDate(course.deadline)}</span>
          </div>
          <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
          {expanded === course.id && (
            <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
              {course.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          )}
        </div>
        {expanded === course.id && (
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Enroll Now</button>
        )}
      </div>
    </div>
  )
  
  )
}

        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;

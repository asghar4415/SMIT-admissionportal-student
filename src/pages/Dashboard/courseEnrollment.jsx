import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import './CourseEnrollment.css'; // Ensure this path is correct
import "../../App.css";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import {updateRegion, updateEmail, updateImgUrl, updateName } from "../../state/userSlice";

const apiUrl = import.meta.env.VITE_API_URL;



const CourseEnrollment = () => {
  const [expanded, setExpanded] = useState(null);

  const dispatch = useDispatch();
  

  


  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };


  const token = localStorage.getItem("token");
  const cnic = JSON.parse(atob(token.split(".")[1])).cnic;
  const [stdregion, setStdRegion] = useState(null);
  const [courseDetails, setCourseDetails] = useState([]);
  const [stdDetails, setStdDetails] = useState({
    fullName: "",
    fatherName: "",
    cnic: cnic,
    email: "",
    city: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    lastQualification: "",
    laptop: false,
    img: ""
  });

  useEffect(() => {
    const getRegion = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/getUserData/${cnic}`);

        setStdDetails({
          fullName: resp.data.fullName,
          fatherName: resp.data.fatherName,
          cnic: resp.data.cnic,
          email: resp.data.email,
          city: resp.data.city,
          phone: resp.data.phone,
          date_of_birth: resp.data.date_of_birth,
          gender: resp.data.gender,
          address: resp.data.address,
          lastQualification: resp.data.lastQualification,
          laptop: resp.data.laptop,
          img: resp.data.img
        });


        setStdRegion(resp.data.city.toLowerCase());

        dispatch(updateName(resp.data.fullName));
        dispatch(updateEmail(resp.data.email));
        dispatch(updateImgUrl(resp.data.img));
        dispatch(updateRegion(resp.data.city));
      } catch (error) {
        // console.error("Error fetching region:", error);
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

          for (let j = 0; j < batch.length; j++) {
            const batch_region = batch[j].region.toLowerCase();
            

            if (batch_region === stdregion) {
  
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
      } catch (error) {
        // console.error("Error fetching courses:", error);
      }
    };
  
    getCourses();
  }, [stdregion, apiUrl]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  

  const handleCourseApply = async () => {

    if (
      stdDetails.fullName &&
      stdDetails.fatherName &&
      stdDetails.city &&
      stdDetails.phone &&
      stdDetails.email &&
      stdDetails.lastQualification &&
      stdDetails.date_of_birth &&
      stdDetails.gender &&
      stdDetails.address &&
      stdDetails.img &&
      stdDetails.laptop
    ) {
      try{

        const resp = await axios.post(`${apiUrl}/api/course/enroll`, {
          cnic: stdDetails.cnic,
          course_details:
          {
            course_id: expanded,
            course_name: courseDetails.find((course) => course.id === expanded).title,
            region: stdregion,
            batch_id: expanded,
            test_date: courseDetails.find((course) => course.id === expanded).description[2].split(":")[1].trim(),
            deadline: courseDetails.find((course) => course.id === expanded).deadline

          },
        });

        toast.success(resp.data.message);

          

      }
      catch (error) {
        toast.error(error.response.data.error);
      }


    } else {
      toast.error("Complete Your Profile First");
    }
  };
  



  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-10"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
      

courseDetails.length?( courseDetails?.map((course) => (
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
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleCourseApply}>Enroll Now</button>
      )}
    </div>
  </div>
)

)):
stdregion ?
(<div className='text-center font-bold w-[80vw] m-auto '>No Courses Available For Your Region</div>):
( <div className='text-center font-bold w-[80vw] m-auto '>Select Your Region First To Enroll In Courses</div>)
 
}

        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;

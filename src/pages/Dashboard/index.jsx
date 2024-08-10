import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfilePic from "/img/profile.jpg";
import "./dashboard.css";
import "../../components/sidebar.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { updateEmail,updateRegion, updateImgUrl, updateName } from "../../state/userSlice";


const Dashboard = () => {
  const navigate = useNavigate();


  const { cnic, name, url } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch()

  const [stdDetails, setStdDetails] = useState({
    name: null,
    img: [],
    marks: null,
    result: false,
    email: null,
    cnic: cnic,
    admissionStatus: "Pending",
    phoneNo: null,
  })
  const [courses, setCourses] = useState([])


  useEffect(() => {

    const token = localStorage.getItem("token");
    const cnic = JSON.parse(atob(token.split(".")[1])).cnic;

    const getUserData = async () => {
      const resp = await axios.get(`${apiUrl}/getUserData/${cnic}`)


      setStdDetails({
        ...stdDetails,
        name: resp.data.fullName,
        img: resp.data.img,
        marks: resp.data.marks,
        result: resp.data.result,
        admissionStatus: resp.data.admissionStatus,
        email: resp.data.email,
        cnic: resp.data.cnic,
        phoneNo: resp.data.phone,
        region: resp.data.city
      });
       
      setCourses(resp.data.coursesApplied)


      dispatch(updateName(resp.data.fullName))
      dispatch(updateImgUrl(resp.data.img))
      dispatch(updateEmail(resp.data.email))
      dispatch(updateRegion(resp.data.city))
      

    }
    getUserData()

  }, [])

  const setPicture = () => {
    if (stdDetails.img.length > 0) {
      return stdDetails.img
    }
    else {
      return ProfilePic
    }
  }



  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />

      <div
        className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row items-center bg-[#005EC4] text-white p-4 rounded-lg md:gap-[2rem] m-2 md:m-0">
          <img
            src={setPicture()}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-none md:ml-4"
          />
          <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left flex flex-col gap-y-1 justify-left items-left plus-jakarta-sans"

          >
            <h2 className="text-3xl font-bold plus-jakarta-sans md:mb-3 capitalize"
            >{stdDetails.name}</h2>
            <p className="font-semibold text-sm plus-jakarta-sans">Email: {stdDetails.email}</p>
            <p className="font-semibold text-sm plus-jakarta-sans">CNIC: {stdDetails.cnic}</p>
            <p className="font-semibold text-sm plus-jakarta-sans">Phone:{stdDetails.phoneNo || "-"}</p>
            <p className="font-semibold text-sm plus-jakarta-sans">Region: {stdDetails.region || "-"}</p>
            <button className="md:mt-2 bg-white text-black px-28 py-2 rounded-lg font-bold plus-jakarta-sans" onClick={
              () =>
                navigate("/updateProfile")
            }>
              Edit
            </button>
          </div>
        </div>


        <div className="mt-20 ml-2  mr-2">
          <h3 className="text-2xl font-bold plus-jakarta-sans mb-6">Courses Status</h3>
          <div className="overflow-x-auto mt-2 mb-9">
          <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Courses</th>
          <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Deadline</th>
          <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Test Date</th>
          <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Application Status</th>
          <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Test Result</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">{course.courseName}</td>
            <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">
              {new Date(course.courseDeadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </td>
            <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">
              {new Date(course.courseTestDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </td>
            <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-green-500">
              <span className="blink_me_green"></span> &nbsp; Submitted
            </td>
            {
              course.courseResult === true ?
              (
                course.courseMarks >= 50 ?

                <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-green-500">
                <span className="blink_me_green"></span> &nbsp; Passed
              </td> :
              <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-red-500">
                <span className="blink_me_red"></span> &nbsp; Failed
              </td>
                
              )
              :
              (
              <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500">
                <span className="blink_me"></span> &nbsp; Pending
              </td>
              )
             
            }
            
          </tr>
        ))}
      </tbody>
    </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

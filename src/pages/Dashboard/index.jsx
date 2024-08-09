import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfilePic from "/img/profile.jpg";
import "./dashboard.css";
import "../../components/sidebar.css" 
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { updateEmail, updateImgUrl, updateName } from "../../state/userSlice";

const Dashboard = () => {
  const navigate = useNavigate();


  const { cnic,name ,url} = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch()

    // console.log(name,url)
    
  const [stdDetails,setStdDetails] = useState({
    name:null,
    img:null,
    marks:null,
    result:false,
    email:null,
    cnic: cnic,
    admissionStatus:"Pending",
    phoneNo:null,
  })

  
  useEffect(()=>{

    const token = localStorage.getItem("token");
    const cnic = JSON.parse(atob(token.split(".")[1])).cnic;
    // console.log(cnic)

    const getUserData = async()=>{
const resp =await axios.get(`${apiUrl}/getUserData/${cnic}`)
// console.log(resp.data)
    

setStdDetails({
        ...stdDetails,
        name: resp.data.fullName,
        img: resp.data.img,
        marks: resp.data.marks,
        result: resp.data.result,
        admissionStatus: resp.data.admissionStatus,
        email:resp.data.email,
        cnic:resp.data.cnic,
        phoneNo:resp.data.phone,
        region:resp.data.city
      });
      dispatch(updateName(resp.data.fullName))
      dispatch(updateImgUrl(resp.data.img))
dispatch(updateEmail(resp.data.email))
      
    }
    getUserData()

  },[])


  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />

      <div
       className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row items-center bg-[#005EC4] text-white p-4 rounded-lg md:gap-[2rem]">
          <img
            src={ ProfilePic || stdDetails.img}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-none md:ml-4"
          />
          <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left flex flex-col gap-y-1 justify-left items-left plus-jakarta-sans"
      
          >
            <h2  className="text-3xl font-bold plus-jakarta-sans md:mb-3 capitalize"
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
              {/* when click on this button it will take you to the update profile page */}
            </button>
          </div>
        </div>

        {/* <div className="mt-4">
  <h3 className="text-2xl font-bold">Courses</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    <div className="bg-white px-2 py-2 rounded-lg shadow-md">
      <h4 className="  font-bold">Website and Application Development</h4>
      <div className="flex flex-row gap-x-2 justify-left items-center mt-6">
        <div className="w-[50%] flex flex-col gap-y-2">
          <p className="font-semibold text-sm">Instructor: Jaffar Amaan</p>
          <p className="font-semibold text-sm">Schedule: Weekdays</p>
          <p className="font-semibold text-sm">Classes: TTS</p>
          <p className="font-semibold text-sm">Timing: 8pm-10pm</p>
        </div>
        <div className="flex flex-col w-[40%]">
          <div>
            <span className="text-sm font-semibold mr-2">Attendance</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span className="text-sm font-semibold ml-2">80%</span>
          </div>
          <div>
            <span className="text-sm font-semibold mr-2">Course Completion</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span className="text-sm font-semibold ml-2">80%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white px-2 py-2 rounded-lg shadow-md">
      <h4 className="text-lg font-bold">Python Development</h4>
      <div className="flex flex-row gap-x-2 justify-left items-center mt-6">
        <div className="w-[50%] flex flex-col gap-y-2">
          <p className="font-semibold text-sm">Instructor: Jaffar Amaan</p>
          <p className="font-semibold text-sm">Schedule: Weekdays</p>
          <p className="font-semibold text-sm">Classes: TTS</p>
          <p className="font-semibold text-sm">Timing: 8pm-10pm</p>
        </div>
        <div className="flex flex-col w-[40%]">
          <div>
            <span className="text-sm font-semibold mr-2">Attendance</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span className="text-sm font-semibold ml-2">80%</span>
          </div>
          <div>
            <span className="text-sm font-semibold mr-2">Course Completion</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <span className="text-sm font-semibold ml-2">80%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}


        <div className="mt-20 ml-2  mr-2">
          <h3 className="text-2xl font-bold plus-jakarta-sans mb-7">Courses Status</h3>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Courses</th>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Deadline</th>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Test Date</th>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Application Status</th>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Test Result</th>
                  <th className="px-4 py-4 text-sm plus-jakarta-sans text-left">Admission Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" px-4 py-4 text-sm plus-jakarta-sans text-left">Web and App</td>
                  <td className=" px-4 py-4 text-sm plus-jakarta-sans text-left">12th July 2024</td>
                  <td className=" px-4 py-4 text-sm plus-jakarta-sans text-left">3rd Jan 2024</td>
                  <td className=" px-4 text-orange-500 py-4 text-sm plus-jakarta-sans text-left"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className=" px-4 text-orange-500 py-4 text-sm plus-jakarta-sans text-left"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className=" px-4 text-orange-500 py-4 text-sm plus-jakarta-sans text-left"><span class="blink_me"></span> &nbsp; Pending</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">Web and App</td>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">12th July 2024</td>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left">3rd Jan 2024</td>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left  text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className="px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                </tr>
                <tr>
                  <td className=" px-4  py-4 text-sm plus-jakarta-sans text-left">Web and App</td>
                  <td className="  px-4 py-4 text-sm plus-jakarta-sans text-left">12th July 2024</td>
                  <td className="  px-4 py-4 text-sm plus-jakarta-sans text-left">3rd Jan 2024</td>
                  <td className="  px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className="  px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                  <td className="  px-4 py-4 text-sm plus-jakarta-sans text-left text-orange-500"><span class="blink_me"></span> &nbsp; Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

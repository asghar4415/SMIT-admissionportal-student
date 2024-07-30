import React from 'react';
import Sidebar from '../../components/Sidebar';
import ProfilePic from "/img/profile.jpg";
import "../../components/sidebar.css"
import "./style1.css"


const UpdateProfile = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 mt-7 ">
          <div className="md:col-span-1 flex justify-center items-center md:justify-start checkkk">
            <img
              className="rounded-full md:w-52 md:h-52 w-32 h-32"
              src={ProfilePic} 
              alt="Profile"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-6 md:pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="get data from api {First_name} and show here."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="get data from api {First_name} and show here."
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">CNIC Number</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="get data from api {First_name} and show here."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="0321123456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="get data from api {First_name} and show here."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Father Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="get data from api {First_name} and show here."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Father cell phone</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="0321123456"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option>Select Your Region</option>
              <option>Karachi</option>

              <option>Hyderabad</option>
              <option>Islamabad</option>
              <option>Lahore</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700"
            onClick={ () =>
              {
                console.log("profile updated")
              }
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;

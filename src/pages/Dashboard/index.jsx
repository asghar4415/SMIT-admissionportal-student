import React from "react";
import Sidebar from "../../components/Sidebar";
import ProfilePic from "../../../public/img/profilepic.avif";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4">
      <Sidebar />

      <div className="flex-1 bg-white p-4 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <div className="flex flex-col md:flex-row items-center bg-[#0d26d1] text-white p-4 rounded-lg">
          <img
            src={ProfilePic}
            alt="Profile"
            className="w-64 h-64 rounded-full object-cover  border-none"
          />
          <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left flex flex-col gap-y-1 justify-left items-left">
            <h2 className="text-4xl font-bold ">Abdullah Shafiq</h2>
            <p className="font-semibold text-lg">Email: abdullah@gmail.com</p>
            <p className="font-semibold text-lg">CNIC: 4222166578541</p>
            <p className="font-semibold text-lg">Phone: 0321-12345678</p>
            <p className="font-semibold text-lg">Region: Sindh</p>
            <button className="md:mt-0 bg-white text-black px-28 py-2 rounded-lg font-semibold">
              Edit
            </button>
          </div>
        </div>

        <div className="mt-4">
  <h3 className="text-2xl font-bold">Courses</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    <div className="bg-white px-2 py-2 rounded-lg shadow-md">
      <h4 className="text-lg font-bold">Website and Application Development</h4>
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
</div>


        <div className="mt-4">
          <h3 className="text-xl font-semibold">Course Status</h3>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Courses</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Test Date</th>
                  <th className="px-4 py-2">Application Status</th>
                  <th className="px-4 py-2">Admission Status</th>
                  <th className="px-4 py-2">Test Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Web and App</td>
                  <td className="border px-4 py-2">12th July 2024</td>
                  <td className="border px-4 py-2">3rd Jan 2024</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Web and App</td>
                  <td className="border px-4 py-2">12th July 2024</td>
                  <td className="border px-4 py-2">3rd Jan 2024</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Web and App</td>
                  <td className="border px-4 py-2">12th July 2024</td>
                  <td className="border px-4 py-2">3rd Jan 2024</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Web and App</td>
                  <td className="border px-4 py-2">12th July 2024</td>
                  <td className="border px-4 py-2">3rd Jan 2024</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
                  <td className="border px-4 py-2 text-orange-500">Pending</td>
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

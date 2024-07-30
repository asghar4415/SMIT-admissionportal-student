import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './CourseEnrollment.css'; // Ensure this path is correct
import "../../App.css"

const CourseEnrollment = () => {
  const [expanded, setExpanded] = useState(null);

  const courses = [
    { id: 1, title: 'Website and Mobile App Development',region: "karachi", deadline: '24th Jan 2024', description: ['12 months module', 'Weekdays Classes', 'Any other description', 'Any other description'], color: 'bg-blue-100' },
    { id: 2, title: 'Website and App',region: "karachi", deadline: '24th Jan 2024', description: [''], color: 'bg-blue-100' },  
    { id: 5, title: 'Website and App',region: "islamabad", deadline: '24th Jan 2024', description: [''], color: 'bg-pink-100' },
    { id: 6, title: 'Website and App',region: "hyderabad", deadline: '24th Jan 2024', description: [''], color: 'bg-green-100' },
    { id: 7, title: 'Website and App',region: "islamabad", deadline: '24th Jan 2024', description: [''], color: 'bg-green-100' },
  ];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-2">
      <Sidebar />
      <div className="flex-1 bg-white p-2 rounded-lg shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 className="text-2xl font-bold mb-10"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            //if ourses is empty then display No available courses in the middle of the page
          courses.map((course) => (
            <div
              key={course.id}
              style={
                {
                  fontFamily: "Arsenal SC"
                }
              }
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
                    <span className="text-sm text-gray-600">Deadline | {course.deadline}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;

import React from 'react';
import './OrbitingText.css';

const OrbitingText = ({color}) => {
  return (
    <div id="container"  className='' >
      <div id="circle" className=''>
        <svg
          x="0px"
          y="0px"
          width="300px"
          // height="300px"
          viewBox="0 0 300 300"
          enableBackground="new 0 0 300 300"
          xmlSpace="preserve"
        >
         <svg width="300" height="300">
  <defs>
    <path
      id="circlePath"
      d="M 150, 150 m -50, 0 a 50,50 0 0,1 100,0 a 50,50 0 0,1 -100,0"
    />
  </defs>
  <g className="rotating">
    <use xlinkHref="#circlePath" fill="none" />
    <text fill={color}>
      <textPath xlinkHref="#circlePath"
      style={{
        fontFamily: "Arsenal SC"
      }}>
        SMIT - Saylani Mass IT Training Program
      </textPath>
    </text>
  </g>
</svg>


          <text x="150" y="150" textAnchor="middle" fill="#fff" dy=".3em" className='text-circular-path' 
          style={{
            fontFamily: "Arsenal SC"
          
          }}>
            SMIT
          </text>
        </svg>
      </div>
    </div>
  );
};

export default OrbitingText;

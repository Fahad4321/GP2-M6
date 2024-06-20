import React from 'react';
import { useSelector } from 'react-redux';



const Loading = () => {
  const loader = useSelector((state)=> state.loader.loader)
  return (
    <>
      <div style={{display: `${loader}`}}>
        <div className={`fixed top-0 left-0 w-full h-full bg-[#8080803d]  justify-center items-center z-50 bg-white flex`}>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-400 h-12 w-12 mb-4">
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

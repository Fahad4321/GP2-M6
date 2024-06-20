import React from 'react';
import { FaLaptopCode, } from 'react-icons/fa';

const WhyLearn = () => {
    const data = [
        {
            icon: <FaLaptopCode className='w-12 h-12'/>,
            title: "Learn",
            comment: "We are taught here by skilled teachers. You can safely take the className"
        },
        {
            icon: <FaLaptopCode className='w-12 h-12'/>,
            title: "Graduate",
            comment: "Our platform is taught by graduate teachers. All teachers are graduates. You can safely take the className"
        },
        {
            icon: <FaLaptopCode className='w-12 h-12'/>,
            title: "Pro Batch",
            comment: "We pro batch those who will do well in our course so that they can easily get into job placement"
        },
        {
            icon: <FaLaptopCode className='w-12 h-12'/>,
            title: "Work",
            comment: "Those who do well in our course will have a guaranteed job opportunity"
        },
      ];

    return (
        <div>
            <section className="text-gray-700 body-font bg-gray-100">
                <h2 className='pt-20 pb-2 text-3xl text-[#140342] font-bold text-center'>Why learn with our courses</h2>
                <h2 className='text-md text-gray-600 text-center'>You can safely take the className</h2>
                <div className="w-10/12 px-5 pb-24 pt-16 mx-auto content-center">
                    <div className="flex flex-wrap 2xl:mx-9 text-center">
                        {data.map((data, i)=>(
                        <div key={i} className="p-4 md:w-2/6 sm:w-1/2 lg:w-1/4 w-full">
                            <div className="border-2 hover:bg-indigo-200 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 min-h-[270px] cursor-pointer items-center justify-center ">
                                
                            <p className="text-[#140342] inline-block text-center" >
                                {data.icon}
                            </p>
                            <h2 className="title-font pb-2 font-medium text-3xl text-gray-900">{data.title}</h2>
                            <p className="leading-relaxed">{data.comment}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyLearn;
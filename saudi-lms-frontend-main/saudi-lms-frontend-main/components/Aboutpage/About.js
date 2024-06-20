import Link from 'next/link';
import React from 'react';

const About = () => {
    return (
        <section className=" text-gray-700 font-roboto">
        <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
            <div>
            <h2 className='pb-2 text-4xl text-[#140342] font-bold text-center'>Know About Us</h2>
            </div>
            <div>
                <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center lg:w-11/12 mx-auto">
                    <div className="lg:col-start-2">
                        <p className='text-[#140342] font-bold'>Why Choose Us</p>
                        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#140342]">Learn Something Good, Do Something Better</h3>
                        <div className="mt-4 space-y-12">
                            <div className="">
                                <p>We are a Learning Management System designed to provide an intuitive and effective online learning experience. Our platform is dedicated to facilitating lifelong learning through technology, offering customizable course creation, collaborative learning, and powerful assessment and analytics tools. We are committed to making education accessible to everyone, empowering learners and educators alike to achieve their goals and realize their full potential.</p>
                                <br />
                                <p>We are a Learning Management System designed to provide an intuitive and effective online learning experience. Our platform is dedicated to facilitating lifelong learning through technology, offering customizable course creation, collaborative learning, and powerful assessment and analytics tools.</p>
                            </div>
                        </div>
                        <Link href='/course' className=" mt-6 z-10 px-6 py-3 bg-[#140342] border-2 text-white rounded-full border-[#140342] uppercase font-normal tracking-wider leading-none hover:bg-transparent hover:bg-[#140342] hover:text-[#140342] transition duration-500 ease-in-out"  type="button"> My Courses </Link>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                        <img src="https://cdn.rabbil.com/photos/images/2022/11/04/whyChoose.png" alt="" className="mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default About;
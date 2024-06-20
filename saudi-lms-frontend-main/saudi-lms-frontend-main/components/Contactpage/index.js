/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Faq from "./Faq";

const Contactpage = () => {
  return (
    <div>
      <div>
        <section className="pt-10 pb-20 text-black font-roboto">
          <div className="pb-12">
            <h2 className=" pb-2 text-lg text-black font-semibold text-center">
              Have Questions?
            </h2>
            <h2 className="pb-2 text-4xl text-[#140342] font-bold text-center">
              CONTACT US .
            </h2>
            <h2 className=" text-md text-gray-500 text-center">
              Are you looking for amazing LMS platform? <br /> Don&apos;t worry!
              We got it for you!
            </h2>
          </div>
          <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
            <div className="py-6 md:py-0 md:px-6">
              <h1 className="text-3xl font-bold mb-8">Contact Info</h1>
              <div className="space-y-4 mb-11">
                <div className="flex items-center">
                  <div className="flex items-center bg-[#140342] rounded-full h-10 w-10 mr-4">
                    <img
                      src="https://img.icons8.com/?size=512&id=85149&format=png"
                      alt="BAYC"
                      className="invert p-2"
                    />
                  </div>
                  <div className="">
                    <p className="font-bold text-xl mr-2"> Location</p>
                    <Link
                      href="https://www.google.com/maps/place/Kochukhet+-+Cantonment+Circle/@23.7909689,90.3852161,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c7393fdfc4d1:0x8252b4f8cddbd1f9!8m2!3d23.790964!4d90.387791!16s%2Fg%2F11lkksf748"
                      target="_blank"
                      className="font-medium text-gray-600"
                    >
                      Riyadh, Saudi Arabia
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-[#140342] rounded-full h-10 w-10 mr-4">
                    <img
                      src="https://img.icons8.com/?size=512&id=9730&format=png"
                      alt="BAYC"
                      className=" invert p-2"
                    />
                  </div>
                  <div className="">
                    <p className="font-bold text-xl mr-2"> Phone</p>
                    <p className="font-medium text-gray-600">
                      +966 XX XX XX XX
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-[#140342] rounded-full h-10 w-10 mr-4">
                    <img
                      src="https://img.icons8.com/?size=512&id=jicLxt1sA2qa&format=png"
                      alt="BAYC"
                      className="invert p-2"
                    />
                  </div>
                  <div className="">
                    <p className="font-bold text-xl mr-2"> Email</p>
                    <p className="font-medium text-gray-600">
                      lms966@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold mb-3">Follow Us</p>
                <div className="flex flex-col justify-center pt-6 lg:pt-0">
                  <div className="flex justify-start space-x-4">
                    <div className="pt-1 hover:pt-0 transition-all duration-500 ease-in-out">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        title="Instagram"
                        className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-300 text-gray-900"
                      >
                        <img
                          src="https://img.icons8.com/?size=512&id=32292&format=png"
                          className="w-5 h-5"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="pt-1 hover:pt-0 transition-all duration-500 ease-in-out">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        title="Twitter"
                        className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-300 text-gray-900"
                      >
                        <img
                          src="https://img.icons8.com/?size=512&id=8824&format=png"
                          className="w-5 h-5"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="pt-1 hover:pt-0 transition-all duration-500 ease-in-out">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        title="Facebook"
                        className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-300 text-gray-900"
                      >
                        <img
                          src="https://img.icons8.com/?size=512&id=118467&format=png"
                          className="w-6 h-6"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:px-6">
              <h1 className="text-2xl font-medium">Send A Message</h1>
              <p className="pt-2 pb-4">
                Hi, thanks for contacting us. We have received your message and
                appreciate you reaching out.asd
              </p>
              <form className="flex flex-col py-6 space-y-6 md:py-0 ng-untouched ng-pristine ng-valid">
                <label className="block ">
                  <span className="mb-1">Full name</span>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className="mt-2 block w-full rounded-md shadow-sm focus-visible:outline-none  bg-white px-4 py-2 "
                  />
                </label>
                <label className="block ">
                  <span className="mb-1">Email address</span>
                  <input
                    type="email"
                    placeholder="ex@gmail.com"
                    className="mt-2 block w-full rounded-md shadow-sm focus-visible:outline-none  bg-white px-4 py-2 "
                  />
                </label>
                <label className="block ">
                  <span className="">Message</span>
                  <textarea
                    rows="3"
                    placeholder="Message"
                    className="mt-2 block w-full rounded-md focus-visible:outline-none  bg-white px-4 py-2 "
                    spellCheck="false"
                  ></textarea>
                </label>
                <button
                  type="button"
                  placeholder="Your Message"
                  className="self-start px-8 py-2 text-lg rounded bg-[#140342] hover:bg-[#130a2c] text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Faq />
    </div>
  );
};

export default Contactpage;

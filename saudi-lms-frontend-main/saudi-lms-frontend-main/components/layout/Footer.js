import React from "react";
import { FaBookReader } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-14 divide-y divide-gray-700 bg-[#140342] text-gray-100">
        <div className="py-6 flex flex-col justify-center items-center text-sm text-center text-gray-400">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-start space-x-3 pb-3"
          >
            <span className="self-center text-2xl font-semibold text-white">
              { process.env.NEXT_PUBLIC_APP_NAME || 'CLP' }
            </span>
          </a>
          <span>© {new Date().getFullYear()} { process.env.NEXT_PUBLIC_APP_NAME || 'CLP' } All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

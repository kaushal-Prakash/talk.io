import Link from 'next/link'; 
import React from 'react';
import { FaComments, FaHome } from 'react-icons/fa'; // Added FaHome icon

function Navbar() {
  return (
    <nav className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <FaComments className="text-2xl mr-2 text-blue-400" />
          <h1
            className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={() => (window.location.href = '/')}
          >
            talk.io
          </h1>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
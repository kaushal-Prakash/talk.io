import React from 'react';
import { FaComments } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex items-center">
        <FaComments className="text-2xl mr-2 text-blue-400" />
        <h1 className="text-2xl font-bold">talk.io</h1>
      </div>
    </nav>
  );
}

export default Navbar;
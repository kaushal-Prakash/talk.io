"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatRoom from "@/components/ChatRoom";
import socket from "@/utils/socket";
import { FaUser, FaHashtag, FaRocket } from "react-icons/fa";

function Home() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (room.trim() && username.trim()) {
      setJoined(true);
      socket.emit("joinRoom", { room, username });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        {!joined ? (
          <div className="max-w-md mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">Join a Chat Room</h2>
            <div className="space-y-6">
              <div className="flex items-center bg-gray-700 rounded-lg p-3">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-transparent focus:outline-none text-white"
                />
              </div>
              <div className="flex items-center bg-gray-700 rounded-lg p-3">
                <FaHashtag className="text-gray-400 mr-3" />
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Enter room name"
                  className="w-full bg-transparent focus:outline-none text-white"
                />
              </div>
              <button
                onClick={joinRoom}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaRocket className="mr-2" />
                Join Room
              </button>
            </div>
          </div>
        ) : (
          <ChatRoom socket={socket} room={room} username={username} />
        )}
      </div>
      {!joined && (
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2">Real-Time Chat</h4>
              <p className="text-gray-400">Chat with others in real-time with instant message delivery.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2">Multiple Rooms</h4>
              <p className="text-gray-400">Join or create multiple chat rooms for different topics.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:shadow-2xl transition-all duration-300">
              <h4 className="text-xl font-semibold mb-2">User-Friendly</h4>
              <p className="text-gray-400">Simple and intuitive interface for seamless chatting.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatRoom from "@/components/ChatRoom";
import socket from "@/utils/socket"; // Import the socket instance

function Home() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (room.trim() && username.trim()) {
      setJoined(true);
      socket.emit("joinRoom", { room, username }); // Send username to the backend
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        {!joined ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Join a Chat Room</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none"
            />
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room name"
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none"
            />
            <button
              onClick={joinRoom}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Join Room
            </button>
          </div>
        ) : (
          <ChatRoom socket={socket} room={room} username={username} />
        )}
      </div>
    </div>
  );
}

export default Home;
/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Message from "./Comments";
import { FaPaperPlane } from "react-icons/fa";

interface MessageType {
  sender: string;
  text: string;
}

interface ChatRoomProps {
  socket: any;
  room: string;
  username: string;
}

export default function ChatRoom({ socket, room, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message: MessageType) => {
      setMessages((prev: MessageType[]) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", { room, username, text: input });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
            isCurrentUser={msg.sender === username}
          />
        ))}
      </div>

      {/* Input Field Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-700 rounded-l-lg focus:outline-none text-white"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg transition-all duration-300"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
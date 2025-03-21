/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Message from "./Comments";

interface MessageType {
  sender: string;
  text: string;
}

interface ChatRoomProps {
  socket: any; // Replace 'any' with the appropriate type for your socket
  room: string;
  username: string; // Add username prop
}

export default function ChatRoom({ socket, room, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24"> {/* Add pb-24 for bottom padding */}
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
            isCurrentUser={msg.sender === username} // Compare sender with current username
          />
        ))}
      </div>

      {/* Input Field Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
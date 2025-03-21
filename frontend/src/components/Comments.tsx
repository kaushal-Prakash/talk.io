"use client";
import React from "react";

interface MessageProps {
  sender: string;
  text: string;
  isCurrentUser: boolean;
}

export default function Message({ sender, text, isCurrentUser }: MessageProps) {
  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`${
          isCurrentUser
            ? "bg-gradient-to-br from-blue-600 to-blue-700"
            : "bg-gradient-to-br from-gray-700 to-gray-800"
        } text-white rounded-xl p-4 max-w-xs break-words backdrop-blur-lg bg-opacity-80 border ${
          isCurrentUser ? "border-blue-500" : "border-gray-600"
        } shadow-lg hover:shadow-xl transition-shadow duration-300`}
      >
        {/* Sender Name with Highlight */}
        <p
          className={`text-sm font-semibold mb-1 ${
            isCurrentUser ? "text-blue-200" : "text-purple-300"
          }`}
        >
          {sender}
        </p>
        {/* Message Text with Highlight */}
        <p
          className={`text-sm${
            isCurrentUser ? "text-blue-100" : "text-gray-100"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
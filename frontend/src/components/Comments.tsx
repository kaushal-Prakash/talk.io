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
          isCurrentUser ? "bg-blue-600" : "bg-gray-700"
        } text-white rounded-lg p-3 max-w-xs break-words backdrop-blur-lg bg-opacity-50 border border-gray-600`}
      >
        <p className="text-sm font-semibold">{sender}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
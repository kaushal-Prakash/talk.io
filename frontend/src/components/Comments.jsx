export default function Message({ sender, text, isCurrentUser }) {
    return (
      <div
        className={`flex ${
          isCurrentUser ? "justify-end" : "justify-start"
        } mb-4`}
      >
        <div
          className={`${
            isCurrentUser ? "bg-blue-500" : "bg-gray-500"
          } text-white rounded-lg p-3 max-w-xs break-words`}
        >
          <p className="text-sm font-semibold">{sender}</p>
          <p>{text}</p>
        </div>
      </div>
    );
  }
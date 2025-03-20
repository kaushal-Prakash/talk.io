import { FaComments } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex items-center">
        <FaComments className="text-2xl mr-2" />
        <h1 className="text-2xl font-bold">talk.io</h1>
      </div>
    </nav>
  );
}
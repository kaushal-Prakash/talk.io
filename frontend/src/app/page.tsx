import Image from "next/image";

export default function Home() {
  return (
    <div>
      hello
    </div>
  );
}import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return <Component {...pageProps} socket={socket} />;
}

export default MyApp;

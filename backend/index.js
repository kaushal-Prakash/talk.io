import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is UP!");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New Chat connection");

  socket.on("chatMessage", (message) => {
    console.log("Message received:", message);
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
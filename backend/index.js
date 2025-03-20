import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes.js";
import Message from "./models/message.js";
import http from "http";
import connectDB from "./utils/connectDB.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/msg", messageRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Send a message
  socket.on("sendMessage", async (data) => {
    const { room, sender, text } = data;
    const message = new Message({ room, sender, text });
    await message.save();
    io.to(room).emit("receiveMessage", message); // Broadcast to the room
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { Server } from "socket.io";

export default function handler(_req, res) {

  if (!res.socket.server.io) {

    console.log("Starting Socket.IO server...");

    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {

      console.log("User connected:", socket.id);

      // join room
      socket.on("join-room", (roomName) => {

        socket.join(roomName);

        console.log(`${socket.id} joined room ${roomName}`);

      });

      // room message
      socket.on("chat-message", ({ roomName, message }) => {

        io.to(roomName).emit("chat-message", message);

      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });

    });

  }

  res.end();

}
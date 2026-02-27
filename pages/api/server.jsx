import { Server } from "socket.io";

export default function handler(_req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");

    const io = new Server(res.socket.server); //server create krna 

    res.socket.server.io = io;

    io.on("connection", (socket) => {//naye connection kai liye
      console.log("User connected");

      
      socket.on("chat-message", (msg) => { //client se kuvh receive krne kai liye 
        io.emit("chat-message", msg);  // sb connected clients to broadcast krne kai liye
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  res.end();
}


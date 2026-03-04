
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket;

export default function RoomChatInterface({ Name }) {
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const room = rooms.find((r) => r.roomName === Name);
    if (room) {
      setAllMessages(room.messages);
    } else {
      setAllMessages([]); 
    }
  }, [Name]);


  useEffect(()=>{

   const initsocket=async()=>{
    await fetch("/api/roomServer");

    socket=io();

    socket.emit("join-room",Name)

  socket.on("chat-message", (data) => {
  setAllMessages(prev => [...prev, data.message]);
});

   }

   initsocket();

    return () => {
      if (socket) socket.disconnect();
    };

  },[Name])



  function saveMessage() {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      timestamp: new Date().toISOString(),
    };

   socket.emit("chat-message",{
    roomName:Name,
    message:newMessage
})

    // const updatedMessages = [...allMessages, newMessage];
    // setAllMessages(updatedMessages);
    setMessage(""); 
  }


  function handleBack() {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const roomIndex = rooms.findIndex((r) => r.roomName === Name);

    if (roomIndex !== -1) {
      rooms[roomIndex].messages = allMessages;
    } else {
      rooms.push({ name: Name, messages: allMessages });
    }

    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-105 h-150 bg-white shadow-xl rounded-xl flex flex-col">
 
        <div className="px-4 py-3 shadow-sm flex items-center gap-2">
          <Link href="/createRooms">
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Back
            </button>
          </Link>

          <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
            {Name.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-semibold text-lg">{Name}</h1>
        </div>

    
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {allMessages.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-200 px-3 py-2 rounded-lg max-w-xs "
            >
              {msg.text}
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <div className="shadow-sm p-3 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={saveMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
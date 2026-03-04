"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateRoomPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [createRoom, setCreateRoom] = useState(false);

  

  const rooms = JSON.parse(localStorage.getItem("rooms"))||[];
  const handleCreate = () => {
    if (!name.trim() || !room.trim()) return;
    // const rooms = roomsData ? JSON.parse(roomsData) : [];

    if (rooms[room]) {
      if (!rooms[room].includes(name)) {
        rooms[room].push(name);
      }
    } else {
      rooms[room] = [name];
    }


  const roomExists = rooms.some((r) => r.roomName === room);

  if (!roomExists) {
    rooms.push({ creator: name, roomName: room ,messages:[] });
  }

    localStorage.setItem("rooms", JSON.stringify(rooms));

    router.push(`/createRooms/room/${room}`);
  };

  const handleCancel = () => {
    setCreateRoom(false)
  };

  return (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    <div className="w-96 h-150 bg-white shadow-xl rounded-xl flex flex-col">
      <div className="flex justify-between px-5 py-4 border-b-2">
        <button
          onClick={() => setCreateRoom(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Create Room
        </button>

    <Link href={"/"}>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
            back
            </button>
    </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h1 className="font-semibold p-2 text-center text-xl mb-4">
           {createRoom ? "Create or Join Room":"Available Rooms"}
        </h1>

        {createRoom ? (
          <div className="bg-white shadow-xl rounded-xl w-96 p-8 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Room Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCreate}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // SHOW ROOM LIST
          <div>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <Link
                  key={room.roomName}
                  href={`/createRooms/room/${room.roomName}`}
                >
                  <div className="flex items-center justify-between px-5 py-4 shadow-sm cursor-pointer hover:bg-gray-100 transition">
                    <div>
                      <h1 className="font-bold text-2xl">{room.roomName}</h1>
                      <p>created by {room.creator}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-between px-5 py-4 border-b cursor-pointer hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <p className="font-medium">No rooms found</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);


}
"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Link from "next/link";
let socket;



// export default function ChatAppInterface ({ Name }) {
//   const [allMessages, setAllMessages] = useState([]);
//   const [message, setMessage] = useState("");


//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find((u) => u.name === Name);
//     if (user) {
//         console.log(user.messages);
//       setAllMessages(user.messages ||[]);
//     } else {
//       setAllMessages([]); 
//     }
//   }, [Name]);


//   function saveMessage() {
//     if (!message.trim()) return;

//     const newMessage = {
//       msg: message,
//       timestamp: new Date().toISOString(),
//     };

//     const updatedMessages = [...allMessages, newMessage];
//     setAllMessages(updatedMessages);
//     setMessage(""); 
//   }


//   function handleBack() {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userIndex = users.findIndex((u) => u.name === Name);

//     if (userIndex !== -1) {
//       users[userIndex].messages = allMessages;
//     } else {
//       users.push({ name: Name, messages: allMessages });
//     }

//     localStorage.setItem("users", JSON.stringify(users));
//   }

//   return (
//     <div className="h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-105 h-150 bg-white shadow-xl rounded-xl flex flex-col">
 
//         <div className="px-4 py-3 shadow-sm flex items-center gap-2">
//           <Link href="/">
//             <button
//               onClick={handleBack}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Back
//             </button>
//           </Link>

//           <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
//             {Name.charAt(0).toUpperCase()}
//           </div>
//           <h1 className="font-semibold text-lg">{Name}</h1>
//         </div>

    
//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {allMessages.map((item, index) => (
//             <div
//               key={index}
//               className="bg-gray-200 px-3 py-2 rounded-lg max-w-xs "
//             >
//               {item.msg}
//               <div className="text-xs text-gray-500 mt-1">
//                 {new Date(item.timestamp).toLocaleTimeString()}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="shadow-sm p-3 flex gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             onClick={saveMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function ChatAppInterface({ Name }) {

  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.name === Name);

    if (user) {
      setAllMessages(user.messages || []);
    } else {
      setAllMessages([]);
    }
  }, [Name]);


  useEffect(() => {

    const initSocket = async () => {

      await fetch("/api/server");

      socket = io();

      socket.on("chat-message", (msg) => {

        setAllMessages((prev) => {

          const exists = prev.find(
            m => m.timestamp === msg.timestamp && m.msg === msg.msg
          );

          if (!exists) {
            return [...prev, msg];
          }

          return prev;

        });

      });

    };

    initSocket();

    return () => {
      if (socket) socket.disconnect();
    };

  }, []);


  function saveMessage() {

    if (!message.trim()) return;

    const newMessage = {
      msg: message,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat-message", newMessage);

    setAllMessages((prev) => [...prev, newMessage]);

    setMessage("");

  }

  function handleBack() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.name === Name);

    if (userIndex !== -1) {
      users[userIndex].messages = allMessages;
    } else {
      users.push({ name: Name, messages: allMessages });
    }

    localStorage.setItem("users", JSON.stringify(users));

  }


  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-105 h-150 bg-white shadow-xl rounded-xl flex flex-col">

        <div className="px-4 py-3 shadow-sm flex items-center gap-2">

          <Link href="/">
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

          {allMessages.map((item, index) => (

            <div
              key={index}
              className="bg-gray-200 px-3 py-2 rounded-lg max-w-xs"
            >

              {item.msg}

              <div className="text-xs text-gray-500 mt-1">
                {new Date(item.timestamp).toLocaleTimeString()}
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
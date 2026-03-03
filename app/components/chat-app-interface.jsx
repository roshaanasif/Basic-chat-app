// "use client";

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Link from "next/link";
// let socket;

// export default function ChatAppInterface({Name}) {

//   console.log(Name);
  
//     const[message,setmessage]=useState("");
//     const[messages,setmessages]=useState([]);
//    const [users, setUsers] = useState(() => {
//   const stored = localStorage.getItem("users");
//   return stored ? JSON.parse(stored) : [];
// });


//     useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users"))||[];
//     setUsers(storedUsers);

//     const findingUser = storedUsers.find(user => user.name === Name);
//     if (findingUser && Array.isArray(findingUser.messages)) {
//       setmessages(findingUser.messages);
//     } else if (!findingUser) {
//       findingUser.messages = [];
//       // setmessages([]);
//     }

//   }, [Name]);



//    useEffect(() => {
//     const initSocket = async () => {
//       await fetch("/api/server"); 

//       socket = io();

//       socket.on("chat-message", (msg) => {
//       setmessages(prev => {
//           if (!prev.find(m => m.time === msg.time && m.text === msg.text)) {
//             return [...prev, msg];
//           }
//           return prev;
//         });
//             });
//     };

//     initSocket();

//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, []);

   
    
//   function saveMessage(){
//       if(!message.trim())return
//       const newMessage ={text:message,time:new Date().toLocaleTimeString() };
//       socket.emit("chat-message", newMessage); 
//        setmessage("")
//     }

// useEffect(() => {
//   if (!users.length) return;

//   const updatedUsers = users.map(user => {
//     if (user.name === Name) {
//       return { ...user, messages };
//     }
//     return user;
//   });

//   setUsers(updatedUsers);
//   localStorage.setItem("users", JSON.stringify(updatedUsers));

// }, [messages,Name]);

 

//   return (
//     <div className="h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-105 h-150 bg-white shadow-xl rounded-xl flex flex-col">

//         <div className="px-4 py-3 shadow-sm flex items-center gap-2">

//           <Link href="/" >
//            <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//             back
//           </button>
//           </Link>

//           <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
//                     {Name.charAt(0).toUpperCase()}
//                 </div>
//           <h1 className="font-semibold text-lg">{Name}</h1>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3">

//         <div className="flex flex-col gap-2">


//         {messages.length === 0 ? (
//         <div className="w-full text-gray-500 flex justify-center text-center items-center px-4 py-2 rounded-lg max-w-[70%] italic">
//           Start the conversation
//         </div>
//       ) : (    
//           messages.map((item,i)=>{
//             return(
//             <div key={i} className="bg-gray-200 flex justify-between text-gray-800 px-4 py-2 rounded-lg max-w-[70%]">
//                 <div className="w-full">
//                {item.text}
//                 </div>
//                 <div className="w-14 text-sm mt-4">
//                {item.time}
//                 </div>
//             </div>
//             )
//           })

//         )}
        
  
//           </div>
        
//         </div>

//         <div className="shadow-sm p-3 flex gap-2">

//           <input
//             type="text"
//             value={message}
//             onChange={(e)=>{setmessage(e.target.value);}}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button onClick={saveMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//             Send
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }
  



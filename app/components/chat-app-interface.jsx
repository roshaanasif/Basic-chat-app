import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// const socket =io();

export default function ChatAppInterface() {

    const[message,setmessage]=useState("");
    const[messages,setmessages]=useState([]);

    useEffect(() => {
        const savedMessages = localStorage.getItem("messages");
        if (savedMessages) {
        setmessages(JSON.parse(savedMessages));
        }
    }, []);
    
    function saveMessage(){

       const newMessage ={text:message,time:new Date().toLocaleTimeString() };
       setmessages(prev=>[...prev,newMessage])
       setmessage("")
    }
    
    useEffect(()=>{
     localStorage.setItem("messages",JSON.stringify(messages));
    },[messages])


  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-105 h-150 bg-white shadow-xl rounded-xl flex flex-col">

        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h1 className="font-semibold text-lg">Chat</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">

            <div className="flex flex-col gap-2">
          {messages.map((item,i)=>{
            return(
            <div key={i} className="bg-gray-200 flex justify-between text-gray-800 px-4 py-2 rounded-lg max-w-[70%]">
                <div className="w-full">
               {item.text}
                </div>
                <div className="w-15 text-sm mt-4">
               {item.time}
                </div>
            </div>
            )
          })}
          </div>

        </div>

        <div className="border-t p-3 flex gap-2">

          <input
            type="text"
            value={message}
            onChange={(e)=>{setmessage(e.target.value);}}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button onClick={saveMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Send
          </button>

        </div>

      </div>
    </div>
  );
}
  
"use client"

import Link from "next/link";
import { useEffect, useState } from "react"

const users=[

    {
        name:"ali",
        id:Date.now(),
        messages:[]
    },
    {
        name:"hammad",
        id:Date.now(),
        messages:[]
    },
    {
        name:"hamza",
        id:Date.now(),
        messages:[]
    },
]


export default function GettingUsers() {
   const [allUsers,setUsers]=useState([])
    
useEffect(()=>{
    localStorage.setItem("users", JSON.stringify(users)); 
     
},[])


useEffect(()=>{
    let usersData=JSON.parse(localStorage.getItem("users")||[]);

    setUsers(usersData)
},[])



 

return(
    <div className="h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-96 h-150 bg-white shadow-xl rounded-xl flex flex-col">

        <div className="px-5 py-4 border-b-2">
          <h1 className="text-xl font-semibold">Users</h1>
        </div>

       
        <div className="flex-1 overflow-y-auto">
            

      {allUsers && allUsers.length > 0 ? (
        allUsers.map((user) => (
            <Link key={user.name} href={`/privateChats/${user.name}`}>
            <div className="flex items-center justify-between px-5 py-4 shadow-sm cursor-pointer hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-medium">{user.name}</p>
                </div>
                </div>
            </div>
            </Link>
        ))
        ) : (
        <div className="flex items-center justify-between px-5 py-4 border-b cursor-pointer hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
            <div>
                <p className="font-medium">No users found</p>
            </div>
            </div>
        </div>
        )}

        </div>

      </div>

    </div>
  );
}

"use client"
import { useParams } from "next/navigation";
import ChatAppInterface from "../../components/chat-app-interface" 


export default function privateChat() {

const params = useParams();     
const { username } = params;         
 


 return(
    <div className="h-screen bg-gray-100 flex items-center justify-center">
    <ChatAppInterface Name={username} />
    </div>   

 ) 
}

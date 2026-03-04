"use client"
import { useParams } from "next/navigation";
import RoomChatInterface from "../../../components/room-chat-interface" 


export default function rooms() {

const params = useParams();     
const { roomName } = params;         
 


 return(
    <div className="h-screen bg-gray-100 flex items-center justify-center">
    <RoomChatInterface Name={roomName}  />
    </div>   

 ) 
}

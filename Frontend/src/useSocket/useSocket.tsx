import { useEffect, useState } from "react";
// const WS_URL="ws://localhost:8080";

export const useSocket=()=>{
    const [socket,setSocket]=useState<WebSocket | null>(null);


    useEffect(()=>{
        const ws=new WebSocket("ws://localhost:8080");
        ws.onopen=()=>{
            console.log("connected");
            setSocket(ws);
            console.log("hello");
        }
        ws.onclose=()=>{
            console.log("disconnected");
            setSocket(null);
        }
        return ()=>{
            ws.close();
        }
    },[])
    return socket;
}
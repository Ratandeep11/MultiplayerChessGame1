import {WebSocket} from "ws";
import { INIT_GAME } from "./Messages";
import { Game  } from "./Game";
import { MOVE } from "./Messages";
export class GameManager{
    private games:Game[];
    private pendingUser:WebSocket | null;
    private users:WebSocket[];
    constructor (){
        this.games=[];
        this.pendingUser=null;
        this.users=[];

    }
    addUser(socket:WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
        // console.log("User added:", socket);
    }
    removeUser(socket:WebSocket){
        this.users=this.users.filter(user=>user!==socket);
    }
    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
         const message=JSON.parse(data.toString());
            
      
        if(message.type===INIT_GAME){
            if(this.pendingUser){
                const game=new Game(this.pendingUser,socket);
                this.games.push(game);
                this.pendingUser=null;
                console.log("Succesfully both connected");
            }
            else{
                this.pendingUser=socket;
                console.log(" Not connected");
            }
        }
        if(message.type===MOVE){
            const game= this.games.find(game=>game.player1===socket||game.player2===socket);
            if(game){
                // const moveData = message.payload; // Assuming payload contains move information
                game.makeMove(socket, message.payload.move);
                console.log(message.payload.move);
            }
        }}
)}
    
}
import WebSocket from "ws";
import {Chess} from 'chess.js';
import { GAME_OVER } from "./Messages";
import { MOVE } from "./Messages";
import { INIT_GAME } from "./Messages";
export class Game{
   public player1:WebSocket;
   public player2:WebSocket;
    private board:Chess;
    private moves:string[];
    private startTime:Date;
    private MoveCount:0;

    constructor(player1:WebSocket,player2:WebSocket){
            this.player1=player1;
            this.player2=player2;
            this.board=new Chess();
            this.moves=[];
            this.startTime=new Date();
            this.MoveCount=0;
            console.log(" both connected");
            this.player1.send(JSON.stringify({
                type:INIT_GAME,
                payload:{
                    color:"white"
                }
            }))
            
            this.player2.send(JSON.stringify({
                type:INIT_GAME,
                payload:{
                    color:"black"
                }
            }))




    }
    makeMove(socket:WebSocket,move:{from :string;to:string;}){
     

        //validation here
        if(this.MoveCount%2===0&&socket!==this.player1){
            return;
        }
        if(this.MoveCount%2===1&&socket!==this.player2){
            return;
        }
        try{
            this.board.move(move);

        }
        catch(e){
            return;
        }
        //is it this user move
        //is this move valid
        if(this.board.isGameOver()){
            //send the game over message to both players
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }))
            return ;
        }
        //update the board
        //push the board
        if(this.MoveCount%2==0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
           this.player1.send (JSON.stringify({
            type:MOVE,
            payload:move
           }))
        }
        //check id the game is over
            this.MoveCount++;
        //send the updated board to both this.player1
    }
}
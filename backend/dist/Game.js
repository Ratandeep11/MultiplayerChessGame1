"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
const Messages_2 = require("./Messages");
const Messages_3 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.MoveCount = 0;
        console.log(" both connected");
        this.player1.send(JSON.stringify({
            type: Messages_3.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Messages_3.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        //validation here
        if (this.MoveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.MoveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            return;
        }
        //is it this user move
        //is this move valid
        if (this.board.isGameOver()) {
            //send the game over message to both players
            this.player1.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        //update the board
        //push the board
        if (this.MoveCount % 2 == 0) {
            this.player2.send(JSON.stringify({
                type: Messages_2.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Messages_2.MOVE,
                payload: move
            }));
        }
        //check id the game is over
        this.MoveCount++;
        //send the updated board to both this.player1
    }
}
exports.Game = Game;

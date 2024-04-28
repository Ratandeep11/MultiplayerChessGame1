"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Messages_1 = require("./Messages");
const Game_1 = require("./Game");
const Messages_2 = require("./Messages");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
        // console.log("User added:", socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                    console.log("Succesfully both connected");
                }
                else {
                    this.pendingUser = socket;
                    console.log(" Not connected");
                }
            }
            if (message.type === Messages_2.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    // const moveData = message.payload; // Assuming payload contains move information
                    game.makeMove(socket, message.payload.move);
                    console.log(message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;

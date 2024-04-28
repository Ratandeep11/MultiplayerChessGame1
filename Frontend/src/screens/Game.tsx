import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { ChessBoard } from "../Components/ChessBoard";
import { useSocket } from "../useSocket/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setboard] = useState(chess.board());
  const [started,setstarted]=useState(false);
  useEffect(() => {
    if (!socket) {
      console.log("early return in game.tsx");
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("You are in game.tsx");
      switch (message.type) {
        case INIT_GAME:
          setboard(chess.board());
          setstarted(true);
                    break;
        case MOVE:
          const move = message.payload;
          console.log("Received move:", move);

          try {
            console.log("Calling chess.move()");
            const result = chess.move(move, { strict: true }); // Use the strict option
            console.log("Move result:", result);

            if (result) {
              console.log("Valid move, updating board");
              setboard(chess.board());
              console.log("MOVE");
            } else {
              console.error("Invalid move:", move);
            }
          } catch (error) {
            console.error("Error in chess.move():", error);
          }
          break;

        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) {
    return <div>Connecting....</div>;
  }

  const handleInitGame = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: INIT_GAME }));
    }
  };

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full bg-red-400">
          <div className="col-span-4  w-full flex justify-center">
            <ChessBoard chess={chess} setboard={setboard} socket={socket} board={board} />
          </div>
          <div className="cols-span-2 bg-green-200 w-full flex justify-center">
            <div className="pt-0">
              {!started &&<Button onClick={handleInitGame}>Play</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

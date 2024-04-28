import React from 'react';
import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  setboard,
  chess,
  board,
  socket,
}: {
  setboard: any;
  chess: any;
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  return (
    <div className="text-white-200 grid grid-cols-8 gap-0 border-2 border-white-200 bg-slate-800">
      {board.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((square, j) => {
            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
            const isLight = (i + j) % 2 === 0;

            return (
              <div
                key={j}
                onClick={() => {
                  if (!from) {
                    setFrom(squareRepresentation);
                  } else {
                    socket.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: {
                            from,
                            to: squareRepresentation,
                          },
                        },
                      })
                    );
                    setFrom(null);
                    chess.move({
                      from,
                      to: squareRepresentation,
                    });
                    setboard(chess.board());
                  }
                }}
                className={`w-12 h-12 ${
                  isLight ? "bg-green-500" : "bg-slate-700"
                } flex items-center justify-center rounded-sm shadow-sm`}
              >
                {square && (
                  <img
                    className={`w-6 h-6 ${
                      square.color === "b" ? "invert" : ""
                    }`}
                    src={`/${square?.type}.png`}
                  />
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
import { useState } from 'react'
import { Square } from './Square'
import { Message } from './Message'

type SquaresValues = 'X' | 'O'

export function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [squares, setSquares] = useState<Array<SquaresValues>>(
    Array(9).fill(null),
  )

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
    // isDraw()
  }

  function calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  function getMessage() {
    const draw = squares.every((d) => d !== null)

    const winner = calculateWinner(squares)

    if (winner) {
      return 'Winner: ' + winner
    }
    if (draw) {
      return 'Draw!'
    }

    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <Message message={getMessage()} />

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

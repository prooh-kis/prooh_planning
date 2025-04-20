'use client';

import {useState, useEffect} from 'react';
import { isMobileDevice } from '../../utils';

const PUZZLE_IMAGE_URL = 'https://static.startuptalky.com/2022/02/Mudrex-Logo-Success-Story-Startuptalky.jpg';

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Engagement() {
  const gridSize = 3;
  const puzzlePieceSize = isMobileDevice() ? 256 : 512;
  const [pieceSize, setPieceSize] = useState(puzzlePieceSize / gridSize);
  const [imageURL] = useState(PUZZLE_IMAGE_URL);
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([]);
  const [solution, setSolution] = useState<number[]>([]);

  // Initialize puzzle pieces on initial load
  useEffect(() => {
    const initialPieces = Array.from({length: gridSize * gridSize}, (_, i) => i);
    setSolution([...initialPieces]);
    setPuzzlePieces(shuffle([...initialPieces]));
    setPieceSize(puzzlePieceSize / gridSize);
  }, [gridSize]);

  // Update piece size when grid size changes
  useEffect(() => {
    setPieceSize(puzzlePieceSize / gridSize);
  }, [gridSize]);

  const handlePieceDrop = (dragIndex: number, dropIndex: number) => {
    const newPieces = [...puzzlePieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];
    setPuzzlePieces(newPieces);
  };

  const isSolved = () => {
    return puzzlePieces.every((piece, index) => piece === solution[index]);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    e.currentTarget.dataset.index = String(index);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLDivElement;

    if (target && target.classList.contains('puzzle-piece')) {
      const dragIndex = Number((e.currentTarget as HTMLDivElement).dataset.index);
      const dropIndex = Number(target.dataset.index);
      if (dragIndex !== dropIndex) {
        handlePieceDrop(dragIndex, dropIndex);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">PuzzleSolve</h1>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${pieceSize}px)`,
          gridTemplateRows: `repeat(${gridSize}, ${pieceSize}px)`,
        }}
      >
        {puzzlePieces.map((pieceIndex, index) => {
          const row = Math.floor(pieceIndex / gridSize);
          const col = pieceIndex % gridSize;

          return (
            <div
              key={index}
              className={`border-2 border-primary cursor-grab rounded-md relative`}
              data-index={index}
              style={{
                width: pieceSize,
                height: pieceSize,
                backgroundImage: `url(${imageURL})`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                backgroundSize: `${gridSize * pieceSize}px ${
                  gridSize * pieceSize
                }px`,
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', String(index));
              }}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = Number(e.dataTransfer.getData('text/plain'));
                handlePieceDrop(dragIndex, index);
              }}
              onDragOver={(e) => e.preventDefault()}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
            >
            </div>
          );
        })}
      </div>
      {isSolved() && <p className="mt-4 text-green-500">Puzzle Solved!</p>}
    </div>
  );
}

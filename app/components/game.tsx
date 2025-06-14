'use client';

import { JSX, useEffect, useRef, useState } from 'react';

const FIELD_HEIGHT = 30;
const FIELD_WIDTH = 42;

type Point = { x: number; y: number };

// Догоняющий
const Chaser = ({ x, y }: Point) => <circle cx={x} cy={y} r="2" stroke="Black" strokeWidth=".05" fill="Blue" />;

// Новая фишка для догоняющего
const NewChaser = ({ x, y }: Point) => (
  <circle cx={x} cy={y} r="2" stroke="Black" strokeWidth=".05" fill="LightBlue" strokeDasharray={0.1} />
);

// Убегающий
const Escaper = ({ x, y }: Point) => <circle cx={x} cy={y} r="1" stroke="Black" strokeWidth=".05" fill="Green" />;

// Новая фишка для убегающего
const NewEscaper = ({ x, y }: Point) => (
  <circle cx={x} cy={y} r="1" stroke="Black" strokeWidth=".05" fill="LightGreen" strokeDasharray={0.1} />
);

export default function Game({ props = null }) {
  const viewbox = '0 0 ' + FIELD_WIDTH + ' ' + FIELD_HEIGHT;

  const svgRef = useRef<SVGSVGElement>(null);

  const [turn, setTurn] = useState('escaper');
  const handleClick = () => {
    if (turn === 'escaper') {
      setTurn('chaser');
    } else {
      setTurn('escaper');
    }
  };

  const getNearestPoint = (m: Point, chips: Point[]): Point => {
    let minLength = Infinity;
    let chip: Point;
    for (const c of chips) {
      const v1 = { x: m.x - c.x, y: m.y - c.y };
      const length = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      if (minLength > length) {
        minLength = length;
        chip = { x: c.x, y: c.y };
      }
    }
    return chip;
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // Создаем обработчик для движения мышки
    const handleMouseMove = (e: MouseEvent) => {
      const svgElement = svgRef.current;
      const rect = svgElement.getBoundingClientRect();
      if (
        e.clientX > rect.x &&
        e.clientX < rect.width + rect.x &&
        e.clientY > rect.y &&
        e.clientY < rect.height + rect.y
      ) {
        const mouse = {
          x: ((e.clientX - rect.x) / rect.width) * FIELD_WIDTH,
          y: ((e.clientY - rect.y) / rect.height) * FIELD_HEIGHT,
        };
        let point2: Point;
        if (turn === 'escaper') {
          // Убегающие
          const point1 = getNearestPoint(mouse, [
            { x: 4, y: 5 },
            { x: 4, y: 10 },
            { x: 4, y: 15 },
            { x: 4, y: 20 },
            { x: 4, y: 25 },
          ]);
          const vector1 = { x: mouse.x - point1.x, y: mouse.y - point1.y };
          const length = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
          const vector2 = { x: (vector1.x / length) * 2, y: (vector1.y / length) * 2 };
          point2 = { x: point1.x + vector2.x, y: point1.y + vector2.y };
        } else {
          // Догоняющий
          const point1 = { x: 33, y: 15 };
          const vector1 = { x: mouse.x - point1.x, y: mouse.y - point1.y };
          const length = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
          const vector2 = { x: (vector1.x / length) * 4, y: (vector1.y / length) * 4 };
          point2 = { x: point1.x + vector2.x, y: point1.y + vector2.y };
        }
        setPosition(point2);
      }
    };

    // Подключаем обработчик
    window.addEventListener('mousemove', handleMouseMove);

    // Когда закончится отрисовка нужно отключить обработчик
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [turn]);

  let newChip: JSX.Element;
  if (turn === 'escaper') {
    newChip = <NewEscaper x={position.x} y={position.y} />;
  } else {
    newChip = <NewChaser x={position.x} y={position.y} />;
  }

  return (
    <svg
      onClick={handleClick}
      ref={svgRef}
      viewBox={viewbox}
      className="m-auto field"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Контур игрового поля */}
      <rect x="0" y="0" width={FIELD_WIDTH} height={FIELD_HEIGHT} stroke="currentcolor" fill="none" strokeWidth="0.1" />

      {/* Линии игрового поля */}
      <line x1="4" y1="0" x2="4" y2={FIELD_HEIGHT} stroke="currentcolor" strokeWidth="0.05" />
      <line x1="24" y1="0" x2="24" y2={FIELD_HEIGHT} stroke="currentcolor" strokeWidth="0.05" />
      <line x1="33" y1="0" x2="33" y2={FIELD_HEIGHT} stroke="currentcolor" strokeWidth="0.05" />

      {/* Убегающие */}
      <Escaper x={4} y={5} />
      <Escaper x={4} y={10} />
      <Escaper x={4} y={15} />
      <Escaper x={4} y={20} />
      <Escaper x={4} y={25} />

      {/* Догоняющий */}
      <Chaser x={33} y={15} />

      {/* Новая фишка */}
      {newChip}
    </svg>
  );
}

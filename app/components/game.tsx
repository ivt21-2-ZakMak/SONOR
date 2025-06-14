'use client';

import { useEffect, useRef, useState } from 'react';

// Догоняющий
const Chaser = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="2" stroke="Black" strokeWidth=".05" fill="Blue" />
);

// Новая фишка для догоняющего
const NewChaser = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="2" stroke="Black" strokeWidth=".05" fill="DodgerBlue" strokeDasharray={0.1} />
);

// Убегающий
const Escaper = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="1" stroke="Black" strokeWidth=".05" fill="Green" />
);

export default function Game({ props = null }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Подключаем обработчик
    const handleMouseMove = (e: MouseEvent) => {
      const svgElement = svgRef.current;
      const rect = svgElement.getBoundingClientRect();
      if ((e.clientX > rect.x) && (e.clientX < (rect.width + rect.x)) &&
          (e.clientY > rect.y) && (e.clientY < (rect.height + rect.y))) {
        const x = (e.clientX - rect.x) / rect.width * 42;
        const y = (e.clientY - rect.y) / rect.height * 30;
        setPosition({ x: x, y: y });
      }
    };

    // Подключаем обработчик
    window.addEventListener('mousemove', handleMouseMove);

    // Когда закончится отрисовка нужно отключить обработчик
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    // if (!svgRef.current) return;

    // const svg = svgRef.current;
    // const point = svg.createSVGPoint();
    // point.x = e.clientX;
    // point.y = e.clientY;

    // const svgCoords = point.matrixTransform(svg.getScreenCTM()?.inverse());
    // console.log('SVG coords:', svgCoords.x, svgCoords.y);
  };

  return (
    <svg onClick={handleClick} ref={svgRef} viewBox="0 0 42 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Контур игрового поля */}
      <rect x="0" y="0" width="42" height="30" stroke="currentcolor" fill="none" strokeWidth="0.1" />

      {/* Убегающие */}
      <line x1="4" y1="0" x2="4" y2="30" stroke="currentcolor" strokeWidth="0.05" />
      <Escaper x={4} y={5} />
      <Escaper x={4} y={10} />
      <Escaper x={4} y={15} />
      <Escaper x={4} y={20} />
      <Escaper x={4} y={25} />

      <line x1="24" y1="0" x2="24" y2="30" stroke="currentcolor" strokeWidth="0.05" />

      {/* Догоняющий */}
      <line x1="33" y1="0" x2="33" y2="30" stroke="currentcolor" strokeWidth="0.05" />
      <Chaser x={33} y={15} />
      <NewChaser x={position.x} y={position.y} />
    </svg>
  );
}

'use client';

import { useEffect } from 'react';

const Chaser = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="2" fill="blue" stroke="black" strokeWidth=".05" />
);

const Escaper = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="1" fill="green" stroke="black" strokeWidth=".05" />
);

export default function Field({ props = null }) {

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 30" {...props}>
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
    </svg>
  );
}

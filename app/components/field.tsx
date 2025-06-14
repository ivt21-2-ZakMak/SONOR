'use client';

import { useEffect, useRef, useState } from 'react';

const Chaser = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="2" fill="blue" stroke="black" strokeWidth=".05" />
);

const Escaper = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r="1" fill="green" stroke="black" strokeWidth=".05" />
);

export default function Field({ props = null }) {
  // Размер компонента
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Ссылка на контейнер
  const containerRef = useRef<HTMLDivElement>(null);

  // При рендеринге
  useEffect(() => {
    // Создаем наблюдателя за изменением размера
    const observer = new ResizeObserver(([entry]) => {
      // Читаем текущий размер компонента
      const { width, height } = entry.contentRect;

      // Изменяем размеры компонента
      setSize({ width, height });
    });

    // Подписываемся на изменения размера контейнера
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Отписка от событий при завершении рендеринга
    return () => observer.disconnect();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" ref={containerRef} viewBox="0 0 42 30" width="100%" {...props}>
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

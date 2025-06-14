'use client';

import Link from 'next/link';

import Game from '../components/game';

export default function Page() {
  const color = 'black';
  return (
    <>
      <h1>Игра</h1>
      <p>
        <Link href="/">Назад</Link>
      </p>
      <Game props={{ color: color }} />
    </>
  );
}

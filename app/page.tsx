'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-gray-800 bg-opacity-80 border-4 border-yellow-500 rounded-2xl shadow-2xl p-10 w-[400px] text-center space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Главное меню</h1>
      <button className="w-full py-3 text-xl font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition">
        <Link href="/game">Начать игру</Link>
      </button>
      <button className="w-full py-3 text-xl font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition">
        <Link href="/options">Настройки</Link>
      </button>
    </div>
  );
}

import './globals.css';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Sonor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="container mx-auto">{children}</body>
    </html>
  );
}

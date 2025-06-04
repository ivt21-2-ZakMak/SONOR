import './globals.css'

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="ru">
      <body className='bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center'>
        {children}
      </body>
    </html>
  )
}

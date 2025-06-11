import './globals.css'

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="ru">
      <body className='container mx-auto'>
        {children}
      </body>
    </html>
  )
}

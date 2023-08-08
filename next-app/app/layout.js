//providers 
import Providers from '@/redux/providers'

//styles
import '@/styles/reset.css'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

//metadata
export const metadata = {
  title: 'SikayetVar'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/next-app/public/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Mulish&display=swap" rel="stylesheet" />
      </head>
      <body className='w-full h-full'>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['400', '600', '800', '900'] })

export const metadata = {
  title: 'Vastrik Creator Program',
  description: 'Create. Show your style. Win big.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

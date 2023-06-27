
import './globals.css'
import { Figtree } from 'next/font/google'

import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import Sidebar from '@/components/Sidebar'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listening to music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
          <SupabaseProvider>
            <UserProvider>
              <Sidebar>
                {children}
              </Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </body>
    </html>
  )
}

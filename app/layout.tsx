
import './globals.css'
import { Figtree } from 'next/font/google'

import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'

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
              <ModalProvider>
                <Sidebar>
                  {children}
                </Sidebar>
              </ModalProvider>
            </UserProvider>
          </SupabaseProvider>
        </body>
    </html>
  )
}

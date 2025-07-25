import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'  
import Navbar from './components/Navbar/page'

export const metadata = {
  title: 'Clerk Next.js Quickstart',
  description: 'Generated by create next app',
}

export default function RootLayout({children}){
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <Analytics/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gradient Copilot - Learning Assistant',
  description: 'AI-powered learning assistant chatbot to help you learn anything',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
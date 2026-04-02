import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { BookmarkProvider } from '@/components/bookmark-provider'
import { RecentlyViewedProvider } from '@/components/recently-viewed-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

export const metadata: Metadata = {
  title: 'SRM Insider | Placements, Internships & Campus Life',
  description: 'Your one-stop platform for exploring placements, internships, and campus life at SRM University. Get insider tips, experiences, and guides.',
  keywords: ['SRM University', 'Placements', 'Internships', 'Campus Life', 'College', 'Student Platform'],
  authors: [{ name: 'SRM Insider Team' }],
  openGraph: {
    title: 'SRM Insider | Placements, Internships & Campus Life',
    description: 'Your one-stop platform for exploring placements, internships, and campus life at SRM University.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a24' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookmarkProvider>
            <RecentlyViewedProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 pt-16">
                  {children}
                </main>
                <Footer />
              </div>
            </RecentlyViewedProvider>
          </BookmarkProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

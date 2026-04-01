"use client"

import * as React from "react"

type BookmarkProviderProps = {
  children: React.ReactNode
  storageKey?: string
}

type BookmarkProviderState = {
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
}

const initialState: BookmarkProviderState = {
  bookmarks: [],
  toggleBookmark: () => null,
  isBookmarked: () => false,
}

const BookmarkProviderContext = React.createContext<BookmarkProviderState>(initialState)

export function BookmarkProvider({
  children,
  storageKey = "srm-insider-bookmarks",
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored))
      } catch {
        setBookmarks([])
      }
    }
    setMounted(true)
  }, [storageKey])

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify(bookmarks))
    }
  }, [bookmarks, storageKey, mounted])

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <BookmarkProviderContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkProviderContext.Provider>
  )
}

export const useBookmarks = () => {
  const context = React.useContext(BookmarkProviderContext)

  if (context === undefined)
    throw new Error("useBookmarks must be used within a BookmarkProvider")

  return context
}

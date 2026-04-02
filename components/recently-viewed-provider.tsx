"use client"

import * as React from "react"

type RecentlyViewedProviderProps = {
  children: React.ReactNode
  storageKey?: string
  maxItems?: number
}

type RecentlyViewedProviderState = {
  recentlyViewed: string[]
  addToRecentlyViewed: (id: string) => void
  clearRecentlyViewed: () => void
}

const initialState: RecentlyViewedProviderState = {
  recentlyViewed: [],
  addToRecentlyViewed: () => null,
  clearRecentlyViewed: () => null,
}

const RecentlyViewedProviderContext = React.createContext<RecentlyViewedProviderState>(initialState)

export function RecentlyViewedProvider({
  children,
  storageKey = "srm-insider-recently-viewed",
  maxItems = 10,
}: RecentlyViewedProviderProps) {
  const [recentlyViewed, setRecentlyViewed] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored))
      } catch {
        setRecentlyViewed([])
      }
    }
    setMounted(true)
  }, [storageKey])

  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed, storageKey, mounted])

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists to move to front
      const filtered = prev.filter((item) => item !== id)
      // Add to front and limit to maxItems
      return [id, ...filtered].slice(0, maxItems)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <RecentlyViewedProviderContext.Provider 
      value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}
    >
      {children}
    </RecentlyViewedProviderContext.Provider>
  )
}

export const useRecentlyViewed = () => {
  const context = React.useContext(RecentlyViewedProviderContext)

  if (context === undefined)
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")

  return context
}

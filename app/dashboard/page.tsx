"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Bookmark, LayoutGrid, List, Search, Sparkles } from "lucide-react"
import { posts, type Category } from "@/data/posts"
import { PostCard, PostCardSkeleton } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "@/components/bookmark-provider"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get("category") as Category) || "All"
  
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(initialCategory)
  const [showBookmarked, setShowBookmarked] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = React.useState(true)
  const { bookmarks, isBookmarked } = useBookmarks()

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Filter posts
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      // Filter by search
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())

      // Filter by category
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory

      // Filter by bookmarks
      const matchesBookmark = !showBookmarked || isBookmarked(post.id)

      return matchesSearch && matchesCategory && matchesBookmark
    })
  }, [search, selectedCategory, showBookmarked, isBookmarked])

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <div className="bg-card border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Content</span>
            </motion.span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground max-w-xl">
              Discover placement insights, internship experiences, and campus life stories from fellow students
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search posts..."
                className="w-full sm:w-72"
              />
              <CategoryFilter
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>

            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={showBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBookmarked(!showBookmarked)}
                  className={cn(
                    "h-9 rounded-xl transition-all",
                    showBookmarked && "gradient-primary text-white border-0 shadow-md"
                  )}
                >
                  <Bookmark
                    className={cn("w-4 h-4 mr-1.5", showBookmarked && "fill-current")}
                  />
                  Saved ({bookmarks.length})
                </Button>
              </motion.div>

              <div className="flex items-center border-2 rounded-xl p-0.5 bg-secondary/50">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all",
                    viewMode === "grid" && "shadow-sm"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-lg transition-all",
                    viewMode === "list" && "shadow-sm"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-3xl mx-auto"
            )}
          >
            {[...Array(6)].map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6"
            >
              {showBookmarked ? (
                <Bookmark className="w-10 h-10 text-muted-foreground" />
              ) : (
                <Search className="w-10 h-10 text-muted-foreground" />
              )}
            </motion.div>
            <h3 className="text-2xl font-bold mb-3">No posts found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
              {showBookmarked
                ? "You haven't bookmarked any posts yet. Start saving posts to see them here."
                : "Try adjusting your search or filter to find what you're looking for."}
            </p>
            {(search || selectedCategory !== "All" || showBookmarked) && (
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setSearch("")
                  setSelectedCategory("All")
                  setShowBookmarked(false)
                }}
              >
                Clear all filters
              </Button>
            )}
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-6"
            >
              Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {showBookmarked && " (bookmarked)"}
            </motion.p>

            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-3xl mx-auto"
              )}
            >
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

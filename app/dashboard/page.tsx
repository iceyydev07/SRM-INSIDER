"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bookmark, 
  LayoutGrid, 
  List, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Brain,
  BarChart3,
  Building2,
  Flame,
  Clock,
  ChevronRight,
  Zap,
  Target,
  Users,
  Briefcase
} from "lucide-react"
import { posts, type Category } from "@/data/posts"
import { PostCard, PostCardSkeleton } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useBookmarks } from "@/components/bookmark-provider"
import { useRecentlyViewed } from "@/components/recently-viewed-provider"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Trending posts (simulated based on views/engagement)
const trendingPosts = posts.slice(0, 3)

// AI recommended posts (simulated)
const aiRecommendedPosts = [posts[1], posts[3], posts[4]]

// Placement stats data
const placementStats = [
  { label: "Computer Science", percentage: 92, color: "bg-violet-500" },
  { label: "Electronics", percentage: 85, color: "bg-pink-500" },
  { label: "Mechanical", percentage: 78, color: "bg-cyan-500" },
  { label: "Information Tech", percentage: 88, color: "bg-amber-500" },
]

// Top recruiters data
const topRecruiters = [
  { name: "Google", offers: 15, color: "from-blue-500 to-green-500" },
  { name: "Microsoft", offers: 22, color: "from-cyan-500 to-blue-600" },
  { name: "Amazon", offers: 35, color: "from-amber-500 to-orange-600" },
  { name: "Goldman Sachs", offers: 12, color: "from-blue-600 to-indigo-600" },
  { name: "Adobe", offers: 18, color: "from-red-500 to-pink-500" },
  { name: "Flipkart", offers: 25, color: "from-yellow-500 to-amber-500" },
]

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get("category") as Category) || "All"
  
  const [search, setSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(initialCategory)
  const [showBookmarked, setShowBookmarked] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = React.useState(true)
  const { bookmarks, isBookmarked } = useBookmarks()
  const { recentlyViewed } = useRecentlyViewed()

  // Get recently viewed posts
  const recentlyViewedPosts = React.useMemo(() => {
    return recentlyViewed
      .map(id => posts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 3) as typeof posts
  }, [recentlyViewed])

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Sections Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Trending Now Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  Trending Now
                  <Badge variant="secondary" className="ml-auto bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">
                    Hot
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingPosts.map((post, index) => (
                  <Link key={post.id} href={`/post/${post.id}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group/item"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1 group-hover/item:text-primary transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {post.readTime}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommended Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-bl-full" />
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  Recommended for You
                  <Badge variant="secondary" className="ml-auto bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20">
                    AI
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                {aiRecommendedPosts.map((post) => (
                  <Link key={post.id} href={`/post/${post.id}`}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group/item"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1 group-hover/item:text-primary transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {post.category}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Placement Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  Placement Stats
                  <Badge variant="secondary" className="ml-auto bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
                    2024
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {placementStats.map((stat) => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold">{stat.percentage}%</span>
                    </div>
                    <Progress value={stat.percentage} className={cn("h-2", stat.color)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Recruiters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                Top Recruiters 2024
                <Badge variant="secondary" className="ml-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  Hiring
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {topRecruiters.map((company, index) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex flex-col items-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer group"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow",
                      company.color
                    )}>
                      <span className="text-white font-bold text-lg">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-sm text-center">{company.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {company.offers} offers
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recently Viewed Section */}
        {recentlyViewedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-8"
          >
            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  Recently Viewed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {recentlyViewedPosts.map((post) => (
                    <Link key={post.id} href={`/post/${post.id}`}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all cursor-pointer group"
                      >
                        <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.category} - {post.readTime}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Briefcase, value: "500+", label: "Companies", color: "from-violet-500 to-purple-600" },
            { icon: Target, value: "85%", label: "Placement Rate", color: "from-pink-500 to-rose-600" },
            { icon: Zap, value: "54 LPA", label: "Highest Package", color: "from-cyan-500 to-blue-600" },
            { icon: Users, value: "10K+", label: "Students Placed", color: "from-amber-500 to-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <Card className="border-2 hover:border-primary/20 transition-all duration-300 card-glow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                    stat.color
                  )}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold gradient-text-animated">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-y border-border/50">
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

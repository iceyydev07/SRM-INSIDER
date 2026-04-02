"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  Heart,
  MessageCircle,
  Copy,
  Check,
  Twitter,
  Linkedin,
  ChevronUp,
} from "lucide-react"
import { posts } from "@/data/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useBookmarks } from "@/components/bookmark-provider"
import { useRecentlyViewed } from "@/components/recently-viewed-provider"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Placements: { 
    bg: "bg-violet-500/10", 
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/20"
  },
  Internships: { 
    bg: "bg-pink-500/10", 
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/20"
  },
  "Campus Life": { 
    bg: "bg-cyan-500/10", 
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/20"
  },
}

export default function PostPage() {
  const params = useParams()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [isLoading, setIsLoading] = React.useState(true)
  const [likes, setLikes] = React.useState(42)
  const [isLiked, setIsLiked] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [showScrollTop, setShowScrollTop] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  const post = posts.find((p) => p.id === params.id)
  const bookmarked = post ? isBookmarked(post.id) : false

  // Reading progress
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  })
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Add to recently viewed on mount
  React.useEffect(() => {
    if (post) {
      addToRecentlyViewed(post.id)
    }
  }, [post, addToRecentlyViewed])

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Show scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = post?.title || ""
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!post) {
    notFound()
  }

  // Related posts (same category, excluding current)
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  const colors = categoryColors[post.category] || { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" }

  // Format content with paragraphs and headings
  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if it's a heading (starts with **)
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-8 mb-4 text-foreground">
            {paragraph.replace(/\*\*/g, "")}
          </h3>
        )
      }
      // Check if it's a list item
      if (paragraph.startsWith("- ") || paragraph.match(/^\d+\./)) {
        const items = paragraph.split("\n")
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item.replace(/^[-\d.]\s*/, "")}
              </li>
            ))}
          </ul>
        )
      }
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed my-4 text-base md:text-lg">
          {paragraph}
        </p>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-muted rounded-full" />
              <div className="h-6 w-32 bg-muted rounded" />
              <div className="h-6 w-24 bg-muted rounded" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-secondary/20" ref={contentRef}>
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-16 left-0 right-0 h-1 bg-primary/20 z-50 origin-left"
          style={{ scaleX }}
        >
          <motion.div
            className="h-full gradient-primary"
            style={{ scaleX }}
          />
        </motion.div>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-6 -ml-2 rounded-xl hover:bg-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Badge
              variant="secondary"
              className={cn(
                "mb-4 font-medium border",
                colors.bg,
                colors.text,
                colors.border
              )}
            >
              {post.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </motion.header>

          {/* Floating Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8 p-3 bg-card rounded-2xl border-2 border-border/50 shadow-sm"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={cn(
                    "rounded-xl gap-2 transition-all",
                    isLiked && "text-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-500"
                  )}
                >
                  <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                  <span>{likes}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? "Unlike" : "Like"} this post</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>12</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comments</p>
              </TooltipContent>
            </Tooltip>

            <div className="h-8 w-px bg-border mx-1" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={bookmarked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => toggleBookmark(post.id)}
                  className={cn(
                    "rounded-xl gap-2",
                    bookmarked && "gradient-primary text-white border-0"
                  )}
                >
                  <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bookmarked ? "Remove from saved" : "Save for later"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="rounded-xl gap-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy link</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  className="rounded-xl h-8 w-8"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on Twitter</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  className="rounded-xl h-8 w-8"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 hover:border-primary/10 transition-colors">
              <CardContent className="p-6 md:p-10">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {formatContent(post.content)}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-semibold text-xl shadow-lg"
                  >
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Written by</p>
                    <p className="font-bold text-xl">{post.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sharing experiences and insights to help fellow students succeed.
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-xl hidden sm:flex">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Related Posts
                <Badge variant="secondary">{relatedPosts.length}</Badge>
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost, index) => {
                  const relatedColors = categoryColors[relatedPost.category] || { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" }
                  return (
                    <Link key={relatedPost.id} href={`/post/${relatedPost.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <Card className="h-full hover:shadow-lg hover:border-primary/30 border-2 transition-all duration-300 group">
                          <CardContent className="p-5">
                            <Badge
                              variant="secondary"
                              className={cn(
                                "mb-3 text-xs font-medium border",
                                relatedColors.bg,
                                relatedColors.text,
                                relatedColors.border
                              )}
                            >
                              {relatedPost.category}
                            </Badge>
                            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedPost.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {relatedPost.readTime}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </article>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-50"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}

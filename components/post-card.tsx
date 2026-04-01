"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bookmark, Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useBookmarks } from "@/components/bookmark-provider"
import type { Post } from "@/data/posts"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  index?: number
}

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

export function PostCard({ post, index = 0 }: PostCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const bookmarked = isBookmarked(post.id)
  const colors = categoryColors[post.category] || { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 card-glow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="secondary"
              className={cn(
                "font-medium border",
                colors.bg,
                colors.text,
                colors.border
              )}
            >
              {post.category}
            </Badge>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-xl shrink-0 transition-all duration-300",
                  bookmarked 
                    ? "text-primary bg-primary/10 hover:bg-primary/20" 
                    : "hover:bg-secondary"
                )}
                onClick={() => toggleBookmark(post.id)}
              >
                <Bookmark
                  className={cn(
                    "w-4 h-4 transition-transform",
                    bookmarked && "fill-current scale-110"
                  )}
                />
                <span className="sr-only">
                  {bookmarked ? "Remove bookmark" : "Add bookmark"}
                </span>
              </Button>
            </motion.div>
          </div>
          <Link href={`/post/${post.id}`} className="group/title mt-2 block">
            <h3 className="font-bold text-lg leading-tight group-hover/title:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <Link href={`/post/${post.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8 px-3 rounded-lg group/btn hover:text-primary hover:bg-primary/10"
            >
              Read
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function PostCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
          <div className="h-8 w-8 bg-muted animate-pulse rounded-xl" />
        </div>
        <div className="h-6 w-full bg-muted animate-pulse rounded-lg mt-3" />
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded-lg mt-2" />
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-border/50">
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  )
}

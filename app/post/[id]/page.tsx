"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  User,
} from "lucide-react"
import { posts } from "@/data/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useBookmarks } from "@/components/bookmark-provider"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  Placements: "bg-chart-1/10 text-chart-1",
  Internships: "bg-chart-2/10 text-chart-2",
  "Campus Life": "bg-chart-3/10 text-chart-3",
}

export default function PostPage() {
  const params = useParams()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [isLoading, setIsLoading] = React.useState(true)
  
  const post = posts.find((p) => p.id === params.id)
  const bookmarked = post ? isBookmarked(post.id) : false

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!post) {
    notFound()
  }

  // Related posts (same category, excluding current)
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  // Format content with paragraphs and headings
  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if it's a heading (starts with **)
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-8 mb-4">
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
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
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
    <div className="min-h-screen bg-secondary/20">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 -ml-2">
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
            className={cn("mb-4", categoryColors[post.category])}
          >
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </motion.header>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          <Button
            variant={bookmarked ? "default" : "outline"}
            onClick={() => toggleBookmark(post.id)}
            className={cn(bookmarked && "gradient-primary text-white border-0")}
          >
            <Bookmark
              className={cn("w-4 h-4 mr-2", bookmarked && "fill-current")}
            />
            {bookmarked ? "Saved" : "Save"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.description,
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6 md:p-10">
              {formatContent(post.content)}
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-lg">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Written by</p>
                  <p className="font-semibold text-lg">{post.author}</p>
                </div>
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
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/post/${relatedPost.id}`}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                    <CardContent className="p-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "mb-2 text-xs",
                          categoryColors[relatedPost.category]
                        )}
                      >
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  )
}

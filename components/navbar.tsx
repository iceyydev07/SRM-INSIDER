"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X, GraduationCap, Sparkles, Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
]

// Fake notifications data
const notifications = [
  {
    id: "1",
    title: "New placement update",
    description: "Google has opened applications for 2024 batch",
    time: "2 min ago",
    read: false,
    type: "placement"
  },
  {
    id: "2",
    title: "Interview tips added",
    description: "Check out the new Microsoft interview guide",
    time: "1 hour ago",
    read: false,
    type: "content"
  },
  {
    id: "3",
    title: "Campus event tomorrow",
    description: "Tech Talk by Amazon engineers at 3 PM",
    time: "3 hours ago",
    read: true,
    type: "event"
  },
  {
    id: "4",
    title: "Your post got likes",
    description: "15 people liked your internship experience",
    time: "1 day ago",
    read: true,
    type: "social"
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [notificationList, setNotificationList] = React.useState(notifications)
  const [notifOpen, setNotifOpen] = React.useState(false)

  const unreadCount = notificationList.filter(n => !n.read).length

  React.useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "placement": return "bg-violet-500"
      case "content": return "bg-pink-500"
      case "event": return "bg-cyan-500"
      case "social": return "bg-amber-500"
      default: return "bg-primary"
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg"
          >
            <GraduationCap className="w-5 h-5 text-white" />
          </motion.div>
          <span className="font-bold text-xl tracking-tight">
            SRM <span className="gradient-text-animated">Insider</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "relative px-4 h-9 rounded-xl transition-colors",
                  pathname === link.href 
                    ? "text-primary font-medium bg-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 gradient-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {/* Notifications */}
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl h-9 w-9 relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 rounded-lg"
                    onClick={markAllAsRead}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationList.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => markAsRead(notif.id)}
                    className={cn(
                      "p-4 border-b border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors",
                      !notif.read && "bg-primary/5"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2 shrink-0",
                        getNotificationColor(notif.type),
                        notif.read && "opacity-30"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm line-clamp-1",
                          !notif.read && "font-medium"
                        )}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {notif.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-2 border-t border-border">
                <Button variant="ghost" className="w-full h-9 text-sm rounded-lg">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          {mounted && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl h-9 w-9"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
          )}
          
          <div className="h-6 w-px bg-border mx-1" />

          <Link href="/login">
            <Button variant="ghost" className="h-9 px-4 rounded-xl hover:bg-secondary/50">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="gradient-primary text-white h-9 px-4 rounded-xl shadow-md hover:shadow-lg transition-all glow">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Sign Up
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl h-9 w-9 relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6 px-2 rounded-lg"
                    onClick={markAllAsRead}
                  >
                    Mark read
                  </Button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notificationList.slice(0, 3).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={cn(
                      "p-3 border-b border-border/50",
                      !notif.read && "bg-primary/5"
                    )}
                  >
                    <p className={cn(
                      "text-sm line-clamp-1",
                      !notif.read && "font-medium"
                    )}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl h-9 w-9"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl h-9 w-9"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={pathname === link.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-11 rounded-xl",
                        pathname === link.href && "bg-primary/10 text-primary"
                      )}
                    >
                      {link.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-border my-2" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-11 rounded-xl">
                    Login
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gradient-primary text-white h-11 rounded-xl glow">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

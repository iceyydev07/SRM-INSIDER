"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Briefcase,
    title: "Placement Insights",
    description:
      "Access detailed placement statistics, company reviews, and interview experiences from students.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: GraduationCap,
    title: "Internship Guide",
    description:
      "Find internship opportunities and learn from real experiences of interns at top companies.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Users,
    title: "Campus Life",
    description:
      "Discover events, clubs, fests, and everything about life at SRM University.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Get tips and resources to boost your career prospects and stand out from the crowd.",
    color: "from-amber-500 to-orange-600",
  },
]

const stats = [
  { value: "500+", label: "Companies Recruiting", icon: Briefcase },
  { value: "85%", label: "Placement Rate", icon: Target },
  { value: "54 LPA", label: "Highest Package", icon: Zap },
  { value: "10K+", label: "Students Placed", icon: Users },
]

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer at Google",
    content:
      "SRM Insider helped me prepare for my interviews with real experiences from seniors. The placement insights were invaluable!",
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    role: "SDE at Microsoft",
    content:
      "The internship guides and interview tips on this platform gave me the confidence I needed to crack my dream job.",
    avatar: "PP",
  },
  {
    name: "Arun Kumar",
    role: "Data Analyst at Amazon",
    content:
      "From campus life tips to placement prep, SRM Insider has everything a student needs. Highly recommended!",
    avatar: "AK",
  },
]

const animatedWords = ["Success", "Growth", "Excellence", "Future"]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function AnimatedText() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animatedWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative min-w-[200px] md:min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="gradient-text-animated inline-block"
        >
          {animatedWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
      <span className="typewriter-cursor" />
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center gradient-hero overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs with Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full animate-float"
            style={{
              background: "radial-gradient(circle, oklch(0.55 0.25 275 / 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full animate-float-delayed"
            style={{
              background: "radial-gradient(circle, oklch(0.65 0.2 330 / 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.6 0.15 200 / 0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * 600,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 shimmer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ SRM Students</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight">
              Your Gateway to SRM{" "}
              <br className="hidden md:block" />
              <AnimatedText />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
            >
              Explore placements, internships, and campus life. Get insider tips,
              real experiences, and everything you need to thrive at SRM University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" className="gradient-primary text-white h-14 px-8 text-base glow rounded-xl group">
                  Explore Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl border-2 hover:bg-secondary/80">
                  Join Community
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 stat-glow card-glow transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text-animated">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Features
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Everything You Need to{" "}
              <span className="gradient-text-animated">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From placement preparation to campus life insights, we have got you
              covered with comprehensive resources and real experiences.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={item}>
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 card-glow overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              >
                Why Choose Us
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Why Students Choose{" "}
                <span className="gradient-text-animated">SRM Insider</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We are built by students, for students. Our platform brings together
                authentic experiences, verified information, and a supportive
                community to help you navigate your college journey.
              </p>

              <div className="space-y-4">
                {[
                  "Real interview experiences from seniors",
                  "Up-to-date placement statistics",
                  "Campus life tips and event updates",
                  "Career guidance and mentorship",
                  "Active student community",
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/dashboard" className="inline-block mt-8">
                <Button className="gradient-primary text-white h-12 px-6 rounded-xl glow group">
                  Start Exploring
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: BookOpen, value: "200+", label: "Interview Experiences", color: "from-violet-500 to-purple-600" },
                  { icon: Award, value: "50+", label: "Top Company Insights", color: "from-pink-500 to-rose-600", offset: true },
                  { icon: Users, value: "5000+", label: "Active Community Members", color: "from-cyan-500 to-blue-600" },
                  { icon: TrendingUp, value: "95%", label: "User Satisfaction", color: "from-amber-500 to-orange-600", offset: true },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={item.offset ? "mt-8" : ""}
                  >
                    <Card className="p-6 card-glow border-2 hover:border-primary/20 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold gradient-text-animated">{item.value}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Testimonials
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Loved by <span className="gradient-text-animated">Students</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Hear from students who have used SRM Insider to achieve their goals
              and land their dream jobs.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} variants={item}>
                <Card className="h-full card-glow hover:border-primary/20 border-2 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl gradient-primary p-10 md:p-20 text-center glow"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started Today</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
                Join thousands of students who are already using SRM Insider to
                prepare for their future and make the most of their college life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 h-14 px-8 rounded-xl font-semibold shadow-xl"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl font-semibold"
                  >
                    Browse Content
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

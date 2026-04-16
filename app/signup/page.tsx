"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle, Sparkles, Target, TrendingUp, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const passwordRequirements = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains a letter", test: (p: string) => /[a-zA-Z]/.test(p) },
]

const features = [
  { icon: Target, text: "Placement insights from 500+ companies" },
  { icon: TrendingUp, text: "Real interview experiences" },
  { icon: BookOpen, text: "Campus life tips & guides" },
]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string }>({})
  const [focusedField, setFocusedField] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  })

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const allRequirementsMet = passwordRequirements.every(req => req.test(formData.password))

  return (
    <div className="min-h-[calc(100vh-4rem)] flex gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.2 330 / 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.25 275 / 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-card/80 border-2 border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg lg:hidden"
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-base">
                Join SRM Insider and start your journey
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    className={`transition-colors ${focusedField === "name" ? "text-primary" : ""}`}
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`} />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 h-12 rounded-xl border-2 transition-all ${
                        errors.name 
                          ? "border-destructive focus:border-destructive" 
                          : focusedField === "name" 
                            ? "border-primary shadow-[0_0_0_3px_rgba(139,92,246,0.1)]" 
                            : "border-border hover:border-primary/50"
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="email"
                    className={`transition-colors ${focusedField === "email" ? "text-primary" : ""}`}
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`} />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 h-12 rounded-xl border-2 transition-all ${
                        errors.email 
                          ? "border-destructive focus:border-destructive" 
                          : focusedField === "email" 
                            ? "border-primary shadow-[0_0_0_3px_rgba(139,92,246,0.1)]" 
                            : "border-border hover:border-primary/50"
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="password"
                    className={`transition-colors ${focusedField === "password" ? "text-primary" : ""}`}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === "password" ? "text-primary" : "text-muted-foreground"}`} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`pl-10 pr-10 h-12 rounded-xl border-2 transition-all ${
                        errors.password 
                          ? "border-destructive focus:border-destructive" 
                          : focusedField === "password" 
                            ? "border-primary shadow-[0_0_0_3px_rgba(139,92,246,0.1)]" 
                            : "border-border hover:border-primary/50"
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg hover:bg-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-destructive" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Password requirements */}
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pt-2 p-3 rounded-xl bg-secondary/50"
                      >
                        {passwordRequirements.map((req, index) => {
                          const passed = req.test(formData.password)
                          return (
                            <motion.div
                              key={req.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex items-center gap-2 text-xs transition-colors ${
                                passed
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-muted-foreground"
                              }`}
                            >
                              <motion.div
                                animate={{ scale: passed ? 1 : 0.8 }}
                                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  passed ? "bg-green-500" : "bg-muted"
                                }`}
                              >
                                {passed && <CheckCircle className="w-3 h-3 text-white" />}
                              </motion.div>
                              {req.label}
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full gradient-primary text-white h-12 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-shadow glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-3 text-muted-foreground">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" type="button" className="w-full h-12 rounded-xl border-2 hover:border-primary/50 hover:bg-secondary/50">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" type="button" className="w-full h-12 rounded-xl border-2 hover:border-primary/50 hover:bg-secondary/50">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                  </motion.div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-semibold">
                    Sign in
                  </Link>
                </p>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <Link href="#" className="underline hover:text-foreground">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Right Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-xl"
            >
              <GraduationCap className="w-7 h-7 text-white" />
            </motion.div>
            <span className="font-bold text-3xl tracking-tight">
              SRM <span className="gradient-text-animated">Insider</span>
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Join <span className="gradient-text-animated">10,000+</span> students on their success journey
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Get exclusive access to placement insights, internship opportunities, and campus life guides from students who have been there.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/80 backdrop-blur border border-border/50"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

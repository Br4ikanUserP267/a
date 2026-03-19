"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1a5c5a] to-[#0d3533] px-6 pt-16 pb-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white font-mono tracking-tight text-balance">
          {"!Bienvenido!"}
        </h1>
        <p className="text-[#b2dfdb] mt-2 text-lg">
          A tu billetera de salud
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-card rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-primary mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex items-center gap-3 bg-input rounded-2xl px-4 py-4">
            <Mail className="h-6 w-6 text-muted-foreground shrink-0" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-card-foreground placeholder:text-muted-foreground text-lg outline-none"
              required
              aria-label="Correo electronico"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-3 bg-input rounded-2xl px-4 py-4">
            <Lock className="h-6 w-6 text-muted-foreground shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-card-foreground placeholder:text-muted-foreground text-lg outline-none"
              required
              aria-label="Contrasena"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground shrink-0"
              aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" />
              ) : (
                <Eye className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground text-xl font-semibold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
          >
            {isLoading ? "Ingresando..." : "Login"}
          </button>
        </form>

        {/* Logo */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="4" y="8" width="32" height="24" rx="4" stroke="#4db6ac" strokeWidth="2" fill="none" />
              <path d="M20 14v8M16 18h8" stroke="#4db6ac" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="28" r="2" fill="#4db6ac" />
              <circle cx="28" cy="28" r="2" fill="#4db6ac" />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Health Wallet Scan</span>
        </div>
      </div>
    </div>
  )
}

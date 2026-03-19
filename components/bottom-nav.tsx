"use client"

import { Home, ScanLine, Clock, User } from "lucide-react"

type NavTab = "home" | "scan" | "history" | "profile"

interface BottomNavProps {
  active: NavTab
  onNavigate: (tab: NavTab) => void
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Inicio",
      icon: <Home className="h-7 w-7" />,
    },
    {
      id: "scan",
      label: "Escanear",
      icon: <ScanLine className="h-7 w-7" />,
    },
    {
      id: "history",
      label: "Historial",
      icon: <Clock className="h-7 w-7" />,
    },
    {
      id: "profile",
      label: "Perfil",
      icon: <User className="h-7 w-7" />,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-2 pt-1 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const isScan = tab.id === "scan"

          if (isScan) {
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center gap-1 -mt-6"
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  {tab.icon}
                </div>
                <span className="text-xs font-medium text-primary">
                  {tab.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.icon}
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

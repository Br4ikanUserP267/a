"use client"

import { User, Shield, Moon, HelpCircle, LogOut, ChevronRight, FileText } from "lucide-react"

interface ProfileScreenProps {
  onLogout: () => void
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const menuItems = [
    {
      icon: <User className="h-6 w-6" />,
      label: "Datos personales",
      description: "Nombre, contacto, aseguradora",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      label: "Seguridad",
      description: "Clave, biometria, sesiones",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      label: "Mis documentos",
      description: "Almacenamiento y respaldo",
    },
    {
      icon: <Moon className="h-6 w-6" />,
      label: "Apariencia",
      description: "Modo oscuro, tamano de texto",
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      label: "Ayuda",
      description: "Tutorial, soporte, preguntas",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533]">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-white font-mono">Mi perfil</h1>
      </div>

      {/* Profile card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-3xl p-6 shadow-2xl flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold text-card-foreground">Juan Dominguez</p>
            <p className="text-muted-foreground text-base">juan@email.com</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">6</p>
            <p className="text-sm text-muted-foreground mt-1">Documentos</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">4</p>
            <p className="text-sm text-muted-foreground mt-1">Enviados</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground mt-1">Doctores</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 pb-28 flex flex-col gap-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full bg-card rounded-2xl p-4 shadow-md flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center text-primary shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-card-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-card rounded-2xl p-4 shadow-md flex items-center gap-4 text-left mt-4 border-2 border-destructive/20"
        >
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive shrink-0">
            <LogOut className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-destructive">Cerrar sesion</p>
          </div>
        </button>
      </div>
    </div>
  )
}

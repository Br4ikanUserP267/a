"use client"

import { useState } from "react"
import { type MedicalDocument, DOCUMENT_TYPE_LABELS } from "@/lib/types"
import { ArrowLeft, MessageCircle, Mail, Link2, Lock, Check, Copy } from "lucide-react"

interface ShareScreenProps {
  document: MedicalDocument
  onBack: () => void
}

type ShareMethod = "whatsapp" | "email" | "link" | null
type ShareStatus = "idle" | "sending" | "sent"

export function ShareScreen({ document, onBack }: ShareScreenProps) {
  const [method, setMethod] = useState<ShareMethod>(null)
  const [status, setStatus] = useState<ShareStatus>("idle")
  const [usePassword, setUsePassword] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")

  const handleShare = (selectedMethod: ShareMethod) => {
    setMethod(selectedMethod)

    if (selectedMethod === "whatsapp") {
      const text = encodeURIComponent(
        `Te comparto mi documento medico: ${document.title} (${DOCUMENT_TYPE_LABELS[document.type]})`
      )
      window.open(`https://wa.me/?text=${text}`, "_blank")
      setStatus("sent")
    } else if (selectedMethod === "email") {
      const subject = encodeURIComponent(`Documento medico: ${document.title}`)
      const body = encodeURIComponent(
        `Hola,\n\nTe comparto mi documento medico:\n\nTitulo: ${document.title}\nTipo: ${DOCUMENT_TYPE_LABELS[document.type]}\n\nSaludos.`
      )
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank")
      setStatus("sent")
    } else if (selectedMethod === "link") {
      setStatus("sending")
      setTimeout(() => {
        setGeneratedLink("https://healthwallet.app/doc/abc123xyz")
        setStatus("sent")
      }, 1000)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533]">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
          aria-label="Volver atras"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-white font-mono">Enviar</h1>
      </div>

      {/* Document info mini-card */}
      <div className="px-6 mb-6">
        <div className="bg-card/10 rounded-2xl p-4 border border-[#b2dfdb]/20">
          <p className="text-white font-semibold text-lg">{document.title}</p>
          <p className="text-[#b2dfdb] text-base">{DOCUMENT_TYPE_LABELS[document.type]}</p>
        </div>
      </div>

      {/* Share methods */}
      <div className="px-6 pb-8 flex flex-col gap-4">
        {/* WhatsApp */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="w-full bg-card rounded-2xl p-5 shadow-md flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-card-foreground">WhatsApp</p>
            <p className="text-muted-foreground text-base">Enviar por chat</p>
          </div>
          {method === "whatsapp" && status === "sent" && (
            <Check className="h-6 w-6 text-primary" />
          )}
        </button>

        {/* Email */}
        <button
          onClick={() => handleShare("email")}
          className="w-full bg-card rounded-2xl p-5 shadow-md flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-card-foreground">Correo electronico</p>
            <p className="text-muted-foreground text-base">Enviar por email</p>
          </div>
          {method === "email" && status === "sent" && (
            <Check className="h-6 w-6 text-primary" />
          )}
        </button>

        {/* Secure Link */}
        <button
          onClick={() => handleShare("link")}
          className="w-full bg-card rounded-2xl p-5 shadow-md flex items-center gap-4 text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1a5c5a] flex items-center justify-center shrink-0">
            <Link2 className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-card-foreground">Enlace seguro</p>
            <p className="text-muted-foreground text-base">Generar link temporal</p>
          </div>
          {method === "link" && status === "sent" && (
            <Check className="h-6 w-6 text-primary" />
          )}
        </button>

        {/* Generated link */}
        {method === "link" && status === "sent" && generatedLink && (
          <div className="bg-card rounded-2xl p-5 shadow-md">
            <p className="text-sm text-muted-foreground mb-3">Enlace generado:</p>
            <div className="flex items-center gap-2 bg-input rounded-xl p-3">
              <p className="flex-1 text-card-foreground text-base truncate">{generatedLink}</p>
              <button
                onClick={copyLink}
                className="shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
                aria-label="Copiar enlace"
              >
                <Copy className="h-5 w-5 text-primary-foreground" />
              </button>
            </div>
          </div>
        )}

        {/* Password protection toggle */}
        <div className="bg-card rounded-2xl p-5 shadow-md flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-input flex items-center justify-center shrink-0">
            <Lock className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-card-foreground">Proteger con clave</p>
            <p className="text-muted-foreground text-base">Contrasena para abrir</p>
          </div>
          <button
            onClick={() => setUsePassword(!usePassword)}
            className={`w-14 h-8 rounded-full transition-colors relative ${
              usePassword ? "bg-primary" : "bg-input"
            }`}
            role="switch"
            aria-checked={usePassword}
            aria-label="Activar proteccion con clave"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md absolute top-1 transition-transform ${
                usePassword ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Status message */}
        {status === "sent" && (
          <div className="bg-primary/20 rounded-2xl p-4 flex items-center gap-3">
            <Check className="h-6 w-6 text-primary shrink-0" />
            <p className="text-white text-lg font-medium">
              {method === "link" ? "Enlace generado" : "Enviado exitosamente"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

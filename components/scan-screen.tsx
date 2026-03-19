"use client"

import { useState } from "react"
import { Camera, Upload, X, Check, Loader2 } from "lucide-react"

type ScanStep = "capture" | "processing" | "review" | "saved"

interface ScanScreenProps {
  onClose: () => void
  onSaved: () => void
}

export function ScanScreen({ onClose, onSaved }: ScanScreenProps) {
  const [step, setStep] = useState<ScanStep>("capture")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleCapture = () => {
    setSelectedFile("captured")
    setStep("processing")
    setTimeout(() => {
      setStep("review")
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
      setStep("processing")
      setTimeout(() => {
        setStep("review")
      }, 2000)
    }
  }

  const handleSave = () => {
    setStep("saved")
    setTimeout(() => {
      onSaved()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-white font-mono">
          Escanear
        </h1>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
          aria-label="Cerrar escaner"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {step === "capture" && (
          <div className="w-full flex flex-col items-center gap-8">
            {/* Camera preview area */}
            <div className="w-full aspect-[3/4] max-w-sm bg-card/10 rounded-3xl border-2 border-dashed border-[#b2dfdb]/40 flex flex-col items-center justify-center gap-4">
              <Camera className="h-16 w-16 text-[#b2dfdb]" />
              <p className="text-[#b2dfdb] text-lg text-center px-4">
                Coloca tu documento frente a la camara
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button
                onClick={handleCapture}
                className="w-full bg-primary text-primary-foreground text-xl font-semibold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3"
              >
                <Camera className="h-7 w-7" />
                Tomar foto
              </button>
              <label className="w-full bg-card text-card-foreground text-xl font-semibold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 cursor-pointer">
                <Upload className="h-7 w-7" />
                Subir archivo
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="sr-only"
                  aria-label="Subir archivo de documento"
                />
              </label>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold">Procesando...</p>
              <p className="text-[#b2dfdb] text-lg mt-2">
                Detectando bordes y mejorando imagen
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              {[
                "Detectando bordes",
                "Corrigiendo perspectiva",
                "Mejorando contraste",
                "Extrayendo texto (OCR)",
                "Clasificando documento",
              ].map((stepLabel, i) => (
                <div
                  key={stepLabel}
                  className="flex items-center gap-3 text-[#b2dfdb]"
                  style={{
                    opacity: 1,
                    animation: `fadeIn 0.3s ease ${i * 0.3}s both`,
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-base">{stepLabel}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-primary mb-4">
                Documento detectado
              </h2>

              {/* Preview */}
              <div className="w-full aspect-[4/3] bg-input rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center p-4">
                  <p className="text-card-foreground text-lg font-semibold">
                    {selectedFile === "captured" ? "Foto capturada" : selectedFile}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Vista previa del documento
                  </p>
                </div>
              </div>

              {/* Detected info */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-base">Tipo</span>
                  <span className="text-card-foreground font-medium text-base">Laboratorio</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-base">Fecha</span>
                  <span className="text-card-foreground font-medium text-base">2 Mar 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-base">Doctor</span>
                  <span className="text-card-foreground font-medium text-base">Dr. Martinez</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              <button
                onClick={handleSave}
                className="w-full bg-primary text-primary-foreground text-xl font-semibold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3"
              >
                <Check className="h-7 w-7" />
                Guardar documento
              </button>
              <button
                onClick={() => setStep("capture")}
                className="w-full bg-card text-card-foreground text-lg font-medium py-4 rounded-2xl border border-border"
              >
                Escanear de nuevo
              </button>
            </div>
          </div>
        )}

        {step === "saved" && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Check className="h-14 w-14 text-primary-foreground" />
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold">Listo</p>
              <p className="text-[#b2dfdb] text-lg mt-2">
                Documento guardado exitosamente
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

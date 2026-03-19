"use client"

import { type MedicalDocument, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_COLORS } from "@/lib/types"
import { ArrowLeft, Share2, Calendar, User, FileText, Tag } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface DocumentDetailProps {
  document: MedicalDocument
  onBack: () => void
  onShare: () => void
}

export function DocumentDetail({ document, onBack, onShare }: DocumentDetailProps) {
  const typeColor = DOCUMENT_TYPE_COLORS[document.type]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
          aria-label="Volver atras"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-white font-mono">Detalle</h1>
        <button
          onClick={onShare}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg"
          aria-label="Compartir documento"
        >
          <Share2 className="h-6 w-6" />
        </button>
      </div>

      {/* Content Card */}
      <div className="px-6 pb-28">
        <div className="bg-card rounded-3xl p-6 shadow-2xl">
          {/* Title and type badge */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
              style={{ backgroundColor: typeColor }}
              aria-hidden="true"
            >
              {document.type === "laboratorio" && "Lab"}
              {document.type === "formula" && "Rx"}
              {document.type === "rayos_x" && "RX"}
              {document.type === "incapacidad" && "Inc"}
              {document.type === "historia_clinica" && "HC"}
              {document.type === "otro" && "Doc"}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-card-foreground text-balance">
                {document.title}
              </h2>
              <span
                className="inline-block text-sm font-medium px-3 py-1 rounded-lg mt-2"
                style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
              >
                {DOCUMENT_TYPE_LABELS[document.type]}
              </span>
            </div>
          </div>

          {/* Info rows */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-input flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="text-base font-medium text-card-foreground">
                  {format(parseISO(document.date), "d 'de' MMMM yyyy", { locale: es })}
                </p>
              </div>
            </div>

            {document.doctor && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-input flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p className="text-base font-medium text-card-foreground">{document.doctor}</p>
                </div>
              </div>
            )}

            {document.tags.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-input flex items-center justify-center shrink-0">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Etiquetas</p>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 rounded-lg bg-accent text-accent-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OCR Text Preview */}
          {document.ocrText && (
            <div className="border-t border-border pt-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-base font-semibold text-card-foreground">
                  Texto extraido
                </h3>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed bg-input rounded-2xl p-4">
                {document.ocrText}
              </p>
            </div>
          )}

          {/* Document Preview */}
          <div className="mt-6">
            <div className="w-full aspect-[3/4] bg-input rounded-2xl flex items-center justify-center">
              <div className="text-center p-6">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-base">
                  Vista previa del documento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="w-full bg-primary text-primary-foreground text-xl font-semibold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 mt-6"
        >
          <Share2 className="h-7 w-7" />
          Enviar documento
        </button>
      </div>
    </div>
  )
}

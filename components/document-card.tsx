"use client"

import { type MedicalDocument, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_COLORS } from "@/lib/types"
import { Calendar, User, ChevronRight } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface DocumentCardProps {
  document: MedicalDocument
  onClick: (doc: MedicalDocument) => void
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  const typeColor = DOCUMENT_TYPE_COLORS[document.type]

  return (
    <button
      onClick={() => onClick(document)}
      className="w-full bg-card rounded-2xl p-5 shadow-md border border-border flex items-center gap-4 text-left transition-shadow hover:shadow-lg active:scale-[0.98]"
      aria-label={`Ver ${document.title}`}
    >
      {/* Type indicator */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0"
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-card-foreground truncate">
          {document.title}
        </h3>
        <span
          className="inline-block text-sm font-medium px-2 py-0.5 rounded-lg mt-1"
          style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
        >
          {DOCUMENT_TYPE_LABELS[document.type]}
        </span>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <span className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4" />
            {format(parseISO(document.date), "d MMM yyyy", { locale: es })}
          </span>
          {document.doctor && (
            <span className="flex items-center gap-1 text-sm truncate">
              <User className="h-4 w-4 shrink-0" />
              <span className="truncate">{document.doctor}</span>
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-6 w-6 text-muted-foreground shrink-0" />
    </button>
  )
}

"use client"

import { type DocumentType, DOCUMENT_TYPE_LABELS } from "@/lib/types"
import { FlaskConical, Pill, Bone, FileWarning, FileText, Layers } from "lucide-react"

const FILTER_ICONS: Record<DocumentType, React.ReactNode> = {
  laboratorio: <FlaskConical className="h-5 w-5" />,
  formula: <Pill className="h-5 w-5" />,
  rayos_x: <Bone className="h-5 w-5" />,
  incapacidad: <FileWarning className="h-5 w-5" />,
  historia_clinica: <FileText className="h-5 w-5" />,
  otro: <Layers className="h-5 w-5" />,
}

interface FilterChipsProps {
  selected: DocumentType | null
  onSelect: (type: DocumentType | null) => void
}

export function FilterChips({ selected, onSelect }: FilterChipsProps) {
  const types: DocumentType[] = [
    "laboratorio",
    "formula",
    "rayos_x",
    "incapacidad",
    "historia_clinica",
  ]

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-base font-medium whitespace-nowrap transition-colors shrink-0 ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card text-card-foreground border border-border"
        }`}
        aria-label="Ver todos los documentos"
      >
        <Layers className="h-5 w-5" />
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(selected === type ? null : type)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-base font-medium whitespace-nowrap transition-colors shrink-0 ${
            selected === type
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-card-foreground border border-border"
          }`}
          aria-label={`Filtrar por ${DOCUMENT_TYPE_LABELS[type]}`}
        >
          {FILTER_ICONS[type]}
          {DOCUMENT_TYPE_LABELS[type]}
        </button>
      ))}
    </div>
  )
}

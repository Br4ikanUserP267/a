export type DocumentType =
  | "laboratorio"
  | "formula"
  | "rayos_x"
  | "incapacidad"
  | "historia_clinica"
  | "otro"

export interface MedicalDocument {
  id: string
  title: string
  type: DocumentType
  date: string
  doctor?: string
  ocrText?: string
  thumbnailUrl?: string
  tags: string[]
  shared?: boolean
}

export type AppScreen =
  | "login"
  | "home"
  | "scan"
  | "scan-review"
  | "document-detail"
  | "share"
  | "history"

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  laboratorio: "Laboratorio",
  formula: "Formula Medica",
  rayos_x: "Rayos X",
  incapacidad: "Incapacidad",
  historia_clinica: "Historia Clinica",
  otro: "Otro",
}

export const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  laboratorio: "#4db6ac",
  formula: "#26a69a",
  rayos_x: "#1a5c5a",
  incapacidad: "#e53935",
  historia_clinica: "#80cbc4",
  otro: "#6b8a8a",
}

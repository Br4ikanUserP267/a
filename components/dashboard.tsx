"use client"

import { useState, useMemo } from "react"
import { SearchBar } from "./search-bar"
import { FilterChips } from "./filter-chips"
import { DocumentCard } from "./document-card"
import { MOCK_DOCUMENTS } from "@/lib/mock-data"
import type { MedicalDocument, DocumentType } from "@/lib/types"
import { FileText } from "lucide-react"

interface DashboardProps {
  onSelectDocument: (doc: MedicalDocument) => void
  onScan: () => void
}

export function Dashboard({ onSelectDocument, onScan }: DashboardProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<DocumentType | null>(null)

  const filteredDocs = useMemo(() => {
    let docs = MOCK_DOCUMENTS

    if (filter) {
      docs = docs.filter((d) => d.type === filter)
    }

    if (search.trim()) {
      const query = search.toLowerCase()
      docs = docs.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.doctor?.toLowerCase().includes(query) ||
          d.ocrText?.toLowerCase().includes(query) ||
          d.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    return docs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [search, filter])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533]">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-white font-mono">
          Mis Documentos
        </h1>
        <p className="text-[#b2dfdb] text-base mt-1">
          {MOCK_DOCUMENTS.length} documentos guardados
        </p>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Filters */}
      <div className="px-6 mb-4">
        <FilterChips selected={filter} onSelect={setFilter} />
      </div>

      {/* Document List */}
      <div className="px-6 pb-28 flex flex-col gap-3">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={onSelectDocument}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-card/20 flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-[#b2dfdb]" />
            </div>
            <p className="text-white text-xl font-semibold">
              No se encontraron documentos
            </p>
            <p className="text-[#b2dfdb] text-base mt-2">
              Intenta con otros terminos de busqueda
            </p>
            <button
              onClick={onScan}
              className="mt-6 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Escanear documento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

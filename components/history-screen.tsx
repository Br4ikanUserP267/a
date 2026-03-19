"use client"

import { Share2, MessageCircle, Mail, Link2, Calendar } from "lucide-react"

interface ShareRecord {
  id: string
  documentTitle: string
  method: "whatsapp" | "email" | "link"
  date: string
  recipient?: string
}

const MOCK_HISTORY: ShareRecord[] = [
  {
    id: "1",
    documentTitle: "Hemograma Completo",
    method: "whatsapp",
    date: "2026-02-20",
    recipient: "Dr. Martinez",
  },
  {
    id: "2",
    documentTitle: "Formula - Losartan 50mg",
    method: "email",
    date: "2026-02-15",
    recipient: "farmacia@salud.com",
  },
  {
    id: "3",
    documentTitle: "Radiografia de Torax",
    method: "link",
    date: "2026-02-10",
  },
  {
    id: "4",
    documentTitle: "Incapacidad - 3 dias",
    method: "email",
    date: "2026-01-22",
    recipient: "rrhh@empresa.com",
  },
]

const METHOD_ICONS = {
  whatsapp: <MessageCircle className="h-5 w-5" />,
  email: <Mail className="h-5 w-5" />,
  link: <Link2 className="h-5 w-5" />,
}

const METHOD_LABELS = {
  whatsapp: "WhatsApp",
  email: "Correo",
  link: "Enlace",
}

const METHOD_COLORS = {
  whatsapp: "#25D366",
  email: "#4db6ac",
  link: "#1a5c5a",
}

export function HistoryScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5c5a] to-[#0d3533]">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-white font-mono">
          Historial de envios
        </h1>
        <p className="text-[#b2dfdb] text-base mt-1">
          {MOCK_HISTORY.length} documentos compartidos
        </p>
      </div>

      {/* History list */}
      <div className="px-6 pb-28 flex flex-col gap-3">
        {MOCK_HISTORY.map((record) => (
          <div
            key={record.id}
            className="bg-card rounded-2xl p-5 shadow-md flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: METHOD_COLORS[record.method] }}
            >
              {METHOD_ICONS[record.method]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-card-foreground truncate">
                {record.documentTitle}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Share2 className="h-3.5 w-3.5" />
                  {METHOD_LABELS[record.method]}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {record.date}
                </span>
              </div>
              {record.recipient && (
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {"A: "}{record.recipient}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

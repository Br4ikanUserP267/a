"use client"

import { useState } from "react"
import { Search, Mic, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar documentos..." }: SearchBarProps) {
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      return
    }

    const SpeechRecognition = (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "es-ES"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      onChange(transcript)
    }

    recognition.start()
  }

  return (
    <div className="flex items-center gap-3 bg-card rounded-2xl px-4 py-4 shadow-md border border-border">
      <Search className="h-6 w-6 text-primary shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-card-foreground placeholder:text-muted-foreground text-lg outline-none min-w-0"
        aria-label="Buscar documentos"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-muted-foreground shrink-0 p-1"
          aria-label="Limpiar busqueda"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <button
        type="button"
        onClick={handleVoiceSearch}
        className={`shrink-0 p-2 rounded-full transition-colors ${
          isListening
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
        aria-label="Buscar por voz"
      >
        <Mic className="h-6 w-6" />
      </button>
    </div>
  )
}

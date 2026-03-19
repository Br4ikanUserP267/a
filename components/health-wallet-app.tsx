"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { Dashboard } from "./dashboard"
import { ScanScreen } from "./scan-screen"
import { DocumentDetail } from "./document-detail"
import { ShareScreen } from "./share-screen"
import { HistoryScreen } from "./history-screen"
import { ProfileScreen } from "./profile-screen"
import { BottomNav } from "./bottom-nav"
import type { MedicalDocument, AppScreen } from "@/lib/types"

export function HealthWalletApp() {
  const [screen, setScreen] = useState<AppScreen>("login")
  const [selectedDocument, setSelectedDocument] = useState<MedicalDocument | null>(null)
  const [activeTab, setActiveTab] = useState<"home" | "scan" | "history" | "profile">("home")

  const handleLogin = () => {
    setScreen("home")
  }

  const handleLogout = () => {
    setScreen("login")
    setActiveTab("home")
    setSelectedDocument(null)
  }

  const handleSelectDocument = (doc: MedicalDocument) => {
    setSelectedDocument(doc)
    setScreen("document-detail")
  }

  const handleTabNavigate = (tab: "home" | "scan" | "history" | "profile") => {
    setActiveTab(tab)
    if (tab === "scan") {
      setScreen("scan")
    } else if (tab === "history") {
      setScreen("history")
    } else if (tab === "profile") {
      setScreen("home")
    } else {
      setScreen("home")
    }
  }

  const showNav =
    screen !== "login" && screen !== "scan" && screen !== "scan-review"

  return (
    <div className="max-w-lg mx-auto relative">
      {screen === "login" && <LoginForm onLogin={handleLogin} />}

      {screen === "home" && activeTab === "home" && (
        <Dashboard
          onSelectDocument={handleSelectDocument}
          onScan={() => {
            setActiveTab("scan")
            setScreen("scan")
          }}
        />
      )}

      {screen === "home" && activeTab === "profile" && (
        <ProfileScreen onLogout={handleLogout} />
      )}

      {screen === "scan" && (
        <ScanScreen
          onClose={() => {
            setActiveTab("home")
            setScreen("home")
          }}
          onSaved={() => {
            setActiveTab("home")
            setScreen("home")
          }}
        />
      )}

      {screen === "document-detail" && selectedDocument && (
        <DocumentDetail
          document={selectedDocument}
          onBack={() => setScreen("home")}
          onShare={() => setScreen("share")}
        />
      )}

      {screen === "share" && selectedDocument && (
        <ShareScreen
          document={selectedDocument}
          onBack={() => setScreen("document-detail")}
        />
      )}

      {screen === "history" && <HistoryScreen />}

      {showNav && (
        <BottomNav
          active={activeTab}
          onNavigate={handleTabNavigate}
        />
      )}
    </div>
  )
}

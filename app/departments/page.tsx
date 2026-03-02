"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Settings,
  LayoutDashboard,
  UserCog,
  Building2,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CenterRegistrationForm } from "@/components/departments/center-registration-form"
import { CenterSearchPanel } from "@/components/departments/center-search-panel"
import { CenterEditPanel } from "@/components/departments/center-edit-panel"
import { type Center } from "@/lib/department-data"

const NAV_ITEMS = [
  { label: "ダッシュボード", icon: LayoutDashboard, href: "/", active: false },
  { label: "ユーザー管理", icon: UserCog, href: "/", active: false },
  { label: "部署ページ編集", icon: Building2, href: "/departments", active: true },
  { label: "設定", icon: Settings, href: "/", active: false },
]

export default function DepartmentsPage() {
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r bg-card lg:block">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground">
            <Settings className="size-3.5 text-background" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {"管理コンソール"}
          </span>
        </div>
        <nav className="p-2">
          <ul className="flex flex-col gap-0.5" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="flex h-14 items-center gap-3 border-b px-6">
          <Building2 className="size-5 text-foreground" />
          <h1 className="text-lg font-semibold text-foreground">
            {"部署ページ編集"}
          </h1>
        </header>

        <div className="flex flex-col gap-6 p-6">
          {/* Section 1: New Registration */}
          <section aria-labelledby="section-register">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                {"1"}
              </span>
              <h2 id="section-register" className="text-sm font-semibold text-foreground">
                {"新規部署登録"}
              </h2>
            </div>
            <CenterRegistrationForm />
          </section>

          <Separator />

          {/* Section 2: Search & Edit */}
          <section aria-labelledby="section-edit">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                {"2"}
              </span>
              <h2 id="section-edit" className="text-sm font-semibold text-foreground">
                {"既存部署の登録情報変更"}
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              <CenterSearchPanel
                onSelectCenter={setSelectedCenter}
                selectedCenterId={selectedCenter?.id}
              />

              {selectedCenter && (
                <CenterEditPanel
                  center={selectedCenter}
                  onClose={() => setSelectedCenter(null)}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

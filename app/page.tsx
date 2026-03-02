import Link from "next/link"
import { Settings, LayoutDashboard, UserCog, Building2 } from "lucide-react"
import { AdminUserTable } from "@/components/admin-user-table"

const NAV_ITEMS = [
  { label: "ダッシュボード", icon: LayoutDashboard, href: "/", active: false },
  { label: "ユーザー管理", icon: UserCog, href: "/", active: true },
  { label: "部署ページ編集", icon: Building2, href: "/departments", active: false },
  { label: "設定", icon: Settings, href: "/", active: false },
]

export default function Page() {
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
        <header className="flex h-14 items-center border-b px-6">
          <h1 className="text-lg font-semibold text-foreground">
            {"ユーザー管理"}
          </h1>
        </header>

        <div className="p-6">
          {/* Description */}
          <div className="mb-6 rounded-lg border border-dashed bg-accent/30 p-4">
            <p className="text-sm leading-relaxed text-foreground">
              <strong>{"Sheet (サイドドロワー) デモ:"}</strong>
              {" 下のテーブルの「所属部署」列にある部署名をクリックしてください。右からスライドインするパネルで、部署の全メンバー一覧を確認できます。検索フィルタで絞り込みも可能です。編集は「部署ページ編集」メニューへ誘導されます。"}
            </p>
          </div>

          <AdminUserTable />
        </div>
      </main>
    </div>
  )
}

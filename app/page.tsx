import { Users, Settings, LayoutDashboard, UserCog } from "lucide-react"
import { AdminUserTable } from "@/components/admin-user-table"

const NAV_ITEMS = [
  { label: "ダッシュボード", icon: LayoutDashboard, active: false },
  { label: "ユーザー管理", icon: UserCog, active: true },
  { label: "部署ページ編集", icon: Users, active: false },
  { label: "設定", icon: Settings, active: false },
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
          <ul className="space-y-0.5" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </button>
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
              <strong>{"HoverCard デモ:"}</strong>
              {" 下のテーブルの「所属部署」列にある部署名にマウスをホバーしてください。部署のメンバー一覧がカードで表示されます。編集は「部署ページ編集」メニューへ誘導されます。"}
            </p>
          </div>

          <AdminUserTable />
        </div>
      </main>
    </div>
  )
}

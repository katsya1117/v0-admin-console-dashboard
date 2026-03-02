"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DepartmentHoverCard, type Department } from "@/components/department-hover-card"

// --- Sample data ---

const DEPARTMENTS: Record<string, Department> = {
  engineering: {
    name: "開発部",
    memberCount: 12,
    lead: "部長: 田中 太郎",
    members: [
      { name: "田中 太郎", role: "部長 / テックリード", initials: "田" },
      { name: "佐藤 花子", role: "シニアエンジニア", initials: "佐" },
      { name: "鈴木 一郎", role: "フロントエンドエンジニア", initials: "鈴" },
      { name: "高橋 美咲", role: "バックエンドエンジニア", initials: "高" },
      { name: "伊藤 健太", role: "インフラエンジニア", initials: "伊" },
    ],
  },
  design: {
    name: "デザイン部",
    memberCount: 6,
    lead: "部長: 山田 美穂",
    members: [
      { name: "山田 美穂", role: "部長 / デザインリード", initials: "山" },
      { name: "中村 翔太", role: "UIデザイナー", initials: "中" },
      { name: "小林 由美", role: "UXリサーチャー", initials: "小" },
      { name: "加藤 優", role: "グラフィックデザイナー", initials: "加" },
    ],
  },
  sales: {
    name: "営業部",
    memberCount: 8,
    lead: "部長: 渡辺 誠",
    members: [
      { name: "渡辺 誠", role: "部長 / セールスマネージャー", initials: "渡" },
      { name: "松本 茜", role: "アカウントエグゼクティブ", initials: "松" },
      { name: "井上 大輔", role: "インサイドセールス", initials: "井" },
      { name: "木村 真由美", role: "カスタマーサクセス", initials: "木" },
    ],
  },
  hr: {
    name: "人事部",
    memberCount: 4,
    lead: "部長: 林 恵子",
    members: [
      { name: "林 恵子", role: "部長 / CHRO", initials: "林" },
      { name: "清水 浩二", role: "採用担当", initials: "清" },
      { name: "山口 さくら", role: "労務担当", initials: "山" },
      { name: "阿部 隆", role: "研修担当", initials: "阿" },
    ],
  },
}

interface UserRow {
  id: string
  name: string
  initials: string
  email: string
  departmentKey: string
  role: string
  status: "active" | "inactive"
}

const USERS: UserRow[] = [
  {
    id: "1",
    name: "佐藤 花子",
    initials: "佐",
    email: "sato@example.com",
    departmentKey: "engineering",
    role: "シニアエンジニア",
    status: "active",
  },
  {
    id: "2",
    name: "山田 美穂",
    initials: "山",
    email: "yamada@example.com",
    departmentKey: "design",
    role: "デザインリード",
    status: "active",
  },
  {
    id: "3",
    name: "松本 茜",
    initials: "松",
    email: "matsumoto@example.com",
    departmentKey: "sales",
    role: "アカウントエグゼクティブ",
    status: "active",
  },
  {
    id: "4",
    name: "清水 浩二",
    initials: "清",
    email: "shimizu@example.com",
    departmentKey: "hr",
    role: "採用担当",
    status: "inactive",
  },
  {
    id: "5",
    name: "鈴木 一郎",
    initials: "鈴",
    email: "suzuki@example.com",
    departmentKey: "engineering",
    role: "フロントエンドエンジニア",
    status: "active",
  },
  {
    id: "6",
    name: "中村 翔太",
    initials: "中",
    email: "nakamura@example.com",
    departmentKey: "design",
    role: "UIデザイナー",
    status: "active",
  },
]

export function AdminUserTable() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px]">{"ユーザー"}</TableHead>
            <TableHead className="w-[200px]">{"所属部署"}</TableHead>
            <TableHead className="w-[200px]">{"役職"}</TableHead>
            <TableHead className="w-[100px] text-center">{"ステータス"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {USERS.map((user) => {
            const dept = DEPARTMENTS[user.departmentKey]
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-foreground">
                        {user.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {/* --- Here is the HoverCard --- */}
                  <DepartmentHoverCard department={dept} />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-foreground">{user.role}</span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={user.status === "active" ? "secondary" : "outline"}
                    className={
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "text-muted-foreground"
                    }
                  >
                    {user.status === "active" ? "有効" : "無効"}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

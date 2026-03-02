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
import { DepartmentMemberSheet, type Department } from "@/components/department-hover-card"

// --- 30-member sample departments ---

const DEPARTMENTS: Record<string, Department> = {
  engineering: {
    name: "開発部",
    memberCount: 30,
    lead: "部長: 田中 太郎",
    members: [
      { name: "田中 太郎", role: "部長 / テックリード", initials: "田", email: "tanaka@example.com" },
      { name: "佐藤 花子", role: "シニアエンジニア", initials: "佐", email: "sato.h@example.com" },
      { name: "鈴木 一郎", role: "フロントエンドエンジニア", initials: "鈴", email: "suzuki@example.com" },
      { name: "高橋 美咲", role: "バックエンドエンジニア", initials: "高", email: "takahashi@example.com" },
      { name: "伊藤 健太", role: "インフラエンジニア", initials: "伊", email: "ito.k@example.com" },
      { name: "渡辺 直樹", role: "SRE", initials: "渡", email: "watanabe.n@example.com" },
      { name: "山本 真司", role: "テックリード", initials: "山", email: "yamamoto.s@example.com" },
      { name: "中村 翔太", role: "フルスタックエンジニア", initials: "中", email: "nakamura.s@example.com" },
      { name: "小林 由美", role: "QAエンジニア", initials: "小", email: "kobayashi.y@example.com" },
      { name: "加藤 優", role: "モバイルエンジニア", initials: "加", email: "kato.y@example.com" },
      { name: "吉田 健一", role: "データエンジニア", initials: "吉", email: "yoshida.k@example.com" },
      { name: "山田 太一", role: "MLエンジニア", initials: "山", email: "yamada.t@example.com" },
      { name: "佐々木 理恵", role: "フロントエンドエンジニア", initials: "佐", email: "sasaki.r@example.com" },
      { name: "松本 茜", role: "バックエンドエンジニア", initials: "松", email: "matsumoto.a@example.com" },
      { name: "井上 大輔", role: "セキュリティエンジニア", initials: "井", email: "inoue.d@example.com" },
      { name: "木村 真由美", role: "プロジェクトマネージャー", initials: "木", email: "kimura.m@example.com" },
      { name: "林 恵子", role: "スクラムマスター", initials: "林", email: "hayashi.k@example.com" },
      { name: "清水 浩二", role: "DevOpsエンジニア", initials: "清", email: "shimizu.k@example.com" },
      { name: "山口 さくら", role: "UIエンジニア", initials: "山", email: "yamaguchi.s@example.com" },
      { name: "阿部 隆", role: "バックエンドエンジニア", initials: "阿", email: "abe.t@example.com" },
      { name: "石井 美香", role: "フロントエンドエンジニア", initials: "石", email: "ishii.m@example.com" },
      { name: "前田 拓也", role: "インフラエンジニア", initials: "前", email: "maeda.t@example.com" },
      { name: "藤田 陽子", role: "QAリード", initials: "藤", email: "fujita.y@example.com" },
      { name: "岡田 達也", role: "アーキテクト", initials: "岡", email: "okada.t@example.com" },
      { name: "後藤 真一", role: "データベースエンジニア", initials: "後", email: "goto.s@example.com" },
      { name: "長谷川 玲奈", role: "フルスタックエンジニア", initials: "長", email: "hasegawa.r@example.com" },
      { name: "村上 浩", role: "モバイルエンジニア", initials: "村", email: "murakami.h@example.com" },
      { name: "近藤 美穂", role: "テクニカルライター", initials: "近", email: "kondo.m@example.com" },
      { name: "坂本 竜馬", role: "フロントエンドエンジニア", initials: "坂", email: "sakamoto.r@example.com" },
      { name: "遠藤 綾", role: "バックエンドエンジニア", initials: "遠", email: "endo.a@example.com" },
    ],
  },
  design: {
    name: "デザイン部",
    memberCount: 8,
    lead: "部長: 山田 美穂",
    members: [
      { name: "山田 美穂", role: "部長 / デザインリード", initials: "山", email: "yamada.m@example.com" },
      { name: "原田 翔太", role: "UIデザイナー", initials: "原", email: "harada.s@example.com" },
      { name: "小林 由美", role: "UXリサーチャー", initials: "小", email: "kobayashi.ux@example.com" },
      { name: "藤原 優", role: "グラフィックデザイナー", initials: "藤", email: "fujiwara.y@example.com" },
      { name: "川口 彩", role: "プロダクトデザイナー", initials: "川", email: "kawaguchi.a@example.com" },
      { name: "西田 健", role: "モーションデザイナー", initials: "西", email: "nishida.k@example.com" },
      { name: "上田 麻衣", role: "UIデザイナー", initials: "上", email: "ueda.m@example.com" },
      { name: "三浦 大地", role: "デザインエンジニア", initials: "三", email: "miura.d@example.com" },
    ],
  },
  sales: {
    name: "営業部",
    memberCount: 12,
    lead: "部長: 渡辺 誠",
    members: [
      { name: "渡辺 誠", role: "部長 / セールスマネージャー", initials: "渡", email: "watanabe.m@example.com" },
      { name: "松本 茜", role: "アカウントエグゼクティブ", initials: "松", email: "matsumoto.ak@example.com" },
      { name: "井上 大輔", role: "インサイドセールス", initials: "井", email: "inoue.is@example.com" },
      { name: "木村 真由美", role: "カスタマーサクセス", initials: "木", email: "kimura.cs@example.com" },
      { name: "佐藤 雄太", role: "フィールドセールス", initials: "佐", email: "sato.y@example.com" },
      { name: "田村 裕子", role: "セールスオペレーション", initials: "田", email: "tamura.y@example.com" },
      { name: "中島 亮", role: "エンタープライズ営業", initials: "中", email: "nakajima.r@example.com" },
      { name: "福田 恵", role: "パートナーセールス", initials: "福", email: "fukuda.m@example.com" },
      { name: "石田 修", role: "ソリューションセールス", initials: "石", email: "ishida.o@example.com" },
      { name: "森 沙織", role: "インサイドセールス", initials: "森", email: "mori.s@example.com" },
      { name: "橋本 拓海", role: "アカウントマネージャー", initials: "橋", email: "hashimoto.t@example.com" },
      { name: "小川 梨花", role: "カスタマーサクセス", initials: "小", email: "ogawa.r@example.com" },
    ],
  },
  hr: {
    name: "人事部",
    memberCount: 5,
    lead: "部長: 林 恵子",
    members: [
      { name: "林 恵子", role: "部長 / CHRO", initials: "林", email: "hayashi.hr@example.com" },
      { name: "清水 浩二", role: "採用担当", initials: "清", email: "shimizu.hr@example.com" },
      { name: "山口 さくら", role: "労務担当", initials: "山", email: "yamaguchi.hr@example.com" },
      { name: "阿部 隆", role: "研修担当", initials: "阿", email: "abe.hr@example.com" },
      { name: "野田 真理", role: "組織開発", initials: "野", email: "noda.m@example.com" },
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
    email: "sato.h@example.com",
    departmentKey: "engineering",
    role: "シニアエンジニア",
    status: "active",
  },
  {
    id: "2",
    name: "山田 美穂",
    initials: "山",
    email: "yamada.m@example.com",
    departmentKey: "design",
    role: "デザインリード",
    status: "active",
  },
  {
    id: "3",
    name: "松本 茜",
    initials: "松",
    email: "matsumoto.ak@example.com",
    departmentKey: "sales",
    role: "アカウントエグゼクティブ",
    status: "active",
  },
  {
    id: "4",
    name: "清水 浩二",
    initials: "清",
    email: "shimizu.hr@example.com",
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
    name: "原田 翔太",
    initials: "原",
    email: "harada.s@example.com",
    departmentKey: "design",
    role: "UIデザイナー",
    status: "active",
  },
  {
    id: "7",
    name: "渡辺 誠",
    initials: "渡",
    email: "watanabe.m@example.com",
    departmentKey: "sales",
    role: "セールスマネージャー",
    status: "active",
  },
  {
    id: "8",
    name: "岡田 達也",
    initials: "岡",
    email: "okada.t@example.com",
    departmentKey: "engineering",
    role: "アーキテクト",
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
                  <DepartmentMemberSheet department={dept} />
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

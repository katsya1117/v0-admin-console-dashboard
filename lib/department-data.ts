// ---------- Types ----------

export interface CenterMember {
  userId: string
  userName: string
  permission: "read" | "write" | "admin"
  isAdmin: boolean
  isGuest: boolean
  guestFromCenter?: string
}

export interface CenterDetail {
  allocatedCapacity: number    // KB
  totalUsage: number           // KB
  sharedUsage: number          // KB
  jobRatio: number             // %
  usageRate: number            // %
}

export interface Center {
  id: string
  name: string
  type: "所属" | "カスタマイズ"
  deployTarget: "YOKOHAMA" | "CHUBU"
  members: CenterMember[]
  detail: CenterDetail
}

// ---------- All users (for autocomplete) ----------

export interface SystemUser {
  userId: string
  userName: string
}

export const ALL_USERS: SystemUser[] = [
  { userId: "U001", userName: "田中 太郎" },
  { userId: "U002", userName: "佐藤 花子" },
  { userId: "U003", userName: "鈴木 一郎" },
  { userId: "U004", userName: "高橋 美咲" },
  { userId: "U005", userName: "伊藤 健太" },
  { userId: "U006", userName: "渡辺 直樹" },
  { userId: "U007", userName: "山本 真司" },
  { userId: "U008", userName: "中村 翔太" },
  { userId: "U009", userName: "小林 由美" },
  { userId: "U010", userName: "加藤 優" },
  { userId: "U011", userName: "吉田 健一" },
  { userId: "U012", userName: "山田 太一" },
  { userId: "U013", userName: "佐々木 理恵" },
  { userId: "U014", userName: "松本 茜" },
  { userId: "U015", userName: "井上 大輔" },
  { userId: "U016", userName: "木村 真由美" },
  { userId: "U017", userName: "林 恵子" },
  { userId: "U018", userName: "清水 浩二" },
  { userId: "U019", userName: "山口 さくら" },
  { userId: "U020", userName: "阿部 隆" },
  { userId: "U021", userName: "石井 美香" },
  { userId: "U022", userName: "前田 拓也" },
  { userId: "U023", userName: "藤田 陽子" },
  { userId: "U024", userName: "岡田 達也" },
  { userId: "U025", userName: "後藤 真一" },
  { userId: "U026", userName: "長谷川 玲奈" },
  { userId: "U027", userName: "村上 浩" },
  { userId: "U028", userName: "近藤 美穂" },
  { userId: "U029", userName: "坂本 竜馬" },
  { userId: "U030", userName: "遠藤 綾" },
  { userId: "U031", userName: "福田 恵" },
  { userId: "U032", userName: "西田 健" },
  { userId: "U033", userName: "上田 麻衣" },
  { userId: "U034", userName: "三浦 大地" },
  { userId: "U035", userName: "原田 翔太" },
]

// ---------- Sample centers ----------

function generateMembers(prefix: string, count: number): CenterMember[] {
  return ALL_USERS.slice(0, count).map((u, i) => ({
    userId: u.userId,
    userName: u.userName,
    permission: i === 0 ? "admin" as const : i < 3 ? "write" as const : "read" as const,
    isAdmin: i === 0,
    isGuest: false,
  }))
}

export const CENTERS: Center[] = [
  {
    id: "CTR-001",
    name: "東京第一センター",
    type: "所属",
    deployTarget: "YOKOHAMA",
    members: [
      ...generateMembers("tokyo1", 28),
      { userId: "U031", userName: "福田 恵", permission: "read", isAdmin: false, isGuest: true, guestFromCenter: "大阪センター" },
      { userId: "U032", userName: "西田 健", permission: "read", isAdmin: false, isGuest: true, guestFromCenter: "名古屋センター" },
    ],
    detail: {
      allocatedCapacity: 5242880,  // 5TB in KB
      totalUsage: 3145728,         // 3TB in KB
      sharedUsage: 524288,         // 512MB in KB
      jobRatio: 70,
      usageRate: 60,
    },
  },
  {
    id: "CTR-002",
    name: "大阪センター",
    type: "所属",
    deployTarget: "CHUBU",
    members: generateMembers("osaka", 15),
    detail: {
      allocatedCapacity: 2097152,
      totalUsage: 1048576,
      sharedUsage: 262144,
      jobRatio: 60,
      usageRate: 50,
    },
  },
  {
    id: "CTR-003",
    name: "名古屋センター",
    type: "カスタマイズ",
    deployTarget: "CHUBU",
    members: generateMembers("nagoya", 20),
    detail: {
      allocatedCapacity: 3145728,
      totalUsage: 2621440,
      sharedUsage: 393216,
      jobRatio: 65,
      usageRate: 83,
    },
  },
  {
    id: "CTR-004",
    name: "横浜開発センター",
    type: "カスタマイズ",
    deployTarget: "YOKOHAMA",
    members: generateMembers("yokohama", 10),
    detail: {
      allocatedCapacity: 1048576,
      totalUsage: 524288,
      sharedUsage: 131072,
      jobRatio: 75,
      usageRate: 50,
    },
  },
  {
    id: "CTR-005",
    name: "福岡センター",
    type: "所属",
    deployTarget: "YOKOHAMA",
    members: generateMembers("fukuoka", 8),
    detail: {
      allocatedCapacity: 1572864,
      totalUsage: 786432,
      sharedUsage: 196608,
      jobRatio: 55,
      usageRate: 50,
    },
  },
]

// ---------- Utility functions ----------

export function kbToTb(kb: number): string {
  const tb = kb / (1024 * 1024)
  if (tb >= 1) return `${tb.toFixed(1)}TB`
  const gb = kb / (1024)
  if (gb >= 1) return `${gb.toFixed(1)}GB`
  return `${(kb / 1024).toFixed(1)}MB`
}

export function kbToMb(kb: number): string {
  const mb = kb / 1024
  return `${mb.toFixed(1)}MB`
}

export function kbToTbNumeric(kb: number): string {
  const tb = kb / (1024 * 1024)
  return `${tb.toFixed(1)}TB`
}

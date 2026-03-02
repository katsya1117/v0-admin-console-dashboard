"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type Center,
  type CenterMember,
  ALL_USERS,
  kbToTbNumeric,
  kbToMb,
} from "@/lib/department-data"

interface CenterEditPanelProps {
  center: Center
  onClose: () => void
}

export function CenterEditPanel({ center, onClose }: CenterEditPanelProps) {
  const [members, setMembers] = useState<CenterMember[]>(center.members)
  const [detail, setDetail] = useState(center.detail)
  const [guestQuery, setGuestQuery] = useState("")
  const [showGuestSuggestions, setShowGuestSuggestions] = useState(false)
  const [detailOpen, setDetailOpen] = useState(true)
  const guestInputRef = useRef<HTMLInputElement>(null)
  const guestSuggestionsRef = useRef<HTMLDivElement>(null)

  // Reset when center changes
  useEffect(() => {
    setMembers(center.members)
    setDetail(center.detail)
  }, [center])

  // Close guest suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        guestSuggestionsRef.current &&
        !guestSuggestionsRef.current.contains(e.target as Node) &&
        guestInputRef.current &&
        !guestInputRef.current.contains(e.target as Node)
      ) {
        setShowGuestSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter users not already in this center
  const guestSuggestions = useMemo(() => {
    if (!guestQuery.trim()) return []
    const existingIds = new Set(members.map((m) => m.userId))
    return ALL_USERS.filter(
      (u) =>
        !existingIds.has(u.userId) &&
        (u.userName.includes(guestQuery) ||
          u.userId.toLowerCase().includes(guestQuery.toLowerCase()))
    ).slice(0, 8)
  }, [guestQuery, members])

  function addGuest(userId: string, userName: string) {
    const newMember: CenterMember = {
      userId,
      userName,
      permission: "read",
      isAdmin: false,
      isGuest: true,
      guestFromCenter: "外部",
    }
    setMembers((prev) => [...prev, newMember])
    setGuestQuery("")
    setShowGuestSuggestions(false)
  }

  function removeGuest(userId: string) {
    setMembers((prev) => prev.filter((m) => !(m.userId === userId && m.isGuest)))
  }

  function toggleAdmin(userId: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.userId === userId ? { ...m, isAdmin: !m.isAdmin, permission: !m.isAdmin ? "admin" : "read" } : m
      )
    )
  }

  const guestCount = members.filter((m) => m.isGuest).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{center.name}</CardTitle>
            <CardDescription className="mt-1">
              {"センター登録情報の閲覧・編集"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="size-4" />
            <span className="sr-only">{"閉じる"}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Readonly fields */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{"センター名"}</Label>
            <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-foreground">{center.name}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{"タイプ"}</Label>
            <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-foreground">{center.type}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">{"展開先"}</Label>
            <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-foreground">{center.deployTarget}</div>
          </div>
        </div>

        <Separator />

        {/* ---------- Members section ---------- */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-foreground">{"メンバー"}</h3>
              <Badge variant="secondary" className="gap-1">
                <Users className="size-3" />
                {members.length}
              </Badge>
              {guestCount > 0 && (
                <Badge variant="outline" className="gap-1 text-xs">
                  {"ゲスト: "}{guestCount}
                </Badge>
              )}
            </div>

            {/* Guest user add button */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <UserPlus className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={guestInputRef}
                    placeholder="ゲストユーザーを追加..."
                    className="h-8 w-56 pl-8 text-sm"
                    value={guestQuery}
                    onChange={(e) => {
                      setGuestQuery(e.target.value)
                      setShowGuestSuggestions(true)
                    }}
                    onFocus={() => {
                      if (guestQuery.trim()) setShowGuestSuggestions(true)
                    }}
                  />
                </div>
              </div>

              {/* Guest autocomplete */}
              {showGuestSuggestions && guestSuggestions.length > 0 && (
                <div
                  ref={guestSuggestionsRef}
                  className="absolute right-0 top-full z-50 mt-1 w-64 rounded-md border bg-popover shadow-md"
                >
                  <ul className="max-h-48 overflow-y-auto py-1" role="listbox">
                    {guestSuggestions.map((u) => (
                      <li key={u.userId}>
                        <button
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                          onClick={() => addGuest(u.userId, u.userName)}
                          role="option"
                          aria-selected={false}
                        >
                          <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                            {u.userName.charAt(0)}
                          </span>
                          <span className="text-foreground">{u.userName}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{u.userId}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Members table */}
          <div className="max-h-[400px] overflow-y-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[60px] text-center">{"管理者"}</TableHead>
                  <TableHead className="w-[60px] text-center">{"ゲスト"}</TableHead>
                  <TableHead className="w-[120px]">{"センター名"}</TableHead>
                  <TableHead className="w-[90px]">{"ユーザーID"}</TableHead>
                  <TableHead>{"ユーザー名"}</TableHead>
                  <TableHead className="w-[80px]">{"権限"}</TableHead>
                  <TableHead className="w-[160px] text-center">{"操作"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={`${member.userId}-${member.isGuest}`}>
                    <TableCell className="text-center">
                      {member.isAdmin ? (
                        <Shield className="mx-auto size-4 text-amber-500" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{"-"}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {member.isGuest ? (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800">
                          {"G"}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">{"-"}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.isGuest ? (
                        <span className="text-xs text-muted-foreground">{member.guestFromCenter}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">{"-"}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-foreground">{member.userId}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">{member.userName}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          member.permission === "admin"
                            ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                            : member.permission === "write"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                              : ""
                        }
                      >
                        {member.permission}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Switch
                            checked={member.isAdmin}
                            onCheckedChange={() => toggleAdmin(member.userId)}
                            aria-label="管理者トグル"
                          />
                          <span className="text-xs text-muted-foreground">{"管理者"}</span>
                        </div>
                        {member.isGuest && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1 px-2 text-destructive hover:text-destructive"
                            onClick={() => removeGuest(member.userId)}
                          >
                            <Trash2 className="size-3" />
                            <span className="text-xs">{"削除"}</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <Separator />

        {/* ---------- Detail settings ---------- */}
        <div>
          <button
            className="flex w-full items-center justify-between py-1 text-left"
            onClick={() => setDetailOpen(!detailOpen)}
          >
            <h3 className="text-sm font-semibold text-foreground">{"詳細設定"}</h3>
            {detailOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          {detailOpen && (
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {/* Allocated Capacity */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <Label className="text-xs text-muted-foreground">{"割り当て容量"}</Label>
                <div className="mt-2 flex items-baseline gap-2">
                  <Input
                    type="number"
                    className="h-9 w-36 font-mono"
                    value={detail.allocatedCapacity}
                    onChange={(e) =>
                      setDetail((d) => ({ ...d, allocatedCapacity: Number(e.target.value) || 0 }))
                    }
                  />
                  <span className="text-xs text-muted-foreground">{"KB"}</span>
                  <span className="ml-2 rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {kbToTbNumeric(detail.allocatedCapacity)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {"単位KByte JOB領域および共有領域の合計容量を指定する"}
                </p>
              </div>

              {/* Total Usage */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <Label className="text-xs text-muted-foreground">{"全体使用量"}</Label>
                <div className="mt-2 flex items-baseline gap-2">
                  <Input
                    type="number"
                    className="h-9 w-36 font-mono"
                    value={detail.totalUsage}
                    onChange={(e) =>
                      setDetail((d) => ({ ...d, totalUsage: Number(e.target.value) || 0 }))
                    }
                  />
                  <span className="text-xs text-muted-foreground">{"KB"}</span>
                  <span className="ml-2 rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {kbToMb(detail.totalUsage)}
                  </span>
                </div>
              </div>

              {/* Shared Usage */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <Label className="text-xs text-muted-foreground">{"共有領域使用量"}</Label>
                <div className="mt-2 flex items-baseline gap-2">
                  <Input
                    type="number"
                    className="h-9 w-36 font-mono"
                    value={detail.sharedUsage}
                    onChange={(e) =>
                      setDetail((d) => ({ ...d, sharedUsage: Number(e.target.value) || 0 }))
                    }
                  />
                  <span className="text-xs text-muted-foreground">{"KB"}</span>
                  <span className="ml-2 rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {kbToMb(detail.sharedUsage)}
                  </span>
                </div>
              </div>

              {/* JOB Ratio */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <Label className="text-xs text-muted-foreground">{"JOB比率"}</Label>
                <div className="mt-2 flex items-baseline gap-2">
                  <Input
                    type="number"
                    className="h-9 w-24 font-mono"
                    value={detail.jobRatio}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      setDetail((d) => ({ ...d, jobRatio: Number(e.target.value) || 0 }))
                    }
                  />
                  <span className="text-xs text-muted-foreground">{"%"}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {"整数のみ JOB領域側の比率を指定する"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={detail.jobRatio} className="h-1.5 flex-1" />
                  <span className="text-xs font-mono text-muted-foreground">{detail.jobRatio}{"%"}</span>
                </div>
              </div>

              {/* Usage Rate */}
              <div className="rounded-lg border bg-muted/30 p-4 sm:col-span-2">
                <Label className="text-xs text-muted-foreground">{"使用率"}</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <Input
                      type="number"
                      className="h-9 w-24 font-mono"
                      value={detail.usageRate}
                      min={0}
                      max={100}
                      onChange={(e) =>
                        setDetail((d) => ({ ...d, usageRate: Number(e.target.value) || 0 }))
                      }
                    />
                    <span className="text-xs text-muted-foreground">{"%"}</span>
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <Progress
                      value={detail.usageRate}
                      className={`h-2 flex-1 ${
                        detail.usageRate >= 80
                          ? "[&>div]:bg-destructive"
                          : detail.usageRate >= 60
                            ? "[&>div]:bg-amber-500"
                            : "[&>div]:bg-emerald-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold font-mono ${
                        detail.usageRate >= 80
                          ? "text-destructive"
                          : detail.usageRate >= 60
                            ? "text-amber-600"
                            : "text-emerald-600"
                      }`}
                    >
                      {detail.usageRate}{"%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            {"キャンセル"}
          </Button>
          <Button>{"変更を保存"}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

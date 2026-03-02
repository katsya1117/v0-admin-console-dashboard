"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search, Users, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Button } from "@/components/ui/button"
import { CENTERS, ALL_USERS, type Center } from "@/lib/department-data"

interface CenterSearchPanelProps {
  onSelectCenter: (center: Center) => void
  selectedCenterId?: string
}

export function CenterSearchPanel({ onSelectCenter, selectedCenterId }: CenterSearchPanelProps) {
  const [centerNameQuery, setCenterNameQuery] = useState("")
  const [memberQuery, setMemberQuery] = useState("")
  const [showMemberSuggestions, setShowMemberSuggestions] = useState(false)
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string | null>(null)
  const memberInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        memberInputRef.current &&
        !memberInputRef.current.contains(e.target as Node)
      ) {
        setShowMemberSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Autocomplete suggestions for member search
  const memberSuggestions = useMemo(() => {
    if (!memberQuery.trim()) return []
    return ALL_USERS.filter(
      (u) =>
        u.userName.includes(memberQuery) || u.userId.toLowerCase().includes(memberQuery.toLowerCase())
    ).slice(0, 8)
  }, [memberQuery])

  // Filter centers
  const filteredCenters = useMemo(() => {
    return CENTERS.filter((c) => {
      const matchesName = centerNameQuery.trim() === "" || c.name.includes(centerNameQuery)
      const matchesMember =
        !selectedMemberFilter ||
        c.members.some((m) => m.userId === selectedMemberFilter)
      return matchesName && matchesMember
    })
  }, [centerNameQuery, selectedMemberFilter])

  function handleSelectMember(userId: string, userName: string) {
    setSelectedMemberFilter(userId)
    setMemberQuery(userName)
    setShowMemberSuggestions(false)
  }

  function clearMemberFilter() {
    setSelectedMemberFilter(null)
    setMemberQuery("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{"既存センター検索"}</CardTitle>
        <CardDescription>
          {"センター名またはメンバー名で検索し、登録情報を閲覧・編集するセンターを選択します"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* Center name search */}
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="search-center-name">{"センター名"}</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-center-name"
                placeholder="センター名で検索..."
                className="pl-9"
                value={centerNameQuery}
                onChange={(e) => setCenterNameQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Member autocomplete search */}
          <div className="relative flex flex-1 flex-col gap-2">
            <Label htmlFor="search-member">{"メンバー（逆引き）"}</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={memberInputRef}
                id="search-member"
                placeholder="メンバー名で逆引き..."
                className="pl-9"
                value={memberQuery}
                onChange={(e) => {
                  setMemberQuery(e.target.value)
                  setSelectedMemberFilter(null)
                  setShowMemberSuggestions(true)
                }}
                onFocus={() => {
                  if (memberQuery.trim()) setShowMemberSuggestions(true)
                }}
              />
              {selectedMemberFilter && (
                <button
                  onClick={clearMemberFilter}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  aria-label="フィルタ解除"
                >
                  {"x 解除"}
                </button>
              )}
            </div>

            {/* Autocomplete dropdown */}
            {showMemberSuggestions && memberSuggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 top-full z-50 mt-1 w-full rounded-md border bg-popover shadow-md"
              >
                <ul className="max-h-48 overflow-y-auto py-1" role="listbox">
                  {memberSuggestions.map((u) => (
                    <li key={u.userId}>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => handleSelectMember(u.userId, u.userName)}
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

        {/* Search results table */}
        <div className="mt-5 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>{"センター名"}</TableHead>
                <TableHead className="w-[120px] text-center">{"メンバー数"}</TableHead>
                <TableHead className="w-[100px] text-center">{"タイプ"}</TableHead>
                <TableHead className="w-[100px] text-right">{"操作"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    {"該当するセンターが見つかりません"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCenters.map((center) => (
                  <TableRow
                    key={center.id}
                    className={
                      selectedCenterId === center.id
                        ? "bg-accent/50"
                        : "cursor-pointer"
                    }
                    onClick={() => onSelectCenter(center)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{center.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {center.deployTarget}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="size-3.5 text-muted-foreground" />
                        <span className="text-sm text-foreground">{center.members.length}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={
                          center.type === "所属"
                            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                            : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                        }
                      >
                        {center.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8">
                        {"選択"}
                        <ChevronRight className="ml-1 size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Users, ExternalLink, Search, Mail } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export interface Member {
  name: string
  role: string
  initials: string
  email: string
}

export interface Department {
  name: string
  memberCount: number
  lead: string
  members: Member[]
}

export function DepartmentMemberSheet({
  department,
}: {
  department: Department
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return department.members
    const q = search.toLowerCase()
    return department.members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    )
  }, [search, department.members])

  return (
    <>
      {/* Trigger: clickable department badge in the table */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Users className="size-3.5 text-muted-foreground" />
        {department.name}
      </button>

      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md">
          {/* Header */}
          <SheetHeader className="gap-3 border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Users className="size-5 text-accent-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <SheetTitle className="text-base">
                  {department.name}
                </SheetTitle>
                <SheetDescription className="mt-0.5">
                  {department.memberCount}
                  {"名のメンバー"}
                </SheetDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {department.lead}
              </Badge>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="名前・役職・メールで検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </SheetHeader>

          {/* Member list */}
          <ScrollArea className="flex-1">
            <div className="px-6 py-2">
              <p className="py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {"メンバー一覧"}
                {search.trim() && (
                  <span className="ml-1.5 normal-case tracking-normal">
                    {"("}
                    {filtered.length}
                    {"件)"}
                  </span>
                )}
              </p>
              <Separator className="mb-1" />

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="mb-3 size-8 text-muted-foreground/40" />
                  <p className="text-sm font-medium text-foreground">
                    {"該当するメンバーがいません"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {"検索条件を変更してください"}
                  </p>
                </div>
              ) : (
                <ul className="divide-y" role="list">
                  {filtered.map((member, i) => (
                    <li
                      key={`${member.name}-${i}`}
                      className="flex items-center gap-3 py-3 transition-colors hover:bg-accent/50 rounded-md px-2 -mx-2"
                    >
                      <Avatar className="size-9 shrink-0">
                        <AvatarFallback className="bg-muted text-xs font-semibold text-muted-foreground">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none text-foreground">
                          {member.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="size-3" />
                        <span className="hidden sm:inline truncate max-w-[140px]">
                          {member.email}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <SheetFooter className="border-t px-6 py-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                // In a real app, navigate to department edit page
                setOpen(false)
              }}
            >
              <ExternalLink className="size-4" />
              {"部署ページ編集で設定する"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

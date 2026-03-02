"use client"

import { Users, ExternalLink } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface Member {
  name: string
  role: string
  initials: string
}

export interface Department {
  name: string
  memberCount: number
  lead: string
  members: Member[]
}

export function DepartmentHoverCard({
  department,
}: {
  department: Department
}) {
  const displayMembers = department.members.slice(0, 4)
  const remaining = department.memberCount - displayMembers.length

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:bg-accent hover:text-accent-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Users className="size-3.5 text-muted-foreground" />
          {department.name}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-80 p-0"
        side="bottom"
        align="start"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
              <Users className="size-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-foreground">
                {department.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {department.memberCount}{"名"}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {department.lead}
          </Badge>
        </div>

        {/* Member list */}
        <div className="px-4 py-3">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {"メンバー"}
          </p>
          <ul className="space-y-2" role="list">
            {displayMembers.map((member) => (
              <li key={member.name} className="flex items-center gap-2.5">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium leading-none text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {remaining > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {"+ "}
              {remaining}
              {"名"}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-full justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {"部署ページ編集で設定する"}
            <ExternalLink className="size-3" />
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

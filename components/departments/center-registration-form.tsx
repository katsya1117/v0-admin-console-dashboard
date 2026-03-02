"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CenterRegistrationForm() {
  const [centerName, setCenterName] = useState("")
  const [centerType, setCenterType] = useState<string>("")
  const [deployTarget, setDeployTarget] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)

  const isValid = centerName.trim() !== "" && centerType !== "" && deployTarget !== ""

  function handleSubmit() {
    if (!isValid) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setCenterName("")
      setCenterType("")
      setDeployTarget("")
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{"新規センター登録"}</CardTitle>
        <CardDescription>
          {"未定義のセンターをJCLに追加します"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Center Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="center-name">{"センター名"}</Label>
            <Input
              id="center-name"
              placeholder="例: 東京第二センター"
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <Label>{"タイプ"}</Label>
            <Select value={centerType} onValueChange={setCenterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="所属">{"所属"}</SelectItem>
                <SelectItem value="カスタマイズ">{"カスタマイズ"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deploy Target */}
          <div className="flex flex-col gap-2">
            <Label>{"展開先"}</Label>
            <Select value={deployTarget} onValueChange={setDeployTarget}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YOKOHAMA">{"YOKOHAMA"}</SelectItem>
                <SelectItem value="CHUBU">{"CHUBU"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={handleSubmit} disabled={!isValid || submitted}>
            <Plus className="size-4" />
            {submitted ? "登録しました" : "センターを追加"}
          </Button>
          {submitted && (
            <span className="text-sm text-emerald-600">
              {"センターが正常に登録されました"}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

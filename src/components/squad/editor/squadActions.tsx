import { Button } from "@/components/ui/button";
import { RotateCcw, Save, Share2 } from "lucide-react";

export default function SquadActions() {
  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <Save className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">액션</div>
          <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
            스쿼드를 저장하거나, 공유 링크를 만들거나, 편집 내용을 초기화할 수
            있습니다.
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button type="button" className="cursor-pointer rounded-full">
              <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              저장
            </Button>

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer rounded-full"
            >
              <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
              공유
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer rounded-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              리셋
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

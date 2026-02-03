import { Search, Users } from "lucide-react";

export default function SquadEditorIntro() {
  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <Users className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="text-base font-semibold">
            당신의 11명을 구성하세요
          </div>
          <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
            당신의 꿈의 11인을 구성하고, 전술을 기록해보세요. 스쿼드 저장 후
            언제든 공유 가능
          </div>
        </div>
      </div>
    </div>
  );
}

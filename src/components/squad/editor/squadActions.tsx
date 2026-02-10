import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RotateCcw, Save, Share2, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { useSquadProgress } from "@/store/squadEditor";

export default function SquadActions() {
  const {
    canSave,
    filledCount,
    hasFormation,
    isAllPlayersFilled,
    hasTitle,
    hasCoachImage,
    hasMemo,
    isMemoValid,
  } = useSquadProgress();

  const unmet = useMemo(() => {
    const list: string[] = [];
    if (!hasFormation) list.push("포메이션을 선택해 주세요.");
    if (!isAllPlayersFilled)
      list.push(`선수를 11명 모두 배치해 주세요. (${filledCount}/11)`);
    if (!hasTitle) list.push("스쿼드 제목을 입력해 주세요.");
    if (!hasCoachImage) list.push("감독 사진을 업로드해 주세요.");
    if (!hasMemo) list.push("전술 메모를 입력해 주세요.");
    if (!isMemoValid)
      list.push("전술 메모는 최대 1,000자까지 입력할 수 있습니다.");
    return list;
  }, [
    hasFormation,
    isAllPlayersFilled,
    filledCount,
    hasTitle,
    hasCoachImage,
    hasMemo,
    isMemoValid,
  ]);

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
            <HoverCard openDelay={100} closeDelay={50}>
              <HoverCardTrigger asChild>
                <div>
                  <Button
                    type="button"
                    className="cursor-pointer rounded-full"
                    disabled={!canSave}
                    // onClick={handleSave} // 저장 구현 시 연결
                  >
                    <Save className="mr-2 h-4 w-4" aria-hidden="true" />
                    저장
                  </Button>
                </div>
              </HoverCardTrigger>

              {!canSave && (
                <HoverCardContent className="w-80" side="top">
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 text-red-500"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">
                        저장할 수 없습니다
                      </div>
                      <div className="text-muted-foreground mt-1 text-xs">
                        아래 항목을 완료하면 저장할 수 있어요.
                      </div>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {unmet.map((msg) => (
                      <li
                        key={msg}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        • {msg}
                      </li>
                    ))}
                  </ul>
                </HoverCardContent>
              )}
            </HoverCard>

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

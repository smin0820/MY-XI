import { CheckCircle2, Circle } from "lucide-react";
import { useCanSaveSquad, useSquadProgress } from "@/store/squadEditor";

export default function SquadEditorProgress() {
  const canSave = useCanSaveSquad();
  const {
    filledCount,
    hasFormation,
    isAllPlayersFilled,
    hasTitle,
    hasCoachImage,
    hasMemo,
    isMemoValid,
  } = useSquadProgress();

  const items = [
    { label: "포메이션 선택", done: hasFormation },
    { label: `선수 배치 (${filledCount}/11)`, done: isAllPlayersFilled },
    { label: "스쿼드 제목 입력", done: hasTitle },
    { label: "감독 사진 선택", done: hasCoachImage },
    { label: "전술 메모 입력", done: hasMemo && isMemoValid },
  ];

  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-base font-semibold">스쿼드 진행 상태</div>
              <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
                저장하려면 아래 항목을 모두 완료해 주세요.
              </div>
            </div>

            <div
              className={[
                "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                canSave
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-muted-foreground bg-black/5",
              ].join(" ")}
            >
              {canSave ? "저장 가능" : "저장 준비 중"}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                {item.done ? (
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-600"
                    aria-hidden="true"
                  />
                ) : (
                  <Circle
                    className="text-muted-foreground h-4 w-4"
                    aria-hidden="true"
                  />
                )}

                <span
                  className={[
                    "leading-relaxed",
                    item.done ? "text-foreground" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {!isMemoValid && (
            <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              전술 메모는 최대 1,000자까지 입력할 수 있습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

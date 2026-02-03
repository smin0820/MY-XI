import { Textarea } from "@/components/ui/textarea";
import { useOpenAlertModal } from "@/store/alertModal";
import { useSetSquadMemo, useSquadMemo } from "@/store/squadEditor";
import { NotebookPen } from "lucide-react";
import { useRef, useState } from "react";

const MAX_LENGTH = 1000;

export default function TacticalMemo() {
  const memo = useSquadMemo();
  const setMemo = useSetSquadMemo();
  const openAlertModal = useOpenAlertModal();

  const [isFocused, setIsFocused] = useState(false);

  const overLimitRef = useRef<string | null>(null);
  const isModalOpenRef = useRef(false);

  const handleChange = (value: string) => {
    if (value.length <= MAX_LENGTH) {
      setMemo(value);
      return;
    }

    if (isModalOpenRef.current) return;

    overLimitRef.current = value;
    isModalOpenRef.current = true;

    openAlertModal({
      title: "",
      description: "텍스트는 최대 1,000자까지 입력할 수 있습니다.",
      onPositive: () => {
        const draft = overLimitRef.current ?? value;
        setMemo(draft.slice(0, MAX_LENGTH));

        overLimitRef.current = null;
        isModalOpenRef.current = false;
      },
    });
  };

  const length = memo.length;

  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <NotebookPen className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">전술 메모</div>
          <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
            전술 의도, 역할, 압박 방식 등을 간단히 기록해주세요.
          </div>

          <div className="mt-4">
            <div className="relative">
              <Textarea
                value={memo}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="전술을 입력해 주세요"
                maxLength={MAX_LENGTH}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={[
                  "pr-14 transition-all duration-200",
                  isFocused ? "min-h-30" : "min-h-10",
                ].join(" ")}
              />

              {isFocused && (
                <div className="text-muted-foreground pointer-events-none absolute right-4 bottom-2 text-sm">
                  {length} / {MAX_LENGTH}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

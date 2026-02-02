import { Textarea } from "@/components/ui/textarea";
import { useSetSquadMemo, useSquadMemo } from "@/store/squadEditor";
import { useState } from "react";

const MAX_LENGTH = 1000;

export default function TacticalMemo() {
  const memo = useSquadMemo();
  const setMemo = useSetSquadMemo();

  const [isFocused, setIsFocused] = useState(false);
  const length = memo.length;

  return (
    <div className="border-b-2 py-5">
      <div className="flex items-start justify-between gap-4">
        <span className="mt-2 font-bold">전술 메모</span>

        <div className="relative w-10/12">
          <Textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="전술을 입력해 주세요"
            maxLength={MAX_LENGTH}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={[
              "pr-12 transition-all duration-200",
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
  );
}

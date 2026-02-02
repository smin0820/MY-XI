import { Textarea } from "@/components/ui/textarea";
import { useSetSquadMemo, useSquadMemo } from "@/store/squadEditor";

export default function TacticalMemo() {
  const memo = useSquadMemo();
  const setMemo = useSetSquadMemo();
  return (
    <div className="border-b-2 py-5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold">전술 메모</span>
        <Textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="전술을 입력해 주세요"
          className="w-10/12"
        />
      </div>
    </div>
  );
}

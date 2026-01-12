import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import {
  useSelectedSquadSlotIndex,
  useSelectSquadSlot,
} from "@/store/squadEditor";
import { Input } from "../ui/input";

export default function PlayerPickerModal() {
  const selectedSlotIndex = useSelectedSquadSlotIndex();
  const selectSlot = useSelectSquadSlot();

  const isOpen = selectedSlotIndex !== null;
  return (
    <Dialog open={isOpen} onOpenChange={() => selectSlot(null)}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">선수 선택</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          해당 슬롯에 배치할 선수를 선택하세요.
        </DialogDescription>

        {/* 검색 (다음 단계에서 기능 추가) */}
        <Input placeholder="선수 이름 검색" />

        {/* 선수 목록 영역 (임시) */}
        <div className="text-muted-foreground mt-4 text-sm">
          선수 목록이 여기에 표시됩니다.
        </div>
      </DialogContent>
    </Dialog>
  );
}

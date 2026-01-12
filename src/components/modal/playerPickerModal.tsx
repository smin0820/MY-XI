import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import {
  useAssignPlayerToSlot,
  useSelectedSquadSlotIndex,
  useSelectSquadSlot,
} from "@/store/squadEditor";
import { Input } from "../ui/input";
import { usePlayerData } from "@/hooks/queries/usePlayerData";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import Loader from "../loader";
import Fallback from "../fallback";

export default function PlayerPickerModal() {
  const selectedSlotIndex = useSelectedSquadSlotIndex();
  const selectSlot = useSelectSquadSlot();
  const assignPlayerToSlot = useAssignPlayerToSlot();

  const isOpen = selectedSlotIndex !== null;

  const { data, error, isPending } = usePlayerData();

  const handlePickPlayer = (playerId: number) => {
    if (selectedSlotIndex === null) return;

    assignPlayerToSlot(selectedSlotIndex, playerId);

    selectSlot(null);
  };

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
        {isPending && (
          <div className="p-4">
            <Loader />
          </div>
        )}

        {error && (
          <div className="p-4">
            <Fallback />
          </div>
        )}

        <ul>
          {data?.map((player) => (
            <li key={player.id}>
              <button
                type="button"
                onClick={() => handlePickPlayer(player.id)}
                className="hover:bg-muted flex w-full cursor-pointer items-center gap-3 px-2 py-3 text-left"
              >
                <img
                  src={player.avatar_url ?? defaultAvatar}
                  alt={player.name}
                  className="h-10 w-10 rounded-full border object-cover object-top"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {player.name}
                  </div>
                  <div className="text-muted-foreground truncate text-xs">
                    {player.team_name}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import type { SquadSlot } from "@/types/squad";
import {
  useSelectedSquadSlotIndex,
  useSelectSquadSlot,
} from "@/store/squadEditor";

type Props = {
  slot: SquadSlot;
  // 나중에 playerId -> player 데이터 매핑되면 playerName / avatarUrl 등을 props로 넘겨도 됨
  playerName?: string;
  avatarUrl?: string | null;
};

export default function PitchSlot({ slot, playerName, avatarUrl }: Props) {
  const selectSlot = useSelectSquadSlot();
  const selectedSlotIndex = useSelectedSquadSlotIndex();

  const isSelected = selectedSlotIndex === slot.slotIndex;
  const isEmpty = slot.playerId === null;

  return (
    <button
      type="button"
      onClick={() => selectSlot(slot.slotIndex)}
      className={[
        "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
        "cursor-pointer transition-opacity",
        "hover:opacity-40",
        isSelected ? "opacity-40" : "",
      ].join(" ")}
      style={{ left: slot.pos_x, top: slot.pos_y }}
      aria-label={`슬롯 ${slot.slotIndex + 1} ${
        isEmpty ? "빈 자리" : "선수 배정됨"
      }`}
    >
      <div className="h-14 w-14 overflow-hidden rounded-full bg-white shadow-sm ring-1">
        <img
          src={avatarUrl ?? defaultAvatar}
          alt={playerName ? `${playerName} 프로필` : "선수 프로필"}
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="mt-2 max-w-20 truncate text-xs font-semibold text-white">
        {playerName ?? (isEmpty ? "빈 자리" : "선택됨")}
      </div>
    </button>
  );
}

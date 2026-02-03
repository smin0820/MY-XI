import { useSquadFormation, useSquadSlots } from "@/store/squadEditor";
import { usePlayerData } from "@/hooks/queries/usePlayerData";
import SquadHeader from "./squadHeader";
import PitchSlot from "./pitchSlot";

export default function Pitch() {
  const formation = useSquadFormation();
  const slots = useSquadSlots();

  const { data: players } = usePlayerData();

  const playerMap = new Map(players?.map((p) => [p.id, p]));

  return (
    <div className="rounded-lg text-lg">
      <SquadHeader />

      {/* 경기장 */}
      <div className="relative mx-auto h-180 w-xl overflow-hidden rounded-b-lg bg-[#1f8f57] p-4 text-white">
        {/* field markings */}
        <div className="absolute inset-0 opacity-30">
          {/* center horizontal line */}
          <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-[#2aa56f]" />
          {/* center circle */}
          <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2aa56f]" />
          {/* penalty boxes */}
          <div className="absolute top-0 left-1/2 h-28 w-[60%] -translate-x-1/2 rounded-b-md border-2 border-[#2aa56f]" />
          <div className="absolute bottom-0 left-1/2 h-28 w-[60%] -translate-x-1/2 rounded-t-md border-2 border-[#2aa56f]" />
        </div>

        <div className="relative h-full w-full">
          {!formation && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-lg">
              포메이션을 선택하면 11개 슬롯이 생성됩니다.
            </div>
          )}

          {/* slots 렌더링 */}
          {slots.map((slot) => {
            const player = slot.playerId
              ? playerMap.get(slot.playerId)
              : undefined;

            return (
              <PitchSlot
                key={slot.slotIndex}
                slot={slot}
                playerName={player?.name}
                avatarUrl={player?.avatar_url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

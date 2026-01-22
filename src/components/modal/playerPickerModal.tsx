import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import {
  useAssignPlayerToSlot,
  useSelectedSquadSlotIndex,
  useSelectSquadSlot,
} from "@/store/squadEditor";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import Loader from "../loader";
import Fallback from "../fallback";
import { usePushRecentPlayer, useRecentPlayerIds } from "@/store/recentPlayers";
import { useMemo } from "react";
import { useRecentPlayers } from "@/hooks/queries/useRecentPlayers";

export default function PlayerPickerModal() {
  const selectedSlotIndex = useSelectedSquadSlotIndex();
  const selectSlot = useSelectSquadSlot();
  const assignPlayerToSlot = useAssignPlayerToSlot();

  const recentIds = useRecentPlayerIds();
  const pushRecentPlayer = usePushRecentPlayer();

  const isOpen = selectedSlotIndex !== null;

  const { data, error, isPending } = useRecentPlayers(recentIds);

  const handlePickPlayer = (playerId: number) => {
    if (selectedSlotIndex === null) return;

    assignPlayerToSlot(selectedSlotIndex, playerId);
    pushRecentPlayer(playerId);

    selectSlot(null); // 모달 닫기
  };

  // recentIds 순서대로 재정렬
  const recentPlayers = useMemo(() => {
    const list = data ?? [];
    const map = new Map(list.map((p) => [p.id, p]));

    return recentIds
      .map((id) => map.get(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }, [data, recentIds]);

  console.log("recentIds", recentIds);
  console.log("recentPlayers(data)", data);
  console.log("recentPlayers(ordered)", recentPlayers);
  console.log("isPending", isPending);

  return (
    <Dialog open={isOpen} onOpenChange={() => selectSlot(null)}>
      <DialogContent className="max-h-[70vh] w-full max-w-lg overflow-hidden">
        <DialogTitle className="text-lg font-semibold">선수 선택</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          최근에 선택한 선수가 먼저 표시됩니다.
        </DialogDescription>

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

        {!isPending && !error && (
          <div className="mt-2 max-h-[45vh] overflow-auto rounded-md border">
            <div className="text-muted-foreground sticky top-0 bg-white px-3 py-2 text-xs">
              최근 선택한 선수
            </div>

            <ul>
              {recentPlayers.length === 0 ? (
                <li className="text-muted-foreground px-3 py-6 text-center text-sm">
                  최근 선택한 선수가 없습니다.
                </li>
              ) : (
                recentPlayers.map((player) => (
                  <li key={player.id}>
                    <button
                      type="button"
                      onClick={() => handlePickPlayer(player.id)}
                      className="hover:bg-muted flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-left"
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
                ))
              )}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import {
  useAssignPlayerToSlot,
  useSelectedSquadSlotIndex,
  useSelectSquadSlot,
} from "@/store/squadEditor";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { usePushRecentPlayer, useRecentPlayerIds } from "@/store/recentPlayers";
import { useEffect, useMemo, useState } from "react";
import { useRecentPlayers } from "@/hooks/queries/useRecentPlayers";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useInfinitePlayersByKeyword } from "@/hooks/queries/useInfinitePlayersByKeyword";
import { useInView } from "react-intersection-observer";
import type { PlayerEntity } from "@/types/db";
import Loader from "../loader";

export default function PlayerPickerModal() {
  const selectedSlotIndex = useSelectedSquadSlotIndex();
  const selectSlot = useSelectSquadSlot();
  const assignPlayerToSlot = useAssignPlayerToSlot();

  const recentIds = useRecentPlayerIds();
  const pushRecentPlayer = usePushRecentPlayer();

  const isOpen = selectedSlotIndex !== null;

  const [keyword, setKeyword] = useState("");
  const q = keyword.trim();
  const isSearchMode = q.length > 0;

  const {
    data: recentData,
    error: recentError,
    isPending: isRecentPending,
  } = useRecentPlayers(recentIds);

  const {
    data: searchData,
    error: searchError,
    isPending: isSearchPending,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinitePlayersByKeyword(q);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!isSearchMode) return;
    if (!inView) return;
    if (!hasNextPage) return;
    fetchNextPage();
  }, [isSearchMode, inView, hasNextPage, fetchNextPage]);

  const handlePickPlayer = (playerId: number) => {
    if (selectedSlotIndex === null) return;

    assignPlayerToSlot(selectedSlotIndex, playerId);
    pushRecentPlayer(playerId);
    selectSlot(null);
  };

  const recentPlayers = useMemo(() => {
    const list = recentData ?? [];
    const map = new Map(list.map((p) => [p.id, p]));
    return recentIds
      .map((id) => map.get(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }, [recentData, recentIds]);

  // 검색 결과 평탄화
  const searchedPlayers: PlayerEntity[] = useMemo(() => {
    if (!searchData) return [];
    return searchData.pages.flat();
  }, [searchData]);

  const isPending = isSearchPending || isRecentPending;
  const error = searchError || recentError;

  return (
    <Dialog open={isOpen} onOpenChange={() => selectSlot(null)}>
      <DialogContent className="max-h-[70vh] w-full max-w-lg overflow-hidden">
        <DialogTitle className="text-lg font-semibold">선수 선택</DialogTitle>
        <DialogDescription aria-describedby={undefined}></DialogDescription>

        {/* 검색 입력*/}
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="h-12 rounded-full pl-11"
            placeholder="선수 이름 검색"
            aria-label="선수 검색"
          />
        </div>

        {/* 스크롤 영역 고정 */}
        {!isPending && !error && (
          <>
            {/* ✅ 검색 모드 */}
            {isSearchMode ? (
              <>
                <div className="text-muted-foreground px-3 py-2 text-xs">
                  검색 결과
                </div>

                {searchedPlayers.length === 0 ? (
                  <div className="text-muted-foreground px-3 py-10 text-center text-sm">
                    <span className="font-medium">{q}</span> 검색어의 검색 결과
                    없음
                  </div>
                ) : (
                  <ul className="divide-y">
                    {searchedPlayers.map((player) => (
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
                    ))}

                    {/* ✅ 무한 스크롤 트리거 */}
                    <li ref={ref} />

                    {isFetchingNextPage && (
                      <li className="p-4">
                        <Loader />
                      </li>
                    )}
                  </ul>
                )}
              </>
            ) : (
              <>
                {/* ✅ 최근 없음 */}
                {recentPlayers.length === 0 ? (
                  <div className="text-muted-foreground px-3 py-10 text-center text-sm">
                    추가할 선수 검색
                  </div>
                ) : (
                  <>
                    {/* ✅ 최근 있음 */}
                    <div className="text-muted-foreground px-3 py-2 text-xs">
                      최근
                    </div>
                    <ul className="divide-y">
                      {recentPlayers.map((player) => (
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
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
import { LoaderCircleIcon, Search } from "lucide-react";
import { useInfinitePlayersByKeyword } from "@/hooks/queries/useInfinitePlayersByKeyword";
import { useInView } from "react-intersection-observer";
import type { PlayerEntity } from "@/types/db";
import Loader from "../loader";
import { useDebouncedValue } from "@/hooks/common/useDebouncedValue";

export default function PlayerPickerModal() {
  const selectedSlotIndex = useSelectedSquadSlotIndex();
  const selectSlot = useSelectSquadSlot();
  const assignPlayerToSlot = useAssignPlayerToSlot();

  const recentIds = useRecentPlayerIds();
  const pushRecentPlayer = usePushRecentPlayer();

  const isOpen = selectedSlotIndex !== null;

  const [keyword, setKeyword] = useState("");
  const q = keyword.trim();
  const debouncedQ = useDebouncedValue(q, 250);
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
    isFetching: isSearchFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinitePlayersByKeyword(debouncedQ);

  const isDebouncing = isSearchMode && q !== debouncedQ;

  // 검색 결과 평탄화
  const searchedPlayers: PlayerEntity[] = useMemo(() => {
    if (!searchData) return [];
    return searchData.pages.flat();
  }, [searchData]);

  const showSearchLoading =
    isSearchMode &&
    (isDebouncing ||
      (isSearchPending && searchedPlayers.length === 0) ||
      (isSearchFetching && searchedPlayers.length === 0));

  const { ref, inView } = useInView();

  const closeModal = () => {
    setKeyword("");
    selectSlot(null);
  };

  useEffect(() => {
    if (!isSearchMode) return;
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, [isSearchMode, inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePickPlayer = (playerId: number) => {
    if (selectedSlotIndex === null) return;

    assignPlayerToSlot(selectedSlotIndex, playerId);
    pushRecentPlayer(playerId);

    closeModal();
  };

  const recentPlayers = useMemo(() => {
    const list = recentData ?? [];
    const map = new Map(list.map((p) => [p.id, p]));
    return recentIds
      .map((id) => map.get(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined);
  }, [recentData, recentIds]);

  const isPending = isSearchPending || isRecentPending;
  const error = searchError || recentError;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="flex max-h-[70vh] w-full max-w-lg flex-col">
        <DialogTitle className="text-lg font-semibold">선수 선택</DialogTitle>
        <DialogDescription className="sr-only">
          선수 선택 모달입니다. 검색하거나 최근 선수를 선택할 수 있습니다.
        </DialogDescription>

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

        <div className="flex-1 overflow-y-auto">
          {isSearchMode ? (
            <>
              <div className="text-muted-foreground px-3 py-2 text-xs">
                검색 결과
              </div>

              {showSearchLoading ? (
                <div className="flex flex-col items-center gap-2 px-3 py-10 text-center">
                  <LoaderCircleIcon className="animate-spin" />
                  <div className="text-muted-foreground text-sm">
                    선수를 검색하고 있습니다...
                  </div>
                </div>
              ) : searchedPlayers.length === 0 ? (
                <div className="text-muted-foreground px-3 py-10 text-center text-sm">
                  <span className="text-foreground font-medium">{q}</span>{" "}
                  검색어의 검색 결과가 없습니다
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

                  <li ref={ref} className="h-1" />

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
              {recentPlayers.length === 0 ? (
                <div className="text-muted-foreground px-3 py-10 text-center text-sm">
                  추가할 선수 검색
                </div>
              ) : (
                <>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

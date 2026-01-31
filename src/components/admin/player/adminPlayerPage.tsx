import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PlayerListItem from "./playerListItem";
import CreatePlayerButton from "./createPlayerButton";
import { Input } from "@/components/ui/input";
import { usePlayerSearch } from "@/hooks/common/usePlayerSearch";
import { useInfinitePlayersByKeyword } from "@/hooks/queries/useInfinitePlayersByKeyword";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { usePlayerCountByKeyword } from "@/hooks/queries/usePlayerCountByKeyword";
import { CircleAlert } from "lucide-react";

export default function AdminPlayerPage() {
  const { keyword, setKeyword, debouncedQ, isSearchMode, isDebouncing } =
    usePlayerSearch();

  const { data: totalCount, isPending: isCountPending } =
    usePlayerCountByKeyword(debouncedQ);

  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePlayersByKeyword(debouncedQ);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const players = data?.pages.flat() ?? [];
  // const players = useMemo(() => {
  //   if (!data) return [];
  //   return data.pages.flat();
  // }, [data]);

  if (error) return <Fallback />;

  return (
    <div className="rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold">
          선수 명단({isCountPending ? "..." : totalCount})명
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="선수 이름 검색"
              aria-label="선수 검색"
            />
          </div>

          <CreatePlayerButton />
        </div>
      </div>

      <div className="h-[70vh] overflow-y-auto rounded-md bg-white shadow-sm">
        {isPending && (
          <div className="p-6">
            <Loader />
          </div>
        )}

        {!isPending && (
          <>
            {isSearchMode && isDebouncing && (
              <div className="text-muted-foreground px-4 py-3 text-sm">
                검색 중...
              </div>
            )}

            <div className="divide-input/5 divide-y">
              {players.map((player) => (
                <PlayerListItem key={player.id} {...player} />
              ))}
            </div>

            {/* sentinel */}
            <div ref={ref} className="h-2" />

            {isFetchingNextPage && (
              <div className="p-4">
                <Loader />
              </div>
            )}

            {!hasNextPage && players.length === 0 && (
              // <div className="text-muted-foreground p-10 text-center text-sm">
              //   검색 결과가 없습니다.
              // </div>
              <div className="text-muted-foreground flex flex-col items-center gap-4 p-10 text-center text-sm">
                <CircleAlert />
                <span>조건에 맞는 선수가 없어요.</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

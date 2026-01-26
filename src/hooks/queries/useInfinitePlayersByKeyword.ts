import { fetchPlayersByKeyword } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 8;

export function useInfinitePlayersByKeyword(keyword: string) {
  const q = keyword.trim();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.player.search(q),
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      return fetchPlayersByKeyword({ keyword: q, from, to });
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 PAGE_SIZE보다 작으면 끝
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
    staleTime: 1000 * 30,
  });
}

import { fetchPlayersCountByKeyword } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function usePlayerCountByKeyword(keyword: string) {
  const q = keyword.trim();

  return useQuery({
    queryKey: QUERY_KEYS.player.count(q),
    queryFn: () => fetchPlayersCountByKeyword(q),
    staleTime: 1000 * 60 * 2, // 2분
  });
}

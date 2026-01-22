import { fetchPlayersByIds } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useRecentPlayers(recentIds: number[]) {
  return useQuery({
    queryKey: [...QUERY_KEYS.player.list, "recent", recentIds],
    queryFn: () => fetchPlayersByIds(recentIds),
    enabled: recentIds.length > 0,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

import { fetchPlayersByIds } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useRecentPlayers(recentIds: number[]) {
  return useQuery({
    queryKey: QUERY_KEYS.player.recent(recentIds),
    queryFn: () => fetchPlayersByIds(recentIds),
    staleTime: 1000 * 60 * 5,
  });
}

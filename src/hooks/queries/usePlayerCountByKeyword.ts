import { fetchPlayersCountByKeyword } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function usePlayerCountByKeyword(keyword: string) {
  const q = keyword.trim();

  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.player.count(q),
    queryFn: () => fetchPlayersCountByKeyword(q),
    staleTime: 1000 * 60 * 2, // 2분
  });
}

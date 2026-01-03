import { fetchPlayers } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function usePlayerData() {
  return useQuery({
    queryKey: QUERY_KEYS.player.list,
    queryFn: () => fetchPlayers(),
  });
}

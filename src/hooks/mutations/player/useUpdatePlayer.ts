import { updatePlayer } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import type { PlayerEntity } from "@/types/db";
import { type useMutationCallback } from "@/types/reactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePlayer(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlayer,
    onSuccess: async (updatedPlayer) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<PlayerEntity>(
        QUERY_KEYS.player.byId(updatedPlayer.id),
        (prev) => (prev ? { ...prev, ...updatedPlayer } : updatedPlayer),
      );

      await queryClient.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) &&
          q.queryKey[0] === "player" &&
          q.queryKey[1] === "count",
      });

      await queryClient.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) &&
          q.queryKey[0] === "player" &&
          q.queryKey[1] === "search",
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.player.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

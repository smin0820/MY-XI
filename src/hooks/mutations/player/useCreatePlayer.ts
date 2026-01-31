import { createPlayerWithAvatar } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import type { useMutationCallback } from "@/types/reactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlayer(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlayerWithAvatar,
    onSuccess: async () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

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

import { createPlayer, createPlayerWithAvatar } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import type { useMutationCallback } from "@/types/reactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePlayer(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlayerWithAvatar,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.player.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

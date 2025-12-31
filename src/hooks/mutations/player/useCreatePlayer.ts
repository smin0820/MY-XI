import { createPlayer, createPlayerWithAvatar } from "@/api/player";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreatePlayer(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: createPlayerWithAvatar,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

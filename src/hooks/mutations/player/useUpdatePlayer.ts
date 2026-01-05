import { updatePlayer } from "@/api/player";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePlayer(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

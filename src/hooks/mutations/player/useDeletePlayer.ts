import { deleteImageInPath } from "@/api/image";
import { deletePlayer } from "@/api/player";
import { useSession } from "@/store/session";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeletePlayer(callbacks?: useMutationCallback) {
  const session = useSession();
  return useMutation({
    mutationFn: deletePlayer,
    onSuccess: async (deletedPlayer) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPlayer.avatar_url) {
        await deleteImageInPath(`${session?.user.id}/${deletedPlayer.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

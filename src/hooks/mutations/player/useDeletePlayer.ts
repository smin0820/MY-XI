import { deleteImageInPath } from "@/api/image";
import { deletePlayer } from "@/api/player";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useSession } from "@/store/session";
import type { useMutationCallback } from "@/types/reactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePlayer(callbacks?: useMutationCallback) {
  const session = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlayer,
    onSuccess: async (deletedPlayer) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPlayer.avatar_url) {
        await deleteImageInPath(`${session?.user.id}/${deletedPlayer.id}`);
      }

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

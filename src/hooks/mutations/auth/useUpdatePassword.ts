import { updatePassword } from "@/api/auth";
import type { useMutationCallback } from "@/types/reactQuery";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError(error) {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

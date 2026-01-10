import { signInWithPassword } from "@/api/auth";
import type { useMutationCallback } from "@/types/reactQuery";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

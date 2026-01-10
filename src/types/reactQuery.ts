export type useMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  onMutate?: () => void;
};

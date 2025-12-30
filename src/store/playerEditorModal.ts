import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePlayerEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "playerEditorModalStore" },
  ),
);

export const useOpenPlayerEditorModal = () => {
  const open = usePlayerEditorModalStore((store) => store.actions.open);
  return open;
};

export const usePlayerEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePlayerEditorModalStore();
  return {
    isOpen,
    open,
    close,
  };
};

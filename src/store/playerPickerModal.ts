import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const usePlayerPickerModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {},
    })),
    { name: "playerPickerModalStore" },
  ),
);

import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  playerId: number;
  name: string;
  name_en: string;
  team_name: string;
  created_at: string;
  avatar_url: string | null;
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

/**
 * 선수 생성 / 수정 Modal의 상태를 전역으로 관리
 */
const usePlayerEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "EDIT", ...param });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "playerEditorModalStore" },
  ),
);

/**
 * 선수 생성 Modal을 여는 전용 Hook
 * 이 Hook만 사용해서 CREATE 모드 오픈
 */
export const useOpenCreatePlayerModal = () => {
  const openCreate = usePlayerEditorModalStore(
    (store) => store.actions.openCreate,
  );
  return openCreate;
};

/**
 * 선수 수정 Modal을 여는 전용 Hook
 * 수정할 선수 정보를 전달해 EDIT 모드 오픈
 */
export const useOpenEditPlayerModal = () => {
  const openEdit = usePlayerEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};

/**
 * Player Editor Modal 상태 접근 Hook
 */
export const usePlayerEditorModal = () => {
  const store = usePlayerEditorModalStore();
  return store as typeof store & State;
};

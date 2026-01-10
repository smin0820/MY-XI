import { formations } from "@/lib/constants/formations";
import type { FormationKey, SquadSlot } from "@/types/squad";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CoachImage = {
  file?: File;
  previewUrl: string;
};

type State = {
  formation: FormationKey | null;
  slots: SquadSlot[];
  selectedSlotIndex: number | null;

  title: string;
  coachImage: CoachImage | null;

  isSaving: boolean;
};

const initialState: State = {
  formation: null,
  slots: [],
  selectedSlotIndex: null,

  title: "",
  coachImage: null,

  isSaving: false,
};

/**
 * 스쿼드(전술) 편집 에디터 상태를 전역으로 관리하는 Store
 * - formation 선택
 * - 11개 slot(좌표, 선수) 관리
 * - title, coachImage 관리
 * - 저장 상태 관리
 */
export const useSquadEditorStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        setFormation: (formation: FormationKey) => {
          const positions = formations[formation];

          const slots: SquadSlot[] = positions.map((pos, idx) => ({
            slotIndex: idx,
            pos_x: pos.pos_x,
            pos_y: pos.pos_y,
            playerId: null,
          }));

          set({ formation, slots, selectedSlotIndex: null });
        },
        selectSlot: (slotIndex: number | null) => {
          set({ selectedSlotIndex: slotIndex });
        },
        assignPlayerToSlot: (slotIndex: number, playerId: number | null) => {
          const { slots } = get();

          const nextSlots = slots.map((slot) =>
            slot.slotIndex === slotIndex ? { ...slot, playerId } : slot,
          );
          set({ slots: nextSlots });
        },
        setTitle: (title: string) => {
          set({ title });
        },
        setCoachImage: (image: CoachImage | null) => {
          set({ coachImage: image });
        },
        setIsSaving: (isSaving: boolean) => {
          set({ isSaving });
        },
        reset: () => {
          set({
            ...initialState,
            slots: [],
            coachImage: null,
            selectedSlotIndex: null,
          });
        },
      },
    })),
    { name: "squadEditorStore" },
  ),
);

/** formation 변경 전용 Hook */
export const useSetFormation = () => {
  const setFormation = useSquadEditorStore((s) => s.actions.setFormation);
  return setFormation;
};

/** slot 선택 전용 Hook */
export const useSelectSquadSlot = () => {
  const selectSlot = useSquadEditorStore((s) => s.actions.selectSlot);
  return selectSlot;
};

/** slot에 선수 배정 전용 Hook */
export const useAssignPlayerToSlot = () => {
  const assign = useSquadEditorStore((s) => s.actions.assignPlayerToSlot);
  return assign;
};

/** 제목 변경 전용 Hook */
export const useSetSquadTitle = () => {
  const setTitle = useSquadEditorStore((s) => s.actions.setTitle);
  return setTitle;
};

/** 감독 이미지 변경 전용 Hook */
export const useSetCoachImage = () => {
  const setCoachImage = useSquadEditorStore((s) => s.actions.setCoachImage);
  return setCoachImage;
};

/** 저장 상태 변경 전용 Hook */
export const useSetSquadSaving = () => {
  const setIsSaving = useSquadEditorStore((s) => s.actions.setIsSaving);
  return setIsSaving;
};

/** 에디터 초기화 전용 Hook */
export const useResetSquadEditor = () => {
  const reset = useSquadEditorStore((s) => s.actions.reset);
  return reset;
};

/**
 * Squad Editor 상태 접근 Hook
 * - state + actions 전체에 접근 가능
 */
export const useSquadEditor = () => {
  const store = useSquadEditorStore();
  return store as typeof store & State;
};

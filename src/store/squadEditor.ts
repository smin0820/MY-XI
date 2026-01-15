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

          const { slots: prevSlots } = get();

          const prevPlayerIdByIndex = new Map(
            prevSlots.map((s) => [s.slotIndex, s.playerId ?? null]),
          );

          const slots: SquadSlot[] = positions.map((pos, idx) => ({
            slotIndex: idx,
            pos_x: pos.pos_x,
            pos_y: pos.pos_y,
            playerId: prevPlayerIdByIndex.get(idx) || null,
          }));

          set({ formation, slots, selectedSlotIndex: null });
        },
        selectSlot: (slotIndex: number | null) => {
          set({ selectedSlotIndex: slotIndex });
        },
        assignPlayerToSlot: (slotIndex: number, playerId: number | null) => {
          const { slots } = get();

          if (playerId === null) {
            const nextSlots = slots.map((slot) =>
              slot.slotIndex === slotIndex ? { ...slot, playerId: null } : slot,
            );
            set({ slots: nextSlots });
            return;
          }

          const nextSlots = slots.map((slot) => {
            if (slot.playerId === playerId && slot.slotIndex !== slotIndex) {
              return { ...slot, playerId: null };
            }

            if (slot.slotIndex === slotIndex) {
              return { ...slot, playerId };
            }

            return slot;
          });

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

/** 현재 선택된 포메이션 값 subscribe */
export const useSquadFormation = () => {
  return useSquadEditorStore((s) => s.formation);
};

/** 11개 슬롯 목록 subscribe */
export const useSquadSlots = () => {
  return useSquadEditorStore((s) => s.slots);
};

/** 현재 선택된 슬롯 index subscribe */
export const useSelectedSquadSlotIndex = () => {
  return useSquadEditorStore((s) => s.selectedSlotIndex);
};

/** 스쿼드 제목 subscribe */
export const useSquadTitle = () => {
  return useSquadEditorStore((s) => s.title);
};

/** 감독 이미지 subscribe */
export const useCoachImage = () => {
  return useSquadEditorStore((s) => s.coachImage);
};

/** 저장중 여부 subscribe */
export const useIsSaving = () => {
  return useSquadEditorStore((s) => s.isSaving);
};

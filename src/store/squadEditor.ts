import { formations } from "@/lib/constants/formations";
import type { FormationKey, SquadSlot } from "@/types/squad";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type CoachImage = {
  file?: File;
  previewUrl: string;
};

type SquadEditorActions = {
  /** 포메이션 선택: formation 세팅 + 11개 슬롯 초기화 */
  setFormation: (formation: FormationKey) => void;

  /** 슬롯 클릭: 현재 선택된 슬롯 인덱스 저장 */
  selectSlot: (slotIndex: number | null) => void;

  /** 슬롯에 선수 배정/해제: playerId 업데이트 */
  assignPlayerToSlot: (slotIndex: number, playerId: number | null) => void;

  /** 스쿼드 제목 변경 */
  setTitle: (title: string) => void;

  /** 감독 이미지 변경(업로드/미리보기) */
  setCoachImage: (image: CoachImage | null) => void;

  /** 저장 중 상태 */
  setIsSaving: (isSaving: boolean) => void;

  /** 에디터 상태 초기화 */
  reset: () => void;
};

const initialState = {
  formation: null as FormationKey | null,
  slots: [] as SquadSlot[],
  selectedSlotIndex: null as number | null,
  title: "",
  coachImage: null as CoachImage | null,
  isSaving: false,
};

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

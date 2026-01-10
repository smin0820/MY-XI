export type FormationKey = "4-3-3" | "4-2-3-1" | "3-1-5-1";

export type FormationPosition = {
  pos_x: string;
  pos_y: string;
};

export type SquadSlot = {
  slotIndex: number; // 0 ~ 10
  pos_x: string; // 22.5%
  pos_y: string; // 25%
  playerId: number | null; // 아직 미선택이면 null
};

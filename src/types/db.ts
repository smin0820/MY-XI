import type { Database } from "../database.types";

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type PlayerEntity = Database["public"]["Tables"]["player"]["Row"];
export type SquadEntity = Database["public"]["Tables"]["squad"]["Row"];
export type SquadSlotEntity = Database["public"]["Tables"]["squad_slot"]["Row"];

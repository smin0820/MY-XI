import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 8;

type RecentPlayersState = {
  recentPlayerIds: number[];
  actions: {
    pushRecentPlayer: (playerId: number) => void;
    clearRecentPlayers: () => void;
  };
};

export const useRecentPlayersStore = create<RecentPlayersState>()(
  persist(
    (set, get) => ({
      recentPlayerIds: [],

      actions: {
        pushRecentPlayer: (playerId) => {
          const prev = get().recentPlayerIds;

          const next = [
            playerId,
            ...prev.filter((id) => id !== playerId),
          ].slice(0, MAX_RECENT);

          set({ recentPlayerIds: next });
        },

        clearRecentPlayers: () => {
          set({ recentPlayerIds: [] });
        },
      },
    }),
    {
      name: "recentPlayers", // localStorage key
    },
  ),
);

export const usePushRecentPlayer = () => {
  const pushRecentPlayer = useRecentPlayersStore(
    (s) => s.actions.pushRecentPlayer,
  );
  return pushRecentPlayer;
};

export const useClearRecentPlayers = () => {
  const clearRecentPlayers = useRecentPlayersStore(
    (s) => s.actions.clearRecentPlayers,
  );
  return clearRecentPlayers;
};

/** 최근 플레이어 ID 목록을 반환 */
export const useRecentPlayerIds = () => {
  return useRecentPlayersStore((s) => s.recentPlayerIds);
};

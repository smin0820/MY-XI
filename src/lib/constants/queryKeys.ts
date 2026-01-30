export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },

  player: {
    all: ["player"],
    list: ["player", "list"],
    byId: (playerId: number) => ["player", "byId", playerId],
    recent: (ids: number[]) => ["player", "recent", ...ids],
    search: (keyword: string) => ["player", "search", keyword],
    count: (q: string) => ["player", "count", q],
  },
};

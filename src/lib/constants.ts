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
  },
};

export const BUCKET_NAME = "player-avatar";

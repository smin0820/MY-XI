import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { usePlayerData } from "@/hooks/queries/usePlayerData";
import { Play } from "lucide-react";
import PlayerListItem from "./playerListItem";

export default function PlayerList() {
  const { data, error, isPending } = usePlayerData();

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="rounded-lg p-6">
      <div className="mb-4 text-sm">전체 {data.length}명</div>

      <div className="divide-input/5 divide-y overflow-visible rounded-md bg-white shadow-sm">
        {data.map((player) => (
          <PlayerListItem key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
}

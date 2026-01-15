import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { usePlayerData } from "@/hooks/queries/usePlayerData";
import PlayerListItem from "./playerListItem";
import CreatePlayerButton from "./createPlayerButton";
import { Input } from "@/components/ui/input";

export default function PlayerList() {
  const { data, error, isPending } = usePlayerData();

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold">선수 명단({data.length}명)</div>
        <div className="flex items-center gap-2">
          <Input placeholder="검색" />
          <CreatePlayerButton />
        </div>
      </div>

      <div className="divide-input/5 divide-y overflow-visible rounded-md bg-white shadow-sm">
        {data.map((player) => (
          <PlayerListItem key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
}

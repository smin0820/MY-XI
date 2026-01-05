import type { PlayerEntity } from "@/types";
import EditPlayerButton from "./editPlayerButton";
import DeletePlayerButton from "./deletePlayerButton";

export default function PlayerListItem(player: PlayerEntity) {
  return (
    <div className="relative grid min-h-12 grid-cols-[56px_1fr_auto] items-center gap-4 px-6 py-4 transition-shadow duration-150 ease-in-out hover:z-10 hover:shadow-lg sm:grid-cols-[56px_1fr_160px_160px_auto]">
      {/* 사진 */}
      <div className="flex items-center justify-center">
        <img
          src={player.avatar_url ?? "/default-avatar.png"}
          alt={player.name}
          loading="lazy"
          className="h-16 w-16 rounded-full object-cover object-top"
        />
      </div>

      {/* 이름 / 영문이름 */}
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <div
          className="text-foreground truncate text-sm leading-5 font-semibold"
          title={player.name}
        >
          {player.name}
        </div>
        <div
          className="text-muted-foreground truncate text-xs leading-4"
          title={player.name_en}
        >
          {player.name_en}
        </div>
      </div>

      {/* 소속팀 */}
      <div
        className="text-muted-foreground hidden text-sm sm:block"
        title={player.team_name}
      >
        {player.team_name}
      </div>

      {/* 생성일 */}
      <div className="text-muted-foreground hidden text-left text-sm sm:block">
        {new Date(player.created_at).toLocaleString()}
      </div>

      {/* 액션 */}
      <div className="flex items-center justify-end gap-2">
        <EditPlayerButton {...player} />
        <DeletePlayerButton id={player.id} />
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useOpenEditPlayerModal } from "@/store/playerEditorModal";
import type { PlayerEntity } from "@/types/db";
import { Pencil } from "lucide-react";

export default function EditPlayerButton(props: PlayerEntity) {
  const openEditPlayerModal = useOpenEditPlayerModal();

  const handleButtonClick = () => {
    openEditPlayerModal({
      playerId: props.id,
      name: props.name,
      name_en: props.name_en,
      team_name: props.team_name,
      avatar_url: props.avatar_url,
      created_at: props.created_at,
    });
  };
  return (
    <Button
      onClick={handleButtonClick}
      size="icon-lg"
      variant="outline"
      className="focus-visible:ring-primary/30 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:outline-none"
    >
      <Pencil />
    </Button>
  );
}

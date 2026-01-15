import { Button } from "@/components/ui/button";
import { useOpenCreatePlayerModal } from "@/store/playerEditorModal";

export default function CreatePlayerButton() {
  const openCreateEditorModal = useOpenCreatePlayerModal();
  return (
    <div>
      <Button
        className="cursor-pointer text-lg font-bold"
        onClick={openCreateEditorModal}
      >
        + 추가
      </Button>
    </div>
  );
}

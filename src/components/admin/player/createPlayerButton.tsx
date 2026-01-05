import { Button } from "@/components/ui/button";
import { useOpenCreatePlayerModal } from "@/store/playerEditorModal";

export default function CreatePlayerButton() {
  const openCreateEditorModal = useOpenCreatePlayerModal();
  return (
    <div>
      <Button className="cursor-pointer" onClick={openCreateEditorModal}>
        선수 추가
      </Button>
    </div>
  );
}

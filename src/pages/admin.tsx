import { Button } from "@/components/ui/button";
import { useOpenPlayerEditorModal } from "@/store/playerEditorModal";

export default function Admin() {
  const openPlayerEditorModal = useOpenPlayerEditorModal();
  return (
    <div>
      <Button onClick={openPlayerEditorModal}>선수 추가</Button>
    </div>
  );
}

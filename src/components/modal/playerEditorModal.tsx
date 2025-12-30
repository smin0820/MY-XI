import { usePlayerEditorModal } from "@/store/playerEditorModal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

export default function PlayerEditorModal() {
  const { isOpen, close } = usePlayerEditorModal();

  const handleCloseModal = () => {
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogTitle>선수 추가</DialogTitle>
        <Input />
        <Button>저장</Button>
      </DialogContent>
    </Dialog>
  );
}

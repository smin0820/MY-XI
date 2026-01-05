import { Button } from "@/components/ui/button";
import { useDeletePlayer } from "@/hooks/mutations/player/useDeletePlayer";
import { useOpenAlertModal } from "@/store/alertModal";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function DeletePlayerButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();

  const { mutate: deletePlayer, isPending: isDeletePlayerPending } =
    useDeletePlayer({
      onError: (error) => {
        toast.error("선수 삭제 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "선수 삭제",
      description: "삭제된 선수는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deletePlayer(id);
      },
    });
  };
  return (
    <Button
      disabled={isDeletePlayerPending}
      onClick={handleDeleteClick}
      size="icon-lg"
      variant="ghost"
      className="text-destructive focus-visible:ring-destructive/30 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:outline-none"
    >
      <X />
    </Button>
  );
}

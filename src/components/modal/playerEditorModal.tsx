import { usePlayerEditorModal } from "@/store/playerEditorModal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useCreatePlayer } from "@/hooks/mutations/player/useCreatePlayer";
import { toast } from "sonner";

export default function PlayerEditorModal() {
  const { isOpen, close } = usePlayerEditorModal();
  const { mutate: createPlayer, isPending: isCreatePlayerPending } =
    useCreatePlayer({
      onSuccess: () => {
        toast.success("선수가 성공적으로 추가되었습니다.", {
          position: "top-center",
        });
        closeModal();
      },
      onError: (error) => {
        toast.error("선수 생성에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [teamName, setTeamName] = useState("");

  const resetForm = () => {
    setName("");
    setNameEn("");
    setTeamName("");
  };

  const closeModal = () => {
    resetForm();
    close();
  };

  const handleCloseModal = (open: boolean) => {
    if (!open) closeModal();
  };

  const handleCreatePlayerClick = () => {
    if (name.trim() === "") return;
    if (nameEn.trim() === "") return;
    if (teamName.trim() === "") return;
    createPlayer({ name, nameEn, teamName });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>선수 추가</DialogTitle>
        <Label htmlFor="name">선수 이름</Label>
        <Input
          disabled={isCreatePlayerPending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="예: 손흥민"
        />

        <Label htmlFor="name_en">영문 이름</Label>
        <Input
          disabled={isCreatePlayerPending}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          id="name_en"
          placeholder="e.g. SON Heungmin"
        />

        <Label htmlFor="team_name">소속팀</Label>
        <Input
          disabled={isCreatePlayerPending}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          id="team_name"
          placeholder="예: 로스앤젤레스 FC"
        />
        <Button
          disabled={isCreatePlayerPending}
          onClick={handleCreatePlayerClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import { usePlayerEditorModal } from "@/store/playerEditorModal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useRef, useState, type ChangeEvent } from "react";
import { useCreatePlayer } from "@/hooks/mutations/player/useCreatePlayer";
import { toast } from "sonner";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { useSession } from "@/store/session";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PlayerEditorModal() {
  const session = useSession();

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
  const [avatarImage, setAvatarImage] = useState<Image | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName("");
    setNameEn("");
    setTeamName("");

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }
    setAvatarImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
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
    createPlayer({
      name,
      nameEn,
      teamName,
      avatarFile: avatarImage!.file,
      userId: session!.user.id,
    });
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-xl flex-col items-center gap-3 rounded-xl border p-6 shadow-lg">
        <DialogTitle>선수 추가</DialogTitle>
        <DialogDescription>
          선수 프로필과 소속정보를 입력해주세요.
        </DialogDescription>
        <div className="text-muted-foreground w-full text-center text-sm font-medium">
          선수 프로필
        </div>
        <input
          onChange={handleSelectImage}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />
        <img
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click();
          }}
          src={avatarImage?.previewUrl || defaultAvatar}
          className="ring-muted/30 mx-auto h-28 w-28 cursor-pointer rounded-full object-cover shadow-md ring-1 transition-transform hover:scale-105"
        />
        <div className="text-muted-foreground w-full text-sm">선수 이름</div>
        <Input
          className="mt-1 w-full"
          disabled={isCreatePlayerPending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="예: 손흥민"
        />
        <div className="text-muted-foreground w-full text-sm">영문 이름</div>
        <Input
          className="mt-1 w-full"
          disabled={isCreatePlayerPending}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          id="name_en"
          placeholder="e.g. SON Heungmin"
        />
        <div className="text-muted-foreground w-full text-sm">소속팀</div>
        <Input
          className="mt-1 w-full"
          disabled={isCreatePlayerPending}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          id="team_name"
          placeholder="예: 로스앤젤레스 FC"
        />
        <Button
          disabled={isCreatePlayerPending}
          onClick={handleCreatePlayerClick}
          className="mt-4 w-full cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}

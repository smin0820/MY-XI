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
import { useOpenAlertModal } from "@/store/alertModal";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PlayerEditorModal() {
  const session = useSession();
  const { isOpen, close } = usePlayerEditorModal();
  const openAlertModal = useOpenAlertModal();

  const { mutate: createPlayer, isPending: isCreatePlayerPending } =
    useCreatePlayer({
      onSuccess: () => {
        toast.success("선수가 성공적으로 추가되었습니다.", {
          position: "top-center",
        });
        resetForm();
        close();
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

    if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);

    setAvatarImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const closeModal = () => {
    if (
      name !== "" ||
      nameEn !== "" ||
      teamName !== "" ||
      avatarImage !== null
    ) {
      openAlertModal({
        title: "선수 추가를 취소하시겠어요?",
        description: "지금 나가면 작성 중인 선수 정보가 저장되지 않습니다.",
        onPositive: () => {
          resetForm();
          close();
        },
        onNegative: () => {},
      });
      return;
    }
    resetForm();
    close();
  };

  const handleCloseModal = (open: boolean) => {
    if (!open) closeModal();
  };

  const handleCreatePlayerClick = () => {
    if (!session) return;

    if (name.trim() === "" || teamName.trim() === "" || nameEn.trim() === "")
      return;

    createPlayer({
      name,
      nameEn,
      teamName,
      avatarFile: avatarImage?.file,
      userId: session.user.id,
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
      <DialogContent className="bg-background w-full max-w-xl rounded-xl border p-6 shadow-lg">
        <DialogTitle className="text-lg font-semibold">선수 추가</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          선수 프로필과 소속 정보를 입력해주세요.
        </DialogDescription>

        {/* 프로필 섹션 */}
        <div className="mt-6 flex items-center gap-4">
          <input
            onChange={handleSelectImage}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />

          <img
            onClick={() => fileInputRef.current?.click()}
            src={avatarImage?.previewUrl || defaultAvatar}
            className="ring-border h-24 w-24 cursor-pointer rounded-full object-cover object-top ring-1 transition hover:opacity-90"
          />

          <div className="flex flex-col gap-2">
            <Button
              className="cursor-pointer"
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              이미지 업로드
            </Button>

            {avatarImage && (
              <Button
                className="cursor-pointer"
                size="sm"
                variant="ghost"
                onClick={() => setAvatarImage(null)}
              >
                이미지 제거
              </Button>
            )}
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">선수 이름</label>
            <Input
              disabled={isCreatePlayerPending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 손흥민"
            />
          </div>

          <div>
            <label className="text-sm font-medium">영문 이름</label>
            <Input
              disabled={isCreatePlayerPending}
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. SON Heungmin"
            />
          </div>

          <div>
            <label className="text-sm font-medium">소속팀</label>
            <Input
              disabled={isCreatePlayerPending}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="예: 로스앤젤레스 FC"
            />
          </div>
        </div>

        {/* 액션 */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            className="cursor-pointer"
            disabled={isCreatePlayerPending}
            onClick={handleCreatePlayerClick}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

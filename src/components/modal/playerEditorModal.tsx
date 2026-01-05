import { usePlayerEditorModal } from "@/store/playerEditorModal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePlayer } from "@/hooks/mutations/player/useCreatePlayer";
import { toast } from "sonner";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alertModal";
import { useUpdatePlayer } from "@/hooks/mutations/player/useUpdatePlayer";

type Image = {
  file?: File | null;
  previewUrl: string;
};

export default function PlayerEditorModal() {
  const session = useSession();
  const playerEditorModal = usePlayerEditorModal();
  const openAlertModal = useOpenAlertModal();

  const { mutate: createPlayer, isPending: isCreatePlayerPending } =
    useCreatePlayer({
      onSuccess: () => {
        toast.success("선수가 성공적으로 추가되었습니다.", {
          position: "top-center",
        });
        resetForm();
        playerEditorModal.actions.close();
      },
      onError: (error) => {
        toast.error("선수 생성에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const { mutate: updatePlayer, isPending: isUpdatePlayerPending } =
    useUpdatePlayer({
      onSuccess: () => {
        toast.success("선수 정보 업데이트에 성공했습니다.", {
          position: "top-center",
        });
        playerEditorModal.actions.close();
      },
      onError: (error) => {
        toast.error("선수 정보 업데이트에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [teamName, setTeamName] = useState("");
  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false); // in edit mode, user removed existing avatar

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarImageRef = useRef<Image | null>(null);

  useEffect(() => {
    avatarImageRef.current = avatarImage;
  }, [avatarImage]);

  const resetForm = () => {
    setName("");
    setNameEn("");
    setTeamName("");

    if (avatarImageRef.current && avatarImageRef.current.previewUrl)
      URL.revokeObjectURL(avatarImageRef.current.previewUrl);

    setAvatarImage(null);
    setAvatarPreviewUrl(null);
    setAvatarRemoved(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const closeModal = () => {
    if (
      name !== "" ||
      nameEn !== "" ||
      teamName !== "" ||
      avatarImage !== null ||
      avatarPreviewUrl !== null
    ) {
      openAlertModal({
        title: isEditMode
          ? "변경 사항을 취소하시겠어요?"
          : "선수 추가를 취소하시겠어요?",
        description: "지금 나가면 작성 중인 선수 정보가 저장되지 않습니다.",
        onPositive: () => {
          resetForm();
          playerEditorModal.actions.close();
        },
        onNegative: () => {},
      });
      return;
    }
    resetForm();
    playerEditorModal.actions.close();
  };

  const handleCloseModal = (open: boolean) => {
    if (!open) closeModal();
  };

  const isEditMode = (playerEditorModal as any).type === "EDIT";

  const isValid =
    name.trim() !== "" && nameEn.trim() !== "" && teamName.trim() !== "";

  const isDirty = (() => {
    if (!isEditMode) {
      return (
        name !== "" ||
        nameEn !== "" ||
        teamName !== "" ||
        avatarImage !== null ||
        avatarPreviewUrl !== null
      );
    }

    return (
      name !== (playerEditorModal as any).name ||
      nameEn !== (playerEditorModal as any).name_en ||
      teamName !== (playerEditorModal as any).team_name ||
      avatarRemoved ||
      avatarImage !== null
    );
  })();

  const handleSavePlayerClick = () => {
    if (!session) return;
    if (!isValid) return;
    if (!playerEditorModal.isOpen) return;

    if (playerEditorModal.type === "CREATE") {
      createPlayer({
        name,
        nameEn,
        teamName,
        avatarFile: avatarImage?.file as unknown as File,
        userId: session.user.id,
      });
    } else if (playerEditorModal.type === "EDIT") {
      updatePlayer({
        id: playerEditorModal.playerId,
        name,
        name_en: nameEn,
        team_name: teamName,
        avatar_url: avatarImage?.previewUrl,
      });
    }
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage && avatarImage.previewUrl)
      URL.revokeObjectURL(avatarImage.previewUrl);

    const url = URL.createObjectURL(file);
    setAvatarImage({ file, previewUrl: url });
    setAvatarPreviewUrl(url);
    setAvatarRemoved(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!playerEditorModal.isOpen) return;

    const pm = playerEditorModal as any;
    if (playerEditorModal.type === "EDIT") {
      setTimeout(() => {
        setName(pm.name ?? "");
        setNameEn(pm.name_en ?? "");
        setTeamName(pm.team_name ?? "");
        setAvatarPreviewUrl(pm.avatar_url ?? null);
        setAvatarRemoved(false);
        setAvatarImage(null);
      }, 0);
    } else {
      resetForm();
    }
  }, [playerEditorModal]);

  const isPending = isCreatePlayerPending || isUpdatePlayerPending;

  return (
    <Dialog open={playerEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-background w-full max-w-xl rounded-xl border p-6 shadow-lg">
        <DialogTitle className="text-lg font-semibold">
          {isEditMode ? `선수 수정` : "선수 추가"}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          선수 프로필과 소속 정보를 입력해주세요.
        </DialogDescription>

        {/* 프로필 섹션 */}
        <div className="mt-6 flex items-center gap-4">
          <input
            disabled={isPending}
            onChange={handleSelectImage}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />

          <img
            onClick={() => fileInputRef.current?.click()}
            src={avatarImage?.previewUrl || avatarPreviewUrl || defaultAvatar}
            className="ring-border h-24 w-24 cursor-pointer rounded-full object-cover object-top ring-1 transition hover:opacity-90"
          />

          <div className="flex flex-col gap-2">
            <Button
              disabled={isPending}
              className="cursor-pointer"
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              이미지 업로드
            </Button>

            {(avatarImage?.previewUrl || avatarPreviewUrl) && (
              <Button
                disabled={isPending}
                className="cursor-pointer"
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (avatarImage && avatarImage.previewUrl) {
                    URL.revokeObjectURL(avatarImage.previewUrl);
                  }
                  setAvatarImage(null);
                  setAvatarPreviewUrl(null);
                  setAvatarRemoved(true);
                }}
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
              disabled={isPending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 손흥민"
            />
          </div>

          <div>
            <label className="text-sm font-medium">영문 이름</label>
            <Input
              disabled={isPending}
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. SON Heungmin"
            />
          </div>

          <div>
            <label className="text-sm font-medium">소속팀</label>
            <Input
              disabled={isPending}
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
            disabled={isPending}
            onClick={handleSavePlayerClick}
          >
            {isEditMode ? "저장" : "생성"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

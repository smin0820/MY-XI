import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { Button } from "@/components/ui/button";
import { useCoachImage, useSetCoachImage } from "@/store/squadEditor";
import { useRef, type ChangeEvent } from "react";

export default function CoachImageControl() {
  const coachImage = useCoachImage();
  const setCoachImage = useSetCoachImage();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    if (coachImage?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(coachImage.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setCoachImage({ file, previewUrl });

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = () => {
    if (coachImage?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(coachImage.previewUrl);
    }
    setCoachImage(null);
  };

  return (
    <div className="border-b-2 py-5">
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold">감독 사진</span>

        <div className="flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSelect}
          />

          <Button
            type="button"
            variant="outline"
            className="cursor-pointer rounded-full"
            onClick={() => fileRef.current?.click()}
          >
            업로드
          </Button>

          <Button
            type="button"
            variant={coachImage ? "destructive" : "ghost"}
            className="cursor-pointer rounded-full"
            onClick={handleRemove}
            disabled={!coachImage}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

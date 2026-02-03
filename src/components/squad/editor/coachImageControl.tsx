import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { Button } from "@/components/ui/button";
import { useCoachImage, useSetCoachImage } from "@/store/squadEditor";
import { ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useRef, type ChangeEvent } from "react";

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

  useEffect(() => {
    return () => {
      if (coachImage?.previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(coachImage.previewUrl);
      }
    };
  }, [coachImage?.previewUrl]);

  const previewSrc = coachImage?.previewUrl || defaultAvatar;

  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <ImagePlus className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">감독 사진</div>
          <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
            저장 시 함께 기록될 감독 이미지를 업로드하세요.
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={previewSrc}
                alt="감독 이미지 미리보기"
                className="h-12 w-12 rounded-full border object-cover object-top"
              />
              <div className="text-muted-foreground text-sm">
                {coachImage ? (
                  <span className="text-foreground font-medium">선택됨</span>
                ) : (
                  "아직 선택되지 않았습니다."
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                variant="destructive"
                className="cursor-pointer rounded-full"
                onClick={handleRemove}
                disabled={!coachImage}
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

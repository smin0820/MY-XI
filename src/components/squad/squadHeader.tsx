import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import {
  useCoachImage,
  useSetCoachImage,
  useSetSquadTitle,
  useSquadTitle,
} from "@/store/squadEditor";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";

export default function SquadHeader() {
  const title = useSquadTitle();
  const setTitle = useSetSquadTitle();

  const coachImage = useCoachImage();
  const setCoachImage = useSetCoachImage();

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const hasTitle = title.trim() !== "";
  const displayText = hasTitle ? title.trim() : "스쿼드 제목 입력";

  const finishEditing = () => {
    setIsEditing(false);
  };

  const handleSelectCoachImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    if (coachImage?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(coachImage.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setCoachImage({ file, previewUrl });

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemoveCoachImage = () => {
    if (coachImage?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(coachImage.previewUrl);
    }
    setCoachImage(null);
  };
  return (
    <div className="flex items-center gap-4 border-b px-2 py-3">
      <div className="relative">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelectCoachImage}
        />
        <img
          onClick={() => fileRef.current?.click()}
          className="h-12 cursor-pointer rounded-full hover:opacity-50"
          src={coachImage?.previewUrl || defaultAvatar}
          alt="감독 프로필 이미지"
        />
        {coachImage && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveCoachImage();
            }}
            className="absolute top-0 right-0 m-1 rounded-full bg-black/30 p-1 hover:bg-black/40"
            aria-label="감독 이미지 제거"
          >
            <XIcon className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
      <div className="w-full max-w-sm">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={[
              "h-10 w-full cursor-pointer truncate text-left text-xl leading-none font-bold",
              hasTitle
                ? "text-black"
                : "text-muted-foreground hover:text-gray-600",
            ].join(" ")}
          >
            {displayText}
          </button>
        ) : (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={(e) => {
              if (e.key === "Enter") finishEditing();
              if (e.key === "Escape") finishEditing();
            }}
            className="h-10 w-full text-xl font-bold"
            placeholder="입력 해 주세요"
          />
        )}
      </div>
    </div>
  );
}

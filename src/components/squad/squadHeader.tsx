import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import { useSetSquadTitle, useSquadTitle } from "@/store/squadEditor";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SquadHeader() {
  const title = useSquadTitle();
  const setTitle = useSetSquadTitle();

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const hasTitle = title.trim() !== "";
  const displayText = hasTitle ? title.trim() : "스쿼드 제목 입력";

  const finishEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-4 border-b px-2 py-3">
      <img
        className="h-12 cursor-pointer rounded-full hover:opacity-50"
        src={defaultAvatar}
        alt="기본 프로필 이미지"
      />
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

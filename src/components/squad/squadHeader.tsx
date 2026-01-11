import defaultAvatar from "@/assets/default-avatar-bg-white.png";

export default function SquadHeader() {
  return (
    <div className="flex items-center gap-4 border-b px-2 py-3">
      <img
        className="h-12 cursor-pointer rounded-full hover:opacity-50"
        src={defaultAvatar}
        alt="기본 프로필 이미지"
      />
      <div className="font-bold">스쿼드 제목</div>
    </div>
  );
}

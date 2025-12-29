import defaultAvatar from "@/assets/default-avatar.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Index() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-10">
      <div className="rounded-lg border text-lg">
        <div className="flex items-center gap-4 border-b px-2 py-3">
          <img className="h-12" src={defaultAvatar} alt="기본 프로필 이미지" />
          <div className="font-bold">스쿼드 제목</div>
        </div>

        <div className="relative mx-auto h-180 w-xl overflow-hidden rounded-b-lg bg-[#1f8f57] p-4 text-white">
          {/* field markings */}
          <div className="absolute inset-0 opacity-30">
            {/* center horizontal line */}
            <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-[#2aa56f]" />
            {/* center circle */}
            <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2aa56f]" />

            {/* penalty boxes (index 스타일) */}
            <div className="absolute top-0 left-1/2 h-28 w-[60%] -translate-x-1/2 rounded-b-md border-2 border-[#2aa56f]" />
            <div className="absolute bottom-0 left-1/2 h-28 w-[60%] -translate-x-1/2 rounded-t-md border-2 border-[#2aa56f]" />
          </div>
        </div>
      </div>

      <div>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="포메이션을 선택해 주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>포메이션</SelectLabel>
              <SelectItem value="4-3-3">4-3-3</SelectItem>
              <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
              <SelectItem value="3-1-5-1">3-1-5-1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

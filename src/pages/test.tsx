import { useState, type Key } from "react";
import defaultAvatar from "@/assets/default-avatar-bg-white.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormationSelect from "@/components/squad/editor/formationSelect";

const formations: Record<string, { left: string; top: string }[]> = {
  "4-3-3": [
    // forwards
    { left: "22.5%", top: "25%" },
    { left: "50%", top: "25%" },
    { left: "77.5%", top: "25%" },
    // midfield
    { left: "22.5%", top: "50%" },
    { left: "50%", top: "50%" },
    { left: "77.5%", top: "50%" },
    // defenders
    { left: "10%", top: "75%" },
    { left: "35%", top: "75%" },
    { left: "65%", top: "75%" },
    { left: "90%", top: "75%" },
    // goalkeeper
    { left: "50%", top: "100%" },
  ],

  "4-2-3-1": [
    // forward
    { left: "50%", top: "15%" },
    // attacking midfielders
    { left: "22.5%", top: "35%" },
    { left: "50%", top: "35%" },
    { left: "77.5%", top: "35%" },
    // double pivot
    { left: "35%", top: "55%" },
    { left: "65%", top: "55%" },
    // defenders
    { left: "10%", top: "75%" },
    { left: "35%", top: "75%" },
    { left: "65%", top: "75%" },
    { left: "90%", top: "75%" },
    // goalkeeper
    { left: "50%", top: "100%" },
  ],

  "3-1-5-1": [
    // forward
    { left: "50%", top: "15%" },
    // 5 line
    { left: "10%", top: "35%" },
    { left: "30%", top: "35%" },
    { left: "50%", top: "35%" },
    { left: "70%", top: "35%" },
    { left: "90%", top: "35%" },
    // 1 holding mid
    { left: "50%", top: "55%" },
    // 3 back
    { left: "22.5%", top: "75%" },
    { left: "50%", top: "75%" },
    { left: "77.5%", top: "75%" },
    // goalkeeper
    { left: "50%", top: "100%" },
  ],
};

export default function Test() {
  const [formation, setFormation] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-10">
      <div className="rounded-lg border text-lg">
        <div className="flex items-center gap-4 border-b px-2 py-3">
          <img
            className="h-12 cursor-pointer rounded-full hover:opacity-50"
            src={defaultAvatar}
            alt="기본 프로필 이미지"
          />
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

          {/* players (rendered from selected formation) */}
          <div className="relative h-screen max-h-160 min-h-105 w-full">
            {(formation && formations[formation])?.map(
              (p: { left: any; top: any }, i: Key | null | undefined) => (
                <div
                  key={i}
                  style={{ left: p.left, top: p.top }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-full bg-white shadow-md">
                    <img
                      src={defaultAvatar}
                      alt={`player-${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-sm font-bold text-white">
                    이강인
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div>
        <Select value={formation} onValueChange={(e) => setFormation(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="포메이션을 선택해 주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>국대에서 자주 쓰는 포메이션</SelectLabel>
              <SelectItem value="4-3-3">4-3-3</SelectItem>
              <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
              <SelectItem value="3-1-5-1">3-1-5-1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormationSelect />
      </div>
    </div>
  );
}

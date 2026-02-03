import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormationKey } from "@/types/squad";
import { useSetFormation, useSquadFormation } from "@/store/squadEditor";
import { formations } from "@/lib/constants/formations";
import { LayoutGrid } from "lucide-react";

const formationOptions = Object.keys(formations) as Array<
  keyof typeof formations
>;

export default function FormationSelect() {
  const formation = useSquadFormation();
  const setFormation = useSetFormation();

  const handleChange = (value: string) => {
    setFormation(value as FormationKey);
  };

  return (
    <div className="rounded-lg border bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-black/5 p-2">
          <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold">포메이션</div>
          <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
            포메이션을 선택하면{" "}
            <span className="text-foreground font-medium">11개 슬롯</span>이
            생성됩니다.
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">
              {formation ? (
                <>
                  현재 선택:{" "}
                  <span className="text-foreground font-medium">
                    {formation}
                  </span>
                </>
              ) : (
                "아직 선택되지 않았습니다."
              )}
            </div>

            <Select value={formation ?? ""} onValueChange={handleChange}>
              <SelectTrigger className="w-64 cursor-pointer">
                <SelectValue placeholder="포메이션을 선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>국대에서 자주 쓰는 포메이션</SelectLabel>
                  {formationOptions.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

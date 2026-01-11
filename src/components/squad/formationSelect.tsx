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

const formationOptions = Object.keys(formations) as Array<
  keyof typeof formations
>;

export default function FormationSelect() {
  const formation = useSquadFormation();
  const setFormation = useSetFormation();

  const handleChange = (value: string) => {
    // Select는 string을 주니까 FormationKey로 캐스팅
    setFormation(value as FormationKey);
  };

  return (
    <Select value={formation ?? ""} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
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
  );
}

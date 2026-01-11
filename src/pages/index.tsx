import FormationSelect from "@/components/squad/formationSelect";
import Pitch from "@/components/squad/pitch";

export default function Index() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-10">
      <Pitch />

      <div className="space-y-4">
        <FormationSelect />
        {/* 다음 단계에서 저장 버튼/감독 사진/제목 UI 여기에 추가 */}
      </div>
    </div>
  );
}

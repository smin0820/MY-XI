import Pitch from "../pitch/pitch";
import FormationSelect from "./formationSelect";
import CoachImageControl from "./coachImageControl";
import SquadActions from "./squadActions";
import TacticalMemo from "./tacticalMemo";

export default function SquadEditorPage() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-10">
      <Pitch />

      <div className="space-y-4">
        <FormationSelect />
        <CoachImageControl />
        <TacticalMemo />
        <SquadActions />
      </div>
    </div>
  );
}

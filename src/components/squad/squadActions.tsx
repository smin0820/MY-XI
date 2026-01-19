import React from "react";
import { Button } from "../ui/button";

export default function SquadActions() {
  return (
    <div className="border-b-2 py-5">
      <div className="flex items-center justify-between">
        <span className="font-bold">액션</span>
        <div className="space-x-4">
          <Button className="rounded-full">저장</Button>
          <Button className="rounded-full">공유</Button>
          <Button className="rounded-full">리셋</Button>
        </div>
      </div>
    </div>
  );
}

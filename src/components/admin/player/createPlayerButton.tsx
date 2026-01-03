import { Button } from "@/components/ui/button";
import { useOpenPlayerEditorModal } from "@/store/playerEditorModal";
import React from "react";

export default function CreatePlayerButton() {
  const openPlayerEditorModal = useOpenPlayerEditorModal();
  return (
    <div>
      <Button className="cursor-pointer" onClick={openPlayerEditorModal}>
        선수 추가
      </Button>
    </div>
  );
}

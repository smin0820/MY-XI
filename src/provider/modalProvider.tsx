import AlertModal from "@/components/modal/alertMoal";
import PlayerEditorModal from "@/components/modal/playerEditorModal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <PlayerEditorModal /> 컴포넌트를 modal-root DOM 요소 아래에 랜더링  */}
      {createPortal(
        <>
          <PlayerEditorModal />,
          <AlertModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}

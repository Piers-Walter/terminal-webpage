import DesktopApp from "@/utils/DesktopApp";
import AppWindowBar from "./AppWindowBar";
import AppContents from "./AppContents";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useRef } from "react";
import { useAppContext } from "@/contexts/AppContext";
import classNames from "classnames";

interface AppWindowProps {
  app: DesktopApp;
}

export function AppWindow({ app }: AppWindowProps) {
  const nodeRef = useRef(null);
  const appContext = useAppContext();
  const setZIndex = (e: DraggableEvent, d: DraggableData) => {
    appContext.setActiveUUID(app.uuid);
    document.querySelectorAll<HTMLElement>(".window").forEach((e) => (e.style.zIndex = "0"));
    d.node.style.zIndex = "1";
  };

  return (
    <Draggable handle=".windowbar" bounds="parent" onDrag={setZIndex} nodeRef={nodeRef}>
      <div
        className={classNames("min-w-20 inline-block relative window ", {
          "shadow-2xl": appContext.activeUUID == app.uuid,
        })}
        ref={nodeRef}
      >
        <AppWindowBar app={app} />
        <AppContents app={app} />
      </div>
    </Draggable>
  );
}

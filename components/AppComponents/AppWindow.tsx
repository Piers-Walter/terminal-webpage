import DesktopApp from "@/utils/DesktopApp";
import AppWindowBar from "./AppWindowBar";
import AppContents from "./AppContents";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useRef } from "react";
import { useAppContext } from "@/contexts/AppContext";
import classNames from "classnames";
import { getHighestZIndex } from "@/utils/CSSUtils";

interface AppWindowProps {
  app: DesktopApp;
}

export function AppWindow({ app }: AppWindowProps) {
  const nodeRef = useRef(null);
  const appContext = useAppContext();

  const setZIndex = (e: DraggableEvent, d: DraggableData) => {
    appContext.setActiveUUID(app.uuid);

    const highestZIndex = getHighestZIndex();
    if (parseInt(d.node.style.zIndex) < highestZIndex) {
      d.node.style.zIndex = (highestZIndex + 1).toString();
    }
  };
  const setZIndexClick = (e: MouseEvent) => {
    appContext.setActiveUUID(app.uuid);
    const highestZIndex = getHighestZIndex();
    const target = (e.currentTarget as HTMLElement) || undefined;
    if (!target || !target.style) return;
    if (parseInt(target.style.zIndex) < highestZIndex) {
      target.style.zIndex = (highestZIndex + 1).toString();
    }
  };

  return (
    <Draggable onMouseDown={setZIndexClick} handle=".windowbar" bounds="parent" onDrag={setZIndex} nodeRef={nodeRef}>
      <div
        className={classNames(
          "min-w-20 inline-block absolute window shadow-2xl rounded-md border border-[rgba(0,0,0,0.0.2)]",
          {
            "shadow-2xl": appContext.activeUUID == app.uuid,
          }
        )}
        ref={nodeRef}
      >
        <AppWindowBar app={app} />
        <AppContents app={app} />
      </div>
    </Draggable>
  );
}

import DesktopApp from "@/utils/DesktopApp";
import AppWindowBar from "./AppWindowBar";
import AppContents from "./AppContents";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/contexts/AppContext";
import classNames from "classnames";
import { getHighestZIndex } from "@/utils/CSSUtils";

interface AppWindowProps {
  app: DesktopApp;
}

export function AppWindow({ app }: AppWindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const appContext = useAppContext();

  const setZIndex = (e: DraggableEvent, d: DraggableData) => {
    appContext.setActiveUUID(app.uuid);

    const highestZIndex = getHighestZIndex();
    if (parseInt(d.node.style.zIndex) < highestZIndex) {
      d.node.style.zIndex = (highestZIndex + 1).toString();
    }

    if (d) {
      const iconNode = document.getElementById(app.name);
      const iconPosition = iconNode?.getBoundingClientRect();
      if (!iconPosition) return;

      d.node.style.transformOrigin = `${iconPosition.x}px ${iconPosition.y}px`;
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

  useEffect(() => {
    const iconNode = document.getElementById(app.name);
    const iconPosition = iconNode?.getBoundingClientRect();
    if (!iconPosition || !nodeRef.current) return;
    nodeRef.current.style.transformOrigin = `${iconPosition.x}px ${iconPosition.y}px`;
  }, []);

  return (
    <Draggable onMouseDown={setZIndexClick} handle=".windowbar" bounds="parent" onDrag={setZIndex} nodeRef={nodeRef}>
      <div
        className={classNames(
          "min-w-20 duration-[300ms] inline-block absolute window shadow-2xl rounded-md border border-[rgba(0,0,0,0.0.2)] resize overflow-hidden transition-[scale]",
          {
            "shadow-2xl": appContext.activeUUID == app.uuid,
            "scale-0": app.minimized,
            "scale-100 ease-in-out": !app.minimized,
          }
        )}
        style={{ minWidth: app.sizes.minWidth + "px", minHeight: app.sizes.minHeight + "px" }}
        ref={nodeRef}
      >
        <AppWindowBar app={app} />
        <AppContents
          app={app}
          style={{
            display: "grid",
            minWidth: app.sizes.minWidth + "px",
            minHeight: app.sizes.minHeight + "px",
          }}
        />
      </div>
    </Draggable>
  );
}

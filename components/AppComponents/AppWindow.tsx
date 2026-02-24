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

  const setZIndexClick = (e: MouseEvent) => {
    appContext.setActiveUUID(app.uuid);
    const highestZIndex = getHighestZIndex();
    const target = (e.currentTarget as HTMLElement) || undefined;
    if (!target || !target.style) return;
    if (parseInt(target.style.zIndex) <= highestZIndex || target.style.zIndex === "") {
      target.style.zIndex = (highestZIndex + 2).toString();
    }
  };

  useEffect(() => {
    const iconNode = document.getElementById(app.name);
    const iconPosition = iconNode?.getBoundingClientRect();
    if (!iconPosition || !nodeRef.current) return;
    nodeRef.current.style.transformOrigin = `${iconPosition.x}px ${iconPosition.y}px`;
  }, [app.name]);

  return (
    <Draggable onMouseDown={setZIndexClick} handle=".windowbar" bounds="parent" nodeRef={nodeRef}>
      <div
        className={classNames(
          "window absolute z-0 inline-block min-w-20 resize overflow-hidden rounded-md border border-[rgba(0,0,0,0.0.2)] shadow-2xl transition-[scale] duration-[300ms]",
          {
            "shadow-2xl": appContext.activeUUID == app.uuid,
            "scale-0": app.minimized,
            "scale-100 ease-in-out": !app.minimized,
          }
        )}
        style={{
          height: app.sizes.minHeight + "px",
          width: app.sizes.minWidth + "px",
          minWidth: app.sizes.minWidth + "px",
          minHeight: app.sizes.minHeight + "px",
          maxWidth: app.sizes.maxWidth + "px",
          maxHeight: app.sizes.maxHeight + "px",
        }}
        ref={nodeRef}
      >
        <AppWindowBar app={app} />
        <AppContents
          app={app}
          style={{
            display: "grid",
            minWidth: app.sizes.minWidth + "px",
            minHeight: app.sizes.minHeight - 32 + "px",
            maxWidth: app.sizes.maxWidth + "px",
            maxHeight: app.sizes.maxHeight ? app.sizes.maxHeight - 32 + "px" : "",
          }}
        />
      </div>
    </Draggable>
  );
}

import { useAppContext } from "@/contexts/AppContext";
import DesktopApp from "@/utils/DesktopApp";
import { CSSProperties } from "react";

interface AppContentsProps {
  app: DesktopApp;
  style?: CSSProperties;
}

export default function AppContents({ app, style }: AppContentsProps) {
  return (
    <div style={style} className="h-[calc(100%-32px)] bg-white block rounded-b-md">
      <app.body sizes={app.sizes} />
    </div>
  );
}

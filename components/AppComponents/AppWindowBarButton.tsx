import { useAppContext } from "@/contexts/AppContext";
import AppUtils from "@/utils/AppUtils";
import DesktopApp from "@/utils/DesktopApp";

interface AppWindowBarButtonProps {
  className: string;
  app: DesktopApp;
  onClick?: () => void;
}

export default function ({ className, app, onClick }: AppWindowBarButtonProps) {
  const appContext = useAppContext();

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => AppUtils.closeApp(app.uuid, appContext)}
      className={className + " border-solid border-[1px] rounded-full h-3 w-3"}
    />
  );
}

import { useAppContext } from "@/contexts/AppContext";
import AppUtils from "@/utils/AppUtils";
import DesktopApp, { DesktopAppDetails } from "@/utils/DesktopApp";
import classNames from "classnames";
import { useEffect } from "react";

interface AppButtonProps {
  app: DesktopAppDetails;
}

export default function AppButton({ app }: AppButtonProps) {
  const { runningApps, setRunningApps } = useAppContext();
  const appContext = useAppContext();

  const startApp = () => {
    const appIndex = runningApps.findIndex((runningApp) => runningApp.name == app.name);
    if (appIndex != -1) {
      const newRunningApps = [...runningApps];
      newRunningApps[appIndex].minimized = false;
      setRunningApps(newRunningApps);
      return;
    }
    setRunningApps((lastRunningApps) => {
      const newAppInstance: DesktopApp = new DesktopApp(app.name, app.icon, app.body);
      return [...lastRunningApps, newAppInstance];
    });
  };

  return (
    <div className="flex flex-col items-center" id={app.name}>
      <app.icon
        size={45}
        className="active:contrast-[25%] hover:scale-[110%] origin-bottom transition-transform duration-200"
        onClick={() => startApp()}
      />
      <div
        className={classNames("rounded-full h-1 w-1 bg-gray-500", {
          "opacity-0": !AppUtils.isAppRunning(app.name, appContext),
        })}
      />
    </div>
  );
}

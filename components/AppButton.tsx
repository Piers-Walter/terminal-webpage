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
    if (runningApps.findIndex((runningApp) => runningApp.name == app.name) != -1) {
      console.log(`App ${app.name} is already running`);
      return;
    }
    setRunningApps((lastRunningApps) => {
      console.log(`Starting app ${app.name}`);
      const newAppInstance: DesktopApp = new DesktopApp(app.name, app.icon, app.body);
      return [...lastRunningApps, newAppInstance];
    });
  };

  useEffect(() => {
    console.log(runningApps);
  }, [runningApps]);

  return (
    <div className="flex flex-col items-center">
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

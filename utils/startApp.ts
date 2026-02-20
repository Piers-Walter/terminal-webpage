import { AppContextType, useAppContext } from "@/contexts/AppContext";
import DesktopApp, { DesktopAppDetails } from "./DesktopApp";

const startApp = (app: DesktopAppDetails, appContext: AppContextType) => {
  const { runningApps, setRunningApps, setActiveUUID } = appContext;
  // const appContext = useAppContext();
  const appIndex = runningApps.findIndex((runningApp) => runningApp.name == app.name);
  if (appIndex != -1) {
    const newRunningApps = [...runningApps];
    newRunningApps[appIndex].minimized = false;
    setRunningApps(newRunningApps);
    return;
  }
  setRunningApps((lastRunningApps) => {
    const newAppInstance: DesktopApp = new DesktopApp(app.name, app.icon, app.body, app.sizes);
    setActiveUUID(newAppInstance.uuid);
    return [...lastRunningApps, newAppInstance];
  });
};

export default startApp;
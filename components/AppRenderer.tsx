import { useAppContext } from "@/contexts/AppContext";
import { AppWindow } from "./AppComponents/AppWindow";

export default function () {
  const appContext = useAppContext();

  return (
    <div className="desktop relative w-full z-0 h-[calc(100%-20px)]">
      {appContext.runningApps.map((runningApp) => {
        return <AppWindow key={runningApp.uuid} app={runningApp} />;
      })}
    </div>
  );
}

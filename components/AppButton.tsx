import { useAppContext } from "@/contexts/AppContext";
import AppUtils from "@/utils/AppUtils";
import DesktopApp, { DesktopAppDetails } from "@/utils/DesktopApp";
import startApp from "@/utils/startApp";
import classNames from "classnames";
import { RiQuestionMark } from "react-icons/ri";

interface AppButtonProps {
  app: DesktopAppDetails;
}

export default function AppButton({ app }: AppButtonProps) {
  const appContext = useAppContext();

  if (app.icon == undefined) {
    app.icon = RiQuestionMark;
  }

  return (
    <div className="flex flex-col items-center" id={app.name}>
      <app.icon
        size={45}
        className="origin-bottom transition-transform duration-200 hover:scale-[110%] active:contrast-[25%]"
        onClick={() => startApp(app, appContext)}
      />
      <div
        className={classNames("h-1 w-1 rounded-full bg-gray-500", {
          "opacity-0": !AppUtils.isAppRunning(app.name, appContext),
        })}
      />
    </div>
  );
}

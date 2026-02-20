"use client";
import { useAppContext } from "@/contexts/AppContext";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import useClickDetector from "@/utils/ClickDetector";
import { FaOtter } from "react-icons/fa6";
import { allAppsByName } from "@/utils/getAvailableApps";
import startApp from "@/utils/startApp";

const Menu = ({ hide }: { hide: () => void }) => {
  const appContext = useAppContext();
  // const apps = allAppsByName;

  const menuItems = [{ name: "About This Site", app: allAppsByName["About"] }];

  console.log(Object.keys(allAppsByName));

  return (
    <div className="absolute top-[26px] left-2 z-[99999] rounded-md bg-white/50 p-1 backdrop-blur-sm">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              startApp(item.app, appContext);
              hide();
            }}
            className="rounded-md px-4 py-0.5 hover:bg-blue-600 hover:text-white"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function HeaderBar() {
  const [time, setTime] = useState<Date>();
  const [runningAppName, setRunningAppName] = useState("");

  const appContext = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const selectedApps = appContext.runningApps.filter((app) => app.uuid == appContext.activeUUID);
    if (selectedApps.length > 0) setRunningAppName(selectedApps[0].name);
    else setRunningAppName("");
  }, [appContext.activeUUID, appContext.runningApps]);

  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickDetector<HTMLDivElement>(false);

  return (
    <div className="flex h-[24px] w-full items-center justify-between bg-[#0000002e] select-none">
      <div className="flex items-center" ref={ref}>
        <div className={`mr-1 ml-1 rounded-full px-3 ${isComponentVisible && "bg-purple-600"}`}>
          <FaOtter
            onClick={() => setIsComponentVisible(!isComponentVisible)}
            size="18"
            className={`fill-white`}
          />
        </div>
        {isComponentVisible && <Menu hide={() => setIsComponentVisible(false)} />}
        <span className="px-1 font-mono text-sm font-black text-white">{runningAppName}</span>
      </div>
      <div className="flex items-center">
        <FaRegClock style={{ fill: "white" }} size="14" />
        <span className="h-full px-1 font-mono text-sm font-extrabold text-gray-100">
          {time?.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

"use client";
import { useAppContext } from "@/contexts/AppContext";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";

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

  return (
    <div className="w-full  bg-[#0000002e] h-[20px] flex items-center justify-between">
      <div>
        <span className="text-sm text-white font-mono font-black px-1">{runningAppName}</span>
      </div>
      <div className="flex items-center">
        <FaRegClock style={{ fill: "white" }} size="14" />
        <span className="font-mono text-gray-100 px-1 h-full font-extrabold text-sm select-none">
          {time?.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

import { useAppContext } from "@/contexts/AppContext";
import AppUtils from "@/utils/AppUtils";
import DesktopApp from "@/utils/DesktopApp";
import { useState } from "react";
import AppWindowBarButton from "./AppWindowBarButton";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi";

interface AppWindowBarProps {
  app: DesktopApp;
}

export default function ({ app }: AppWindowBarProps) {
  const appContext = useAppContext();

  return (
    <div
      className={classNames(
        "select-none min-w-20 h-8 px-1 w-full flex flex-row items-center bg-gray-200  rounded-t-md windowbar",
        {
          "bg-gray-300": appContext.activeUUID != app.uuid,
        }
      )}
    >
      <div className="flex flex-row space-x-1 justify-self-start">
        <AppWindowBarButton
          HoverIcon={IoMdClose}
          app={app}
          className="bg-red-600 border-red-700"
          onClick={() => AppUtils.closeApp(app.uuid, appContext)}
        />

        <AppWindowBarButton
          HoverIcon={FiMinus}
          app={app}
          className="bg-yellow-500 border-yellow-600 "
          onClick={() => {}}
        />
        <AppWindowBarButton
          HoverIcon={HiOutlinePlus}
          app={app}
          className="bg-green-600 border-green-700"
          onClick={() => {}}
        />
      </div>
      <p className="px-3">{app.name}</p>
    </div>
  );
}

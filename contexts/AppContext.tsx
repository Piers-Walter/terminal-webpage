import FakeFS from "@/components/Apps/Terminal/FileSystem/FakeFS";
import DesktopApp from "@/utils/DesktopApp";
import { createContext, useContext } from "react";

export interface AppContextType {
  runningApps: DesktopApp[];
  setRunningApps: React.Dispatch<React.SetStateAction<DesktopApp[]>>;
  activeUUID: string;
  setActiveUUID: React.Dispatch<React.SetStateAction<string>>;
  fileSystem: FakeFS
}

// App context which keeps track of which apps are open
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("context not used inside provider");
  }
  return context;
};

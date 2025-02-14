import { AppContext } from "@/contexts/AppContext";
import "@/styles/globals.css";
import DesktopApp from "@/utils/DesktopApp";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [runningApps, setRunningApps] = useState<DesktopApp[]>([]);
  const [activeUUID, setActiveUUID] = useState<string>("");
  return (
    <AppContext.Provider value={{ runningApps, setRunningApps, activeUUID, setActiveUUID }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

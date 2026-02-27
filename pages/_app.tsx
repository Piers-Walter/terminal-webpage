import FakeFS from "@/components/Apps/Terminal/FileSystem/FakeFS";
import { AppContext } from "@/contexts/AppContext";
import "@/styles/globals.css";
import DesktopApp from "@/utils/DesktopApp";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [runningApps, setRunningApps] = useState<DesktopApp[]>([]);
  const [activeUUID, setActiveUUID] = useState<string>("");
  const fileSystem = useMemo(() => new FakeFS(), []);
  return (
    <AppContext.Provider
      value={{ runningApps, setRunningApps, activeUUID, setActiveUUID, fileSystem }}
    >
      <Head>
        <title>OtterOS</title>
      </Head>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

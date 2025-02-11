'use client'
import type { AppContextType } from "@/contexts/AppContext";

export default {
  isAppRunning: (appName: string, appContext: AppContextType) => {
    const { runningApps } = appContext

    if (runningApps.findIndex(runningApp => runningApp.name == appName) == -1) return false
    return true
  },

  closeApp: (uuid: string, appContext: AppContextType) => {
    const { setRunningApps } = appContext;

    setRunningApps(runningApps => {
      const newRunningApps = [...runningApps]
      const appIndex = newRunningApps.findIndex(runningApp => runningApp.uuid == uuid);
      if (appIndex == -1) {
        console.error("Could not find app with uuid " + uuid);
        return newRunningApps
      }
      newRunningApps.splice(appIndex, 1);
      return newRunningApps
    })
  },

  minimiseApp: (uuid: string, appContext: AppContextType) => {
    const { setRunningApps } = appContext;
    setRunningApps(runningApps => {
      const newRunningApps = [...runningApps]
      const appIndex = newRunningApps.findIndex(runningApp => runningApp.uuid == uuid);
      if (appIndex == -1) {
        console.error("Could not find app with uuid " + uuid);
        return newRunningApps
      }
      newRunningApps[appIndex].minimized = true;
      return newRunningApps
    })
  }
}


import { IoTerminal } from "react-icons/io5";
import { DesktopAppDetails } from "./DesktopApp";
import TerminalMain from "@/components/Apps/Terminal/TerminalMain";
import { PiUserCircleFill } from "react-icons/pi";
import AboutMeMain from "@/components/Apps/AboutMe/AboutMeMain";



export default function getAvailableApps(): DesktopAppDetails[] {
  const appTemplates: DesktopAppDetails[] = [{
    name: "Terminal",
    icon: IoTerminal,
    body: TerminalMain
  },
  {
    name: "About Me",
    icon: PiUserCircleFill,
    body: AboutMeMain
  }]

  return appTemplates;

}
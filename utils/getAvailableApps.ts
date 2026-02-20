import { IoTerminal } from "react-icons/io5";
import { DesktopAppDetails } from "./DesktopApp";
import TerminalMain from "@/components/Apps/Terminal/TerminalMain";
import { PiUserCircleFill } from "react-icons/pi";
import AboutMeMain from "@/components/Apps/AboutMe/AboutMeMain";
import { BsNewspaper } from "react-icons/bs";
import BlogMain from "@/components/Apps/Blog/BlogMain";




export default function getAvailableApps(): DesktopAppDetails[] {
  const appTemplates: DesktopAppDetails[] = [{
    name: "Terminal",
    icon: IoTerminal,
    body: TerminalMain,
    sizes: {
      minHeight: 500,
      minWidth: 500,
    }
  },
  {
    name: "About Me",
    icon: PiUserCircleFill,
    body: AboutMeMain
  },
  {
    name: "My Blog",
    icon: BsNewspaper,
    body: BlogMain
  }]

  return appTemplates;

}
import { IoTerminal } from "react-icons/io5";
import DesktopApp, { DesktopAppDetails } from "./DesktopApp";
import TerminalMain from "@/components/Apps/Terminal/TerminalMain";
import { PiUserCircleFill } from "react-icons/pi";
import AboutMeMain from "@/components/Apps/AboutMe/AboutMeMain";
import { BsNewspaper } from "react-icons/bs";
import BlogMain from "@/components/Apps/Blog/BlogMain";
import AboutPage from "@/components/Widgets/AboutPage/AboutPage";

const allApps: DesktopAppDetails[] = [
  {
    name: "Terminal",
    icon: IoTerminal,
    body: TerminalMain,
    sizes: {
      minHeight: 500,
      minWidth: 500,
    },
    kind: "app"
  },
  {
    name: "About Me",
    icon: PiUserCircleFill,
    body: AboutMeMain,
    kind: "app"
  },
  {
    name: "My Blog",
    icon: BsNewspaper,
    body: BlogMain,
    kind: "app"
  },
  {
    name: "About",
    body: AboutPage,
    kind: "widget",
    sizes: {
      minHeight: 300,
      minWidth: 500,
    },
  }
];

const allAppsByName: { [key: string]: DesktopAppDetails } = Object.fromEntries(
  allApps.map(app => [app.name, app])
);

export default function getAvailableApps(): DesktopAppDetails[] {
  return allApps
}

export { allApps, allAppsByName };
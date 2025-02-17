import DesktopApp from "@/utils/DesktopApp";
import { IconType } from "react-icons";

interface AppWindowBarButtonProps {
  className: string;
  app: DesktopApp;
  onClick?: () => void;
  HoverIcon: IconType;
}

const AppWindowBarButton = ({ className, onClick, HoverIcon }: AppWindowBarButtonProps) => {
  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={onClick}
      className={className + " border-solid border-[1px] rounded-full h-3 w-3"}
    >
      <HoverIcon className="opacity-0 hover:opacity-60" size={10} />
    </div>
  );
};

export default AppWindowBarButton;

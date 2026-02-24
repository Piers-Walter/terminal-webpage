import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface NavBarState {
  currentPath: string;
  onBack?: () => void;
  onForward?: () => void;
}

const NavBar = (props: NavBarState) => {
  return (
    <div className="w-full border-t-1 border-solid border-gray-300 bg-gray-200">
      <div className="ml-2 flex flex-row items-center space-x-2 py-2">
        <div className="rounded-full bg-white p-2 hover:shadow-md">
          <IoMdArrowRoundBack size={20} />
        </div>
        <div className="rounded-full bg-white p-2 hover:shadow-md">
          <IoMdArrowRoundForward size={20} />
        </div>
        <div className="mr-4 w-full rounded-full bg-white px-3 py-1">
          <span className="w-full outline-none">{props.currentPath || "/"}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

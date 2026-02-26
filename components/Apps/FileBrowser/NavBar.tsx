import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdArrowRoundUp } from "react-icons/io";

interface NavBarState {
  currentPath: string;
  onBack?: () => void;
  onForward?: () => void;
  onUp?: () => void;
}

const NavBar = (props: NavBarState) => {
  return (
    <div className="w-full border-t-1 border-solid border-gray-300 bg-gray-200">
      <div className="ml-2 flex flex-row items-center space-x-2 py-2">
        <div className="rounded-full bg-white p-2 hover:shadow-md" onClick={props.onBack}>
          <IoMdArrowRoundBack size={20} />
        </div>
        <div className="rounded-full bg-white p-2 hover:shadow-md" onClick={props.onUp}>
          <IoMdArrowRoundUp size={20} />
        </div>
        <div className="rounded-full bg-white p-2 hover:shadow-md" onClick={props.onForward}>
          <IoMdArrowRoundForward size={20} />
        </div>
        <div className="mr-4 w-full rounded-full bg-white px-3 py-1">
          <span className="w-full outline-none select-none">{props.currentPath || "/"}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

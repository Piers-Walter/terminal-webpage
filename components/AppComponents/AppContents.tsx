import { useAppContext } from "@/contexts/AppContext";
import DesktopApp from "@/utils/DesktopApp";

interface AppContentsProps {
  app: DesktopApp;
}

export default function AppContents({ app }: AppContentsProps) {
  return (
    <div className="h-full bg-white block rounded-b-md overflow-clip">
      <app.body />
    </div>
  );
}

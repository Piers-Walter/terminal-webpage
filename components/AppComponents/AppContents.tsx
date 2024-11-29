import DesktopApp from "@/utils/DesktopApp";

interface AppContentsProps {
  app: DesktopApp;
}

export default function AppContents({ app }: AppContentsProps) {
  return (
    <div className="h-full bg-white block rounded-b-md">
      <app.body />
    </div>
  );
}

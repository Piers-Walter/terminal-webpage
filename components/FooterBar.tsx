import getAvailableApps from "@/utils/getAvailableApps";
import AppButton from "./AppButton";

export default function FooterBar() {
  const apps = getAvailableApps();
  return (
    <div className="w-full flex absolute bottom-0 justify-center flex-row">
      <div className="h-16 bg-[rgba(255,255,255,0.6)] backdrop-blur-md rounded-2xl mb-3 flex space-x-3 px-2 flex-row items-center">
        {apps.map((app) => (
          <AppButton key={app.name} app={app} />
        ))}
      </div>
    </div>
  );
}

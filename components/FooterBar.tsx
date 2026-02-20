import getAvailableApps from "@/utils/getAvailableApps";
import AppButton from "./AppButton";

export default function FooterBar() {
  const apps = getAvailableApps().filter((app) => app.kind == "app");

  return (
    <div className="absolute bottom-0 flex w-full flex-row justify-center">
      <div className="mb-3 flex h-16 flex-row items-center space-x-3 rounded-2xl bg-[rgba(255,255,255,0.6)] px-2 backdrop-blur-md">
        {apps.map((app) => (
          <AppButton key={app.name} app={app} />
        ))}
      </div>
    </div>
  );
}

import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";
import AppRenderer from "@/components/AppRenderer";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-clip bg-blue-400">
      <HeaderBar />
      <AppRenderer />
      <FooterBar />
    </div>
  );
}

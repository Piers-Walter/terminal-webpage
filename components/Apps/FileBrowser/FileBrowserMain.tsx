import { useAppContext } from "@/contexts/AppContext";
import NavBar from "./NavBar";
import { useEffect, useMemo, useState } from "react";
import getCwdHandler from "@/utils/cwdHandler";
import { Folder, File } from "../Terminal/FileSystem/FakeFS";
import { FcFile, FcFolder } from "react-icons/fc";

export default function FileBrowserMain() {
  const fileSystem = useAppContext().fileSystem;
  const cwdHandler = useMemo(() => getCwdHandler(), []);

  const [entries, setEntries] = useState<(Folder | File)[]>([]);

  useEffect(() => {
    // Register filesystem listener
    fileSystem.subscribe((event) => {
      console.log(event);
      const files = fileSystem.readDir(cwdHandler.cwd);
      const filteredFiles = files.directory.filter(
        (entry) => entry.name !== ".." && entry.name !== "."
      );
      setEntries(filteredFiles);
    });
  }, [fileSystem]);

  useEffect(() => {
    const files = fileSystem.readDir(cwdHandler.cwd);
    const filteredFiles = files.directory.filter(
      (entry) => entry.name !== ".." && entry.name !== "."
    );
    setEntries(filteredFiles);
  }, [cwdHandler.cwd]);

  return (
    <div className="flex h-full w-full flex-col">
      <NavBar currentPath={cwdHandler.cwd} />
      <div className="flex flex-1 flex-wrap gap-4 overflow-y-auto p-4">
        {entries.map((entry) => (
          <div
            className="flex w-24 cursor-pointer flex-col items-center justify-center self-start rounded p-2 hover:bg-gray-100"
            key={entry.name}
          >
            {entry instanceof File ? <FcFile size={80} /> : <FcFolder size={80} />}
            <span className="mt-2 text-center text-xs break-words">{entry.name}</span>
          </div>
        ))}
        {entries.map((entry) => (
          <div
            className="flex w-24 cursor-pointer flex-col items-center justify-center self-start rounded p-2 hover:bg-gray-100"
            key={entry.name}
          >
            {entry instanceof File ? <FcFile size={80} /> : <FcFolder size={80} />}
            <span className="mt-2 text-center text-xs break-words">{entry.name}</span>
          </div>
        ))}
        {entries.map((entry) => (
          <div
            className="flex w-24 cursor-pointer flex-col items-center justify-center self-start rounded p-2 hover:bg-gray-100"
            key={entry.name}
          >
            {entry instanceof File ? <FcFile size={80} /> : <FcFolder size={80} />}
            <span className="mt-2 text-center text-xs break-words">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

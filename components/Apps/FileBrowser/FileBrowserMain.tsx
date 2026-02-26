import { useAppContext } from "@/contexts/AppContext";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { Folder, File } from "../Terminal/FileSystem/FakeFS";
import { FcFile, FcFolder } from "react-icons/fc";

export default function FileBrowserMain() {
  const fileSystem = useAppContext().fileSystem;
  const [cwd, setCwd] = useState("/");
  const [history, setHistory] = useState<string[]>(["/"]);

  const [entries, setEntries] = useState<(Folder | File)[]>([]);

  useEffect(() => {
    // Register filesystem listener
    fileSystem.subscribe((event) => {
      console.log(event);
      const files = fileSystem.readDir(cwd);
      const filteredFiles = files.directory.filter(
        (entry) => entry.name !== ".." && entry.name !== "."
      );
      setEntries(filteredFiles);
    });
  }, [fileSystem]);

  useEffect(() => {
    console.log(history);
  }, [history]);

  useEffect(() => {
    console.log("reading files from " + cwd);
    const files = fileSystem.readDir(cwd);
    const filteredFiles = files.directory.filter(
      (entry) => entry.name !== ".." && entry.name !== "."
    );
    setEntries(filteredFiles);
  }, [cwd]);

  return (
    <div className="flex h-full w-full flex-col">
      <NavBar
        currentPath={cwd}
        onUp={() => {
          const newPath = `/${cwd
            .split("/")
            .filter((e) => e != "")
            .slice(0, -1)
            .join("/")}/`.replaceAll(/\/\/+/g, "/");

          setCwd(newPath);
          console.log(`Setting cwd to ${newPath}`);
        }}
        onBack={() => {
          if (history.length < 2) return;
          const newPath = history[history.length - 2];
          console.log(`New Path is ${newPath}`);
          setHistory(history.slice(0, -1));
          setCwd(newPath);
        }}
      />
      <div
        className="flex min-h-0 flex-1 flex-wrap content-start gap-4 overflow-y-auto p-4"
        style={{ flex: "1 1 1px" }}
      >
        {entries.map((entry) => (
          <div
            className="flex w-24 cursor-pointer flex-col items-center justify-center self-start rounded p-2 select-none hover:bg-gray-100"
            key={entry.name}
            onDoubleClick={() => {
              if (entry instanceof Folder) {
                const newDir = cwd + entry.name + "/";
                setCwd(newDir);
                setHistory(history.concat(newDir));
                console.log(cwd);
              }
            }}
          >
            {entry instanceof File ? <FcFile size={80} /> : <FcFolder size={80} />}
            <span className="mt-2 text-center text-xs break-words">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import TerminalExecutor from "./TerminalExecutor";
import { sizeLimits } from "@/utils/DesktopApp";
import { useAppContext } from "@/contexts/AppContext";

const PS1 = "user@pierswalter.co.uk>";

export default function TerminalMain({ sizes }: { sizes?: sizeLimits }) {
  const [output, setOutput] = useState("Welcome to Terminal");
  const fileSystem = useAppContext().fileSystem;

  const executor = useMemo(() => new TerminalExecutor({ PS1, setOutput, fileSystem }), []);

  useEffect(() => {
    executor?.setOutputHandler(setOutput);
  }, [setOutput]);

  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: InputEvent) => {
    if (e.data) {
      executor?.handleInput(e.data);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    executor?.handleKeyDown(e.key);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    console.log("Adding EL");
    inputRef.current.addEventListener("input", handleInput as EventListener);
    inputRef.current.addEventListener("keydown", handleKeyDown);
  }, [inputRef.current]);

  useEffect(() => {
    if (!displayRef.current) return;
    displayRef.current?.scrollTo(0, displayRef.current?.scrollHeight);
  }, [output]);

  useEffect(() => {
    if (inputRef.current) inputRef.current?.focus();
  }, [inputRef]);

  const TerminalRenderer = () => {
    return (
      <div className="h-full w-full max-w-full max-h-full px-1">
        <input ref={inputRef} className="h-0 w-0 absolute -top-full" autoFocus={true} />
        <p className="whitespace-pre-wrap break-all w-full">
          {output}
          <span className="animate-blink">█</span>
        </p>
      </div>
    );
  };

  return (
    <div
      className="h-full w-full max-w-full bg-black font-mono text-green-500 overflow-scroll no-scrollbar"
      ref={displayRef}
      onClick={() => {
        inputRef.current?.focus();
      }}
      style={{
        minHeight: sizes ? sizes.minHeight - 32 + "px" : "500px",
        // maxHeight: sizes.maxHeight ? sizes.maxHeight - 32 : "468px",
      }}
    >
      <TerminalRenderer />
    </div>
  );
}

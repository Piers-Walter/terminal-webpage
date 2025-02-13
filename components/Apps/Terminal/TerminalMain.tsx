import { KeyboardEventHandler, use, useEffect, useMemo, useRef, useState } from "react";
import StringHandlers from "./StringHandlers";
import TerminalExecutor from "./TerminalExecutor";
import { sizeLimits } from "@/utils/DesktopApp";

const PS1 = "user@pierswalter.co.uk>";

export default function TerminalMain({ sizes }: { sizes: sizeLimits }) {
  const [userInput, setUserInput] = useState("WELCOME");
  const [output, setOutput] = useState("Welcome to Terminal");
  let executorRef = useRef<TerminalExecutor | null>(null);
  useEffect(() => {
    executorRef.current = new TerminalExecutor({ PS1, userInput, setUserInput, setOutput });
  }, []);
  const executor = executorRef.current;

  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: InputEvent) => {
    if (e.data) {
      setUserInput((old) => old + e.data);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        executor?.execute();
        break;
      case "Backspace":
        setUserInput((oldInput) => StringHandlers.backspace(oldInput));
        break;
      case "ArrowUp":
        executor?.handleUp();
        break;
      default:
        console.log(e.key);
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    console.log("Adding EL");
    inputRef.current.addEventListener("input", handleInput);
    inputRef.current.addEventListener("keydown", handleKeydown);
  }, [inputRef.current]);

  useEffect(() => {
    if (!displayRef.current) return;
    displayRef.current?.scrollTo(0, displayRef.current?.scrollHeight);
  }, [userInput, output]);

  useEffect(() => {
    if (inputRef.current) inputRef.current?.focus();
  }, [inputRef]);

  const TerminalRenderer = () => {
    return (
      <div className="h-full w-full max-w-full max-h-full px-1">
        <input ref={inputRef} className="h-0 w-0 absolute -top-full" autoFocus={true} />
        <p className="whitespace-pre-wrap break-all w-full">{output}</p>
        <p className="whitespace-pre-wrap break-all w-full">
          {PS1}
          {userInput}
          <span className="animate-blink">█</span>
        </p>
      </div>
    );
  };

  return (
    <div
      className="h-full w-full max-w-full bg-black font-mono text-green-500 overflow-scroll"
      ref={displayRef}
      onClick={() => {
        inputRef.current?.focus();
      }}
      style={{ minHeight: sizes.minHeight - 32 + "px", maxHeight: sizes.maxHeight ? sizes.maxHeight - 32 : "100%" }}
    >
      <TerminalRenderer />
    </div>
  );
}

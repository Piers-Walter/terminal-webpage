import { KeyboardEventHandler, use, useEffect, useMemo, useRef, useState } from "react";
import StringHandlers from "./StringHandlers";
import TerminalExecutor from "./TerminalExecutor";

const PS1 = "user@pierswalter.co.uk>";
const minLineLength = PS1.length;

export default function TerminalMain() {
  const [userInput, setUserInput] = useState(PS1);
  const executor = new TerminalExecutor({ PS1, userInput, setUserInput });
  const windowRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: InputEvent) => {
    console.log("Input" + e.data);
    if (e.data) {
      setUserInput((old) => old + e.data);
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    console.log("Keydown: " + e.key);
    switch (e.key) {
      case "Enter":
        executor.execute();
        break;
      case "Backspace":
        setUserInput((oldInput) => StringHandlers.backspace(oldInput, PS1));
        break;
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("input", handleInput);
    inputRef.current.addEventListener("keydown", handleKeydown);
  }, [inputRef.current]);

  const InputLine = ({ userInput }: { userInput: string }) => {
    return (
      <div className="overflow-scroll">
        <textarea
          autoComplete="false"
          autoCapitalize="false"
          autoCorrect="false"
          autoFocus={true}
          spellCheck={false}
          ref={inputRef}
          onInputCapture={(e) => {
            console.log("onchange");
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          value={userInput + "▌"}
          className="w-full h-full caret-transparent leading-5 align-text-bottom"
        ></textarea>
        <p>Hello</p>
      </div>
    );
  };

  useEffect(() => {
    if (!windowRef.current) return;
  }, []);

  return (
    <div ref={windowRef} className="h-full w-full bg-black font-mono text-green-500">
      <InputLine userInput={userInput} />
      {/* <textarea>abc</textarea> */}
    </div>
  );
}

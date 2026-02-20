import { SetStateAction } from "react";
import Commands from "./Commands";

export default class {
  PS1: string;
  userInput: string;
  setUserInput: React.Dispatch<SetStateAction<string>>

  constructor({ PS1, userInput, setUserInput }: { PS1: string, userInput: string, setUserInput: React.Dispatch<SetStateAction<string>> }) {
    this.PS1 = PS1
    this.userInput = userInput
    this.setUserInput = setUserInput
  }

  #getFullInputLine() {
    const fullShell = this.userInput.split("\n");
    const lastLine = fullShell.pop();
    if (!lastLine) return "ERROR: No Last Line Found";
    const lastCommand = lastLine.substring(this.PS1.length, lastLine.length)
    return lastCommand;
  }

  #addLine(line: string) {
    this.setUserInput(oldInput => oldInput + "\n" + line)
  }

  #end() {
    this.setUserInput(oldInput => oldInput + "\n" + this.PS1)
  }

  #commandIsValid(command: string): boolean {
    return Object.hasOwn(Commands, command)
  }

  execute() {
    const fullShell = this.userInput;
    const lastLineSplit = this.#getFullInputLine().split(" ")

    const command = lastLineSplit[0];
    let args: string[] = []
    if (lastLineSplit.length > 1) {
      args = lastLineSplit.slice(1)
    }
    if (this.#commandIsValid(command)) {
      this.#addLine(Commands[command](args))
    } else {
      this.#addLine(`Command "${command}" not found`)
    }

    this.#end()
  }
}
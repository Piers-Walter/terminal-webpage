import { SetStateAction } from "react";
import * as TerminalCommands from "./Commands/commands"
import { TerminalCommand } from "./CommandType";

export default class {
  PS1: string;
  userInput: string;
  setUserInput: React.Dispatch<SetStateAction<string>>
  setOutput: React.Dispatch<SetStateAction<string>>
  inputHistory: string[];
  historyIndex = -1;

  constructor({ PS1, userInput, setUserInput, setOutput }: { PS1: string, userInput: string, setUserInput: React.Dispatch<SetStateAction<string>>, setOutput: React.Dispatch<SetStateAction<string>> }) {
    this.PS1 = PS1
    this.userInput = userInput
    this.setUserInput = setUserInput
    this.setOutput = setOutput
    this.inputHistory = [];
    console.log("New Executor")
  }

  #getFullInputLine() {
    const fullShell = this.userInput;
    return fullShell;
  }

  #addLineToOutput(line: string) {
    this.setOutput(oldInput => oldInput + "\n" + line)
  }

  #addInputToHistory() {
    this.inputHistory.push(' ' + this.userInput);
    this.historyIndex = this.inputHistory.length - 1;
    console.log(this.inputHistory)
    // console.log(this.userInput)
  }

  #end() {
    this.setUserInput("")
  }

  #commandIsValid(command: string): boolean {
    return Object.hasOwn(TerminalCommands, command)
  }

  handleUp() {
    if (this.historyIndex > -1) {
      this.setUserInput(this.inputHistory[this.historyIndex])
    }
  }

  execute() {
    //Insert the latest user line to history
    const fullShell = this.PS1 + this.userInput;
    // this.#addInputToHistory();
    this.#addLineToOutput(fullShell);
    const inputSplit = this.#getFullInputLine().split(" ")

    const command = inputSplit[0];
    let args: string[] = []
    if (inputSplit.length > 1) {
      args = inputSplit.slice(1)
    }
    if (this.#commandIsValid(command)) {
      // @ts-ignore as we check the command is in the import
      this.#addLineToOutput(TerminalCommands[command]({ args }))
    } else {
      this.#addLineToOutput(`Command "${command}" not found`)
    }

    this.#end()
  }
}
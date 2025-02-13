import React, { SetStateAction } from "react";
import * as TerminalCommands from "./Commands/commands"

export default class {
  #PS1: string;
  #setOutput: React.Dispatch<SetStateAction<string>>
  #output: string;
  #input: string = "";
  #history: string[] = [];
  #historyIndex: number = -1;

  constructor({ PS1, setOutput }: { PS1: string, setOutput: React.Dispatch<SetStateAction<string>> }) {
    this.#PS1 = PS1
    this.#output = PS1;
    this.#setOutput = setOutput
    this.#setOutput(this.#output);
    console.log("New Executor")
  }

  // Needed as the setState function will change each rerender
  setOutputHandler(setOutput: React.Dispatch<SetStateAction<string>>) {
    console.log("Recevied new handler")
    this.#setOutput = setOutput
  }

  handleKeyDown(key: KeyboardEvent["key"]) {
    switch (key) {
      case "Enter":
        this.#input = this.#input.trim();
        this.#history.push(this.#input)
        this.#output += "\n";
        this.#historyIndex = -1;
        this.#execute()
        break;
      case "ArrowUp":
        if (this.#historyIndex === -1 && this.#history.length > 0) {
          this.#historyIndex = this.#history.length - 1
          this.#output += this.#history[this.#historyIndex];
          this.#input = this.#history[this.#historyIndex];
          this.#flushOutput();
        }
        else if (this.#historyIndex > 0) {
          this.#output = this.#output.slice(0, this.#output.length - this.#history[this.#historyIndex].length)
          this.#historyIndex -= 1
          this.#output += this.#history[this.#historyIndex]
          this.#input = this.#history[this.#historyIndex]
          this.#flushOutput();
        }
        break;
      case "ArrowDown":
        if (this.#historyIndex == -1 || this.#historyIndex == this.#history.length - 1) break;
        this.#output = this.#output.slice(0, this.#output.length - this.#history[this.#historyIndex].length)
        this.#historyIndex += 1;
        this.#output += this.#history[this.#historyIndex]
        this.#input = this.#history[this.#historyIndex]
        this.#flushOutput();
        break;
      case "Backspace":
        if (this.#input == "") break;
        this.#input = this.#input.slice(0, -1);
        this.#output = this.#output.slice(0, -1);
        this.#flushOutput();
    }

  }

  handleInput(data: InputEvent["data"]) {
    this.#output += data;
    this.#input += data;
    this.#flushOutput()
  }

  #flushOutput() {
    this.#setOutput(this.#output);
  }


  #commandIsValid(command: string): boolean {
    return Object.hasOwn(TerminalCommands, command)
  }

  #end() {
    this.#input = ""
    this.#output += this.#PS1;
    this.#flushOutput();
  }

  #execute() {
    const inputSplit = this.#input.split(" ")
    const command = inputSplit[0];
    let args: string[] = []
    if (inputSplit.length > 1) {
      args = inputSplit.slice(1)
    }
    if (this.#commandIsValid(command)) {
      this.#output += ((TerminalCommands as any)[command].main({ args }))
    } else {
      this.#output += (`Command "${command}" not found\n`)
    }
    this.#end()
  }
}
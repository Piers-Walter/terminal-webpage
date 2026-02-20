import React, { SetStateAction } from "react";
import { commands } from "./Commands/commands";
import FakeFS from "./FileSystem/FakeFS";

const TerminalExecutor = class {
  #setOutput: React.Dispatch<SetStateAction<string>>
  #output: string;
  #input: string = "";
  #history: string[] = [];
  #historyIndex: number = -1;
  #fs: FakeFS | undefined = undefined
  #environment: { [key: string]: string } = {}

  constructor({ PS1, setOutput, fileSystem }: { PS1: string, setOutput: React.Dispatch<SetStateAction<string>>, fileSystem: FakeFS }) {
    this.#output = PS1;
    this.#setOutput = setOutput
    this.#setOutput(this.#output);
    this.#fs = fileSystem
    this.#environment = {
      "PS1": PS1,
      "USER": "user",
    }
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
    return Object.hasOwn(commands, command)
  }

  #end() {
    this.#input = ""
    this.#output += this.#environment["PS1"];
    this.#flushOutput();
  }

  #execute() {
    const inputSplit = this.#input.split(" ")

    // Check the environment for substitutions
    for (const input in inputSplit) {
      const arg = inputSplit[input]
      const key = arg.slice(1)
      if (arg[0] == "$") {
        if (Object.hasOwn(this.#environment, key)) {
          inputSplit[input] = this.#environment[key]
        } else {
          inputSplit[input] = ""
        }
      }
    }

    const command = inputSplit[0];
    let args: string[] = []
    if (inputSplit.length > 1) {
      args = inputSplit.slice(1)
    }
    if (this.#fs == undefined) {
      this.#output += "File system not found\n"
      this.#end()
      return;
    }
    if (this.#commandIsValid(command)) {
      this.#output += (commands[command].main({ args, fs: this.#fs, environment: this.#environment }))
    } else {
      if (command == "") this.#output += "";
      else { this.#output += (`Command "${command}" not found\n`) }
    }
    this.#end()
  }
}

export default TerminalExecutor
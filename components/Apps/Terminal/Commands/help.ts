import type { TerminalCommand } from "./CommandType";
import * as AllCommands from "./commands"

const help: TerminalCommand = {
  main: ({ }) => {
    return `Available commands:\n${Object.keys(AllCommands).join("\n")}\n`
  },
  man: `This command prints the available commands for the terminal`
}

export default help
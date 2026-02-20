import type { TerminalCommand } from "./CommandType";
import { commands } from "./commands"

const help: TerminalCommand = {
  main: ({ }) => {
    const allCommands = Object.keys(commands).toSorted().join("\n")
    return `Available commands:\n${allCommands}\n`
  },
  man: `This command prints the available commands for the terminal`
}

export default help
import type { TerminalCommand } from "./CommandType";
import * as AllCommands from "./commands"

const man: TerminalCommand = {
  main: ({ args }) => {
    if (args.length == 0) return `This command will print out the manual page for a given command\n`;
    if ((AllCommands as any)[args[0]]) {
      return (AllCommands as any)[args[0]].man || `No manual entry for ${args[0]}\n`
    }
    return `man: Command not found: ${args[0]}\n`

  },
  man: `This command will print out the manual page for a given command\n`
}

export default man
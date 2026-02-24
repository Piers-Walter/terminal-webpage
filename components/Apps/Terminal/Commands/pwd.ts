import type { TerminalCommand } from "./CommandType";

const pwd: TerminalCommand = {
  main: ({ cwdHandler }) => {
    return cwdHandler.cwd + "\n"
  },
  man: `This command prints the current directory`
}

export default pwd
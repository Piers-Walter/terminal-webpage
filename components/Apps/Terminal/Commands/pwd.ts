import type { TerminalCommand } from "./CommandType";

const pwd: TerminalCommand = {
  main: ({ fs }) => {
    return fs.getCwd() + "\n"
  },
  man: `This command prints the current directory`
}

export default pwd
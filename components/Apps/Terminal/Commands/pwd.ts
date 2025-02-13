import type { TerminalCommand } from "../CommandType";

const pwd: TerminalCommand = {
  main: ({ args }) => {
    return "desktop.pierswalter.co.uk\n"
  },
  man: `This command prints the current directory`
}

export default pwd
import type { TerminalCommand } from "./CommandType";

const ls: TerminalCommand = {
  main: ({ fs }) => {
    const contents = fs.readDir();
    return contents.map(node => node.name).join("\n") + '\n'
  },
  man: `This command prints the current directory`
}

export default ls
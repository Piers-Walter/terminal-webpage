import type { TerminalCommand } from "./CommandType";


const cd: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) args[0] = "/"
    const changed = fs.changeDir({ newPath: args[0] });
    if (changed.success) return ""
    return changed.message
  },
  man: `This command changes the current directory`
}

export default cd
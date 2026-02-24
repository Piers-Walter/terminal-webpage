import type { TerminalCommand } from "./CommandType";

const mkdir: TerminalCommand = {
  main: ({ args, fs, cwdHandler }) => {
    if (args.length == 0) { return "Enter a directory name to create\n" }

    if (args[0].indexOf("/") > -1) {
      return "Invalid directory name\n"
    }

    const command = fs.mkDir(cwdHandler.cwd, args[0])
    if (!command.success) { return command.message + "\n" }
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default mkdir
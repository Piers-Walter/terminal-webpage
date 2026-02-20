import type { TerminalCommand } from "./CommandType";

const mkdir: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a directory name to create\n" }


    const command = fs.mkDir({ folderName: args[0] })
    if (!command.success) { return command.message + "\n" }
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default mkdir
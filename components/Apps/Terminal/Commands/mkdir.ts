import type { TerminalCommand } from "./CommandType";

const mkdir: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a directory name to create\n" }


    const success = fs.mkDir({ folderName: args[0] })
    if (!success) { return "Failed to create directory\n" }
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default mkdir
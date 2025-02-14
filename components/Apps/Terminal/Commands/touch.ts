import type { TerminalCommand } from "./CommandType";

const touch: TerminalCommand = {
  main: ({ args, fs }) => {
    if (args.length == 0) { return "Enter a file name to create\n" }

    const success = fs.addFile({ filename: args[0] })
    if (!success) { return "Failed to create file\n" }
    return ""
  },
  man: `This command makes a new directory in the current directory`
}

export default touch